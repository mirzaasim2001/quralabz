import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, Calendar, Lightbulb, User, Briefcase, Code, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact QuraLabz",
  description:
    "Get in touch with the QuraLabz team for questions, feedback, or partnership inquiries about our interactive data science platform.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 sm:px-6 py-24">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Contact Section */}
        <div className="glass rounded-3xl border border-white/10 p-8 sm:p-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Contact <span className="gradient-text">QuraLabz</span>
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            For collaborations, feedback, or support, reach out directly using the details below.
          </p>

          <div className="space-y-4">
            <a
              href="tel:+917218114755"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 hover:bg-white/10 transition-colors"
            >
              <Phone className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-slate-400 text-sm">Phone</p>
                <p className="text-white font-semibold">+91 7218114755</p>
              </div>
            </a>

            <a
              href="mailto:mirza.asim@quralabz.com"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 hover:bg-white/10 transition-colors"
            >
              <Mail className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-slate-400 text-sm">Email</p>
                <p className="text-white font-semibold">mirza.asim@quralabz.com</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              <MessageCircle className="w-5 h-5 text-violet-400" />
              <div>
                <p className="text-slate-400 text-sm">Response Window</p>
                <p className="text-white font-semibold">Usually within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Consultation Session Section */}
        <div className="glass rounded-3xl border border-white/10 p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-cyan-400" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Book a Consultation Session</h2>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Ready to take your data science skills to the next level? Schedule a personalized consultation session with me to discuss your learning goals, project challenges, or career aspirations in AI and machine learning.
          </p>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              Benefits of a Consultation Session
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span><strong>Personalized Guidance:</strong> Get tailored advice based on your specific learning path and career goals</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span><strong>Real-World Insights:</strong> Learn from hands-on experience with production ML systems and scaling challenges</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span><strong>Project Strategy:</strong> Get advice on structuring your ML projects and avoiding common pitfalls</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span><strong>Career Acceleration:</strong> Understand industry trends, tools, and the skills companies actually need</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span><strong>Direct Access:</strong> Ask questions and get direct feedback from someone who's built AI systems at scale</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-3">How to Book a Session</h3>
            <p className="text-slate-300">
              Simply message on <span className="inline-flex items-center gap-1.5">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold">WhatsApp</span>
              </span> <span className="text-cyan-400 font-semibold">+91 7218114755</span> to schedule your consultation. This is a direct line — you'll be speaking with me personally. Let's discuss how I can help you achieve your data science goals!
            </p>
          </div>
        </div>

        {/* About Me Section */}
        <div className="glass rounded-3xl border border-white/10 p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-violet-400" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">About Your Consultant</h2>
          </div>

          <div className="space-y-8">
            {/* Main Bio */}
            <div>
              <p className="text-slate-300 text-lg leading-relaxed">
                <strong className="text-white">Senior Data Scientist</strong> with 5+ years of hands-on experience architecting and deploying production-grade AI/ML systems that solve real business challenges. Currently building enterprise-scale AI solutions, previously led end-to-end ML pipelines for document intelligence and predictive systems serving millions of users.
              </p>
            </div>

            {/* Professional Experience */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                Professional Expertise
              </h3>
              <div className="space-y-4 text-slate-300">
                <div className="border-l-2 border-cyan-400 pl-4">
                  <p className="text-white font-semibold">Enterprise AI & LLM Systems</p>
                  <p className="text-sm">Designed and deployed AI-driven solutions with enterprise-wide integration, including NLP-to-SQL translation, context-aware RAG pipelines, and large-scale knowledge base architecture. Specialized in prompt engineering and generative AI optimization.</p>
                </div>
                <div className="border-l-2 border-cyan-400 pl-4">
                  <p className="text-white font-semibold">End-to-End ML Pipeline Architecture</p>
                  <p className="text-sm">Built production-ready ML systems from scratch: document classification, entity extraction, intelligent contract management, and predictive analytics. Full ownership from problem statement to deployment, including HLD/LLD design and system architecture.</p>
                </div>
                <div className="border-l-2 border-cyan-400 pl-4">
                  <p className="text-white font-semibold">MLOps & Model Lifecycle Management</p>
                  <p className="text-sm">Implemented industry-standard practices using DVC, MLflow, Kubeflow, and CI/CD pipelines (GitHub Actions, Jenkins). Designed monitoring dashboards for proactive issue resolution and model performance tracking at scale.</p>
                </div>
                <div className="border-l-2 border-cyan-400 pl-4">
                  <p className="text-white font-semibold">Deep Learning & Computer Vision</p>
                  <p className="text-sm">Developed CNN/RNN models for complex tasks including video generation, image processing, and object detection. Expertise in Stable Diffusion, advanced rendering optimization, and cost-efficient GPU utilization.</p>
                </div>
              </div>
            </div>

            {/* Key Achievements */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                Notable Achievements
              </h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold">→</span>
                  <span>Built intelligent contract management system processing complex legal documents with high-precision clause prediction (published <a href="https://www.ijsrem.com/download/legal-clauses-prediction-model" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">research paper</a>)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold">→</span>
                  <span>Deployed predictive system achieving 83% accuracy in real-time forecasting for large-scale healthcare applications</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold">→</span>
                  <span>Architected serverless ML infrastructure handling enterprise-grade data volumes with optimized cost efficiency</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold">→</span>
                  <span>Created AI-powered content generation systems with advanced prompt engineering and rendering optimization</span>
                </li>
              </ul>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-violet-400" />
                Technical Toolkit
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-cyan-400 text-sm font-semibold mb-2">Core ML Stack</p>
                  <p className="text-xs text-slate-300">TensorFlow, scikit-learn, PyTorch, Deep Learning Frameworks</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-cyan-400 text-sm font-semibold mb-2">LLM & NLP</p>
                  <p className="text-xs text-slate-300">LangChain, RAG, OpenAI API, Hugging Face, Prompt Engineering</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-cyan-400 text-sm font-semibold mb-2">MLOps & DevOps</p>
                  <p className="text-xs text-slate-300">DVC, MLflow, Kubeflow, Jenkins, GitHub Actions, AWS Services</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-cyan-400 text-sm font-semibold mb-2">Backend & APIs</p>
                  <p className="text-xs text-slate-300">FastAPI, Flask, Django, REST APIs, Streamlit</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-cyan-400 text-sm font-semibold mb-2">Databases & Data</p>
                  <p className="text-xs text-slate-300">SQL, MongoDB, PostgreSQL, Data Engineering pipelines</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-cyan-400 text-sm font-semibold mb-2">Cloud & Infrastructure</p>
                  <p className="text-xs text-slate-300">AWS (EC2, Lambda, Bedrock), Serverless Architecture</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <p className="text-slate-300 leading-relaxed">
              Whether you're building your first ML model, scaling an existing system, or navigating the complexities of enterprise AI — I bring full-stack expertise combined with a passion for teaching and mentorship. Let's turn your data science challenges into competitive advantages.
            </p>

            <a
              href="https://www.linkedin.com/in/mirza-asim-baig-3806951a1/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors font-semibold"
            >
              Connect on LinkedIn
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
