import React, { useState, useEffect } from 'react';
import { ambientMusic, SOUNDSCAPES, SoundscapeType } from '../services/ambientMusic';
import { Volume2, VolumeX, Play, Pause, Music, Sliders, ChevronDown } from 'lucide-react';

export const AmbientMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SoundscapeType>('sanctuary');
  const [volume, setVolume] = useState<number>(0.35);
  const [showDrawer, setShowDrawer] = useState(false);

  const activeSoundscape = SOUNDSCAPES.find(s => s.id === currentTrack) || SOUNDSCAPES[0];

  const handleTogglePlay = () => {
    if (isPlaying) {
      ambientMusic.pause();
      setIsPlaying(false);
    } else {
      ambientMusic.play(currentTrack);
      setIsPlaying(true);
    }
  };

  const handleSelectTrack = (track: SoundscapeType) => {
    setCurrentTrack(track);
    if (isPlaying) {
      ambientMusic.play(track);
    }
    setShowDrawer(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    ambientMusic.setVolume(val);
  };

  return (
    <div className="relative">
      {/* Discreet Player Pill */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/90 border border-stone-200/90 shadow-2xs backdrop-blur-sm">
        <button
          onClick={handleTogglePlay}
          className={`p-1.5 rounded-xl transition-all flex items-center justify-center ${
            isPlaying
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
          title={isPlaying ? 'Pause soothing soundscape' : 'Play soothing background music'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 text-emerald-800" />
          )}
        </button>

        {/* Track Title and Drawer Opener */}
        <button
          onClick={() => setShowDrawer(!showDrawer)}
          className="flex items-center gap-1 px-2 py-1 rounded-xl hover:bg-stone-100 transition-colors text-left"
          title="Change soothing soundscape"
        >
          <span className="text-xs">{activeSoundscape.icon}</span>
          <span className="text-[11px] font-semibold text-stone-700 max-w-[90px] sm:max-w-[130px] truncate">
            {activeSoundscape.title.split('(')[0]}
          </span>
          {isPlaying && (
            <span className="flex gap-0.5 items-end h-3 ml-0.5">
              <span className="w-0.5 h-2 bg-emerald-600 rounded-full animate-bounce" />
              <span className="w-0.5 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-0.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]" />
            </span>
          )}
          <ChevronDown className="w-3 h-3 text-stone-400" />
        </button>
      </div>

      {/* Dropdown Drawer to pick soundscapes & volume */}
      {showDrawer && (
        <div className="absolute top-full right-0 mt-2 z-50 w-72 bg-white rounded-3xl p-4 shadow-xl border border-stone-200 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
              <Music className="w-3.5 h-3.5 text-emerald-700" />
              <span>Soothing Sanctuary Soundscapes</span>
            </div>
            <button
              onClick={() => setShowDrawer(false)}
              className="text-stone-400 hover:text-stone-700 text-xs"
            >
              ✕
            </button>
          </div>

          <p className="text-[11px] text-stone-500 mb-3 leading-relaxed">
            Gentle, continuous music to regulate your nervous system as you navigate Haven.
          </p>

          <div className="space-y-1.5 mb-4">
            {SOUNDSCAPES.map((sc) => {
              const isCurrent = sc.id === currentTrack;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleSelectTrack(sc.id)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                    isCurrent
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-semibold shadow-2xs'
                      : 'bg-stone-50 hover:bg-stone-100 border-stone-200/80 text-stone-700'
                  }`}
                >
                  <span className="text-lg">{sc.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs truncate">{sc.title}</span>
                      {isCurrent && isPlaying && (
                        <span className="text-[9px] bg-emerald-200/80 text-emerald-900 px-1.5 py-0.5 rounded font-bold">
                          Playing
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-stone-500 font-normal truncate mt-0.5">
                      {sc.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Volume Control */}
          <div className="pt-2 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-600">
            <Volume2 className="w-3.5 h-3.5 text-stone-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-emerald-700 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] font-mono text-stone-400 w-7 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
