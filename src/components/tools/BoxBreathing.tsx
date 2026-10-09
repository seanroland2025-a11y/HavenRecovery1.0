import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw, Heart, CheckCircle2 } from 'lucide-react';

export const BoxBreathing: React.FC<{ onClose: () => void; onComplete: () => void }> = ({ onClose, onComplete }) => {
  const [isActive, setIsActive] = useState(true);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  const phaseDetails = {
    Inhale: { label: 'Inhale through nose', color: 'text-emerald-700', bg: 'from-emerald-400 to-teal-500', scale: 1.35 },
    Hold: { label: 'Gently hold breath', color: 'text-amber-700', bg: 'from-amber-400 to-yellow-500', scale: 1.35 },
    Exhale: { label: 'Slow exhale through mouth', color: 'text-blue-700', bg: 'from-blue-400 to-indigo-500', scale: 0.9 },
    Pause: { label: 'Rest in stillness', color: 'text-purple-700', bg: 'from-purple-400 to-pink-500', scale: 0.9 }
  };

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          // Switch phase
          if (phase === 'Inhale') {
            setPhase('Hold');
            return 4;
          } else if (phase === 'Hold') {
            setPhase('Exhale');
            return 4;
          } else if (phase === 'Exhale') {
            setPhase('Pause');
            return 4;
          } else {
            setPhase('Inhale');
            setCyclesCompleted((c) => {
              const next = c + 1;
              if (next >= 4) {
                onComplete();
              }
              return next;
            });
            return 4;
          }
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, onComplete]);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-stone-200 text-center animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wind className="w-5 h-5 text-teal-600" />
          <span className="text-xs font-semibold tracking-wider uppercase text-teal-800">Somatic Box Breathing</span>
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-700 text-sm font-medium p-1 rounded-lg"
        >
          ✕ Close
        </button>
      </div>

      <p className="text-xs text-stone-500 mb-6">
        Calms the amygdala & vagus nerve. Follow the gentle expanding lotus.
      </p>

      {/* Visual Breathing Lotus Circle */}
      <div className="relative w-64 h-64 mx-auto my-4 flex items-center justify-center">
        {/* Outer aura */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-tr ${phaseDetails[phase].bg} opacity-20 filter blur-xl transition-all duration-1000`}
          style={{ transform: `scale(${phaseDetails[phase].scale})` }}
        />

        {/* Dynamic expanding circle */}
        <div
          className={`w-44 h-44 rounded-full bg-gradient-to-tr ${phaseDetails[phase].bg} shadow-lg flex flex-col items-center justify-center text-white transition-all duration-1000 ease-in-out`}
          style={{ transform: `scale(${phaseDetails[phase].scale})` }}
        >
          <span className="text-3xl font-bold font-serif-title tracking-widest">{secondsLeft}</span>
          <span className="text-xs uppercase tracking-wider font-semibold opacity-90 mt-1">{phase}</span>
        </div>
      </div>

      <div className="my-4">
        <h3 className={`text-lg font-serif-title font-semibold ${phaseDetails[phase].color}`}>
          {phaseDetails[phase].label}
        </h3>
        <p className="text-xs text-stone-500 mt-1">
          {cyclesCompleted} of 4 cycles completed
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => setIsActive(!isActive)}
          className="flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-sm font-medium shadow-sm transition-colors"
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isActive ? 'Pause' : 'Resume'}</span>
        </button>
        <button
          onClick={() => {
            setPhase('Inhale');
            setSecondsLeft(4);
            setCyclesCompleted(0);
            setIsActive(true);
          }}
          className="p-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {cyclesCompleted >= 4 && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-2 text-emerald-800 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Wonderful work. Your nervous system is settling.</span>
        </div>
      )}
    </div>
  );
};
