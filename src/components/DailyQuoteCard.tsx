import React, { useState, useEffect } from 'react';
import { Quote, TraumaTrack } from '../types';
import { Sparkles, Heart, RefreshCw, Volume2, VolumeX, Share2, BookmarkCheck } from 'lucide-react';

interface DailyQuoteCardProps {
  quote: Quote;
  onCycleQuote: () => void;
  activeTrack: TraumaTrack;
}

export const DailyQuoteCard: React.FC<DailyQuoteCardProps> = ({ quote, onCycleQuote, activeTrack }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [isReadingQuote, setIsReadingQuote] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(`"${quote.text}" — ${quote.author} (${quote.source || 'Haven Sanctuary'})`);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleToggleReadQuote = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isReadingQuote) {
      window.speechSynthesis.cancel();
      setIsReadingQuote(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `Daily Sanctuary Anchor. "${quote.text}". By ${quote.author}. Affirmation: ${quote.gentleAffirmation}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.88;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsReadingQuote(false);
    utterance.onerror = () => setIsReadingQuote(false);

    window.speechSynthesis.speak(utterance);
    setIsReadingQuote(true);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [quote]);

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 border border-emerald-950/20">
      {/* Visual Serene Backdrop */}
      <div className={`absolute inset-0 bg-gradient-to-br ${quote.bgGradient} opacity-95`} />

      {/* Decorative serene light blooms */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-emerald-400/15 filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-teal-300/10 filter blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 p-6 md:p-8 text-white flex flex-col justify-between min-h-[290px]">
        {/* Top bar with category & actions */}
        <div className="flex items-center justify-between text-xs tracking-wider uppercase opacity-85 pb-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-white/10 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            </span>
            <span className="font-medium tracking-wide">Daily Sanctuary Anchor</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio Listen Aloud */}
            <button
              onClick={handleToggleReadQuote}
              className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
                isReadingQuote ? 'bg-rose-500/80 text-white animate-pulse' : 'bg-white/10 hover:bg-white/20 text-white/90'
              }`}
              title={isReadingQuote ? "Stop audio" : "Listen to quote aloud"}
            >
              {isReadingQuote ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
                isSaved ? 'bg-rose-500/80 text-white' : 'bg-white/10 hover:bg-white/20 text-white/90'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 backdrop-blur-md transition-colors"
              title="Copy quote"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onCycleQuote}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 backdrop-blur-md transition-colors"
              title="Next inspiring quote"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Quote Text */}
        <div className="my-auto py-4">
          <p className="font-serif-title text-xl md:text-2xl leading-relaxed font-light tracking-wide italic text-emerald-50">
            "{quote.text}"
          </p>

          <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm font-sans font-medium text-emerald-200/90">
              — {quote.author}
              {quote.source && <span className="opacity-75 font-normal ml-1.5">({quote.source})</span>}
            </div>

            <button
              onClick={() => setShowReflection(!showReflection)}
              className="text-xs px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-emerald-100 backdrop-blur-sm transition-colors border border-white/10"
            >
              {showReflection ? 'Hide Reflection' : '💭 Reflect on this'}
            </button>
          </div>
        </div>

        {/* Gentle reflection drawer */}
        {showReflection && (
          <div className="mt-3 p-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 animate-fadeIn">
            <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wide mb-1">
              Gentle Question:
            </p>
            <p className="text-sm text-emerald-100 font-serif-title mb-2">
              {quote.reflectionQuestion}
            </p>
            <div className="pt-2 border-t border-white/10 text-xs text-emerald-200/90 italic flex items-center gap-1.5">
              <span>🌿 Affirmation:</span>
              <span className="font-medium">"{quote.gentleAffirmation}"</span>
            </div>
          </div>
        )}

        {hasCopied && (
          <div className="absolute bottom-3 right-4 text-xs bg-emerald-950/90 text-emerald-200 px-3 py-1.5 rounded-xl border border-emerald-500/40">
            Quote copied gently to clipboard.
          </div>
        )}
      </div>
    </div>
  );
};
