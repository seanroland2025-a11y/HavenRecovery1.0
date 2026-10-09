import React, { useState } from 'react';
import { Compass, RefreshCw, Sparkles, Check, ArrowRight } from 'lucide-react';

interface DistortionPair {
  trigger: string;
  automaticDistortion: string;
  compassionateTruth: string;
  category: string;
}

export const ThoughtReframer: React.FC<{ onClose: () => void; onComplete: () => void }> = ({ onClose, onComplete }) => {
  const defaultPairs: DistortionPair[] = [
    {
      trigger: 'Stockholm Syndrome / Bond',
      automaticDistortion: 'They were only trying to protect me. If I don’t help them, I am a disloyal and cruel person.',
      compassionateTruth: 'Their moments of kindness were part of the cycle of coercive control. Protecting your own life and sanity is not cruelty; it is the ultimate duty to yourself.',
      category: 'stockholm'
    },
    {
      trigger: 'PTSD Flashback',
      automaticDistortion: 'The horror is happening all over again. I will never be free from this terror.',
      compassionateTruth: 'This is an emotional memory, not an ongoing event. My brain is sending a false fire alarm. Look around: right here, right now, the abuser is not present.',
      category: 'ptsd'
    },
    {
      trigger: 'Sexual Abuse Shame',
      automaticDistortion: 'I should have fought harder. Part of me must be dirty or responsible.',
      compassionateTruth: 'Freeze and fawn responses are involuntary neurobiological survival reflexes commanded by your reptilian brainstem. You survived. 100% of the fault lies with the perpetrator.',
      category: 'sexual_abuse'
    },
    {
      trigger: 'Substance Urge',
      automaticDistortion: 'This grief is unbearable. I need to numb out just one time or I will collapse.',
      compassionateTruth: 'Urges are like ocean waves: they crest, peak for 15 minutes, and naturally break. Numbing postpones the pain with compounding interest; clean breathing dissolves it.',
      category: 'substance_abuse'
    }
  ];

  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [customThought, setCustomThought] = useState('');
  const [customTruth, setCustomTruth] = useState<string | null>(null);
  const [reframedCount, setReframedCount] = useState(0);

  const currentPair = defaultPairs[selectedPairIndex];

  const handleCustomReframe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customThought.trim()) return;
    setCustomTruth(
      `"I hear the fear in '${customThought}'. But today, I separate my abuser's cruel words from my enduring worth. I have survived, and I am safe to write my own chapter."`
    );
    setReframedCount(c => c + 1);
    onComplete();
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-stone-200 animate-fadeIn text-left">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Compass className="w-5 h-5 text-amber-600" />
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-900">Trauma-Informed Reframing</span>
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-700 text-sm font-medium p-1 rounded-lg"
        >
          ✕ Close
        </button>
      </div>

      <p className="text-xs text-stone-500 mb-4">
        Abuse plants cruel lies in our minds. Let's gently replace them with safe, validating truths.
      </p>

      {/* Preset selector */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {defaultPairs.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedPairIndex(idx);
              setCustomTruth(null);
            }}
            className={`text-xs px-2.5 py-1.5 rounded-xl font-medium transition-colors ${
              selectedPairIndex === idx && !customTruth
                ? 'bg-amber-700 text-white shadow-sm'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {p.trigger.split('/')[0]}
          </button>
        ))}
      </div>

      {!customTruth ? (
        <div className="space-y-3 mb-5">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wide block mb-1">
              ⚡ The Trauma Echo / Automatic Thought:
            </span>
            <p className="text-xs text-rose-950 italic">
              "{currentPair.automaticDistortion}"
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block mb-1">
              🌱 The Restorative Survivor Truth:
            </span>
            <p className="text-xs font-medium text-emerald-950 leading-relaxed">
              "{currentPair.compassionateTruth}"
            </p>
          </div>

          <button
            onClick={() => {
              setReframedCount(c => c + 1);
              onComplete();
            }}
            className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>I internalize this truth into my heart</span>
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 mb-5">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block mb-1">
            🌱 Your Personalized Truth:
          </span>
          <p className="text-xs font-medium text-emerald-950 leading-relaxed">
            {customTruth}
          </p>
          <button
            onClick={() => setCustomTruth(null)}
            className="mt-3 text-xs text-emerald-700 font-semibold underline"
          >
            Reflect on another thought
          </button>
        </div>
      )}

      {/* Custom Thought Input */}
      <div className="pt-3 border-t border-stone-200">
        <span className="text-xs font-semibold text-stone-600 block mb-1.5">
          Have your own harsh trauma belief? Reframe it:
        </span>
        <form onSubmit={handleCustomReframe} className="flex gap-2">
          <input
            type="text"
            value={customThought}
            onChange={(e) => setCustomThought(e.target.value)}
            placeholder="e.g. 'I shouldn't be feeling this weak...'"
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-medium whitespace-nowrap"
          >
            Reframe
          </button>
        </form>
      </div>
    </div>
  );
};
