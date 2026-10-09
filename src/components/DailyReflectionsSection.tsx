import React, { useState, useEffect } from 'react';
import { StepReflection, getDailyReflection } from '../data/dailyReflections';
import {
  Calendar, BookOpen, Volume2, VolumeX, Share2, Heart, Sparkles,
  ChevronLeft, ChevronRight, PenTool, CheckCircle2, Flame, RotateCcw
} from 'lucide-react';

export const DailyReflectionsSection: React.FC = () => {
  // Calendar State
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [programModel, setProgramModel] = useState<'aa' | 'na'>('aa');
  const [reflection, setReflection] = useState<StepReflection>(() => getDailyReflection(new Date()));

  // Interactive Tools
  const [journalText, setJournalText] = useState<string>('');
  const [isJournalSaved, setIsJournalSaved] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [showSerenityPrayer, setShowSerenityPrayer] = useState(false);

  // Update reflection when selected date changes
  useEffect(() => {
    const updated = getDailyReflection(selectedDate);
    setReflection(updated);

    // Load saved journal entry for this date if exists
    try {
      const savedJournal = localStorage.getItem(`haven_journal_${updated.dateKey}`);
      if (savedJournal) {
        setJournalText(savedJournal);
      } else {
        setJournalText('');
      }
    } catch (e) {}
  }, [selectedDate]);

  // Handle Text-To-Speech Read Aloud
  const handleToggleReadAloud = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech audio is not supported in this browser.");
      return;
    }

    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = programModel === 'aa'
      ? `${reflection.aaReflection.title}. ${reflection.aaReflection.sourceQuote}. From ${reflection.aaReflection.sourceCitation}. ${reflection.aaReflection.body}. Closing Thought: ${reflection.aaReflection.closingThought}`
      : `${reflection.naJustForToday.title}. ${reflection.naJustForToday.sourceQuote}. From ${reflection.naJustForToday.sourceCitation}. ${reflection.naJustForToday.body}. ${reflection.naJustForToday.justForTodayCommitment}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9; // gentle calm pace
    utterance.pitch = 1.0;
    utterance.onend = () => setIsReadingAloud(false);
    utterance.onerror = () => setIsReadingAloud(false);

    window.speechSynthesis.speak(utterance);
    setIsReadingAloud(true);
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePrevDay = () => {
    setSelectedDate(prev => {
      const next = new Date(prev);
      next.setDate(prev.getDate() - 1);
      return next;
    });
  };

  const handleNextDay = () => {
    setSelectedDate(prev => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + 1);
      return next;
    });
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(`haven_journal_${reflection.dateKey}`, journalText);
      setIsJournalSaved(true);
      setTimeout(() => setIsJournalSaved(false), 2500);
    } catch (e) {}
  };

  const handleCopy = () => {
    const textToCopy = programModel === 'aa'
      ? `📖 AA Daily Reflection for ${reflection.displayDate}\n"${reflection.aaReflection.title}"\n\n"${reflection.aaReflection.sourceQuote}"\n— ${reflection.aaReflection.sourceCitation}\n\n${reflection.aaReflection.body}\n\n🌿 Thought for Today: ${reflection.aaReflection.closingThought}`
      : `📘 NA Just For Today for ${reflection.displayDate}\n"${reflection.naJustForToday.title}"\n\n"${reflection.naJustForToday.sourceQuote}"\n— ${reflection.naJustForToday.sourceCitation}\n\n${reflection.naJustForToday.body}\n\n🌿 ${reflection.naJustForToday.justForTodayCommitment}`;

    navigator.clipboard?.writeText(textToCopy);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2200);
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200/80 my-4 animate-fadeIn">
      {/* Top Header & Fellowship Model Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-900 shadow-2xs">
              <BookOpen className="w-4 h-4 text-amber-700" />
            </span>
            <h2 className="font-serif-title text-xl font-bold text-stone-900">
              12-Step Daily Reflections & Meditations
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Official calendar model from Alcoholics Anonymous (AA) and Narcotics Anonymous (NA).
          </p>
        </div>

        {/* Program Model Switcher (AA vs NA) */}
        <div className="flex items-center p-1 bg-stone-100 rounded-2xl self-start sm:self-auto border border-stone-200">
          <button
            onClick={() => setProgramModel('aa')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              programModel === 'aa'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            AA Daily Reflections
          </button>
          <button
            onClick={() => setProgramModel('na')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              programModel === 'na'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            NA Just For Today
          </button>
        </div>
      </div>

      {/* Calendar Navigation Bar */}
      <div className="py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <span className="text-sm font-serif-title font-bold text-stone-900 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <span>{reflection.displayDate}</span>
          </span>

          {isToday && (
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
              Today's Reading
            </span>
          )}

          <span className="text-xs bg-stone-100 text-stone-600 font-medium px-2.5 py-0.5 rounded-full border border-stone-200">
            Step {reflection.stepNumber} Focus
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrevDay}
            className="p-1.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 text-xs transition-colors"
            title="Previous calendar day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {!isToday && (
            <button
              onClick={handleToday}
              className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              Today
            </button>
          )}

          <button
            onClick={handleNextDay}
            className="p-1.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 text-xs transition-colors"
            title="Next calendar day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Audio Read-Aloud Tool */}
          <button
            onClick={handleToggleReadAloud}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
              isReadingAloud
                ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
            }`}
            title="Listen to reflection spoken gently"
          >
            {isReadingAloud ? <VolumeX className="w-3.5 h-3.5 text-rose-700" /> : <Volume2 className="w-3.5 h-3.5 text-stone-600" />}
            <span>{isReadingAloud ? 'Stop Audio' : 'Listen Aloud'}</span>
          </button>

          {/* Share button */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors"
            title="Copy reflection to share with sponsor or friend"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {hasCopied && (
        <div className="my-2 p-2 rounded-xl bg-emerald-100 text-emerald-900 text-xs text-center font-medium border border-emerald-300 animate-fadeIn">
          Copied reflection gently to clipboard.
        </div>
      )}

      {/* Main Reflection Body Display */}
      <div className="py-5">
        {programModel === 'aa' ? (
          // ALCOHOLICS ANONYMOUS MODEL
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-amber-800 block mb-1">
                AA Daily Reflection • Principle: {reflection.aaReflection.principle}
              </span>
              <h3 className="font-serif-title font-bold text-xl md:text-2xl text-stone-900 leading-tight">
                {reflection.aaReflection.title}
              </h3>
            </div>

            {/* Sacred Source Quote */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <p className="font-serif-title italic text-sm md:text-base text-amber-950 leading-relaxed">
                "{reflection.aaReflection.sourceQuote}"
              </p>
              <p className="text-xs font-sans font-semibold text-amber-800 mt-2 text-right">
                — {reflection.aaReflection.sourceCitation}
              </p>
            </div>

            {/* Deeper Personal Reading */}
            <div className="text-stone-700 text-sm leading-relaxed font-sans space-y-2">
              <p>{reflection.aaReflection.body}</p>
            </div>

            {/* Closing Thought Anchor */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-stone-100 to-amber-50/50 border border-stone-200 text-xs">
              <span className="font-bold text-stone-900 block mb-1 uppercase tracking-wide text-[11px]">
                🌿 Thought for Today:
              </span>
              <p className="font-serif-title italic text-stone-800 text-sm">
                "{reflection.aaReflection.closingThought}"
              </p>
            </div>
          </div>
        ) : (
          // NARCOTICS ANONYMOUS JUST FOR TODAY MODEL
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-teal-800 block mb-1">
                NA Just For Today • Principle: {reflection.naJustForToday.principle}
              </span>
              <h3 className="font-serif-title font-bold text-xl md:text-2xl text-stone-900 leading-tight">
                {reflection.naJustForToday.title}
              </h3>
            </div>

            {/* Basic Text Quote */}
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80">
              <p className="font-serif-title italic text-sm md:text-base text-teal-950 leading-relaxed">
                "{reflection.naJustForToday.sourceQuote}"
              </p>
              <p className="text-xs font-sans font-semibold text-teal-800 mt-2 text-right">
                — {reflection.naJustForToday.sourceCitation}
              </p>
            </div>

            {/* Deeper NA Reading */}
            <div className="text-stone-700 text-sm leading-relaxed font-sans space-y-2">
              <p>{reflection.naJustForToday.body}</p>
            </div>

            {/* Sacred "JUST FOR TODAY" Commitment */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-900 to-emerald-950 text-white shadow-sm">
              <span className="font-bold text-emerald-300 block mb-1 uppercase tracking-wider text-[11px]">
                🌟 Just For Today:
              </span>
              <p className="font-serif-title italic text-emerald-50 text-sm md:text-base leading-relaxed">
                {reflection.naJustForToday.justForTodayCommitment}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Serenity Prayer Quick Anchor */}
      <div className="pt-2 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2">
        <button
          onClick={() => setShowSerenityPrayer(!showSerenityPrayer)}
          className="text-xs text-stone-600 hover:text-emerald-800 font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{showSerenityPrayer ? 'Hide Serenity Prayer' : 'View Serenity Prayer Anchor'}</span>
        </button>

        <span className="text-[11px] text-stone-400">
          Saved locally on your device for absolute privacy.
        </span>
      </div>

      {showSerenityPrayer && (
        <div className="mt-3 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-center animate-fadeIn">
          <p className="font-serif-title text-sm md:text-base text-amber-950 italic leading-relaxed">
            "God, grant me the serenity to accept the things I cannot change,<br/>
            courage to change the things I can,<br/>
            and wisdom to know the difference."
          </p>
          <span className="text-[10px] text-stone-500 block mt-2 font-sans uppercase tracking-wider">
            Living One Day at a Time • Experiencing One Moment at a Time
          </span>
        </div>
      )}

      {/* Private Reflection Journaling Space for Today's Date */}
      <div className="mt-6 pt-5 border-t border-stone-200">
        <div className="flex items-center gap-2 mb-2">
          <PenTool className="w-4 h-4 text-emerald-700" />
          <h4 className="font-serif-title font-bold text-sm text-stone-900">
            Private Journal on Today's Reflection ({reflection.displayDate})
          </h4>
        </div>
        <p className="text-xs text-stone-500 mb-3">
          How does today's reading touch your heart or cravings? Your words are kept strictly private on this device.
        </p>

        <form onSubmit={handleSaveJournal} className="space-y-2">
          <textarea
            rows={3}
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Type your personal reflection, gratitude, or intention for today..."
            className="w-full p-3 rounded-2xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-stone-50 resize-none font-sans"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-stone-400">
              {journalText.length > 0 ? `${journalText.length} characters written` : 'Unwritten'}
            </span>

            <div className="flex items-center gap-2">
              {isJournalSaved && (
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Saved!
                </span>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                Save Private Reflection
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
