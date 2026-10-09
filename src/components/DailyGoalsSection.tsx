import React, { useState, useEffect } from 'react';
import { DailyGoal, TraumaTrack, ConsistencyStreakData } from '../types';
import { CheckCircle2, Circle, Plus, Sparkles, Flame, Award, Heart, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DailyGoalsSectionProps {
  goals: DailyGoal[];
  activeTrack: TraumaTrack;
  onToggleGoal: (id: string) => void;
  onAddGoal: (newGoal: DailyGoal) => void;
  completedCount: number;
  streakData?: ConsistencyStreakData;
}

export const DailyGoalsSection: React.FC<DailyGoalsSectionProps> = ({
  goals,
  activeTrack,
  onToggleGoal,
  onAddGoal,
  completedCount,
  streakData,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [isReadingGoals, setIsReadingGoals] = useState(false);

  // Filter goals for current track or universal ('all')
  const relevantGoals = goals.filter(
    (g) => g.track === activeTrack || g.track === 'all'
  );

  const completedInTrack = relevantGoals.filter((g) => g.completed).length;
  const progressPercent = relevantGoals.length > 0 ? Math.round((completedInTrack / relevantGoals.length) * 100) : 0;

  // Audio Reader for Daily Goals
  const handleToggleReadGoals = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech audio reader is not supported in this browser.");
      return;
    }

    if (isReadingGoals) {
      window.speechSynthesis.cancel();
      setIsReadingGoals(false);
      return;
    }

    window.speechSynthesis.cancel();
    const goalsSpeechText = relevantGoals.map((g, i) => `Goal ${i + 1}: ${g.title}. ${g.description}.`).join(' ');
    const fullText = `Today's Gentle Mini Goals for recovery: ${goalsSpeechText}`;

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = 0.88; // calm, gentle tempo
    utterance.pitch = 1.0;
    utterance.onend = () => setIsReadingGoals(false);
    utterance.onerror = () => setIsReadingGoals(false);

    window.speechSynthesis.speak(utterance);
    setIsReadingGoals(true);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggle = (id: string, currentlyCompleted: boolean) => {
    if (!currentlyCompleted) {
      // Trigger gentle celebratory confetti
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#549382', '#7aaf9f', '#f1bda8', '#c4bce2']
      });
    }
    onToggleGoal(id);
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const newGoal: DailyGoal = {
      id: `custom-${Date.now()}`,
      track: activeTrack,
      title: customTitle.trim(),
      description: customDescription.trim() || 'A personal mini step toward safety and self-worth.',
      category: 'self-compassion',
      completed: false,
      points: 15,
      streakCount: 0
    };

    onAddGoal(newGoal);
    setCustomTitle('');
    setCustomDescription('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200/80">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Award className="w-4 h-4" />
            </span>
            <h2 className="font-serif-title text-xl font-semibold text-stone-900">
              Mini Daily Gentle Goals
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Tiny, shame-free steps to gently encourage nervous system growth.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Consistency Streak Pill */}
          {streakData && (
            <div
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border shadow-xs transition-all ${
                streakData.iconPreference === 'heart'
                  ? 'bg-rose-50 text-rose-900 border-rose-200/90'
                  : 'bg-amber-50 text-amber-900 border-amber-200/90'
              }`}
              title={`${streakData.currentStreak} consecutive days completing at least one goal`}
            >
              {streakData.iconPreference === 'heart' ? (
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-600 animate-pulse" />
              ) : (
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600 animate-pulse" />
              )}
              <span>
                {streakData.currentStreak} {streakData.currentStreak === 1 ? 'Day' : 'Days'} Streak
              </span>
              {streakData.currentStreak >= 7 && (
                <span className="flex items-center gap-0.5 text-[10px] text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded-md font-bold">
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                  <span>7+ Shimmer</span>
                </span>
              )}
            </div>
          )}

          {/* Audio Reader for Goals */}
          <button
            onClick={handleToggleReadGoals}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isReadingGoals
                ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
            }`}
            title="Listen to today's goals spoken gently aloud"
          >
            {isReadingGoals ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-700" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-stone-600" />
            )}
            <span>{isReadingGoals ? 'Stop Reading' : 'Listen to Goals'}</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 text-xs font-semibold border border-stone-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Goal</span>
          </button>
        </div>
      </div>

      {/* Progress meter */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-stone-50 border border-emerald-100">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Today's Healing Growth</span>
          </span>
          <span className="text-emerald-800">{completedInTrack} of {relevantGoals.length} completed ({progressPercent}%)</span>
        </div>
        <div className="w-full h-2.5 bg-stone-200/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {progressPercent === 100 ? (
          <p className="text-xs text-emerald-800 mt-2 font-medium flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-current" />
            Every gentle goal completed today! You honor your healing journey.
          </p>
        ) : completedInTrack > 0 && streakData ? (
          <p className="text-xs text-emerald-800 mt-2 font-medium flex items-center gap-1.5">
            {streakData.iconPreference === 'heart' ? (
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-600" />
            ) : (
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            )}
            <span>
              Consistency streak secured for today! ({streakData.currentStreak} {streakData.currentStreak === 1 ? 'day' : 'days'} consecutive)
            </span>
          </p>
        ) : null}
      </div>

      {/* List of Goals */}
      <div className="space-y-3">
        {relevantGoals.map((goal) => {
          return (
            <div
              key={goal.id}
              onClick={() => handleToggle(goal.id, goal.completed)}
              className={`group flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                goal.completed
                  ? 'bg-emerald-50/50 border-emerald-200/80 text-stone-500'
                  : 'bg-white hover:bg-stone-50/80 border-stone-200 text-stone-800 shadow-sm'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 flex-shrink-0 transition-transform group-hover:scale-110"
              >
                {goal.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                ) : (
                  <Circle className="w-5 h-5 text-stone-300 group-hover:text-emerald-500" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-sm font-semibold ${goal.completed ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                    {goal.title}
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-medium">
                    +{goal.points} pts
                  </span>
                </div>
                <p className={`text-xs mt-1 leading-relaxed ${goal.completed ? 'text-stone-400' : 'text-stone-600'}`}>
                  {goal.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200 animate-fadeIn">
            <h3 className="font-serif-title font-semibold text-lg text-stone-900 mb-2">
              Create a Gentle Mini Goal
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Keep it simple and pressure-free. Even drinking water mindfully is an act of reclamation.
            </p>

            <form onSubmit={handleCreateCustom} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Goal Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Step outside for 60 seconds"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Gentle Note / Motivation (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Because my body deserves fresh morning air."
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
