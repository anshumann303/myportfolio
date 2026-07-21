import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Circle, Square,
  Grid, Hexagon, Activity, Gamepad2, TrainFront, Bird, Globe, Music, Folder,
  Smartphone, Tablet, Monitor, ExternalLink
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FloatingHeader from '../components/FloatingHeader';

type AppType = 'home' | 'game2048' | 'hextris' | 'dino' | 'tetris' | 'subway' | 'flappy' | 'spotify' | 'resumify' | 'chefcognito' | 'aivideo';

const SquircleIcon = ({ 
  imgUrl, 
  FallbackIcon, 
  gradient,
  alt
}: { 
  imgUrl: string, 
  FallbackIcon: any, 
  gradient: string,
  alt: string
}) => {
  const [error, setError] = useState(false);
  
  return (
    <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-sm overflow-hidden flex items-center justify-center bg-gradient-to-br ${gradient} border border-white/10 group-hover:scale-95 transition-transform duration-200`}>
      {!error ? (
        <img 
          src={imgUrl} 
          alt={alt} 
          className="w-full h-full object-cover" 
          onError={() => setError(true)}
        />
      ) : (
        <FallbackIcon size={26} className="text-white drop-shadow-md opacity-90" strokeWidth={1.5} />
      )}
      
      {/* iOS Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50 pointer-events-none"></div>
    </div>
  );
};

const PlayGames = () => {
  const [activeApp, setActiveApp] = useState<AppType>('home');
  const [time, setTime] = useState(new Date());
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('tablet');

  // Audio Player State for Spotify
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const audioRef = useRef<HTMLAudioElement>(null);

  const SPOTIFY_TRACKS = [
    {
      "id": "6zvqq50PL7io0rprbkrYc9",
      "title": "Afterthought",
      "artist": "Joji, BENEE",
      "img": "https://i.scdn.co/image/ab67616d0000485153f6fa0d2589c6a7174f4b81",
      "previewUrl": "https://p.scdn.co/mp3-preview/99883d9095180e6910e031a93afad2b0251601b3"
    },
    {
      "id": "0up9rhm9qt2LW7cnoDFCMk",
      "title": "Jiyein Kyun",
      "artist": "Pritam, Papon",
      "img": "https://i.scdn.co/image/ab67616d00004851e39388ba8eadf58476135087",
      "previewUrl": "https://p.scdn.co/mp3-preview/eef1f98c9e592bc4734eb4a670c2c3d343ac2297"
    },
    {
      "id": "5PvwPy5eRO8BPwpRzCHK3D",
      "title": "Sunn Raha Hai",
      "artist": "Ankit Tiwari, Sandeep Nath",
      "img": "https://i.scdn.co/image/ab67616d000048516404721c1943d5069f0805f3",
      "previewUrl": "https://p.scdn.co/mp3-preview/66bea517c537e37b3aa162213583403583551f08"
    },
    {
      "id": "2qgXrzJsry4KgYoJCpuaul",
      "title": "Choo Lo",
      "artist": "The Local Train",
      "img": "https://i.scdn.co/image/ab67616d0000485158ecb3e5ec3bbef70ee09e43",
      "previewUrl": "https://p.scdn.co/mp3-preview/c5d4e05e621bcdbd437dd7db50c5b318934b0851"
    },
    {
      "id": "3beYHVCFKzbdNjJqjKeYpM",
      "title": "Teri Jhuki Nazar",
      "artist": "Pritam, Shafqat Amanat Ali, Sayeed Quadri",
      "img": "https://i.scdn.co/image/ab67616d00004851947e9127982f21bf5504e1f8",
      "previewUrl": "https://p.scdn.co/mp3-preview/e0d8c727c8749d965d0f538fca9542fad0cfcedf"
    },
    {
      "id": "4mBmsPcPa1Eu4LDTHq55Ab",
      "title": "Hothon Se Chhu Lo Tum - From \"Prem Geet\"",
      "artist": "Jagjit Singh",
      "img": "https://i.scdn.co/image/ab67616d00004851b5eba194cd2f743be9a0f87b",
      "previewUrl": "https://p.scdn.co/mp3-preview/b17e888a769c6e3f7e83ba08b8b4f59f2ca51dff"
    },
    {
      "id": "7fpWJr5shT90KiCHXKHxch",
      "title": "Phir Le Aya Dil - Reprise",
      "artist": "Pritam, Arijit Singh, Sayeed Quadri",
      "img": "https://i.scdn.co/image/ab67616d00004851352f44aed6f226c6ea28b961",
      "previewUrl": "https://p.scdn.co/mp3-preview/1113ef2b2dda9d13535ed1eff6d65a45b1319a39"
    },
    {
      "id": "05REArTDZQd59A9Y4XC0Aq",
      "title": "Maine Khud Ko",
      "artist": "Mustafa Zahid",
      "img": "https://i.scdn.co/image/ab67616d0000485187b32c2a464cd54ec95d301e",
      "previewUrl": "https://p.scdn.co/mp3-preview/8ccf32d79c76d1839f0bde0e1aa635dd6f74f26d"
    },
    {
      "id": "4CGBTtlrjZj7ydpV52cgB4",
      "title": "Maula Mere Maula",
      "artist": "Roop Kumar Rathod, Sayeed Quadri",
      "img": "https://i.scdn.co/image/ab67616d0000485106b537ea166d7b3f3050241c",
      "previewUrl": "https://p.scdn.co/mp3-preview/e02058d9013a312097020304c6a09528b5022b99"
    },
    {
      "id": "2vfL2OwTXZAsr2RIZF5OZF",
      "title": "Aahatein (unplugged)",
      "artist": "Samyak Prasana",
      "img": "https://i.scdn.co/image/ab67616d00004851c93a24aefd130b3078f55edf",
      "previewUrl": "https://p.scdn.co/mp3-preview/5413cec774f29c01feb986f9458e3448ff0f8905"
    },
    {
      "id": "37QFYtNOmvmXrgesLTRhMq",
      "title": "Iktara - Male Version",
      "artist": "Amit Trivedi, Tochi Raina, Amitabh Bhattacharya, Raman Mahadevan",
      "img": "https://i.scdn.co/image/ab67616d000048510de1e597e2a3c89222b57e01",
      "previewUrl": "https://p.scdn.co/mp3-preview/c679064eb133800f95fdd74624e9c4f0fee1046a"
    },
    {
      "id": "7Csa4PStpuYIfUqNMKQ4V8",
      "title": "Barbaad (From \"Saiyaara\")",
      "artist": "The Rish, Jubin Nautiyal",
      "img": "https://i.scdn.co/image/ab67616d00004851148a06ae24e68c088d8d2954",
      "previewUrl": "https://p.scdn.co/mp3-preview/a31ac401b9b09595128fd28810c84497f66a2ced"
    },
    {
      "id": "3HH3xlISSAhadC8bu0UDdl",
      "title": "Tu Jo Hain",
      "artist": "Ankit Tiwari",
      "img": "https://i.scdn.co/image/ab67616d00004851564497ef5f69672d14bf7950",
      "previewUrl": "https://p.scdn.co/mp3-preview/74c2964938106ee3254c606a179968f404f0b8eb"
    },
    {
      "id": "04J4SELey0LIRh0ckQunWV",
      "title": "Bewajah - Coke Studio Season 8",
      "artist": "Nabeel Shaukat Ali",
      "img": "https://i.scdn.co/image/ab67616d000048514c39eb233a8087c233feeba1",
      "previewUrl": "https://p.scdn.co/mp3-preview/7122026878d847fc07b8051a00f9e06ca3cef511"
    },
    {
      "id": "2RlR63Usi29jZkQXE60l2e",
      "title": "Teri Yaadein",
      "artist": "Parwan Khan, Irfan Chaudhry",
      "img": "https://i.scdn.co/image/ab67616d000048511c3d082ad214b0043dad70b3",
      "previewUrl": ""
    },
    {
      "id": "3anHs4ijBd3Iw0E0fBPwtH",
      "title": "Kashish",
      "artist": "Ashish Bhatia, Omkar Singh, Kashish Ratnani",
      "img": "https://i.scdn.co/image/ab67616d0000485178a554c1a4571acbeb8d4cf0",
      "previewUrl": "https://p.scdn.co/mp3-preview/8a3b521b8d986bf206faabb0f528ac72ef567984"
    },
    {
      "id": "2kdLpMajZ2VoKEAv9nGsUz",
      "title": "Kaahe Mose",
      "artist": "Garvit - Priyansh, Garvit Soni, Priyansh Srivastava",
      "img": "https://i.scdn.co/image/ab67616d000048511f2c1b67a525cb5b6ccbb7fd",
      "previewUrl": "https://p.scdn.co/mp3-preview/0a9e04c2d2e2c1be5352231343752d99ba42f89e"
    },
    {
      "id": "39eveFXanRyyYmFSkdNX0z",
      "title": "Survivors",
      "artist": "Passenger",
      "img": "https://i.scdn.co/image/ab67616d00004851347bc69b7d29edc34789c5a4",
      "previewUrl": "https://p.scdn.co/mp3-preview/f989f60a5717891590d23e968aa2c5e0662c695f"
    }
  ];

  const handlePlayTrack = (trackId: string) => {
    if (playingTrackId === trackId) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setPlayingTrackId(trackId);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (playingTrackId && audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  }, [playingTrackId]);

  useEffect(() => {
    if (activeApp !== 'spotify' && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }, [activeApp, isPlaying]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const [openFolder, setOpenFolder] = useState<string | null>(() => {
    const params = new URLSearchParams(location.search);
    return params.get('folder');
  });

  type AppItem = {
    id: string;
    name: string;
    icon: JSX.Element;
    isFolder?: boolean;
    folderApps?: {
      id: string;
      name: string;
      icon: JSX.Element;
      appId?: string;
      link?: string;
    }[];
  };

  const apps: AppItem[] = [
    { id: 'game2048', name: '2048', icon: <SquircleIcon imgUrl="https://upload.wikimedia.org/wikipedia/commons/1/18/2048_logo.svg" FallbackIcon={Grid} gradient="from-yellow-400 to-orange-500" alt="2048" /> },
    { id: 'hextris', name: 'Hextris', icon: <SquircleIcon imgUrl="https://raw.githubusercontent.com/hextris/hextris/master/favicon.ico" FallbackIcon={Hexagon} gradient="from-slate-700 to-slate-900" alt="Hextris" /> },
    { id: 'dino', name: 'Dino Run', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={Activity} gradient="from-zinc-400 to-zinc-600" alt="Dino" /> },
    { id: 'tetris', name: 'Tetris', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={Gamepad2} gradient="from-violet-500 to-fuchsia-600" alt="Tetris" /> },
    { id: 'subway', name: 'Surfers', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={TrainFront} gradient="from-amber-400 to-yellow-600" alt="Subway Surfers" /> },
    { id: 'flappy', name: 'Flappy', icon: <SquircleIcon imgUrl="https://upload.wikimedia.org/wikipedia/en/0/0a/Flappy_Bird_icon.png" FallbackIcon={Bird} gradient="from-sky-300 to-blue-500" alt="Flappy Bird" /> },
    { id: 'projects_folder', name: 'Projects', isFolder: true, folderApps: [
      { id: 'resumify', name: 'RESUMIFY', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={Globe} gradient="from-emerald-400 to-teal-600" alt="RESUMIFY" />, appId: 'resumify' },
      { id: 'chefcognito', name: 'ChefCognito', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={Activity} gradient="from-blue-500 to-indigo-600" alt="ChefCognito" />, appId: 'chefcognito' },
      { id: 'aivideo', name: 'AI Video', icon: <SquircleIcon imgUrl="invalid-url" FallbackIcon={Hexagon} gradient="from-amber-400 to-orange-600" alt="AI Video Assistant" />, appId: 'aivideo' }
    ], icon: (
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm shadow-sm flex items-center justify-center border border-white/30 group-hover:scale-95 transition-transform duration-200">
        <Folder size={22} className="text-white drop-shadow-md" fill="currentColor" opacity={0.8} />
      </div>
    )},
    { id: 'spotify', name: 'Spotify', icon: <SquircleIcon imgUrl="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" FallbackIcon={Music} gradient="from-[#1ED760] to-[#1DB954]" alt="Spotify" /> },
  ];

  return (
    <div className="h-[100dvh] sm:h-screen bg-zinc-50 dark:bg-black flex flex-col p-0 sm:p-6 md:p-8 font-sans overflow-hidden">
      
      <div className="hidden lg:block">
        <FloatingHeader />
      </div>

      {/* Desktop Header */}
      <div className="hidden sm:flex w-full justify-between items-center z-[60] mb-4 shrink-0 pointer-events-none">
        <Link 
          to="/" 
          className="pointer-events-auto text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 transition-colors bg-black/5 hover:bg-black/10 dark:bg-black/40 dark:hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-black/10 dark:border-white/10"
        >
          <ChevronLeft size={20} />
          <span className="font-medium">Back to Portfolio</span>
        </Link>

        <div className="pointer-events-auto flex bg-black/5 dark:bg-black/40 backdrop-blur-md rounded-full p-1 border border-black/10 dark:border-white/10 relative">
          {(['mobile', 'tablet', 'desktop'] as const).map((type) => {
            const icons = {
              mobile: Smartphone,
              tablet: Tablet,
              desktop: Monitor
            };
            const Icon = icons[type];
            const isActive = deviceType === type;
            
            return (
              <button
                key={type}
                onClick={() => setDeviceType(type)}
                className={`relative p-2 rounded-full transition-colors z-10 ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
                title={`${type.charAt(0).toUpperCase() + type.slice(1)} View`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-device-mode"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-fuchsia-500/40 to-purple-500/30 rounded-full z-0 overflow-hidden border border-white/20 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-[200%]"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2.5, 
                        ease: "linear",
                        repeatDelay: 0.5 
                      }}
                    />
                  </motion.div>
                )}
                <Icon size={20} className="relative z-10 drop-shadow-sm" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Absolute Back Button */}
      <Link 
        to="/" 
        className="sm:hidden absolute top-6 left-6 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 transition-colors z-[60] bg-black/10 dark:bg-black/40 backdrop-blur-xl p-3 rounded-full border border-black/10 dark:border-white/10 shadow-lg"
      >
        <ChevronLeft size={22} className="drop-shadow-sm" />
      </Link>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center min-h-0 relative">
        {/* Background ambient glow */}
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Device Frame */}
      <motion.div 
        layout
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className={`relative w-full h-full sm:max-h-full bg-[#09090b] sm:border-[10px] sm:border-[#27272a] shadow-2xl overflow-hidden sm:shadow-purple-900/20 transition-all duration-500 ${
          deviceType === 'mobile' 
            ? 'sm:h-[812px] sm:w-auto sm:aspect-[375/812] sm:rounded-[3rem]' 
            : deviceType === 'tablet'
              ? 'sm:h-[820px] sm:w-auto sm:aspect-[1180/820] sm:rounded-[2rem]'
              : 'sm:w-full sm:h-auto sm:max-w-[1200px] sm:aspect-[16/9] sm:rounded-[1rem]'
        }`}
      >
        {/* Hardware Buttons */}
        {deviceType !== 'desktop' && (
          <>
            <div className="hidden sm:block absolute -left-[14px] top-32 w-1 h-12 bg-[#3f3f46] rounded-l-md" />
            <div className="hidden sm:block absolute -left-[14px] top-48 w-1 h-12 bg-[#3f3f46] rounded-l-md" />
            <div className="hidden sm:block absolute -right-[14px] top-40 w-1 h-16 bg-[#3f3f46] rounded-r-md" />
          </>
        )}

        {/* Screen Content */}
        <div className="relative w-full h-full bg-[#18181b] overflow-hidden">
          
          <AnimatePresence mode="wait">
            {/* HOME SCREEN */}
            {activeApp === 'home' && (
              <motion.div 
                key="home"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex flex-col bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"
              >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full pt-16 px-6 pb-8">
                  {/* Aesthetic Clock Widget */}
                  <div className="w-full flex flex-col items-center justify-center mb-10 mt-2 sm:mb-12 sm:mt-4 pointer-events-none drop-shadow-lg">
                    <span className="text-[#ffffff] text-5xl sm:text-7xl font-light tracking-tight">
                      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(' AM', '').replace(' PM', '')}
                    </span>
                    <span className="text-[#ffffff]/80 text-[11px] sm:text-sm font-medium tracking-widest uppercase mt-2">
                      {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  {/* Apps Grid */}
                  <div className={`grid gap-x-4 sm:gap-x-6 gap-y-6 sm:gap-y-8 mx-auto mt-auto mb-6 sm:mb-10 w-full px-2 sm:px-0 ${
                    deviceType === 'desktop' 
                      ? 'grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 max-w-4xl' 
                      : 'grid-cols-4 max-w-sm'
                  }`}>
                    {apps.map((app) => (
                      <div 
                        key={app.id} 
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                        onClick={() => {
                          if (app.isFolder) {
                            setOpenFolder(app.id);
                          } else {
                            setActiveApp(app.id as AppType);
                          }
                        }}
                      >
                        {app.icon}
                        <span className="text-[#ffffff] text-[11px] font-medium drop-shadow-md tracking-wide w-full text-center truncate px-1">
                          {app.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Folder Overlay */}
                <AnimatePresence>
                  {openFolder && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-40 bg-black/50 backdrop-blur-xl flex flex-col items-center justify-center p-6"
                      onClick={() => setOpenFolder(null)}
                    >
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="w-full max-w-[280px] bg-white/20 backdrop-blur-md rounded-[32px] p-6 border border-white/20 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="text-[#ffffff] font-medium text-center mb-6 text-sm tracking-wide">
                          {apps.find(a => a.id === openFolder)?.name}
                        </h3>
                        <div className="grid grid-cols-3 gap-x-4 gap-y-6">
                          {apps.find(a => a.id === openFolder)?.folderApps?.map((fApp) => (
                            <div 
                              key={fApp.id} 
                              onClick={() => {
                                if (fApp.appId) {
                                  setActiveApp(fApp.appId as AppType);
                                  setOpenFolder(null);
                                } else if (fApp.link) {
                                  window.open(fApp.link, '_blank');
                                }
                              }}
                              className="flex flex-col items-center gap-1.5 cursor-pointer group"
                            >
                              {fApp.icon}
                              <span className="text-[#ffffff] text-[10px] font-medium drop-shadow-md tracking-wide w-full text-center truncate px-1">
                                {fApp.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}

            {/* ARCADE / GAME SCREENS */}
            {activeApp === 'resumify' && (
              <motion.div 
                key="resumify"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <a 
                  href="https://resumify-pearl.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 px-4 py-2 bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white text-sm font-medium rounded-full z-50 flex items-center gap-2 transition-colors pointer-events-auto"
                >
                  <ExternalLink size={16} />
                  Go to Project Website
                </a>
                <iframe 
                  src="https://resumify-pearl.vercel.app/" 
                  className="w-full h-full border-none pointer-events-auto bg-white"
                  title="RESUMIFY"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}
            {activeApp === 'chefcognito' && (
              <motion.div 
                key="chefcognito"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <a 
                  href="https://chefcognito-anshuman.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 px-4 py-2 bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white text-sm font-medium rounded-full z-50 flex items-center gap-2 transition-colors pointer-events-auto"
                >
                  <ExternalLink size={16} />
                  Go to Project Website
                </a>
                <iframe 
                  src="https://chefcognito-anshuman.vercel.app/" 
                  className="w-full h-full border-none pointer-events-auto bg-white"
                  title="ChefCognito"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}
            {activeApp === 'aivideo' && (
              <motion.div 
                key="aivideo"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <a 
                  href="https://ai-video-assistant-p9xacbk3v5kgskn623xgso.streamlit.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 px-4 py-2 bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white text-sm font-medium rounded-full z-50 flex items-center gap-2 transition-colors pointer-events-auto"
                >
                  <ExternalLink size={16} />
                  Go to Project Website
                </a>
                <iframe 
                  src="https://ai-video-assistant-p9xacbk3v5kgskn623xgso.streamlit.app/" 
                  className="w-full h-full border-none pointer-events-auto bg-white"
                  title="AI Video Assistant"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}
            {activeApp === 'game2048' && (
              <motion.div 
                key="game2048"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://cyberzhg.github.io/2048/" 
                  className="w-full h-full border-none pointer-events-auto bg-white"
                  title="2048"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {activeApp === 'hextris' && (
              <motion.div 
                key="hextris"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://hextris.github.io/hextris/" 
                  className="w-full h-full border-none pointer-events-auto bg-black"
                  title="Hextris"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {activeApp === 'dino' && (
              <motion.div 
                key="dino"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://wayou.github.io/t-rex-runner/" 
                  className="w-full h-full border-none pointer-events-auto bg-white"
                  title="T-Rex Runner"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {activeApp === 'tetris' && (
              <motion.div 
                key="tetris"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://chvin.github.io/react-tetris/" 
                  className="w-full h-full border-none pointer-events-auto bg-zinc-900"
                  title="Tetris"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {activeApp === 'subway' && (
              <motion.div 
                key="subway"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://subwaysurfers76.github.io/" 
                  className="w-full h-full border-none pointer-events-auto"
                  title="Subway Surfers"
                  allow="gamepad; autoplay; clipboard-read; clipboard-write"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}

            {activeApp === 'flappy' && (
              <motion.div 
                key="flappy"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-black"
              >
                <iframe 
                  src="https://flappybird.io/" 
                  className="w-full h-full border-none pointer-events-auto"
                  title="Flappy Bird"
                  allow="gamepad; autoplay; clipboard-read; clipboard-write"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            )}



            {activeApp === 'spotify' && (
              <motion.div 
                key="spotify"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-12 bg-[#121212] flex flex-col overflow-y-auto"
              >
                {/* Hidden Audio Player */}
                <audio
                  ref={audioRef}
                  src={SPOTIFY_TRACKS.find(t => t.id === playingTrackId)?.previewUrl || ''}
                  onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
                  onLoadedMetadata={() => setDuration(audioRef.current?.duration || 30)}
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Header */}
                <div className="flex items-center gap-4 p-6 pb-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-xl">
                    <img src="https://mosaic.scdn.co/300/ab67616d00001e0253f6fa0d2589c6a7174f4b81ab67616d00001e0258ecb3e5ec3bbef70ee09e43ab67616d00001e026404721c1943d5069f0805f3ab67616d00001e02e39388ba8eadf58476135087" alt="Playlist" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Playlist</p>
                    <h2 className="text-white text-2xl font-bold">space night.</h2>
                    <p className="text-zinc-400 text-sm mt-1">Anshumann · 18 songs</p>
                  </div>
                </div>

                {/* Play on Spotify / Global Controls */}
                <div className="px-6 pb-4 flex items-center justify-between">
                  <button
                    onClick={() => handlePlayTrack(playingTrackId || SPOTIFY_TRACKS[0].id)}
                    className="w-12 h-12 rounded-full bg-[#1DB954] hover:bg-[#1ed760] hover:scale-105 flex items-center justify-center transition-all shadow-xl shadow-emerald-900/20"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-black ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>
                  <a
                    href="https://open.spotify.com/playlist/3mCOEn9od5jc3suDHqhQB4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white text-xs font-bold transition-colors"
                  >
                    Open on Spotify
                    <ExternalLink size={14} />
                  </a>
                </div>

                {/* Track List */}
                <div className="px-4 pb-24 space-y-1">
                  {SPOTIFY_TRACKS.map((track, i) => {
                    const isTrackPlaying = playingTrackId === track.id;
                    return (
                      <button
                        key={track.id}
                        onClick={() => handlePlayTrack(track.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                          isTrackPlaying ? 'bg-white/10' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="w-4 flex justify-center flex-shrink-0">
                          {isTrackPlaying && isPlaying ? (
                            <div className="flex items-end gap-[2px] h-3">
                              {[1, 2, 1.5, 2.5].map((h, idx) => (
                                <span key={idx} className="w-[2px] bg-[#1DB954] rounded-full animate-pulse" style={{ height: `${h * 4}px`, animationDuration: `${0.5 + idx * 0.1}s` }} />
                              ))}
                            </div>
                          ) : (
                            <span className={`text-xs ${isTrackPlaying ? 'text-[#1DB954]' : 'text-zinc-500 group-hover:hidden'}`}>{i + 1}</span>
                          )}
                          {!isTrackPlaying && <span className="text-white text-xs hidden group-hover:block">▶</span>}
                        </div>
                        
                        <img src={track.img} alt={track.title} className="w-10 h-10 rounded object-cover flex-shrink-0" />
                        
                        <div className="flex-1 min-w-0 text-left">
                          <p className={`text-sm font-medium truncate ${isTrackPlaying ? 'text-[#1DB954]' : 'text-white'}`}>{track.title}</p>
                          <p className="text-zinc-400 text-xs truncate">{track.artist}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Sticky Mini Player at Bottom */}
                {playingTrackId && (
                  <div className="sticky bottom-0 left-0 right-0 bg-[#181818] border-t border-zinc-800 p-3 pb-4 shadow-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <img 
                        src={SPOTIFY_TRACKS.find(t => t.id === playingTrackId)?.img} 
                        alt="Now Playing" 
                        className="w-10 h-10 rounded shadow object-cover" 
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-bold truncate">{SPOTIFY_TRACKS.find(t => t.id === playingTrackId)?.title}</p>
                        <p className="text-zinc-400 text-[10px] truncate">{SPOTIFY_TRACKS.find(t => t.id === playingTrackId)?.artist}</p>
                      </div>
                      <button
                        onClick={() => handlePlayTrack(playingTrackId)}
                        className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all flex-shrink-0"
                      >
                        {isPlaying ? (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                        ) : (
                          <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        )}
                      </button>
                    </div>
                    {/* Progress Line */}
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-zinc-400 text-[9px] tabular-nums w-6 text-right">
                        {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
                      </span>
                      <div 
                        className="flex-1 h-1.5 bg-zinc-800 rounded-full cursor-pointer group/bar relative"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const pct = (e.clientX - rect.left) / rect.width;
                          const newTime = pct * duration;
                          if (audioRef.current) audioRef.current.currentTime = newTime;
                          setCurrentTime(newTime);
                        }}
                      >
                        <div 
                          className="absolute top-0 left-0 h-full bg-white group-hover/bar:bg-[#1DB954] rounded-full transition-colors"
                          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                        />
                        <div 
                          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow opacity-0 group-hover/bar:opacity-100 transition-opacity"
                          style={{ left: `calc(${duration ? (currentTime / duration) * 100 : 0}% - 5px)` }}
                        />
                      </div>
                      <span className="text-zinc-400 text-[9px] tabular-nums w-6">
                        0:{String(Math.floor(duration)).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                )}

              </motion.div>
            )}


          </AnimatePresence>

        </div>

        {/* Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-12 bg-black/90 backdrop-blur-xl flex items-center justify-around z-50 border-t border-white/10 pb-2 sm:pb-0 px-2 sm:px-0">
          <button 
            onClick={() => setActiveApp('home')}
            className="w-14 h-14 sm:w-12 sm:h-12 flex items-center justify-center text-[#ffffff]/70 hover:text-[#ffffff] hover:bg-white/10 rounded-full transition-all active:scale-90"
            aria-label="Back"
          >
            <ChevronLeft size={24} className="sm:w-5 sm:h-5" />
          </button>
          
          <button 
            onClick={() => setActiveApp('home')}
            className="w-14 h-14 sm:w-12 sm:h-12 flex items-center justify-center text-[#ffffff]/70 hover:text-[#ffffff] hover:bg-white/10 rounded-full transition-all active:scale-90"
            aria-label="Home"
          >
            <Circle size={18} className="fill-transparent stroke-2 sm:w-4 sm:h-4" />
          </button>

          <Link 
            to="/"
            className="w-14 h-14 sm:w-12 sm:h-12 flex items-center justify-center text-[#ffffff]/70 hover:text-[#ffffff] hover:bg-white/10 rounded-full transition-all active:scale-90"
            aria-label="Portfolio"
          >
            <Square size={16} className="fill-transparent stroke-2 sm:w-3.5 sm:h-3.5" />
          </Link>
        </div>
      </motion.div>
      
      </div>
    </div>
  );
};

export default PlayGames;
