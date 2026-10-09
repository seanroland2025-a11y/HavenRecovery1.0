import React, { useState, useEffect } from 'react';
import { SurvivorStory, SURVIVORS_TRUST_STORIES } from '../data/survivorsTrustStories';
import {
  Heart, Sparkles, ExternalLink, Volume2, VolumeX, Shield,
  ChevronRight, AlertTriangle, BookOpen, CheckCircle, Feather, Phone
} from 'lucide-react';

export const SurvivorsTrustStoriesSection: React.FC = () => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>(SURVIVORS_TRUST_STORIES[0].id);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [reactionCounts, setReactionCounts] = useState<Record<string, number>>({
    'st-story-1': 48,
    'st-story-2': 39,
    'st-story-3': 56,
    'st-story-4': 62
  });
  const [hasReacted, setHasReacted] = useState<Record<string, boolean>>({});

  const currentStory = SURVIVORS_TRUST_STORIES.find(s => s.id === selectedStoryId) || SURVIVORS_TRUST_STORIES[0];

  const handleToggleReaction = (id: string) => {
    setReactionCounts(prev => ({
      ...prev,
      [id]: hasReacted[id] ? prev[id] - 1 : prev[id] + 1
    }));
    setHasReacted(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleToggleAudio = () => {
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
    const textToRead = `${currentStory.title}. By ${currentStory.authorLabel}. ${currentStory.excerpt}. ${currentStory.fullNarrative.replace(/\n\n/g, ' ')}. Key takeaway: ${currentStory.keyTakeaway}. Affirmation: ${currentStory.affirmation}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.88; // calm, soothing tempo
    utterance.pitch = 1.0;
    utterance.onend = () => setIsReadingAloud(false);
    utterance.onerror = () => setIsReadingAloud(false);

    window.speechSynthesis.speak(utterance);
    setIsReadingAloud(true);
  };

  // Cancel audio if story changes or component unmounts
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
    }
  }, [selectedStoryId]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200/80 my-5 animate-fadeIn">
      {/* Header with Attribution to thesurvivorstrust.org */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-100 text-purple-900 shadow-2xs">
              <Feather className="w-4 h-4 text-purple-700" />
            </span>
            <h2 className="font-serif-title text-xl font-bold text-stone-900">
              Sexual Abuse Survivor Stories & Voices
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Real survivor journeys of courage and recovery, in partnership with{' '}
            <a
              href="https://www.thesurvivorstrust.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700 font-semibold hover:underline inline-flex items-center gap-0.5"
            >
              The Survivors Trust (thesurvivorstrust.org)
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </p>
        </div>

        {/* Agency Helpline Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 text-xs self-start sm:self-auto">
          <Phone className="w-3.5 h-3.5 text-purple-700" />
          <span className="font-medium">The Survivors Trust Helpline:</span>
          <span className="font-bold">08088 010 818</span>
        </div>
      </div>

      {/* Gentle Trigger Warning & Pacing Guidance */}
      <div className="my-4 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">A Gentle Note on Reading: </span>
          <span>
            These stories celebrate survival, resilience, and reclaiming bodily autonomy. Take your time, breathe deeply, and pause whenever your nervous system needs rest.
          </span>
        </div>
      </div>

      {/* Horizontal Story Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
        {SURVIVORS_TRUST_STORIES.map((story) => {
          const isSelected = story.id === selectedStoryId;
          return (
            <button
              key={story.id}
              onClick={() => setSelectedStoryId(story.id)}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-purple-900 text-white border-purple-900 shadow-sm'
                  : 'bg-stone-50 hover:bg-stone-100/80 border-stone-200 text-stone-800'
              }`}
            >
              <div>
                <span className={`text-[10px] font-semibold uppercase tracking-wider block mb-1 ${
                  isSelected ? 'text-purple-200' : 'text-purple-800'
                }`}>
                  {story.timeline}
                </span>
                <h4 className="font-serif-title font-bold text-xs line-clamp-2 leading-snug">
                  {story.title}
                </h4>
              </div>
              <span className={`text-[11px] mt-2 font-sans truncate ${
                isSelected ? 'text-purple-200/80' : 'text-stone-500'
              }`}>
                {story.authorLabel.split(',')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Story Detailed View */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-stone-50 border border-purple-200/80 shadow-xs">
        {/* Story Title & Audio Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-semibold border border-purple-200">
                {currentStory.focusArea}
              </span>
              <span className="text-xs text-stone-500">
                • {currentStory.authorLabel}
              </span>
            </div>
            <h3 className="font-serif-title font-bold text-xl md:text-2xl text-stone-900 leading-tight">
              {currentStory.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Audio Listen Aloud Button */}
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isReadingAloud
                  ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                  : 'bg-white hover:bg-purple-50 text-purple-900 border-purple-200'
              }`}
              title="Listen to story read gently aloud"
            >
              {isReadingAloud ? <VolumeX className="w-3.5 h-3.5 text-rose-700" /> : <Volume2 className="w-3.5 h-3.5 text-purple-700" />}
              <span>{isReadingAloud ? 'Stop Audio' : 'Listen to Story'}</span>
            </button>

            {/* Survivor Validation Reaction */}
            <button
              onClick={() => handleToggleReaction(currentStory.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                hasReacted[currentStory.id]
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white hover:bg-rose-50 text-rose-900 border-rose-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasReacted[currentStory.id] ? 'fill-current' : ''}`} />
              <span>{reactionCounts[currentStory.id]} Validated</span>
            </button>
          </div>
        </div>

        {/* Highlighted Excerpt Callout */}
        <div className="p-4 rounded-2xl bg-white/90 border border-purple-200 shadow-2xs mb-5">
          <p className="font-serif-title italic text-sm md:text-base text-purple-950 leading-relaxed">
            "{currentStory.excerpt}"
          </p>
        </div>

        {/* Full Narrative Text */}
        <div className="space-y-3.5 text-stone-700 text-sm leading-relaxed font-sans mb-6">
          {currentStory.fullNarrative.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Key Survivor Takeaway & Affirmation Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-purple-200/80">
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
            <span className="font-bold text-emerald-900 block mb-1 uppercase tracking-wide text-[11px] flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>Key Survivor Takeaway:</span>
            </span>
            <p className="text-emerald-950 leading-relaxed font-medium">
              {currentStory.keyTakeaway}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-100/70 border border-purple-200 text-xs">
            <span className="font-bold text-purple-900 block mb-1 uppercase tracking-wide text-[11px] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <span>Sacred Affirmation:</span>
            </span>
            <p className="font-serif-title italic text-purple-950 text-sm">
              "{currentStory.affirmation}"
            </p>
          </div>
        </div>

        {/* Source Citation & Outbound Link to thesurvivorstrust.org */}
        <div className="mt-5 pt-3 border-t border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-stone-500">
          <span>{currentStory.sourceAttribution}</span>
          <a
            href={currentStory.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 font-semibold hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Visit The Survivors Trust (thesurvivorstrust.org)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
