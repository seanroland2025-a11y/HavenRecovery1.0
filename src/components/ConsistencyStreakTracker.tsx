import React, { useState } from 'react';
import { ConsistencyStreakData, StreakIconType } from '../types';
import { getPast7DaysTrail } from '../services/streakService';
import { Flame, Heart, Sparkles, Check, Info, Award, ArrowDown, ShieldCheck, Star } from 'lucide-react';

interface ConsistencyStreakTrackerProps {
  streakData: ConsistencyStreakData;
  onUpdateIconPreference: (icon: StreakIconType) => void;
  onScrollToGoals?: () => void;
  onTriggerParticleCelebration?: () => void;
  onSetStreakDays?: (days: number) => void;
  onResetStreak?: () => void;
}

export const ConsistencyStreakTracker: React.FC<ConsistencyStreakTrackerProps> = ({
  streakData,
  onUpdateIconPreference,
  onScrollToGoals,
  onTriggerParticleCelebration,
  onSetStreakDays,
  onResetStreak,
}) => {
  const [showPhilosophy, setShowPhilosophy] = useState(false);

  const trail = getPast7DaysTrail(streakData.completedDates);
  const isFlame = streakData.iconPreference === 'flame';
  const has7DayStreak = streakData.currentStreak >= 7;

  // Milestone list
  const milestones = [
    { days: 1, title: 'First Spark', desc: 'First courage step taken' },
    { days: 3, title: 'Gentle Rhythm', desc: 'Somatic regulation rhythm' },
    { days: 7, title: 'Week of Reclamation', desc: '7 days of showing up for yourself' },
    { days: 14, title: 'Fortified Hearth', desc: 'Deep nervous system anchor' },
    { days: 30, title: 'Sanctuary of Hope', desc: 'A full month of steady self-honor' },
  ];

  return (
    <div
      id="consistency-streak-tracker"
      className="bg-white rounded-3xl p-6 md:p-7 shadow-sm border border-stone-200/90 relative overflow-hidden transition-all"
    >
      {/* Gentle background accent glow */}
      <div
        className={`absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-40 transition-colors duration-500 ${
          isFlame ? 'bg-amber-200' : 'bg-rose-200'
        }`}
      />

      {/* Top Header: Title & Icon Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`p-1.5 rounded-xl transition-colors ${
                isFlame ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
              }`}
            >
              {isFlame ? (
                <Flame className="w-4 h-4 fill-amber-500 text-amber-600 animate-pulse" />
              ) : (
                <Heart className="w-4 h-4 fill-rose-500 text-rose-600 animate-pulse" />
              )}
            </span>
            <h2 className="font-serif-title text-xl font-bold text-stone-900 tracking-tight">
              Consistency Streak
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80">
              Daily Haven
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Highlights consecutive days you've completed at least one gentle recovery goal.
          </p>
        </div>

        {/* Icon Toggle & 7-Day Shimmer Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* 7+ Day Shimmer Particle Trigger or Demo Preview */}
          {has7DayStreak ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onTriggerParticleCelebration}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 ${
                  isFlame
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                    : 'bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300'
                }`}
                title="Replay the subtle, gentle shimmering star particle animation"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>7+ Day Shimmer ✨</span>
              </button>

              {onResetStreak && (
                <button
                  type="button"
                  onClick={onResetStreak}
                  className="text-[11px] text-stone-400 hover:text-stone-700 underline px-1"
                  title="Reset streak for testing"
                >
                  Reset
                </button>
              )}
            </div>
          ) : (
            onSetStreakDays && (
              <button
                type="button"
                onClick={() => onSetStreakDays(7)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-2xs"
                title="Simulate a 7-day streak to trigger the subtle particle animation immediately"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Preview 7-Day Shimmer</span>
              </button>
            )
          )}

          {/* Symbol Selector */}
          <div className="flex items-center gap-1.5 bg-stone-100/90 p-1 rounded-2xl border border-stone-200/60">
            <span className="text-[11px] font-medium text-stone-500 px-2 select-none">
              Symbol:
            </span>
            <button
              type="button"
              onClick={() => onUpdateIconPreference('flame')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isFlame
                  ? 'bg-white text-amber-900 shadow-sm border border-amber-200/60'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Flame: Perseverance & Inner Warmth"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
              <span>Flame</span>
            </button>
            <button
              type="button"
              onClick={() => onUpdateIconPreference('heart')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                !isFlame
                  ? 'bg-white text-rose-900 shadow-sm border border-rose-200/60'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Heart: Self-Compassion & Gentle Care"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-600" />
              <span>Heart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Streak Metric Banner */}
      <div
        className={`rounded-2xl p-4 sm:p-5 mb-5 border transition-all ${
          isFlame
            ? 'bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-stone-50 border-amber-200/80'
            : 'bg-gradient-to-r from-rose-50/90 via-pink-50/50 to-stone-50 border-rose-200/80'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Main Streak Counter */}
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex flex-col items-center justify-center shadow-sm border relative ${
                isFlame
                  ? 'bg-white border-amber-200 text-amber-700'
                  : 'bg-white border-rose-200 text-rose-700'
              }`}
            >
              {/* Small Flame or Heart Icon Header */}
              <div className="absolute -top-2 -right-2 p-1 rounded-full bg-white shadow-sm border border-stone-200">
                {isFlame ? (
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                ) : (
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-600" />
                )}
              </div>
              <span className="text-3xl sm:text-4xl font-black font-serif-title tracking-tight leading-none">
                {streakData.currentStreak}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mt-0.5">
                {streakData.currentStreak === 1 ? 'Day' : 'Days'}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm sm:text-base font-bold text-stone-900">
                  {streakData.currentStreak > 0
                    ? `${streakData.currentStreak}-Day Consecutive Streak`
                    : 'Start Your Consistency Streak'}
                </span>
                {streakData.longestStreak > streakData.currentStreak && (
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-stone-200/70 text-stone-700">
                    Best: {streakData.longestStreak} days
                  </span>
                )}
              </div>

              {/* Status Indicator */}
              <div className="mt-1.5 flex items-center gap-2">
                {streakData.isCompletedToday ? (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100/90 text-emerald-900 text-xs font-semibold border border-emerald-200">
                    <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                    <span>Goal Completed Today · Streak Active!</span>
                  </div>
                ) : (
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                      isFlame
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-rose-100 text-rose-900 border-rose-300'
                    }`}
                  >
                    {isFlame ? (
                      <Flame className="w-3.5 h-3.5 fill-amber-600 text-amber-700 animate-bounce" />
                    ) : (
                      <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-700 animate-bounce" />
                    )}
                    <span>
                      {streakData.currentStreak > 0
                        ? `Complete 1 goal today to extend to ${streakData.currentStreak + 1} days`
                        : 'Complete at least 1 goal below to ignite your streak!'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick jump to goals if pending */}
          {!streakData.isCompletedToday && onScrollToGoals && (
            <button
              type="button"
              onClick={onScrollToGoals}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-transform active:scale-95 self-start md:self-auto ${
                isFlame
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              <span>View Today's Goals</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 7-Day Consistency Trail Calendar */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2.5">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Past 7 Days Consistency Trail</span>
          </span>
          <span className="text-[11px] text-stone-500 font-normal">
            At least 1 goal completed per day
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {trail.map((item) => (
            <div
              key={item.dateStr}
              className={`flex flex-col items-center justify-center p-2 rounded-2xl border text-center transition-all ${
                item.isToday
                  ? item.isCompleted
                    ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400/30'
                    : 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/20'
                  : item.isCompleted
                  ? 'bg-stone-50 border-stone-200'
                  : 'bg-stone-50/40 border-stone-200/60 opacity-60'
              }`}
            >
              <span className="text-[10px] font-semibold text-stone-500">
                {item.dayLabel}
              </span>
              <span className="text-xs font-bold text-stone-800 my-0.5">
                {item.dateNumber}
              </span>

              {/* Day indicator with Flame or Heart */}
              <div className="mt-1">
                {item.isCompleted ? (
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shadow-xs ${
                      isFlame
                        ? 'bg-amber-500 text-white'
                        : 'bg-rose-500 text-white'
                    }`}
                    title={`Goal completed on ${item.dateStr}`}
                  >
                    {isFlame ? (
                      <Flame className="w-3.5 h-3.5 fill-white" />
                    ) : (
                      <Heart className="w-3.5 h-3.5 fill-white" />
                    )}
                  </div>
                ) : (
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      item.isToday
                        ? 'border-dashed border-amber-400 text-amber-500 bg-white'
                        : 'border-stone-200 text-stone-300 bg-stone-100/50'
                    }`}
                    title={item.isToday ? "Today: Pending 1 goal" : `Rest day on ${item.dateStr}`}
                  >
                    <span className="text-[10px] font-medium leading-none">
                      {item.isToday ? '•' : '—'}
                    </span>
                  </div>
                )}
              </div>

              {item.isToday && (
                <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider mt-1">
                  Today
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Streak Milestones Badges */}
      <div className="pt-2 border-t border-stone-100">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2">
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Consistency Milestones</span>
          </span>
          <span className="text-[11px] text-stone-500 font-normal">
            {streakData.currentStreak >= 7 ? 'Reclamation achieved' : 'Keep honoring each day'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {milestones.map((m) => {
            const isUnlocked = streakData.currentStreak >= m.days || streakData.longestStreak >= m.days;
            const is7Day = m.days === 7;
            return (
              <div
                key={m.days}
                onClick={() => {
                  if (is7Day && isUnlocked && onTriggerParticleCelebration) {
                    onTriggerParticleCelebration();
                  }
                }}
                className={`p-2.5 rounded-2xl border transition-all ${
                  is7Day && isUnlocked
                    ? 'cursor-pointer hover:scale-[1.02] ring-1 ring-amber-300/80 shadow-xs'
                    : ''
                } ${
                  isUnlocked
                    ? isFlame
                      ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                      : 'bg-rose-50/60 border-rose-200 text-rose-950'
                    : 'bg-stone-50/50 border-stone-200/60 text-stone-400 opacity-60'
                }`}
                title={is7Day && isUnlocked ? 'Click to trigger gentle shimmering star particles ✨' : undefined}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {m.days} {m.days === 1 ? 'Day' : 'Days'}
                  </span>
                  {isUnlocked && (
                    <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="text-xs font-semibold truncate text-stone-900 flex items-center justify-between">
                  <span>{m.title}</span>
                  {is7Day && isUnlocked && (
                    <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                  )}
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5 line-clamp-1 leading-tight">
                  {m.desc}
                </div>
                {is7Day && isUnlocked && (
                  <div className="mt-1 text-[9px] font-bold text-amber-800 flex items-center gap-1">
                    <span>✨ Tap for Shimmer</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Shame-Free Trauma Philosophy Accordion */}
      <div className="mt-4 pt-3 border-t border-stone-100">
        <button
          type="button"
          onClick={() => setShowPhilosophy(!showPhilosophy)}
          className="flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-emerald-800 transition-colors"
        >
          <Info className="w-3.5 h-3.5 text-stone-400" />
          <span>Why Haven's streaks are shame-free and pressure-free</span>
          <span className="text-[10px] text-stone-400 ml-1">
            {showPhilosophy ? '▲' : '▼'}
          </span>
        </button>

        {showPhilosophy && (
          <div className="mt-2.5 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-stone-700 leading-relaxed space-y-1.5 animate-fadeIn">
            <p className="font-semibold text-emerald-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Compassion Over Perfection</span>
            </p>
            <p>
              In traditional apps, losing a streak triggers guilt or anxiety. For survivors of abuse and trauma, your nervous system often requires deep, quiet rest.
            </p>
            <p>
              At Haven, completing even <strong>one mini step</strong> (like drinking water mindfully or looking out a window) keeps your streak bright. And if you ever take time off, your strength is never lost — your courage restarts with love whenever you are ready.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
