import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileCode } from "lucide-react";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlights: string[];
  gradient: string;
  glow: string;
  badge?: string;
  badgeColor?: string;
  emoji: string;
  githubLink?: string;
  demoLink?: string;
}

const projects: Project[] = [
  {
    title: "RESUMIFY",
    subtitle: "AI-Powered Resume Analyzer",
    description:
      "Cross-platform React.js SPA with OAuth 2.0 + cloud storage via Puter.js, eliminating a custom auth backend (cut dev time 40%). ATS scoring engine using Gemini API delivering real-time resume analysis, keyword-gap detection, and recruiter-aligned scoring in under 2 seconds.",
    tech: ["React.js", "React Router v7", "Puter.js", "Zustand", "Gemini API"],
    highlights: [
      "40% faster dev via OAuth + Puter.js",
      "30% higher ATS optimization accuracy",
      "Feedback in 2 seconds",
      "Fully responsive SPA",
      "OAuth 2.0 cloud storage",
    ],
    gradient: "from-zinc-700 to-zinc-900",
    glow: "rgba(255,255,255,0.1)",
    emoji: "📄",
    githubLink: "https://github.com/anshumann303",
    demoLink: "https://resumify-pearl.vercel.app/",
  },
  {
    title: "ChefCognito",
    subtitle: "Agentic AI Meal-Planning Assistant",
    description:
      "Built with Next.js, LangChain, and Mem0 using Agentic AI workflows, real-time SSE updates, and intelligent context management. Delivered segmented cooking instructions; 90% of users discovered personalized dishes, 50% faster time-to-decision.",
    tech: ["Next.js", "LangChain", "Mem0", "MongoDB"],
    highlights: [
      "50% reduction in time-to-decision",
      "40% increase in recipe relevance",
      "90% personalized dish discovery",
      "Agentic AI + real-time SSE",
      "Persistent memory with Mem0",
    ],
    gradient: "from-zinc-700 to-zinc-900",
    glow: "rgba(255,255,255,0.1)",
    emoji: "🍳",
    githubLink: "https://github.com/anshumann303",
    demoLink: "https://chefcognito-anshuman.vercel.app/",
  },
  {
    title: "AI Video Assistant",
    subtitle: "Meeting Intelligence System",
    description:
      "Python-based RAG pipeline processing YouTube URLs, MP3/MP4/WAV for automated transcription, summarization, and semantic search using Whisper AI, ChromaDB, Hugging Face, and Mistral AI. Sub-3-second response times, 40% better retrieval.",
    tech: ["Python", "LangChain LCEL", "Whisper AI", "ChromaDB", "Mistral AI", "Streamlit"],
    highlights: [
      "Sub-3-second RAG response times",
      "40% better retrieval accuracy",
      "4+ hours/week saved per user",
      "Semantic search & Q&A",
      "ChromaDB vector store",
    ],
    gradient: "from-zinc-700 to-zinc-900",
    glow: "rgba(255,255,255,0.1)",
    emoji: "🎬",
    githubLink: "https://github.com/anshumann303",
    demoLink: "https://ai-video-assistant-p9xacbk3v5kgskn623xgso.streamlit.app/",
  },
];

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 z-50 flex items-end bg-[#0D1117]/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full h-[85%] flex flex-col rounded-t-lg bg-[#161B22] border border-[#30363D]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Editor Tab Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#30363D] bg-[#0D1117] rounded-t-lg">
        <div className="flex items-center gap-2">
          <FileCode size={14} className="text-[#58A6FF]" />
          <span className="text-xs font-mono text-[#C9D1D9]">{project.title.toLowerCase().replace(/ /g, '_')}.tsx</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-[#30363D] rounded transition-colors">
          <X size={14} className="text-[#C9D1D9]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-5 font-mono text-xs">
        
        {/* Description as a docstring */}
        <div>
          <span className="text-[#8B949E]">/**</span><br/>
          <span className="text-[#8B949E]"> * {project.subtitle}</span><br/>
          <span className="text-[#8B949E]"> *</span><br/>
          <span className="text-[#8B949E]"> * {project.description}</span><br/>
          <span className="text-[#8B949E]"> */</span>
        </div>

        {/* Highlights as an array */}
        <div>
          <span className="text-[#D2A8FF]">const </span>
          <span className="text-[#58A6FF]">features </span>
          <span className="text-[#C9D1D9]">= [</span>
          <div className="pl-4">
            {project.highlights.map((h, i) => (
              <div key={i}>
                <span className="text-[#3FB950]">"{h}"</span>
                <span className="text-[#C9D1D9]">{i < project.highlights.length - 1 ? ',' : ''}</span>
              </div>
            ))}
          </div>
          <span className="text-[#C9D1D9]">];</span>
        </div>

        {/* Commands instead of standard buttons */}
        <div className="pt-2 space-y-2">
          <div className="text-[#8B949E]">{'// Execute commands'}</div>
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="block p-3 rounded bg-[#0D1117] border border-[#30363D] hover:border-[#58A6FF] transition-colors">
              <span className="text-[#3FB950] mr-2">➜</span>
              <span className="text-[#58A6FF]">~</span>
              <span className="text-[#C9D1D9] ml-2">$ git clone {project.githubLink === '#' ? 'repo.git' : project.githubLink}</span>
            </a>
          )}
          {project.demoLink && (
            <Link to={project.demoLink} className="block p-3 rounded bg-[#0D1117] border border-[#30363D] hover:border-[#58A6FF] transition-colors">
              <span className="text-[#3FB950] mr-2">➜</span>
              <span className="text-[#58A6FF]">~</span>
              <span className="text-[#C9D1D9] ml-2">$ npm run demo</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const ProjectsScreen = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="app-screen relative">
      <div className="screen-content space-y-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-xs font-mono text-[#8B949E] uppercase tracking-widest mb-4">
            Projects
          </h2>
        </motion.div>

        {/* Project cards */}
        <div className="space-y-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="project-card flex flex-col overflow-hidden p-0"
              onClick={() => setSelected(project)}
            >
              {/* File tab */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-[#30363D] bg-[#0D1117]">
                <FileCode size={12} className="text-[#58A6FF]" />
                <span className="font-mono text-[11px] text-[#C9D1D9]">{project.title.toLowerCase().replace(/ /g, '_')}.tsx</span>
              </div>
              {/* Editor content */}
              <div className="p-4 bg-[#161B22] font-mono text-[11px] leading-relaxed">
                <div>
                  <span className="text-[#D2A8FF]">import</span>
                  <span className="text-[#C9D1D9]"> {'{ '}</span>
                  <span className="text-[#8B949E]">{project.tech.slice(0, 3).join(", ")}{project.tech.length > 3 ? ', ...' : ''}</span>
                  <span className="text-[#C9D1D9]">{' }'}</span>
                  <span className="text-[#D2A8FF]"> from </span>
                  <span className="text-[#3FB950]">'tech-stack'</span>
                  <span className="text-[#C9D1D9]">;</span>
                </div>
                <div className="mt-2">
                  <span className="text-[#8B949E]">{'// '} {project.subtitle}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="h-4" />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsScreen;
