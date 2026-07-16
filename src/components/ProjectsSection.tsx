import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "RESUMIFY",
    subtitle: "AI-Powered Resume Analyzer",
    description: "A cross-platform React.js SPA with modular routing via React Router v7, supporting desktop and mobile. Implemented OAuth 2.0 + cloud storage via Puter.js, eliminating a custom auth backend. Engineered an AI-powered ATS evaluation engine using Gemini API delivering real-time resume analysis, keyword-gap detection, and recruiter-aligned scoring.",
    highlight: "AI resume analyzer with ATS scoring & OAuth 2.0 integration.",
    features: [
      "OAuth 2.0 + cloud storage (Puter.js)",
      "40% faster dev time",
      "ATS scoring engine",
      "30% better optimization accuracy",
      "Feedback in 2 seconds",
      "Fully responsive SPA"
    ],
    tech: ["React.js", "React Router v7", "Puter.js", "Zustand", "Gemini API", "JavaScript"],
    github: "https://github.com/anshumann303",
    demo: "https://resumify-pearl.vercel.app/",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "ChefCognito",
    subtitle: "Agentic AI Meal-Planning Assistant",
    description: "Managed end-to-end development using Next.js, LangChain, and Mem0 — leveraging Agentic AI workflows, real-time SSE updates, and intelligent context management using tools. Delivered segmented cooking instructions with adaptive AI suggestions; helped 90% of users discover unique, personalized dishes.",
    highlight: "50% faster time-to-decision with 40% increase in recipe relevance.",
    features: [
      "Agentic AI + real-time SSE",
      "50% reduction in time-to-decision",
      "40% increase in recipe relevance",
      "90% users discovered personalized dishes",
      "Persistent memory with Mem0",
      "Next.js + LangChain pipelines"
    ],
    tech: ["Next.js", "LangChain", "Mem0", "MongoDB"],
    github: "https://github.com/anshumann303",
    demo: "https://chefcognito-anshuman.vercel.app/",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    title: "AI Video Assistant",
    subtitle: "Meeting Intelligence System",
    description: "Python-based meeting assistant processing YouTube URLs, MP3, MP4, and WAV files for automated transcription, summarization, and semantic search using Whisper AI. RAG pipeline via LangChain LCEL, ChromaDB, Hugging Face, and Mistral AI enables context-aware Q&A with sub-3-second response times.",
    highlight: "Sub-3-second RAG responses, 40% better retrieval relevance, saves 4+ hrs/week.",
    features: [
      "Sub-3-second RAG responses",
      "40% better retrieval accuracy",
      "4+ hours/week saved per user",
      "Whisper AI transcription",
      "ChromaDB vector store",
      "Semantic search & Q&A"
    ],
    tech: ["Python", "LangChain LCEL", "Whisper AI", "ChromaDB", "RAG", "Mistral AI", "Hugging Face", "Streamlit"],
    github: "https://github.com/anshumann303",
    demo: "https://ai-video-assistant-p9xacbk3v5kgskn623xgso.streamlit.app/",
    color: "from-amber-500/20 to-orange-500/20"
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding relative">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col gap-8 lg:gap-16 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* Project Image/Banner */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-sm" />
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center z-10">
                    <span className="font-display text-2xl md:text-4xl font-bold text-white/50 tracking-wider">
                      {project.title}
                    </span>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 flex gap-2 z-20">
                    <div className="w-3 h-3 rounded-full bg-destructive/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-primary/50" />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-2 font-display">{project.title}</h3>
                  <h4 className="text-primary font-medium text-lg">{project.subtitle}</h4>
                </div>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-primary-foreground/90 font-medium">
                  {project.highlight}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div>
                  <h5 className="font-semibold text-foreground mb-3">Key Features:</h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map(feature => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="default" className="bg-foreground text-background hover:bg-foreground/90 gap-2">
                      <Github className="w-4 h-4" /> View Source
                    </Button>
                  </a>
                  <Link to={project.demo}>
                    <Button variant="outline" className="border-border hover:bg-secondary gap-2">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
