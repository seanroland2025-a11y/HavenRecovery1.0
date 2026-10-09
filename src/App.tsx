import React, { useState, useEffect } from 'react';
import { TraumaTrack, SubstanceType, DailyGoal, ConsistencyStreakData, StreakIconType } from './types';
import { INSPIRATIONAL_QUOTES } from './data/quotes';
import { INITIAL_DAILY_GOALS } from './data/goals';
import { Header } from './components/Header';
import { QuickExitCamouflage } from './components/QuickExitCamouflage';
import { DailyQuoteCard } from './components/DailyQuoteCard';
import { DailyGoalsSection } from './components/DailyGoalsSection';
import { ConsistencyStreakTracker } from './components/ConsistencyStreakTracker';
import { InteractiveToolsHub } from './components/InteractiveToolsHub';
import { RewardsVault } from './components/RewardsVault';
import { ReadingLibrary } from './components/ReadingLibrary';
import { AnonymousCommunity } from './components/AnonymousCommunity';
import { CrisisModal } from './components/CrisisModal';
import { HeroBanner } from './components/HeroBanner';
import { DailyReflectionsSection } from './components/DailyReflectionsSection';
import { SurvivorsTrustStoriesSection } from './components/SurvivorsTrustStoriesSection';
import { TraumaGroupChatModal } from './components/TraumaGroupChatModal';
import { HavenChatbotModal } from './components/HavenChatbotModal';
import { GentleStreakParticleEffect } from './components/GentleStreakParticleEffect';
import { PWAInstallModal } from './components/PWAInstallModal';
import { LaunchGuideModal } from './components/LaunchGuideModal';
import {
  loadStreakData,
  recordGoalCompletionToday,
  saveStreakData,
  setCustomStreakDays,
  resetStreakData,
} from './services/streakService';
import { Grounding54321 } from './components/tools/Grounding54321';
import { BoxBreathing } from './components/tools/BoxBreathing';
import { SomaticBodyScan } from './components/tools/SomaticBodyScan';
import { ThoughtReframer } from './components/tools/ThoughtReframer';
import { Sparkles, HeartHandshake, Shield, BookOpen, Users, Gift, Home, Feather, Bot, Smartphone, Rocket } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation & Track States
  const [activeTrack, setActiveTrack] = useState<TraumaTrack>('ptsd');
  const [selectedSubstance, setSelectedSubstance] = useState<SubstanceType>('alcohol');
  const [activeTab, setActiveTab] = useState<'home' | 'rewards' | 'library' | 'community' | 'reflections' | 'stories'>('home');

  // Safety & Camouflage State
  const [isQuickExitActive, setIsQuickExitActive] = useState<boolean>(false);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);

  // Launch Suite & Mobile PWA Installation (Steps 2 & 3)
  const [isPWAInstallOpen, setIsPWAInstallOpen] = useState<boolean>(false);
  const [isLaunchGuideOpen, setIsLaunchGuideOpen] = useState<boolean>(false);
  const [deferredPWAInstallPrompt, setDeferredPWAInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPWAInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Recovery Program Enrollment & Exclusive Chat Rooms
  const [enrolledTracks, setEnrolledTracks] = useState<TraumaTrack[]>(() => {
    try {
      const saved = localStorage.getItem('haven_enrolled_tracks');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['ptsd']; // Default starts enrolled in their first recovery track
  });
  const [activeChatRoomTrack, setActiveChatRoomTrack] = useState<TraumaTrack | null>(null);

  // Active Tool Modal
  const [activeTool, setActiveTool] = useState<'grounding' | 'breathing' | 'body_scan' | 'reframer' | null>(null);

  // Quotes
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const currentQuote = INSPIRATIONAL_QUOTES[quoteIndex % INSPIRATIONAL_QUOTES.length];

  // Daily Goals & Persistent Progress
  const [goals, setGoals] = useState<DailyGoal[]>(() => {
    try {
      const saved = localStorage.getItem('haven_goals');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_DAILY_GOALS;
  });

  const [completedGoalCount, setCompletedGoalCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('haven_completed_count');
      if (saved) return parseInt(saved, 10);
    } catch (e) {}
    return 1; // Start with 1 so the survivor immediately has their initial comfort gift unlocked!
  });

  // Consistency Streak Tracker State
  const [streakData, setStreakData] = useState<ConsistencyStreakData>(() => {
    return loadStreakData(false);
  });

  // Particle celebration trigger signal for 7+ day streaks
  const [particleTriggerSignal, setParticleTriggerSignal] = useState<number>(0);

  const handleTriggerStreakParticle = () => {
    setParticleTriggerSignal((s) => s + 1);
  };

  const handleSetStreakDays = (days: number) => {
    const updated = setCustomStreakDays(days, streakData);
    setStreakData(updated);
    if (days >= 7) {
      setParticleTriggerSignal((s) => s + 1);
    }
  };

  const handleResetStreak = () => {
    const reset = resetStreakData(streakData.iconPreference);
    setStreakData(reset);
  };

  const handleUpdateStreakIconPreference = (icon: StreakIconType) => {
    setStreakData((prev) => {
      const updated = { ...prev, iconPreference: icon };
      saveStreakData(updated);
      return updated;
    });
  };

  const handleScrollToGoals = () => {
    const el = document.getElementById('daily-goals-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Save progress locally
  useEffect(() => {
    try {
      localStorage.setItem('haven_goals', JSON.stringify(goals));
      localStorage.setItem('haven_completed_count', completedGoalCount.toString());
      localStorage.setItem('haven_enrolled_tracks', JSON.stringify(enrolledTracks));
    } catch (e) {}
  }, [goals, completedGoalCount, enrolledTracks]);

  const handleEnrollInTrack = (track: TraumaTrack) => {
    setEnrolledTracks(prev => prev.includes(track) ? prev : [...prev, track]);
  };

  const handleToggleGoal = (id: string) => {
    setGoals((prev) => {
      const updated = prev.map((g) => {
        if (g.id === id) {
          const nextState = !g.completed;
          if (nextState) {
            setCompletedGoalCount((c) => c + 1);
          }
          return { ...g, completed: nextState };
        }
        return g;
      });

      // If at least one goal is completed, update consistency streak for today
      const hasAnyCompleted = updated.some((g) => g.completed);
      if (hasAnyCompleted) {
        setStreakData((prevStreak) => {
          const { updatedData, isFirstToday } = recordGoalCompletionToday(prevStreak);
          if (isFirstToday && updatedData.currentStreak >= 7) {
            setParticleTriggerSignal((s) => s + 1);
          }
          return updatedData;
        });
      }

      return updated;
    });
  };

  const handleAddGoal = (newGoal: DailyGoal) => {
    setGoals((prev) => [newGoal, ...prev]);
  };

  const handleToolCompleted = () => {
    setCompletedGoalCount((c) => c + 1);
  };

  const handleCycleQuote = () => {
    setQuoteIndex((prev) => prev + 1);
  };

  // If Quick-Exit Camouflage is triggered, hide all trauma content immediately
  if (isQuickExitActive) {
    return <QuickExitCamouflage onDeactivate={() => setIsQuickExitActive(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#f7f9f7] text-stone-800 flex flex-col font-sans">
      {/* Top Navigation & Safety Bar */}
      <Header
        activeTrack={activeTrack}
        onSelectTrack={setActiveTrack}
        onTriggerQuickExit={() => setIsQuickExitActive(true)}
        onOpenCrisis={() => setIsCrisisModalOpen(true)}
        isEnrolledInActiveTrack={enrolledTracks.includes(activeTrack)}
        onOpenGroupChat={(track) => setActiveChatRoomTrack(track)}
        onOpenChatbot={() => setIsChatbotOpen(true)}
        onOpenPWAInstall={() => setIsPWAInstallOpen(true)}
        onOpenLaunchGuide={() => setIsLaunchGuideOpen(true)}
      />

      {/* Main Sanctuary Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-4 md:py-6 space-y-5">
        {/* Warm Summit Sunset Navigation Hero with Right-to-Left Scrolling Typography */}
        <HeroBanner activeTrack={activeTrack} />

        {/* Sanctuary Welcome & Navigation Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-sm p-4 rounded-3xl border border-stone-200/80">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Trauma-Informed Safe Space
            </span>
            <h2 className="font-serif-title font-bold text-xl md:text-2xl text-stone-900 mt-0.5">
              Welcome to Your Healing Sanctuary
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Gentle, self-paced recovery for survivors of abuse, coercive control, and trauma.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1.5 p-1 bg-stone-100 rounded-2xl self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'home'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Daily Haven</span>
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'rewards'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Gifts & Badges</span>
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'library'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Reading Library</span>
            </button>
            {activeTrack === 'substance_abuse' && (
              <button
                onClick={() => setActiveTab('reflections')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'reflections'
                    ? 'bg-amber-800 text-white shadow-sm'
                    : 'text-amber-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/70'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>AA & NA Reflections</span>
              </button>
            )}
            {activeTrack === 'sexual_abuse' && (
              <button
                onClick={() => setActiveTab('stories')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'stories'
                    ? 'bg-purple-900 text-white shadow-sm'
                    : 'text-purple-900 bg-purple-50 hover:bg-purple-100/80 border border-purple-200/70'
                }`}
              >
                <Feather className="w-3.5 h-3.5" />
                <span>Survivor Stories</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'community'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Safe Circles</span>
            </button>
          </div>
        </div>

        {/* TAB 1: DAILY HAVEN */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Subtle, Gentle Particle Animation for 7+ Day Streak */}
            <GentleStreakParticleEffect
              isActive={activeTab === 'home'}
              currentStreak={streakData.currentStreak}
              iconPreference={streakData.iconPreference}
              triggerSignal={particleTriggerSignal}
            />

            {/* Daily Inspirational Quote with Serene Visual Backdrop */}
            <DailyQuoteCard
              quote={currentQuote}
              onCycleQuote={handleCycleQuote}
              activeTrack={activeTrack}
            />

            {/* Interactive Somatic Regulation Tools Hub */}
            <InteractiveToolsHub onOpenTool={(tool) => setActiveTool(tool)} />

            {/* Consistency Streak Tracker */}
            <ConsistencyStreakTracker
              streakData={streakData}
              onUpdateIconPreference={handleUpdateStreakIconPreference}
              onScrollToGoals={handleScrollToGoals}
              onTriggerParticleCelebration={handleTriggerStreakParticle}
              onSetStreakDays={handleSetStreakDays}
              onResetStreak={handleResetStreak}
            />

            {/* Mini Daily Goals Section */}
            <div id="daily-goals-container">
              <DailyGoalsSection
                goals={goals}
                activeTrack={activeTrack}
                onToggleGoal={handleToggleGoal}
                onAddGoal={handleAddGoal}
                completedCount={completedGoalCount}
                streakData={streakData}
              />
            </div>

            {/* Sexual Abuse Survivor Stories from thesurvivorstrust.org */}
            {activeTrack === 'sexual_abuse' && (
              <SurvivorsTrustStoriesSection />
            )}

            {/* AA & NA Daily Reflections (Calendar-Driven for Substance Recovery) */}
            {activeTrack === 'substance_abuse' && (
              <DailyReflectionsSection />
            )}

            {/* Milestone Awards Teaser / Preview */}
            <RewardsVault
              activeTrack={activeTrack}
              completedGoalCount={completedGoalCount}
              selectedSubstance={selectedSubstance}
              onSelectSubstance={setSelectedSubstance}
            />
          </div>
        )}

        {/* TAB 2: MILESTONE GIFTS & AWARDS */}
        {activeTab === 'rewards' && (
          <div className="animate-fadeIn">
            <RewardsVault
              activeTrack={activeTrack}
              completedGoalCount={completedGoalCount}
              selectedSubstance={selectedSubstance}
              onSelectSubstance={setSelectedSubstance}
            />
          </div>
        )}

        {/* TAB: AA & NA CALENDAR DAILY REFLECTIONS */}
        {activeTab === 'reflections' && (
          <div className="animate-fadeIn">
            <DailyReflectionsSection />
          </div>
        )}

        {/* TAB: SEXUAL ABUSE SURVIVOR STORIES (thesurvivorstrust.org) */}
        {activeTab === 'stories' && (
          <div className="animate-fadeIn">
            <SurvivorsTrustStoriesSection />
          </div>
        )}

        {/* TAB 3: READING SANCTUARY */}
        {activeTab === 'library' && (
          <div className="animate-fadeIn">
            <ReadingLibrary activeTrack={activeTrack} />
          </div>
        )}

        {/* TAB 4: ANONYMOUS COMMUNITY CIRCLES */}
        {activeTab === 'community' && (
          <div className="animate-fadeIn">
            <AnonymousCommunity
              activeTrack={activeTrack}
              onOpenGroupChat={(track) => setActiveChatRoomTrack(track)}
              isEnrolledInTrack={(track) => enrolledTracks.includes(track)}
            />
          </div>
        )}
      </main>

      {/* Interactive Tool Modals */}
      {activeTool && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          {activeTool === 'grounding' && (
            <Grounding54321
              onClose={() => setActiveTool(null)}
              onComplete={() => {
                handleToolCompleted();
                setActiveTool(null);
              }}
            />
          )}
          {activeTool === 'breathing' && (
            <BoxBreathing
              onClose={() => setActiveTool(null)}
              onComplete={() => {
                handleToolCompleted();
                setActiveTool(null);
              }}
            />
          )}
          {activeTool === 'body_scan' && (
            <SomaticBodyScan
              onClose={() => setActiveTool(null)}
              onComplete={() => {
                handleToolCompleted();
                setActiveTool(null);
              }}
            />
          )}
          {activeTool === 'reframer' && (
            <ThoughtReframer
              onClose={() => setActiveTool(null)}
              onComplete={() => {
                handleToolCompleted();
                setActiveTool(null);
              }}
            />
          )}
        </div>
      )}

      {/* Immediate Crisis Modal */}
      {isCrisisModalOpen && (
        <CrisisModal onClose={() => setIsCrisisModalOpen(false)} />
      )}

      {/* Dedicated Trauma Group Chat Modal with Gated Access */}
      {activeChatRoomTrack && (
        <TraumaGroupChatModal
          track={activeChatRoomTrack}
          isEnrolled={enrolledTracks.includes(activeChatRoomTrack)}
          onEnrollAndEnter={(track) => {
            handleEnrollInTrack(track);
          }}
          onClose={() => setActiveChatRoomTrack(null)}
        />
      )}

      {/* Step 2: Mobile PWA Install Modal */}
      <PWAInstallModal
        isOpen={isPWAInstallOpen}
        onClose={() => setIsPWAInstallOpen(false)}
        deferredPrompt={deferredPWAInstallPrompt}
        onPromptHandled={() => setDeferredPWAInstallPrompt(null)}
      />

      {/* Step 3: Production Launch & Custom Domain Guide Modal */}
      <LaunchGuideModal
        isOpen={isLaunchGuideOpen}
        onClose={() => setIsLaunchGuideOpen(false)}
        onOpenPWAInstall={() => setIsPWAInstallOpen(true)}
      />

      {/* Haven Companion AI Chatbot Modal */}
      <HavenChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTool={(tool) => setActiveTool(tool)}
        onOpenCrisis={() => setIsCrisisModalOpen(true)}
        onTriggerQuickExit={() => setIsQuickExitActive(true)}
        onOpenGroupChat={(track) => setActiveChatRoomTrack(track)}
      />

      {/* Floating Haven AI Companion Button */}
      <aside aria-label="Haven Companion quick access" className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-none">
        <div className="text-[11px] sm:text-xs font-semibold text-emerald-800 bg-white/95 border border-emerald-300 shadow-md px-3 py-1 rounded-full animate-slow-flash mb-1.5 backdrop-blur-xs select-none">
          Got a question? Ask your chat companion.
        </div>
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="pointer-events-auto bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 hover:from-emerald-900 hover:to-slate-950 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-xl border border-emerald-500/40 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group backdrop-blur-sm"
          title="Open Haven AI Companion for emotional support, grounding, and app navigation"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-emerald-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-emerald-200" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold leading-tight flex items-center gap-1 text-white">
              <span>Haven Companion</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </span>
            <span className="text-[10px] text-emerald-200/90 leading-tight">
              Support & In-App Guide
            </span>
          </div>
        </button>
      </aside>

      {/* Sanctuary Footer */}
      <footer className="mt-auto border-t border-stone-200/80 bg-white/70 py-6 text-center text-xs text-stone-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Feather className="w-4 h-4 text-emerald-700" />
            <span className="font-serif-title font-medium text-stone-700">Haven Recovery Sanctuary</span>
            <span>• Free to the public</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsPWAInstallOpen(true)}
              className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Install App (PWA)</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setIsLaunchGuideOpen(true)}
              className="text-amber-800 hover:text-amber-900 font-semibold flex items-center gap-1"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Launch Suite (Step 3)</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setIsCrisisModalOpen(true)}
              className="text-rose-700 hover:underline font-medium"
            >
              Emergency Helplines (988 / RAINN)
            </button>
            <span>•</span>
            <button
              onClick={() => setIsQuickExitActive(true)}
              className="text-stone-700 hover:text-black font-semibold"
            >
              Quick Exit (Disguise Screen)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
