import React, { useState } from 'react';
import { TraumaTrack } from '../types';
import { Sun, Sparkles, Pause, Play, Shield, Feather, Heart, Flame } from 'lucide-react';

interface HeroBannerProps {
  activeTrack: TraumaTrack;
}

interface TrackVisualConfig {
  photoUrl: string;
  badgeLabel: string;
  badgeIcon: React.ReactNode;
  gradientBg: string;
  accentBarGradient: string;
  svgArtwork: React.ReactNode;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ activeTrack }) => {
  const [isPaused, setIsPaused] = useState(false);

  const visualConfigs: Record<TraumaTrack, TrackVisualConfig> = {
    ptsd: {
      photoUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
      badgeLabel: "PTSD Grounding • Summit of Present Peace",
      badgeIcon: <Shield className="w-3 h-3 text-amber-400" />,
      gradientBg: "from-amber-700 via-orange-950 to-stone-950",
      accentBarGradient: "from-amber-500 via-teal-500 to-amber-400",
      svgArtwork: (
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 450"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="sunGlowPtsd" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#dc2626" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="warmLightPtsd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#b45309" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#1c1917" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <circle cx="500" cy="210" r="160" fill="url(#sunGlowPtsd)" />
          <circle cx="500" cy="210" r="42" fill="#fffbeb" opacity="0.9" filter="drop-shadow(0 0 25px #f59e0b)" />
          <path d="M-50 450 L120 280 L290 340 L450 250 L620 330 L790 260 L960 320 L1050 450 Z" fill="#78350f" opacity="0.45" />
          <path d="M-50 450 L180 320 L350 380 L500 290 L680 360 L860 300 L1050 450 Z" fill="#451a03" opacity="0.65" />
          <path d="M280 450 L460 310 L500 295 L540 310 L720 450 Z" fill="#1c1917" />
          {/* Standing on summit with arms raised to sunset */}
          <g transform="translate(500, 295) scale(0.68)" fill="#1c1917">
            <circle cx="0" cy="-68" r="9.5" />
            <path d="M-6 -57 C-10 -40 -11 -20 -10 0 L10 0 C11 -20 10 -40 6 -57 Z" />
            <path d="M-6 -52 Q-26 -70 -38 -88 Q-41 -86 -37 -82 Q-23 -62 -4 -46 Z" />
            <path d="M6 -52 Q26 -70 38 -88 Q41 -86 37 -82 Q23 -62 4 -46 Z" />
            <path d="M-9 0 L-13 32 L-6 33 L-2 0 Z" />
            <path d="M9 0 L13 32 L6 33 L2 0 Z" />
          </g>
          <rect width="1000" height="450" fill="url(#warmLightPtsd)" />
        </svg>
      )
    },
    stockholm: {
      photoUrl: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1600&q=80",
      badgeLabel: "Stockholm Recovery • Reclaiming Sovereign Freedom",
      badgeIcon: <Feather className="w-3 h-3 text-rose-300" />,
      gradientBg: "from-rose-800 via-stone-900 to-amber-950",
      accentBarGradient: "from-rose-500 via-amber-400 to-rose-600",
      svgArtwork: (
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 450"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="sunGlowStk" cx="50%" cy="35%" r="55%">
              <stop offset="0%" stopColor="#fff1f2" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#fb7185" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#be123c" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="warmLightStk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#881337" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1c1917" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <circle cx="500" cy="180" r="170" fill="url(#sunGlowStk)" />
          <circle cx="500" cy="180" r="45" fill="#fff1f2" opacity="0.9" filter="drop-shadow(0 0 25px #fb7185)" />
          {/* Rolling sunlit meadow hills breaking away from dark woods */}
          <path d="M-50 450 Q200 280 480 340 T1050 310 L1050 450 Z" fill="#831843" opacity="0.4" />
          <path d="M-50 450 Q250 310 500 300 T1050 350 L1050 450 Z" fill="#4c0519" opacity="0.65" />
          <path d="M300 450 Q500 310 700 450 Z" fill="#1c1917" />
          {/* Birds soaring in free dawn sky */}
          <path d="M380 140 Q395 130 410 140 Q425 130 440 140 Q425 136 410 142 Q395 136 380 140 Z" fill="#ffe4e6" opacity="0.8" />
          <path d="M560 110 Q572 102 585 110 Q598 102 610 110 Q598 107 585 112 Q572 107 560 110 Z" fill="#ffe4e6" opacity="0.75" />
          <path d="M470 90 Q480 84 490 90 Q500 84 510 90 Q500 87 490 91 Q480 87 470 90 Z" fill="#fff" opacity="0.85" />
          {/* Unisex figure stepping into open field with arms wide open */}
          <g transform="translate(500, 310) scale(0.68)" fill="#1c1917">
            <circle cx="0" cy="-68" r="9.5" />
            <path d="M-6 -57 C-10 -40 -11 -20 -10 0 L10 0 C11 -20 10 -40 6 -57 Z" />
            <path d="M-6 -52 Q-28 -60 -42 -72 Q-44 -70 -40 -67 Q-27 -54 -4 -46 Z" />
            <path d="M6 -52 Q28 -60 42 -72 Q44 -70 40 -67 Q27 -54 4 -46 Z" />
            <path d="M-8 0 L-14 32 L-6 33 L-2 0 Z" />
            <path d="M8 0 L14 32 L6 33 L2 0 Z" />
          </g>
          <rect width="1000" height="450" fill="url(#warmLightStk)" />
        </svg>
      )
    },
    sexual_abuse: {
      photoUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80",
      badgeLabel: "Sexual Trauma Healing • Sacred Bodily Sanctuary",
      badgeIcon: <Heart className="w-3 h-3 text-pink-300" />,
      gradientBg: "from-purple-900 via-indigo-950 to-slate-950",
      accentBarGradient: "from-purple-500 via-rose-400 to-indigo-500",
      svgArtwork: (
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 450"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="sunGlowSa" cx="50%" cy="38%" r="50%">
              <stop offset="0%" stopColor="#fdf4ff" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#e879f9" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#9333ea" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="warmLightSa" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#6b21a8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <circle cx="500" cy="190" r="165" fill="url(#sunGlowSa)" />
          <circle cx="500" cy="190" r="42" fill="#faf5ff" opacity="0.9" filter="drop-shadow(0 0 25px #c084fc)" />
          {/* Calming coastal headland & tranquil waters */}
          <path d="M-50 450 L1050 450 L1050 360 Q700 370 500 360 Q250 350 -50 360 Z" fill="#3b0764" opacity="0.4" />
          <path d="M-50 450 L1050 450 L1050 380 Q750 390 500 380 Q200 370 -50 380 Z" fill="#1e1b4b" opacity="0.65" />
          <path d="M350 450 Q500 325 650 450 Z" fill="#0f172a" />
          {/* Figure standing in peace by tranquil water, hand over heart and other arm open */}
          <g transform="translate(500, 325) scale(0.68)" fill="#0f172a">
            <circle cx="0" cy="-68" r="9.5" />
            <path d="M-6 -57 C-10 -40 -11 -20 -10 0 L10 0 C11 -20 10 -40 6 -57 Z" />
            {/* Hand gently placed over heart center */}
            <path d="M-6 -52 Q-14 -42 -4 -38 L-2 -32 L-8 -46 Z" />
            {/* Other arm open wide toward morning horizon */}
            <path d="M6 -52 Q26 -65 38 -78 Q41 -76 37 -72 Q23 -58 4 -46 Z" />
            <path d="M-8 0 L-12 32 L-5 33 L-2 0 Z" />
            <path d="M8 0 L12 32 L5 33 L2 0 Z" />
          </g>
          <rect width="1000" height="450" fill="url(#warmLightSa)" />
        </svg>
      )
    },
    substance_abuse: {
      photoUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80",
      badgeLabel: "Sobriety Haven • Clean Breath & Unbroken Clarity",
      badgeIcon: <Flame className="w-3 h-3 text-amber-400" />,
      gradientBg: "from-amber-900 via-teal-950 to-stone-950",
      accentBarGradient: "from-emerald-500 via-amber-400 to-teal-500",
      svgArtwork: (
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 450"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="sunGlowSub" cx="50%" cy="38%" r="52%">
              <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#047857" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="warmLightSub" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#065f46" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1c1917" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <circle cx="500" cy="195" r="160" fill="url(#sunGlowSub)" />
          <circle cx="500" cy="195" r="42" fill="#fffbeb" opacity="0.9" filter="drop-shadow(0 0 25px #fbbf24)" />
          {/* Majestic pine forest ridge line with sunbeams */}
          <path d="M-50 450 L100 320 L160 350 L250 290 L340 330 L430 270 L550 330 L670 280 L780 340 L880 290 L1050 450 Z" fill="#064e3b" opacity="0.5" />
          <path d="M-50 450 L140 350 L280 330 L450 310 L600 340 L800 320 L1050 450 Z" fill="#022c22" opacity="0.75" />
          <path d="M280 450 L460 310 L500 295 L540 310 L720 450 Z" fill="#1c1917" />
          {/* Survivor on pine overlook taking deep, clean breath with arms raised */}
          <g transform="translate(500, 295) scale(0.68)" fill="#1c1917">
            <circle cx="0" cy="-68" r="9.5" />
            <path d="M-6 -57 C-10 -40 -11 -20 -10 0 L10 0 C11 -20 10 -40 6 -57 Z" />
            <path d="M-6 -52 Q-26 -70 -38 -88 Q-41 -86 -37 -82 Q-23 -62 -4 -46 Z" />
            <path d="M6 -52 Q26 -70 38 -88 Q41 -86 37 -82 Q23 -62 4 -46 Z" />
            <path d="M-9 0 L-13 32 L-6 33 L-2 0 Z" />
            <path d="M9 0 L13 32 L6 33 L2 0 Z" />
          </g>
          <rect width="1000" height="450" fill="url(#warmLightSub)" />
        </svg>
      )
    }
  };

  const currentConfig = visualConfigs[activeTrack] || visualConfigs.ptsd;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl shadow-xl border border-amber-200/50 my-2 transition-all duration-700">
      {/* Container with fixed aspect ratio / height */}
      <div className={`relative h-64 sm:h-72 md:h-80 w-full bg-gradient-to-br ${currentConfig.gradientBg}`}>
        {/* Dynamic Photograph Layer with smooth crossfade */}
        <img
          key={activeTrack}
          src={currentConfig.photoUrl}
          alt={`Warm unisex survivor imagery for ${activeTrack} recovery`}
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-opacity duration-700 animate-fadeIn"
        />

        {/* Dynamic Artistic Vector Silhouette Layer tailored to selected recovery type */}
        <div key={`vector-${activeTrack}`} className="absolute inset-0 pointer-events-none transition-opacity duration-700 animate-fadeIn">
          {currentConfig.svgArtwork}
        </div>

        {/* Ambient Warm Vignette & Horizon Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-black/30 to-black/20 pointer-events-none" />

        {/* Dynamic Category-Specific Badge */}
        <div className="absolute top-3 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium shadow-sm transition-all duration-500">
          {currentConfig.badgeIcon}
          <span>{currentConfig.badgeLabel}</span>
        </div>

        {/* Motion pause/play toggle */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="absolute top-3 right-4 z-20 p-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-colors text-[10px]"
          title={isPaused ? "Resume scroll" : "Pause scroll"}
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>

        {/* EXACT SPECIFICATION: Scrolling Right-to-Left Typography */}
        {/* Line 1: Haven Trauma Recovery */}
        {/* Line 2 (Waiting ~1.5s, same font, 30% smaller): "discover the new you." */}
        <div className="absolute inset-x-0 bottom-4 sm:bottom-6 z-20 flex flex-col justify-end overflow-hidden px-2 pointer-events-none">
          {/* Top Scrolling Line: Haven Trauma Recovery */}
          <div className="w-full overflow-hidden whitespace-nowrap py-1">
            <div
              className={`font-serif-title font-bold text-2xl sm:text-3xl md:text-4xl text-amber-50 tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] ${
                isPaused ? 'translate-x-0 text-center' : 'animate-scroll-rtl-primary'
              }`}
              style={{
                textShadow: '0 2px 14px rgba(0,0,0,0.9), 0 0 20px rgba(245,158,11,0.4)',
              }}
            >
              Haven Trauma Recovery
            </div>
          </div>

          {/* Bottom Scrolling Line: 1.5s delayed, same font, 30% smaller: "discover the new you." */}
          <div className="w-full overflow-hidden whitespace-nowrap py-0.5 mt-0.5">
            <div
              className={`font-serif-title font-medium italic text-base sm:text-xl md:text-2xl text-amber-200/95 tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] ${
                isPaused ? 'translate-x-0 text-center' : 'animate-scroll-rtl-secondary'
              }`}
              style={{
                textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 0 16px rgba(251,191,36,0.3)',
              }}
            >
              "discover the new you."
            </div>
          </div>
        </div>

        {/* Dynamic Horizon Sunrise Accent Bar */}
        <div className={`absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r ${currentConfig.accentBarGradient} opacity-90 transition-all duration-700`} />
      </div>
    </div>
  );
};
