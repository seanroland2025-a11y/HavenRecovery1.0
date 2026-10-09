import React from 'react';
import { TraumaTrack } from '../types';
import { AmbientMusicPlayer } from './AmbientMusicPlayer';
import { ShieldAlert, HeartHandshake, Sparkles, Feather, MessageSquare, Lock, ArrowRight, Bot, Smartphone, Rocket } from 'lucide-react';

interface HeaderProps {
  activeTrack: TraumaTrack;
  onSelectTrack: (track: TraumaTrack) => void;
  onTriggerQuickExit: () => void;
  onOpenCrisis: () => void;
  isEnrolledInActiveTrack: boolean;
  onOpenGroupChat: (track: TraumaTrack) => void;
  onOpenChatbot: () => void;
  onOpenPWAInstall?: () => void;
  onOpenLaunchGuide?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTrack,
  onSelectTrack,
  onTriggerQuickExit,
  onOpenCrisis,
  isEnrolledInActiveTrack,
  onOpenGroupChat,
  onOpenChatbot,
  onOpenPWAInstall,
  onOpenLaunchGuide,
}) => {
  const tracks: { id: TraumaTrack; label: string; icon: string; shortName: string; onlineCount: number }[] = [
    { id: 'ptsd', label: 'PTSD Recovery', icon: '🛡️', shortName: 'PTSD Grounding', onlineCount: 47 },
    { id: 'stockholm', label: 'Stockholm & Coercion', icon: '🕊️', shortName: 'Stockholm Recovery', onlineCount: 38 },
    { id: 'sexual_abuse', label: 'Sexual Abuse Healing', icon: '🌸', shortName: 'Sexual Abuse Sanctuary', onlineCount: 52 },
    { id: 'substance_abuse', label: 'Substance Sobriety', icon: '🌿', shortName: 'Substance Sobriety', onlineCount: 41 }
  ];

  const currentTrackInfo = tracks.find(t => t.id === activeTrack) || tracks[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 py-2.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* App Title & Brand and Mobile Quick Exit */}
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-600 flex items-center justify-center text-white shadow-sm shrink-0">
                <Feather className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-serif-title font-bold text-lg md:text-xl text-stone-900 tracking-tight leading-none">
                  Haven
                </h1>
                <p className="text-[10px] text-stone-500 font-medium">
                  Trauma Abuse Survivor Sanctuary
                </p>
              </div>
            </div>

            {/* Mobile Actions: Install, Launch Guide, Quick Exit */}
            <div className="flex items-center gap-1.5 lg:hidden">
              {onOpenPWAInstall && (
                <button
                  onClick={onOpenPWAInstall}
                  className="p-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                  title="Install Haven to Home Screen"
                  aria-label="Install App"
                >
                  <Smartphone className="w-4 h-4 text-emerald-700" />
                </button>
              )}
              {onOpenLaunchGuide && (
                <button
                  onClick={onOpenLaunchGuide}
                  className="p-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100"
                  title="Production Launch & Domain Setup"
                  aria-label="Launch Suite"
                >
                  <Rocket className="w-4 h-4 text-amber-700" />
                </button>
              )}
              <button
                onClick={onTriggerQuickExit}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold tracking-wide shadow-sm border border-stone-800"
                title="Immediately disguise screen into an innocent calculator"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>QUICK EXIT</span>
              </button>
            </div>
          </div>

          {/* Interactive Top Features with Attention Prompts & Emergency Actions */}
          <div className="flex items-end justify-between sm:justify-end gap-2.5 sm:gap-4 flex-wrap">
            {/* Music Feature Column with Attention Text Above Music Icon */}
            <div className="flex flex-col items-center sm:items-end">
              <p className="text-[11px] sm:text-xs font-semibold text-emerald-700 animate-slow-flash text-center sm:text-right max-w-[210px] sm:max-w-[260px] leading-snug mb-1 select-none">
                play soothing music of your choice, while you complete your recovery goals.
              </p>
              <AmbientMusicPlayer />
            </div>

            {/* Chatbot Feature Column with Attention Text Above Chatbot Button */}
            <div className="flex flex-col items-center sm:items-end">
              <p className="text-[11px] sm:text-xs font-semibold text-emerald-700 animate-slow-flash text-center sm:text-right max-w-[150px] sm:max-w-[190px] leading-snug mb-1 select-none">
                Got a question? Ask your chat companion.
              </p>
              <button
                onClick={onOpenChatbot}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-300 transition-colors shadow-2xs h-[34px]"
                title="Open Haven AI Companion for emotional support & app navigation"
              >
                <Bot className="w-3.5 h-3.5 text-emerald-700" />
                <span>Companion</span>
              </button>
            </div>

            {/* Crisis & Quick Exit (Desktop) */}
            <div className="hidden lg:flex items-center gap-1.5 pb-0.5">
              {onOpenPWAInstall && (
                <button
                  onClick={onOpenPWAInstall}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-stone-200 transition-colors h-[34px]"
                  title="Install Haven PWA to Home Screen"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Install App</span>
                </button>
              )}

              {onOpenLaunchGuide && (
                <button
                  onClick={onOpenLaunchGuide}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50/80 hover:bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-200 transition-colors h-[34px]"
                  title="Custom Domain & Production Launch Guide"
                >
                  <Rocket className="w-3.5 h-3.5 text-amber-600" />
                  <span>Launch Suite</span>
                </button>
              )}

              <button
                onClick={onOpenCrisis}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-semibold border border-rose-200 transition-colors h-[34px]"
                title="Crisis Helplines"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />
                <span>Crisis Lifelines</span>
              </button>

              <button
                onClick={onTriggerQuickExit}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold tracking-wide shadow-sm transition-all hover:scale-102 border border-stone-800 h-[34px]"
                title="Immediately disguise screen into an innocent calculator"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>QUICK EXIT</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trauma Track Selector Bar */}
      <div className="border-t border-stone-100 bg-stone-50/80 py-2 px-4 overflow-x-auto">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider whitespace-nowrap mr-1">
            Recovery Track:
          </span>
          <div className="flex gap-1.5 flex-nowrap">
            {tracks.map((t) => (
              <button
                key={t.id}
                onClick={() => onSelectTrack(t.id)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTrack === t.id
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-white text-stone-600 hover:bg-stone-200/70 border border-stone-200/80'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DEDICATED QUICK LINK FOR THE SELECTED SECTION'S CHAT GROUP */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-stone-50 border-t border-emerald-100/90 py-1.5 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="p-1 rounded-md bg-white border border-emerald-200 shadow-2xs">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            </span>
            <span className="text-stone-600 font-medium truncate">
              {currentTrackInfo.label} Program Chat:
            </span>
          </div>

          {isEnrolledInActiveTrack ? (
            <button
              onClick={() => onOpenGroupChat(activeTrack)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs transition-transform active:scale-98 whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span>Enter {currentTrackInfo.shortName} Chat ({currentTrackInfo.onlineCount} Online)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <button
              onClick={() => onOpenGroupChat(activeTrack)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-semibold text-xs transition-colors whitespace-nowrap"
              title="Restricted to participants of this recovery program"
            >
              <Lock className="w-3 h-3 text-amber-700" />
              <span>Restricted Chat (Enrolled Participants Only)</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

