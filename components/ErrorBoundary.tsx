"use client";

import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Check if it's a Pyodide-related error that should be suppressed
    const errorMsg = error?.message || "";
    const isPyodideError =
      errorMsg.includes("Unexpected token '<'") ||
      errorMsg.includes("Node cannot be found") ||
      errorMsg.includes("error-stack-parser") ||
      errorMsg.includes("SyntaxError");

    // Don't display state for Pyodide errors - let them fail silently
    if (isPyodideError) {
      console.debug("Suppressed Pyodide error (will retry):", errorMsg);
      return { hasError: false, error: null };
    }

    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    const errorMsg = error?.message || "";
    // Only log non-Pyodide errors
    if (
      !errorMsg.includes("Unexpected token '<'") &&
      !errorMsg.includes("Node cannot be found")
    ) {
      console.error("Error caught by boundary:", error);
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-slate-400 mb-6">{this.state.error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg font-semibold transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
