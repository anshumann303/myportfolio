import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Smartphone } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlights: string[];
  github?: string;
  demo?: string;
  badge?: string;
}

const projects: Project[] = [
  {
    title: "RESUMIFY",
    subtitle: "AI-Powered Resume Analyzer",
    description: "Cross-platform React.js SPA with OAuth 2.0 + cloud storage via Puter.js (cut dev time 40%). ATS scoring engine using Gemini API with keyword-gap detection and recruiter-aligned scoring.",
    tech: ["React.js", "React Router v7", "Puter.js", "Zustand", "Gemini API"],
    highlights: [
      "40% faster dev via OAuth + Puter.js",
      "30% higher ATS optimization accuracy",
      "Feedback delivered in 2 seconds",
    ],
    github: "https://github.com/anshumann303",
    demo: "https://resumify-pearl.vercel.app/"
  },
  {
    title: "ChefCognito",
    subtitle: "Agentic AI Meal-Planning Assistant",
    description: "Built with Next.js, LangChain, and Mem0 using Agentic AI workflows and real-time SSE. 90% of users discovered personalized dishes; 50% faster time-to-decision.",
    tech: ["Next.js", "LangChain", "Mem0", "MongoDB"],
    highlights: [
      "50% reduction in time-to-decision",
      "40% increase in recipe relevance",
      "90% personalized dish discovery",
    ],
    github: "https://github.com/anshumann303",
    demo: "https://chefcognito-anshuman.vercel.app/"
  },
  {
    title: "AI Video Assistant",
    subtitle: "Meeting Intelligence System",
    description: "Python-based RAG pipeline with Whisper AI, ChromaDB, and Mistral AI for automated meeting transcription, summarization, and semantic Q&A. Sub-3-second responses.",
    tech: ["Python", "LangChain LCEL", "Whisper AI", "ChromaDB", "Mistral AI", "Streamlit"],
    highlights: [
      "Sub-3-second RAG response times",
      "40% better retrieval accuracy",
      "4+ hours/week saved per tester",
    ],
    github: "https://github.com/anshumann303",
    demo: "https://ai-video-assistant-p9xacbk3v5kgskn623xgso.streamlit.app/"
  }
];

export const ProjectsScreen = () => {
  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="rounded-2xl bg-zinc-950 border border-white/[0.06] px-5 py-6 sm:px-7 sm:py-7">
      <SectionHeader title="Featured Projects" />
      
      <div className="space-y-4">
        {projects.map((project, i) => (
          <div 
            key={i} 
            className="group flex flex-col p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors">{project.title}</h3>
                  {project.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-medium text-emerald-400">
                      {project.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">{project.subtitle}</p>
              </div>
            </div>
            
            <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
              {project.description}
            </p>

            <ul className="mt-3 space-y-1">
              {project.highlights.map((h, j) => (
                <li key={j} className="text-[11px] text-zinc-500 flex gap-1.5">
                  <span className="text-emerald-500 flex-shrink-0">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 text-[10px] font-medium text-zinc-400">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              {project.github && project.github !== "private" && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-medium transition-colors border border-zinc-700"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub Source
                </a>
              )}
              {project.github === "private" && (
                <div 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/50 text-zinc-500 text-[11px] font-medium border border-zinc-800 cursor-not-allowed"
                  title="Currently this repo is private"
                >
                  <Github className="w-3.5 h-3.5" />
                  Private Repository
                </div>
              )}
              {project.demo && (
                <Link 
                  to={project.demo} 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[11px] font-medium transition-colors border border-emerald-500/30"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  View in Arcade
                  <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-70" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ProjectsScreen;
