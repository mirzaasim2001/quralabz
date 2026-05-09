"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, Copy, Check, Terminal, Loader2 } from "lucide-react";

interface CodePlaygroundProps {
  starterCode: string;
  language?: string;
}

type OutputItem =
  | { type: "text"; content: string }
  | { type: "image"; src: string }
  | { type: "error"; content: string };

export default function CodePlayground({
  starterCode,
  language = "python",
}: CodePlaygroundProps) {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState<OutputItem[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideStatus, setPyodideStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");
  const [copied, setCopied] = useState(false);
  const pyodideRef = useRef<any>(null);

  // ── Suppress Pyodide CDN-related errors ────────────────────
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const msg = event.message || '';
      const filename = event.filename || '';
      
      // Suppress known Pyodide non-fatal errors
      if (
        msg.includes("Unexpected token '<'") ||
        msg.includes("Node cannot be found") ||
        msg.includes("SyntaxError") ||
        filename.includes("pyodide") ||
        filename.includes("cdn.jsdelivr")
      ) {
        event.preventDefault();
        return true;
      }
      return false;
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const msg = String(event.reason || '');
      if (
        msg.includes("Node cannot be found") ||
        msg.includes("Unexpected token '<'")
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);
    
    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  // ── Load Pyodide lazily on first run ──────────────────────
  const loadPyodide = useCallback(async () => {
    if (pyodideRef.current) return pyodideRef.current;

    setPyodideStatus("loading");
    
    // CDN URLs to try in order
    const cdnUrls = [
      "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js",
      "https://unpkg.com/pyodide@0.25.1/pyodide.js",
    ];

    let lastError: Error | null = null;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      for (const cdnUrl of cdnUrls) {
        try {
          // Check if Pyodide is already loaded
          if ((window as any).loadPyodide) {
            break;
          }

          // Add a small delay before loading (allows error suppression to be set up)
          await new Promise(resolve => setTimeout(resolve, retryCount * 500));

          // Pre-fetch and validate the script before loading
          try {
            const response = await fetch(cdnUrl, { cache: "reload" });
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const scriptContent = await response.text();
            
            // Validate it's actual JavaScript (not HTML error page)
            if (scriptContent.includes("<!DOCTYPE") || scriptContent.includes("<html") || scriptContent.trim().startsWith("<")) {
              throw new Error("CDN returned HTML instead of JavaScript");
            }
            
            if (!scriptContent.includes("loadPyodide")) {
              throw new Error("Script doesn't contain loadPyodide function");
            }
          } catch (fetchErr: any) {
            console.debug(`Validation failed for ${cdnUrl}:`, fetchErr.message);
            throw fetchErr;
          }

          // Script is valid, now load it
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = cdnUrl;
            script.async = true;
            script.type = "text/javascript";
            
            const timeout = setTimeout(() => {
              reject(new Error(`Timeout loading from ${cdnUrl}`));
            }, 20000);

            script.onload = () => {
              clearTimeout(timeout);
              if (typeof (window as any).loadPyodide === "function") {
                resolve();
              } else {
                reject(new Error("loadPyodide not found after script load"));
              }
            };

            script.onerror = () => {
              clearTimeout(timeout);
              reject(new Error(`Failed to load from ${cdnUrl}`));
            };

            document.head.appendChild(script);
          });

          // If successful, break out of retry loops
          if ((window as any).loadPyodide) {
            break;
          }
        } catch (err: any) {
          lastError = err;
          console.debug(`Attempt ${retryCount + 1} failed to load Pyodide from ${cdnUrl}:`, err.message);
          continue;
        }
      }

      // If Pyodide is loaded, exit retry loop
      if ((window as any).loadPyodide) {
        break;
      }

      retryCount++;
      if (retryCount < maxRetries) {
        // Wait before retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount - 1)));
      }
    }

    // If all CDNs failed, throw error
    if (!(window as any).loadPyodide) {
      setPyodideStatus("error");
      const errorMsg = lastError?.message || "Unable to load Python runtime from any CDN";
      setOutput([
        {
          type: "error",
          content: `Error: ${errorMsg}. Please refresh the page and try again.`,
        },
      ]);
      throw new Error(errorMsg);
    }

    try {
      // Initialize Pyodide
      const pyodide = await (window as any).loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
      });

      // Pre-load micropip
      try {
        await pyodide.loadPackage(["micropip"]);
      } catch (err) {
        console.warn("Micropip loading failed, continuing:", err);
      }

      pyodideRef.current = pyodide;
      setPyodideStatus("ready");
      return pyodide;
    } catch (err: any) {
      console.error("Pyodide initialization error:", err);
      setPyodideStatus("error");
      setOutput([
        {
          type: "error",
          content: `Python runtime initialization failed: ${err.message}`,
        },
      ]);
      throw err;
    }
  }, []);

  // ── Run code ──────────────────────────────────────────────
  const runCode = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutput([]);

    try {
      const pyodide = await loadPyodide();

      // Capture stdout
      const stdoutLines: string[] = [];
      pyodide.setStdout({
        batched: (text: string) => {
          stdoutLines.push(text);
        },
      });
      pyodide.setStderr({
        batched: (text: string) => {
          stdoutLines.push(`[stderr] ${text}`);
        },
      });

      // Check if matplotlib is needed and load it
      if (code.includes("matplotlib") || code.includes("import matplotlib")) {
        try {
          await pyodide.loadPackage(["matplotlib"]);
        } catch (err) {
          console.warn("Failed to load matplotlib:", err);
        }
      }
      if (code.includes("import pandas") || code.includes("from pandas")) {
        try {
          await pyodide.loadPackage(["pandas"]);
        } catch (err) {
          console.warn("Failed to load pandas:", err);
        }
      }
      if (code.includes("import numpy") || code.includes("from numpy")) {
        try {
          await pyodide.loadPackage(["numpy"]);
        } catch (err) {
          console.warn("Failed to load numpy:", err);
        }
      }

      await pyodide.runPythonAsync(code);

      // Parse output — separate PLOT_BASE64 lines from text
      const items: OutputItem[] = [];
      const allOutput = stdoutLines.join("\n");
      const lines = allOutput.split("\n");

      for (const line of lines) {
        if (line.startsWith("PLOT_BASE64:")) {
          const b64 = line.slice("PLOT_BASE64:".length).trim();
          items.push({ type: "image", src: `data:image/png;base64,${b64}` });
        } else if (line.length > 0) {
          // Merge consecutive text lines
          const last = items[items.length - 1];
          if (last && last.type === "text") {
            last.content += "\n" + line;
          } else {
            items.push({ type: "text", content: line });
          }
        }
      }

      if (items.length === 0) {
        items.push({
          type: "text",
          content: "✓ Executed successfully (no output)",
        });
      }

      setOutput(items);
    } catch (err: any) {
      console.error("Code execution error:", err);
      let errorMsg = err?.message || String(err) || "Unknown error occurred";

      // Clean up Pyodide's verbose error messages into readable Python tracebacks
      // Remove internal Pyodide JS stack frames, keep only Python-relevant lines
      if (errorMsg.includes("PythonError") || errorMsg.includes("Traceback")) {
        // Extract the Python traceback portion only
        const tracebackMatch = errorMsg.match(/(Traceback[\s\S]*)/);
        if (tracebackMatch) {
          errorMsg = tracebackMatch[1].trim();
        } else {
          // Remove "PythonError: " prefix
          errorMsg = errorMsg.replace(/^PythonError:\s*/, "").trim();
        }
      }

      // Friendly labels for common errors
      if (errorMsg.includes("SyntaxError")) {
        errorMsg = "⚠ Syntax Error\n\n" + errorMsg;
      } else if (errorMsg.includes("NameError")) {
        errorMsg = "⚠ Name Error (undefined variable)\n\n" + errorMsg;
      } else if (errorMsg.includes("IndentationError")) {
        errorMsg = "⚠ Indentation Error\n\n" + errorMsg;
      } else if (errorMsg.includes("TypeError")) {
        errorMsg = "⚠ Type Error\n\n" + errorMsg;
      } else if (errorMsg.includes("ZeroDivisionError")) {
        errorMsg = "⚠ Division by Zero\n\n" + errorMsg;
      } else if (errorMsg.includes("ImportError") || errorMsg.includes("ModuleNotFoundError")) {
        errorMsg = "⚠ Import Error (package not available in browser)\n\n" + errorMsg;
      } else if (errorMsg.includes("IndexError")) {
        errorMsg = "⚠ Index Out of Range\n\n" + errorMsg;
      } else if (errorMsg.includes("KeyError")) {
        errorMsg = "⚠ Key Not Found\n\n" + errorMsg;
      }

      setOutput([{ type: "error", content: errorMsg }]);
    } finally {
      setIsRunning(false);
    }
  }, [code, isRunning, loadPyodide]);

  const handleReset = () => {
    setCode(starterCode);
    setOutput([]);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0d14] rounded-xl overflow-hidden border border-white/8">
      {/* ── Editor Toolbar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#12121a] border-b border-white/8">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-slate-500 font-mono">
            main.py
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Copy */}
          <button
            onClick={handleCopy}
            title="Copy code"
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          {/* Reset */}
          <button
            onClick={handleReset}
            title="Reset to starter code"
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          {/* Run */}
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold
              bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-800 disabled:cursor-not-allowed
              text-[#0a0a0f] transition-all duration-150 shadow-md glow-cyan"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {pyodideStatus === "loading" ? "Loading…" : "Running…"}
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Run Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Monaco Editor ── */}
      <div className="flex-1 min-h-0" style={{ minHeight: "260px" }}>
        <Editor
          height="100%"
          defaultLanguage={language}
          value={code}
          onChange={(val) => setCode(val ?? "")}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            renderLineHighlight: "line",
            padding: { top: 12, bottom: 12 },
            smoothScrolling: true,
            cursorBlinking: "expand",
            cursorSmoothCaretAnimation: "on",
            bracketPairColorization: { enabled: true },
            wordWrap: "on",
            tabSize: 4,
            automaticLayout: true,
          }}
        />
      </div>

      {/* ── Output Console ── */}
      <div className="border-t border-white/8 flex flex-col min-h-0" style={{ height: "350px" }}>
        {/* Console header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#12121a] border-b border-white/8 flex-shrink-0">
          <Terminal className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-mono text-slate-500">OUTPUT</span>
          {pyodideStatus === "loading" && (
            <span className="ml-auto text-xs text-cyan-400 flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" />
              Initializing Python runtime…
            </span>
          )}
          {pyodideStatus === "ready" && output.length > 0 && (
            <button
              onClick={() => setOutput([])}
              className="ml-auto text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Console body */}
        <div
          className="font-mono text-sm bg-[#0d0d14] flex-1 overflow-y-auto overflow-x-hidden"
          style={{ 
            minHeight: "0",
          }}
        >
          {output.length === 0 ? (
            <div className="flex items-center gap-2 p-4 text-slate-600">
              <span className="text-lg">▶</span>
              <span className="text-xs">Click "Run Code" to execute…</span>
            </div>
          ) : (
            <div className="p-3 space-y-2" style={{ minWidth: "0" }}>
              {output.map((item, i) => {
                if (item.type === "image") {
                  return (
                    <div key={i} className="rounded-lg overflow-hidden border border-white/8">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt="Plot output"
                        className="w-full object-contain"
                      />
                    </div>
                  );
                }
                if (item.type === "error") {
                  return (
                    <pre
                      key={i}
                      className="text-red-400 text-xs whitespace-pre-wrap leading-relaxed break-words"
                      style={{ maxWidth: "100%", wordBreak: "break-word" }}
                    >
                      {item.content}
                    </pre>
                  );
                }
                return (
                  <pre
                    key={i}
                    className="text-emerald-300 text-xs whitespace-pre-wrap leading-relaxed break-words"
                    style={{ maxWidth: "100%", wordBreak: "break-word" }}
                  >
                    {item.content}
                  </pre>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
