import React, { useEffect, useRef, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Star, Flame, Heart, X, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { StreakIconType } from '../types';

interface GentleStreakParticleEffectProps {
  isActive: boolean;
  currentStreak: number;
  iconPreference?: StreakIconType;
  triggerSignal?: number; // increments to trigger replay
  onDismiss?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  color: string;
  glowColor: string;
  shape: 'star' | 'orb' | 'sparkle';
  phase: number;
  twinkleSpeed: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotSpeed: number;
}

export const GentleStreakParticleEffect: React.FC<GentleStreakParticleEffectProps> = ({
  isActive,
  currentStreak,
  iconPreference = 'flame',
  triggerSignal = 0,
  onDismiss,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const lastTriggeredRef = useRef<number>(0);

  // Play a very gentle, soothing 528Hz crystal chime using Web Audio API
  const playGentleChime = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // 528 Hz is the gentle "solfeggio frequency" of transformation and healing
      osc.frequency.setValueAtTime(528, ctx.currentTime);
      // Soft pitch glide to 660 Hz (harmonic major third)
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.3); // very soft volume
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.6);
    } catch {
      // AudioContext policy safe fallback
    }
  }, [soundEnabled]);

  // Gentle star confetti burst
  const triggerGentleConfetti = useCallback(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Palette of serene, warm starlight and comforting botanical tones
    const colors = iconPreference === 'flame'
      ? ['#F59E0B', '#FBBF24', '#FDE047', '#FEF08A', '#34D399', '#6EE7B7', '#FED7AA']
      : ['#F43F5E', '#FB7185', '#FDA4AF', '#FBCFE8', '#34D399', '#C084FC', '#FDE047'];

    // Burst 1: Gentle starlight shower from top center
    confetti({
      particleCount: 28,
      spread: 75,
      origin: { y: 0.32, x: 0.5 },
      colors,
      shapes: ['star', 'circle'],
      gravity: 0.32, // very slow drift downward
      scalar: 0.85,
      ticks: 280, // lingers softly in the air
      disableForReducedMotion: true,
    });

    // Burst 2: Slight delayed left and right gentle sparkles
    setTimeout(() => {
      confetti({
        particleCount: 16,
        angle: 60,
        spread: 55,
        origin: { x: 0.25, y: 0.38 },
        colors,
        shapes: ['star'],
        gravity: 0.28,
        scalar: 0.75,
        ticks: 240,
        disableForReducedMotion: true,
      });

      confetti({
        particleCount: 16,
        angle: 120,
        spread: 55,
        origin: { x: 0.75, y: 0.38 },
        colors,
        shapes: ['star'],
        gravity: 0.28,
        scalar: 0.75,
        ticks: 240,
        disableForReducedMotion: true,
      });
    }, 450);
  }, [iconPreference]);

  // Start the subtle canvas shimmer animation
  const startCanvasParticleAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to full viewport
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Warm, tranquil colors
    const palette = iconPreference === 'flame'
      ? [
          { color: '#FBBF24', glow: 'rgba(251, 191, 36, 0.4)' },
          { color: '#FDE047', glow: 'rgba(253, 224, 71, 0.45)' },
          { color: '#FEF08A', glow: 'rgba(254, 240, 138, 0.5)' },
          { color: '#34D399', glow: 'rgba(52, 211, 153, 0.35)' },
          { color: '#6EE7B7', glow: 'rgba(110, 231, 183, 0.35)' },
          { color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.6)' },
        ]
      : [
          { color: '#F472B6', glow: 'rgba(244, 114, 182, 0.4)' },
          { color: '#FB7185', glow: 'rgba(251, 113, 133, 0.4)' },
          { color: '#FBCFE8', glow: 'rgba(251, 207, 232, 0.5)' },
          { color: '#C084FC', glow: 'rgba(192, 132, 252, 0.35)' },
          { color: '#34D399', glow: 'rgba(52, 211, 153, 0.35)' },
          { color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.6)' },
        ];

    // Create 45 serene shimmering particles
    const particles: Particle[] = [];
    const count = Math.min(48, Math.floor(width / 25));

    for (let i = 0; i < count; i++) {
      const pColor = palette[Math.floor(Math.random() * palette.length)];
      const shapes: Array<'star' | 'orb' | 'sparkle'> = ['star', 'star', 'sparkle', 'orb'];
      const chosenShape = shapes[Math.floor(Math.random() * shapes.length)];

      particles.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.75) + height * 0.1,
        vx: (Math.random() - 0.5) * 0.45, // slow drift
        vy: -0.25 - Math.random() * 0.5, // gentle upward floating stardust
        size: 0,
        maxSize: chosenShape === 'star' ? 4 + Math.random() * 5 : 2.5 + Math.random() * 4,
        color: pColor.color,
        glowColor: pColor.glow,
        shape: chosenShape,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.03 + Math.random() * 0.04,
        life: 0,
        maxLife: 260 + Math.random() * 100, // lasts ~5-6 seconds
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.015,
      });
    }

    let startTime = performance.now();
    setIsAnimating(true);

    const draw4PointStar = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number
    ) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      c.beginPath();
      c.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        c.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        c.lineTo(x, y);
        rot += step;
      }
      c.lineTo(cx, cy - outerRadius);
      c.closePath();
    };

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      ctx.clearRect(0, 0, width, height);

      let anyAlive = false;

      particles.forEach((p) => {
        p.life++;
        if (p.life > p.maxLife) return;
        anyAlive = true;

        // Position update with delicate horizontal sway
        p.x += p.vx + Math.sin(p.phase + p.life * 0.02) * 0.3;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Smooth alpha envelope: fade in, twinkle, fade out
        const lifeRatio = p.life / p.maxLife;
        let alpha = 1;
        if (lifeRatio < 0.2) {
          alpha = lifeRatio / 0.2;
        } else if (lifeRatio > 0.75) {
          alpha = (1 - lifeRatio) / 0.25;
        }

        // Twinkle modulation
        const twinkle = 0.65 + 0.35 * Math.sin(p.phase + p.life * p.twinkleSpeed);
        const finalAlpha = Math.max(0, Math.min(1, alpha * twinkle));

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = finalAlpha;

        // Draw particle glow halo
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.glowColor;

        if (p.shape === 'star') {
          ctx.fillStyle = p.color;
          draw4PointStar(ctx, 0, 0, 4, p.maxSize, p.maxSize * 0.35);
          ctx.fill();
        } else if (p.shape === 'sparkle') {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-p.maxSize, 0);
          ctx.lineTo(p.maxSize, 0);
          ctx.moveTo(0, -p.maxSize);
          ctx.lineTo(0, p.maxSize);
          ctx.stroke();

          // Core bright dot
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(0, 0, p.maxSize * 0.25, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Soft circular stardust orb
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.maxSize * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      // Keep running while particles remain and within 6.5s window
      if (anyAlive && elapsed < 6500) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, width, height);
        setIsAnimating(false);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [iconPreference]);

  // Main trigger routine
  const triggerCelebration = useCallback(() => {
    lastTriggeredRef.current = Date.now();
    setShowCelebrationBanner(true);
    triggerGentleConfetti();
    startCanvasParticleAnimation();
    playGentleChime();
  }, [triggerGentleConfetti, startCanvasParticleAnimation, playGentleChime]);

  // Trigger when condition becomes active or when triggerSignal changes
  useEffect(() => {
    if (isActive && currentStreak >= 7) {
      // Small calming delay so user sees page settle first
      const timer = setTimeout(() => {
        triggerCelebration();
      }, 550);
      return () => clearTimeout(timer);
    } else {
      setShowCelebrationBanner(false);
    }
  }, [isActive, currentStreak, triggerSignal, triggerCelebration]);

  // Cleanup animation frame
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  if (!isActive || currentStreak < 7) {
    return null;
  }

  const isFlame = iconPreference === 'flame';

  return (
    <>
      {/* Invisible Canvas for floating star & stardust particles */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-40 w-full h-full"
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      />

      {/* Gentle, Tranquil 7+ Day Milestone Banner */}
      {showCelebrationBanner && (
        <div
          className={`relative rounded-3xl p-4 sm:p-5 mb-5 border shadow-sm transition-all animate-fadeIn ${
            isFlame
              ? 'bg-gradient-to-r from-amber-50 via-yellow-50/70 to-emerald-50/50 border-amber-200/90 text-stone-900'
              : 'bg-gradient-to-r from-rose-50 via-pink-50/70 to-emerald-50/50 border-rose-200/90 text-stone-900'
          }`}
        >
          {/* Gentle Shimmer Accent Lights in the background */}
          <div
            className={`absolute top-0 right-1/4 w-40 h-24 rounded-full blur-2xl pointer-events-none opacity-40 ${
              isFlame ? 'bg-amber-300' : 'bg-rose-300'
            }`}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
            <div className="flex items-start gap-3">
              <div
                className={`p-2.5 rounded-2xl shadow-xs shrink-0 transition-transform ${
                  isFlame ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                }`}
              >
                <div className="relative">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-500 animate-pulse" />
                  <span className="absolute -top-1 -right-1">
                    {isFlame ? (
                      <Flame className="w-3 h-3 fill-amber-600 text-amber-700" />
                    ) : (
                      <Heart className="w-3 h-3 fill-rose-600 text-rose-700" />
                    )}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-serif-title text-base sm:text-lg font-bold text-stone-900 flex items-center gap-1.5">
                    <span>✨ {currentStreak}-Day Consistency Sanctuary</span>
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isFlame
                        ? 'bg-amber-100/80 text-amber-900 border-amber-300'
                        : 'bg-rose-100/80 text-rose-900 border-rose-300'
                    }`}
                  >
                    7+ Days Milestone Achieved
                  </span>
                </div>

                <p className="text-xs text-stone-600 mt-1 max-w-xl leading-relaxed">
                  You have gently honored yourself for {currentStreak} consecutive days. Like steady starlight, your consistency brings warmth and reclamation to your nervous system.
                </p>
              </div>
            </div>

            {/* Interaction Buttons: Replay & Sound */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 pt-1 sm:pt-0">
              <button
                type="button"
                onClick={triggerCelebration}
                disabled={isAnimating}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95 ${
                  isFlame
                    ? 'bg-white hover:bg-amber-100/60 text-amber-900 border border-amber-200'
                    : 'bg-white hover:bg-rose-100/60 text-rose-900 border border-rose-200'
                } ${isAnimating ? 'opacity-70 cursor-not-allowed' : ''}`}
                title="Replay the soothing shimmering star particles"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{isAnimating ? 'Shimmering...' : 'Replay Shimmer'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSoundEnabled((prev) => !prev)}
                className={`p-1.5 rounded-xl text-xs transition-colors border ${
                  soundEnabled
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-white/80 text-stone-500 hover:text-stone-800 border-stone-200'
                }`}
                title={soundEnabled ? 'Gentle chime sound enabled' : 'Muted (Click to enable gentle 528Hz chime)'}
              >
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowCelebrationBanner(false);
                  if (onDismiss) onDismiss();
                }}
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                title="Dismiss milestone banner"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
