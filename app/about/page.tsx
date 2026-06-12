import type { Metadata } from "next";
import { Sparkles, Code2, BookOpen, Rocket, Target, Users, Lightbulb, Award } from "lucide-react";
import dynamic from "next/dynamic";
const ModuleLessonSearch = dynamic(() => import("../../components/ModuleLessonSearch"), { ssr: false });

export const metadata: Metadata = {
  title: "About QuraLabz — Interactive Data Science Education",
  description:
    "QuraLabz is a free, interactive platform for learning Python, data science, and machine learning directly in your browser. No sign-up, no setup.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 sm:px-6 py-24">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="glass rounded-3xl border border-white/10 p-8 sm:p-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            About QuraLabz
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6">
            Learn Data Science By Building,
            <span className="gradient-text"> Not Memorizing.</span>
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-3xl">
            QuraLabz is an interactive data science learning platform built to remove setup friction.
            You can write Python, run code instantly in-browser, and move from fundamentals to machine learning
            through structured lessons and practical exercises.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="glass rounded-2xl p-5 border border-white/10">
              <Code2 className="w-6 h-6 text-cyan-400 mb-3" />
              <h2 className="text-white font-semibold mb-2">Hands-On First</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every module emphasizes executable code, experimentation, and intuition.
              </p>
            </div>

            <div className="glass rounded-2xl p-5 border border-white/10">
              <BookOpen className="w-6 h-6 text-violet-400 mb-3" />
              <h2 className="text-white font-semibold mb-2">Structured Learning</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Lessons are split into focused pages so concepts stay clear and progressive.
              </p>
            </div>

            <div className="glass rounded-2xl p-5 border border-white/10">
              <Rocket className="w-6 h-6 text-emerald-400 mb-3" />
              <h2 className="text-white font-semibold mb-2">Zero Setup</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                No installs, no account wall, just open and start learning instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="glass rounded-3xl border border-white/10 p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-cyan-400" />
            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
          </div>

          <div className="space-y-6">
            <p className="text-slate-300 text-lg leading-relaxed">
              Data science education shouldn't require complex local setups, expensive tools, or weeks of prerequisites before writing your first line of code. QuraLabz democratizes learning by making professional-grade data science tools accessible to anyone with a browser.
            </p>

            <p className="text-slate-300 text-lg leading-relaxed">
              We believe the best way to learn data science is by <strong className="text-white">doing</strong> — not watching videos or reading theory in isolation. That's why every lesson includes interactive code playgrounds where you can experiment, fail fast, and iterate instantly.
            </p>

            <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-2xl p-6">
              <p className="text-white font-semibold text-lg mb-2">Free & Accessible</p>
              <p className="text-slate-300">
                QuraLabz is built as a free learning resource for everyone. Whether you're a beginner exploring data science for the first time or an experienced programmer looking to upskill in ML, there's no paywall, no subscription, and no gatekeeping.
              </p>
            </div>
          </div>
        </div>

        {/* Why QuraLabz */}
        <div className="glass rounded-3xl border border-white/10 p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            <h2 className="text-3xl font-bold text-white">Why QuraLabz?</h2>
          </div>

          <div className="space-y-4">
            <div className="border-l-4 border-cyan-400 pl-6">
              <h3 className="text-white font-semibold text-lg mb-2">Browser-Based Code Execution</h3>
              <p className="text-slate-300">
                Powered by Pyodide, a WebAssembly runtime for Python. No server, no login, no environment setup. Write code and see results in milliseconds.
              </p>
            </div>

            <div className="border-l-4 border-violet-400 pl-6">
              <h3 className="text-white font-semibold text-lg mb-2">Comprehensive Curriculum</h3>
              <p className="text-slate-300">
                126 lessons across 11 modules (~59 hours of content) covering Python fundamentals, data manipulation with Pandas, visualization with Matplotlib, numerical computing with NumPy, machine learning, advanced ML techniques, deep learning with neural networks, generative AI with LLMs, agentic AI with autonomous systems, the Model Context Protocol for production AI, and sliding window algorithms for efficient data processing. Everything builds progressively.
              </p>
            </div>

            <div className="border-l-4 border-emerald-400 pl-6">
              <h3 className="text-white font-semibold text-lg mb-2">Structured & Paginated</h3>
              <p className="text-slate-300">
                Large topics are broken into focused, digestible lessons. Each lesson is split into pages so you can learn one concept at a time without overwhelm. Pagination ensures you never get lost in massive content blocks.
              </p>
            </div>

            <div className="border-l-4 border-cyan-400 pl-6">
              <h3 className="text-white font-semibold text-lg mb-2">Real-World Focus</h3>
              <p className="text-slate-300">
                Every lesson includes practical examples and patterns used in production systems. Learn not just what to do, but why it matters and how it works at scale.
              </p>
            </div>

            <div className="border-l-4 border-violet-400 pl-6">
              <h3 className="text-white font-semibold text-lg mb-2">Career-Ready Skills</h3>
              <p className="text-slate-300">
                Content is designed to build genuine expertise that employers seek. Move beyond toy problems into real data science techniques used in industry.
              </p>
            </div>
          </div>
        </div>

        {/* Curriculum Overview */}
        <div className="glass rounded-3xl border border-white/10 p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-violet-400" />
            <h2 className="text-3xl font-bold text-white">What You'll Learn</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <p className="text-cyan-400 font-semibold mb-2">Module 1: Python Fundamentals</p>
              <p className="text-slate-400 text-sm mb-3">Variables, data types, control flow, functions, OOP, and best practices. The foundation for everything.</p>
              <p className="text-violet-400 text-xs">11 lessons • 4h 27m</p>
            </div>

            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <p className="text-cyan-400 font-semibold mb-2">Module 2: Pandas Mastery</p>
              <p className="text-slate-400 text-sm mb-3">DataFrames, data cleaning, transformation, analysis, and real-world preprocessing techniques.</p>
              <p className="text-violet-400 text-xs">12 lessons • 5h 36m</p>
            </div>

            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <p className="text-cyan-400 font-semibold mb-2">Module 3: Data Visualization</p>
              <p className="text-slate-400 text-sm mb-3">Matplotlib fundamentals to advanced plotting, 3D visualization, statistical charts, and styling techniques.</p>
              <p className="text-violet-400 text-xs">11 lessons • 4h 34m</p>
            </div>

            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <p className="text-cyan-400 font-semibold mb-2">Module 4: NumPy Essentials</p>
              <p className="text-slate-400 text-sm mb-3">Array operations, linear algebra, performance optimization, and numerical computing at scale.</p>
              <p className="text-violet-400 text-xs">11 lessons • 4h 05m</p>
            </div>

            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <p className="text-cyan-400 font-semibold mb-2">Module 5: Machine Learning Foundations</p>
              <p className="text-slate-400 text-sm mb-3">Supervised & unsupervised learning, model evaluation, feature engineering, and real-world ML workflows.</p>
              <p className="text-violet-400 text-xs">17 lessons • 6h 40m</p>
            </div>

            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <p className="text-cyan-400 font-semibold mb-2">Module 6: Advanced Machine Learning</p>
              <p className="text-slate-400 text-sm mb-3">Production-ready ML, interpretability, calibration, imbalanced learning, ensemble methods, and enterprise skills.</p>
              <p className="text-violet-400 text-xs">18 lessons • 6h 30m</p>
            </div>

            <div className="bg-white/5 rounded-xl p-5 border border-white/10 sm:col-span-2">
              <p className="text-cyan-400 font-semibold mb-2">Module 7: Deep Learning & Neural Networks</p>
              <p className="text-slate-400 text-sm mb-3">Neurons to Transformers: forward/backprop, CNNs, RNNs, LSTMs, GANs, attention mechanisms, and production deployment.</p>
              <p className="text-violet-400 text-xs">10 lessons • 5h 2m</p>
            </div>

            <div className="bg-white/5 rounded-xl p-5 border border-white/10 sm:col-span-2">
              <p className="text-cyan-400 font-semibold mb-2">Module 8: Generative AI & Large Language Models</p>
              <p className="text-slate-400 text-sm mb-3">Master ChatGPT, Claude, and LLMs: transformers, prompt engineering, fine-tuning, RAG, multimodal models, and production deployment of AI applications.</p>
              <p className="text-violet-400 text-xs">9 lessons • 4h 56m</p>
            </div>

            <div className="bg-white/5 rounded-xl p-5 border border-white/10 sm:col-span-2">
              <p className="text-cyan-400 font-semibold mb-2">Module 9: Agentic AI & Autonomous Systems</p>
              <p className="text-slate-400 text-sm mb-3">Master autonomous agents that take actions, reason over problems, and accomplish goals. ReAct agents, tool use, multi-agent systems, and production workflows.</p>
              <p className="text-violet-400 text-xs">10 lessons • 5h 28m</p>
            </div>

            <div className="bg-white/5 rounded-xl p-5 border border-white/10 sm:col-span-2">
              <p className="text-cyan-400 font-semibold mb-2">Module 10: Model Context Protocol (MCP)</p>
              <p className="text-slate-400 text-sm mb-3">Master MCP for standardized AI systems. Build MCP servers, integrate tools with LLMs and agents, and deploy production AI architectures.</p>
              <p className="text-violet-400 text-xs">8 lessons • 5h 14m</p>
            </div>

            <div className="bg-white/5 rounded-xl p-5 border border-white/10 sm:col-span-2">
              <p className="text-cyan-400 font-semibold mb-2">Module 11: Sliding Window Protocol & Algorithms</p>
              <p className="text-slate-400 text-sm mb-3">Master the sliding window pattern for efficient data processing. Solve problems in linear time, from TCP/IP networks to financial analytics.</p>
              <p className="text-violet-400 text-xs">8 lessons • 5h 42m</p>
            </div>
          </div>
        </div>
      {/* Search Bar */}
      <div className="w-full flex justify-center mb-12 z-10 relative">
        <ModuleLessonSearch />
      </div>

      {/* Target Audience */}
      <div className="glass rounded-3xl border border-white/10 p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-emerald-400" />
            <h2 className="text-3xl font-bold text-white">Who Is This For?</h2>
          </div>

          <div className="space-y-4 text-slate-300">
            <div className="flex gap-4">
              <span className="text-cyan-400 font-bold text-lg">✓</span>
              <div>
                <p className="text-white font-semibold">Beginners & Career Changers</p>
                <p className="text-sm">Start from zero. No prior programming experience needed. Learn Python and data science fundamentals in a structured way.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-cyan-400 font-bold text-lg">✓</span>
              <div>
                <p className="text-white font-semibold">Students</p>
                <p className="text-sm">Supplement your coursework with hands-on practice. Code along with real examples and build practical skills.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-cyan-400 font-bold text-lg">✓</span>
              <div>
                <p className="text-white font-semibold">Working Professionals</p>
                <p className="text-sm">Upskill at your own pace. No commitments, no subscriptions. Learn data science while managing your day job.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-cyan-400 font-bold text-lg">✓</span>
              <div>
                <p className="text-white font-semibold">Experienced Programmers</p>
                <p className="text-sm">New to data science? Jump straight to the libraries and algorithms. Learn at your own pace with interactive code playgrounds.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Behind */}
        <div className="glass rounded-3xl border border-white/10 p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-6 h-6 text-violet-400" />
            <h2 className="text-3xl font-bold text-white">Technology</h2>
          </div>

          <p className="text-slate-300 mb-6">
            QuraLabz is built with modern, production-grade technologies to ensure a fast, reliable learning experience.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-cyan-400 font-semibold text-sm mb-2">Frontend</p>
              <p className="text-xs text-slate-400">Next.js 14 • React 18 • TypeScript • Tailwind CSS • Monaco Editor</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-cyan-400 font-semibold text-sm mb-2">Python Runtime</p>
              <p className="text-xs text-slate-400">Pyodide (WebAssembly) • No server required • Runs entirely in your browser</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-cyan-400 font-semibold text-sm mb-2">Libraries</p>
              <p className="text-xs text-slate-400">Pandas • NumPy • Matplotlib • scikit-learn • All in the browser</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-cyan-400 font-semibold text-sm mb-2">Deployment</p>
              <p className="text-xs text-slate-400">Optimized for fast load times • Responsive design • Mobile-friendly</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass rounded-3xl border border-white/10 p-8 sm:p-12 bg-gradient-to-r from-cyan-500/5 to-violet-500/5">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-emerald-400" />
            <h2 className="text-3xl font-bold text-white">Ready to Start?</h2>
          </div>

          <p className="text-slate-300 text-lg mb-8 max-w-3xl">
            Jump into any module and start learning. No signup required, no time limit, just pure hands-on learning. And if you want personalized guidance on your learning journey or have questions about career paths in data science, book a consultation session with me.
          </p>

          <div className="flex gap-4">
            <a
              href="/module/python"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-shadow"
            >
              Start Learning Now
            </a>
            <a
              href="/contact"
              className="px-6 py-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors font-semibold"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
