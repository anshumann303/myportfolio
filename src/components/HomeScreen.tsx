import React, { useState, useEffect, useRef } from 'react';
const profilePhoto = '/photo/anshuman.jpg';
import SkillsMarquee from './SkillsMarquee';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, X, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CustomBanner } from './CustomBanner';

export const HomeScreen = () => {
  const [photoOpen, setPhotoOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const spotifyContainerRef = useRef<HTMLDivElement>(null);
  const spotifyControllerRef = useRef<any>(null);

  // Initialize Spotify IFrame API for programmatic control
  useEffect(() => {
    const initSpotify = (IFrameAPI: any) => {
      const element = spotifyContainerRef.current;
      if (!element) return;

      const options = {
        uri: 'spotify:track:0mEdbdeRFQwBhN4xfyIeUM',
        width: '100%',
        height: '152',
        theme: '0'
      };

      IFrameAPI.createController(element, options, (EmbedController: any) => {
        spotifyControllerRef.current = EmbedController;
      });
    };

    if ((window as any).Spotify && (window as any).Spotify.IframeApi) {
      // Script already loaded and API ready
      initSpotify((window as any).Spotify.IframeApi);
    } else {
      // Define the global callback
      (window as any).onSpotifyIframeApiReady = initSpotify;

      // Inject the Spotify script if it doesn't exist
      if (!document.querySelector('script[src="https://open.spotify.com/embed/iframe-api/v1"]')) {
        const script = document.createElement('script');
        script.src = "https://open.spotify.com/embed/iframe-api/v1";
        script.async = true;
        document.body.appendChild(script);
      }
    }

    // Cleanup
    return () => {
      // Note: we can't easily clean up the Spotify iframe itself here 
      // without potentially breaking other things, but React will remove the DOM node.
      if ((window as any).onSpotifyIframeApiReady === initSpotify) {
        (window as any).onSpotifyIframeApiReady = null;
      }
    };
  }, []);

  // Pause music automatically when app goes to background / tab is switched
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && spotifyControllerRef.current) {
        spotifyControllerRef.current.pause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (photoOpen || bannerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [photoOpen, bannerOpen]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col px-4 sm:px-6">

      {/* Hero Banner + Profile Picture wrapper */}
      <div className="relative w-full mb-12 sm:mb-14">
        {/* Banner Container */}
        <div className="relative w-full rounded-2xl overflow-hidden">
          <button
            onClick={() => setBannerOpen(true)}
            aria-label="View banner"
            className="block w-full cursor-zoom-in group"
          >
            <CustomBanner />
          </button>

          {/* Buttons placed on top of CustomBanner */}
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center gap-2">
            <Link
              to="/playgames"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500 text-black hover:bg-emerald-400 active:scale-95 transition-all shadow-md shadow-emerald-500/20 backdrop-blur-md"
            >
              <Gamepad2 className="w-3.5 h-4.5" />
              Arcade
            </Link>
            <a
              href="https://drive.google.com/file/d/1IYhVFHdNMeB25xJMHljxqLkslMNJ6Ouv/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-900/90 text-white hover:bg-zinc-800 active:scale-95 transition-all border border-zinc-600 shadow-md backdrop-blur-md"
            >
              <ArrowUpRight className="w-3.5 h-4.5" />
              Resume
            </a>
          </div>
        </div>

        {/* Profile Picture — sits below banner, not inside overflow-hidden */}
        <div className="absolute -bottom-10 left-6 sm:left-8 z-10">
          <button
            onClick={() => setPhotoOpen(true)}
            aria-label="View profile photo"
            className="group block w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-4 border-black shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-zoom-in transition-transform duration-200 hover:scale-105"
          >
            <img
              src={profilePhoto}
              alt="Anshuman Lawankar"
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
            />
          </button>
        </div>
      </div>

      {/* ── Profile Photo Lightbox ── */}
      {photoOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
          style={{ animation: 'fcb-lb-bg 0.25s ease forwards' }}
          onClick={() => setPhotoOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Frame */}
          <div
            className="relative z-10 flex flex-col items-center gap-4"
            style={{ animation: 'fcb-lb-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glowing ring */}
            <div className="relative rounded-2xl p-[3px] bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 shadow-2xl shadow-emerald-500/30">
              <div className="rounded-[14px] overflow-hidden w-64 h-64 sm:w-80 sm:h-80">
                <img
                  src={profilePhoto}
                  alt="Anshuman Lawankar"
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
              </div>
            </div>

            {/* Name tag */}
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Anshuman Lawankar</span>
              <span className="text-emerald-400 text-xs font-mono">@anshumanlawankar</span>
            </div>

            {/* Close button */}
            <button
              onClick={() => setPhotoOpen(false)}
              aria-label="Close"
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <style>{`
            @keyframes fcb-lb-bg  { from { opacity: 0 } to { opacity: 1 } }
            @keyframes fcb-lb-pop { from { opacity: 0; transform: scale(0.7) } to { opacity: 1; transform: scale(1) } }
          `}</style>
        </div>
      )}

      {/* ── Banner Lightbox ── */}
      {bannerOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
          style={{ animation: 'fcb-lb-bg 0.25s ease forwards' }}
          onClick={() => setBannerOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

          {/* Frame */}
          <div
            className="relative z-10 flex flex-col items-center gap-4 w-full max-w-3xl"
            style={{ animation: 'fcb-lb-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glowing border */}
            <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 shadow-2xl shadow-emerald-500/30 w-full">
              <div className="rounded-[14px] overflow-hidden w-full">
                <img
                  src="/my-new-bg.jpg"
                  alt="Anshuman Lawankar - Banner"
                  className="w-full h-auto object-cover"
                  draggable={false}
                />
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setBannerOpen(false)}
              aria-label="Close banner"
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <style>{`
            @keyframes fcb-lb-bg  { from { opacity: 0 } to { opacity: 1 } }
            @keyframes fcb-lb-pop { from { opacity: 0; transform: scale(0.7) } to { opacity: 1; transform: scale(1) } }
          `}</style>
        </div>
      )}

      {/* Profile Info — frosted glass panel for readability over the animated background */}
      <div className="relative rounded-2xl bg-zinc-950 border border-white/[0.06] px-5 py-6 sm:px-7 sm:py-7 space-y-6">
        <div className="space-y-1.5">
          <h1
            className="font-bold text-2xl sm:text-3xl tracking-tight text-white"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Anshuman Lawankar
          </h1>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-zinc-400 pt-1">
            <a
              href="https://x.com/anshumann303"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Twitter / X"
              title="Twitter / X"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/anshumann303"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/anshuman-lawankar-1ba702339/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:lawankaranshuman@gmail.com"
              className="hover:text-white transition-colors"
              aria-label="Email"
              title="lawankaranshuman@gmail.com"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className="font-serif italic text-lg text-zinc-500 select-none">anshumanlawankar</span>
            <div className="h-[1px] bg-zinc-800 w-32"></div>
          </div>
        </div>

        {/* Bio */}
        <div className="text-sm sm:text-base text-zinc-400 leading-relaxed space-y-4 max-w-2xl">
          <p>
            Final-year IT student at <span className="text-white font-semibold">Sipna COET, Amravati</span> and full-stack developer specializing in the{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mx-0.5">MERN</span>{' '}
            stack and{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mx-0.5">AI Integration</span>.
            I build scalable, AI-powered software that transforms complex ideas into{' '}
            <span className="italic text-white">fast, reliable</span>and production-ready apps.
          </p>
          <p>
            As an <span className="text-white font-semibold">Oracle Certified Generative AI Professional</span>, I have hands-on experience in{' '}
            <span className="text-white font-semibold">GEN AI workflows, RAG pipelines,</span> and integrating LLMs into{' '}
            <span className="text-white font-semibold">Production-ready apps</span>. I build softwares that scales from responsive frontends to robust backend systems while leveraging AI to create smarter user experiences.
          </p>
          <p>
            Beyond coding, I'm a tech content creator passionate about building developer communities. When I’m not coding, I’m{' '}
            <button
              onClick={() => scrollToSection('projects')}
              className="text-white font-medium underline underline-offset-4 decoration-zinc-700 hover:decoration-white transition-colors"
            >
              probably hiking on mountains
            </button>.
          </p>
        </div>

        {/* Recently Listening & Key Stats */}
        <div className="space-y-6 pt-4">
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-zinc-500">Recently <span className="text-white">listening</span></h3>
            <div className="overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/30">
              {/* This div is replaced by the Spotify IFrame API */}
              <div ref={spotifyContainerRef}></div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-4 pt-2 max-w-xs">
            <button
              onClick={() => scrollToSection('projects')}
              className="flex flex-col text-left hover:opacity-80 transition-opacity group"
            >
              <span className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">4+</span>
              <span className="text-[10px] text-zinc-500 leading-tight">Projects Built</span>
            </button>

            <a
              href="https://github.com/anshumann303"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col text-left hover:opacity-80 transition-opacity group"
            >
              <span className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">3+</span>
              <span className="text-[10px] text-zinc-500 leading-tight">Contest Participated</span>
            </a>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/[0.06]">
            <h3 className="text-xs font-medium text-zinc-500">Key <span className="text-white">Highlights</span></h3>

            <div className="space-y-4">
              <div className="group relative border-l-2 border-emerald-500/30 pl-4 py-1 hover:border-emerald-500 transition-colors">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  <span className="text-white font-semibold">Certified Oracle Generative AI Professional</span> focusing on large language models and prompt engineering.
                </p>
              </div>

              <div className="group relative border-l-2 border-teal-500/30 pl-4 py-1 hover:border-teal-500 transition-colors">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  <span className="text-white font-semibold">Qualified for Naukri Young Turks Aptitude Test</span> selected through competitive screening.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
