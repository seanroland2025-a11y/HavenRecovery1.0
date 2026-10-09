import React, { useState } from 'react';
import { Eye, Hand, Volume2, Sparkles, Smile, Check, RotateCcw, ArrowRight } from 'lucide-react';

interface GroundingStep {
  count: number;
  sense: string;
  instruction: string;
  example: string;
  icon: React.ReactNode;
  color: string;
}

export const Grounding54321: React.FC<{ onClose: () => void; onComplete: () => void }> = ({ onClose, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [itemsFound, setItemsFound] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');

  const steps: GroundingStep[] = [
    {
      count: 5,
      sense: 'SEE',
      instruction: 'Acknowledge 5 things you can see around you.',
      example: 'A shadow on the wall, a wooden chair, a plant leaf, shoes by the door...',
      icon: <Eye className="w-6 h-6 text-emerald-600" />,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900'
    },
    {
      count: 4,
      sense: 'TOUCH',
      instruction: 'Acknowledge 4 things you can physically feel or touch right now.',
      example: 'The fabric of your pants, your feet on the floor, the coolness of a glass, your own hands...',
      icon: <Hand className="w-6 h-6 text-teal-600" />,
      color: 'bg-teal-50 border-teal-200 text-teal-900'
    },
    {
      count: 3,
      sense: 'HEAR',
      instruction: 'Acknowledge 3 distinct sounds you can hear in your environment.',
      example: 'Traffic in the distance, a clock ticking, wind outside, your own steady breath...',
      icon: <Volume2 className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200 text-blue-900'
    },
    {
      count: 2,
      sense: 'SMELL',
      instruction: 'Acknowledge 2 scents you can smell (or imagine a soothing scent).',
      example: 'Fresh air, coffee aroma, your soap or lotion, cedarwood, lavender...',
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200 text-purple-900'
    },
    {
      count: 1,
      sense: 'TASTE / TRUTH',
      instruction: 'Acknowledge 1 taste or repeat 1 truth of safety.',
      example: 'The taste of clean water, peppermint, or whisper: "I am right here, right now, and I am safe."',
      icon: <Smile className="w-6 h-6 text-rose-600" />,
      color: 'bg-rose-50 border-rose-200 text-rose-900'
    }
  ];

  const currentStep = steps[currentStepIndex];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const updated = [...itemsFound, inputText.trim()];
    setItemsFound(updated);
    setInputText('');

    if (updated.length >= currentStep.count) {
      if (currentStepIndex < steps.length - 1) {
        setTimeout(() => {
          setCurrentStepIndex(prev => prev + 1);
          setItemsFound([]);
        }, 300);
      } else {
        onComplete();
      }
    }
  };

  const handleQuickAdd = () => {
    const updated = [...itemsFound, `Noticed item #${itemsFound.length + 1}`];
    setItemsFound(updated);
    if (updated.length >= currentStep.count) {
      if (currentStepIndex < steps.length - 1) {
        setTimeout(() => {
          setCurrentStepIndex(prev => prev + 1);
          setItemsFound([]);
        }, 300);
      } else {
        onComplete();
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-stone-200 animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">5-4-3-2-1 Somatic Grounding</span>
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-700 text-sm font-medium p-1 rounded-lg"
        >
          ✕ Close
        </button>
      </div>

      {/* Progress pill */}
      <div className="flex gap-1.5 mb-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              idx < currentStepIndex
                ? 'bg-emerald-500'
                : idx === currentStepIndex
                ? 'bg-emerald-400'
                : 'bg-stone-200'
            }`}
          />
        ))}
      </div>

      <div className={`p-5 rounded-2xl border mb-6 ${currentStep.color}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-white shadow-sm border border-stone-200/50">
            {currentStep.icon}
          </div>
          <div>
            <h3 className="font-serif-title font-semibold text-xl">
              Find {currentStep.count} things to {currentStep.sense}
            </h3>
            <p className="text-xs opacity-75 font-sans">
              Step {currentStepIndex + 1} of 5
            </p>
          </div>
        </div>

        <p className="text-sm font-medium mb-2 leading-relaxed">
          {currentStep.instruction}
        </p>
        <p className="text-xs opacity-75 italic">
          Examples: {currentStep.example}
        </p>
      </div>

      {/* Items registered */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
          <span>Noticed ({itemsFound.length}/{currentStep.count})</span>
          <span>{currentStep.count - itemsFound.length} more needed</span>
        </div>

        <div className="space-y-1.5 min-h-[90px]">
          {itemsFound.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-stone-700 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="truncate">{item}</span>
            </div>
          ))}
          {itemsFound.length === 0 && (
            <div className="text-xs text-stone-400 italic py-4 text-center">
              Type or tap "Quick Anchor" to record what your senses encounter.
            </div>
          )}
        </div>
      </div>

      {/* Input or Quick Tap */}
      <form onSubmit={handleAddItem} className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Name something you ${currentStep.sense.toLowerCase()}...`}
          className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-medium transition-colors"
        >
          Add
        </button>
      </form>

      <div className="flex items-center justify-between pt-2 border-t border-stone-100">
        <button
          type="button"
          onClick={handleQuickAdd}
          className="text-xs text-stone-600 hover:text-emerald-700 font-medium py-1 px-2 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors"
        >
          + Quick Anchor (Tap if overwhelmed)
        </button>

        {currentStepIndex > 0 && (
          <button
            type="button"
            onClick={() => {
              setCurrentStepIndex(prev => prev - 1);
              setItemsFound([]);
            }}
            className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Previous Step
          </button>
        )}
      </div>
    </div>
  );
};
