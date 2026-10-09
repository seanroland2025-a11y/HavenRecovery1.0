import React, { useState } from 'react';
import { TraumaTrack, SubstanceType, StuffedAnimal, CourageBadge, RecoveryCoin } from '../types';
import { STUFFED_ANIMALS, COURAGE_BADGES, RECOVERY_COINS } from '../data/rewards';
import { Gift, Shield, Award, Sparkles, Heart, Share2, Check, Lock, Rotate3d, Compass } from 'lucide-react';

interface RewardsVaultProps {
  activeTrack: TraumaTrack;
  completedGoalCount: number;
  selectedSubstance: SubstanceType;
  onSelectSubstance: (substance: SubstanceType) => void;
}

export const RewardsVault: React.FC<RewardsVaultProps> = ({
  activeTrack,
  completedGoalCount,
  selectedSubstance,
  onSelectSubstance,
}) => {
  const [selectedPlush, setSelectedPlush] = useState<StuffedAnimal | null>(null);
  const [snuggleCount, setSnuggleCount] = useState<Record<string, number>>({});
  const [selectedBadge, setSelectedBadge] = useState<CourageBadge | null>(null);
  const [badgeCopied, setBadgeCopied] = useState(false);
  const [flippedCoinId, setFlippedCoinId] = useState<string | null>(null);

  const substanceNames: Record<SubstanceType, string> = {
    alcohol: 'Alcohol Recovery',
    opioids: 'Opioid Recovery',
    stimulants: 'Stimulant Recovery',
    sedatives: 'Sedative / Benzodiazepine Recovery',
    cannabis: 'Cannabis Recovery',
    prescription: 'Prescription Drug Recovery',
    polysubstance: 'Polysubstance Recovery',
    nicotine: 'Nicotine Recovery'
  };

  const handleSnuggle = (plush: StuffedAnimal) => {
    setSnuggleCount((prev) => ({
      ...prev,
      [plush.id]: (prev[plush.id] || 0) + 1
    }));
  };

  const handleShareBadge = (badge: CourageBadge) => {
    const text = `🛡️ I earned the "${badge.title}" Courage Badge in Haven: "${badge.shareableCardQuote}" — Proud of this healing step.`;
    navigator.clipboard?.writeText(text);
    setBadgeCopied(true);
    setTimeout(() => setBadgeCopied(false), 2500);
  };

  // Determine unlocked status dynamically based on completed goals
  const stuffedAnimalsWithStatus = STUFFED_ANIMALS.map(a => ({
    ...a,
    unlocked: completedGoalCount >= a.unlockThreshold
  }));

  const badgesWithStatus = COURAGE_BADGES.map(b => ({
    ...b,
    unlocked: completedGoalCount >= b.unlockThreshold
  }));

  const coinsWithStatus = RECOVERY_COINS.map(c => ({
    ...c,
    unlocked: completedGoalCount >= c.daysRequired
  }));

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
              <Gift className="w-4 h-4" />
            </span>
            <h2 className="font-serif-title text-xl font-semibold text-stone-900">
              Sanctuary Gifts & Milestone Awards
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Gifts uniquely tailored to your specific trauma recovery path.
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
          ⭐ {completedGoalCount} Mini Goals Accomplished
        </div>
      </div>

      {/* SECTION 1: Cute Stuffed Animals for Stockholm Syndrome & Sexual Abuse */}
      {(activeTrack === 'stockholm' || activeTrack === 'sexual_abuse') && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-rose-500 fill-current" />
            <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-wide">
              Cute Stuffed Animals (Comfort & Bodily Sovereignty)
            </h3>
          </div>
          <p className="text-xs text-stone-500 mb-4">
            Unconditional gentleness. Your stuffed animal companions never demand anything from you. Click to hug and receive soothing affirmations.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {stuffedAnimalsWithStatus.map((plush) => {
              const snuggles = snuggleCount[plush.id] || 0;
              return (
                <div
                  key={plush.id}
                  onClick={() => plush.unlocked && setSelectedPlush(plush)}
                  className={`relative p-4 rounded-2xl border text-center transition-all ${
                    plush.unlocked
                      ? 'cursor-pointer hover:shadow-md bg-stone-50 hover:bg-white border-stone-200'
                      : 'opacity-50 bg-stone-100/60 border-dashed border-stone-300 cursor-not-allowed'
                  }`}
                >
                  <div className="text-4xl mb-2 filter drop-shadow-sm select-none">
                    {plush.imageEmoji}
                  </div>

                  <h4 className="font-serif-title font-semibold text-sm text-stone-900 truncate">
                    {plush.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 truncate">
                    {plush.species}
                  </p>

                  <div className="mt-2 text-[10px] font-semibold">
                    {plush.unlocked ? (
                      <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Unlocked • {snuggles} Hugs
                      </span>
                    ) : (
                      <span className="text-stone-400 flex items-center justify-center gap-1">
                        <Lock className="w-3 h-3" /> Needs {plush.unlockThreshold} goals
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Plushie Interaction Modal */}
          {selectedPlush && (
            <div className="mt-4 p-5 rounded-3xl bg-gradient-to-r from-amber-50/80 via-rose-50/60 to-pink-50/80 border border-rose-200 flex flex-col sm:flex-row items-center gap-5 animate-fadeIn">
              <div className="text-6xl p-4 bg-white rounded-3xl shadow-md border border-rose-100 select-none">
                {selectedPlush.imageEmoji}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h4 className="font-serif-title font-bold text-lg text-stone-900">
                    {selectedPlush.name} the {selectedPlush.species}
                  </h4>
                  <span className="text-xs bg-rose-200/80 text-rose-900 px-2 py-0.5 rounded-full font-medium">
                    {selectedPlush.title}
                  </span>
                </div>

                <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                  {selectedPlush.comfortMessage}
                </p>

                <div className="mt-2 p-2 bg-white/70 rounded-xl text-xs text-rose-900 font-serif-title italic">
                  {selectedPlush.soundAffirmation}
                </div>

                <div className="mt-3 flex items-center justify-center sm:justify-start gap-3">
                  <button
                    onClick={() => handleSnuggle(selectedPlush)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-transform active:scale-95"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Hug & Snuggle ({snuggleCount[selectedPlush.id] || 0})</span>
                  </button>

                  <button
                    onClick={() => setSelectedPlush(null)}
                    className="text-xs text-stone-500 hover:text-stone-700"
                  >
                    Put back on shelf
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: Courage Badges for PTSD Survivors */}
      {activeTrack === 'ptsd' && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-wide">
              Courage Badges (Shareable Emblems of Grounding)
            </h3>
          </div>
          <p className="text-xs text-stone-500 mb-4">
            Forged in the fire of perseverance. Click any unlocked emblem to generate and share a personalized Courage Card with trusted friends.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {badgesWithStatus.map((badge) => {
              return (
                <div
                  key={badge.id}
                  onClick={() => badge.unlocked && setSelectedBadge(badge)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    badge.unlocked
                      ? 'cursor-pointer hover:shadow-md bg-stone-50 hover:bg-white border-stone-200'
                      : 'opacity-50 bg-stone-100/60 border-dashed border-stone-300 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl mb-2">{badge.symbol}</span>
                    {badge.unlocked ? (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                        Earned
                      </span>
                    ) : (
                      <span className="text-[10px] text-stone-400 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> {badge.unlockThreshold} goals
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif-title font-bold text-sm text-stone-900 mt-1">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-emerald-700 font-medium">
                    "{badge.motto}"
                  </p>
                  <p className="text-[11px] text-stone-600 mt-1 line-clamp-2">
                    {badge.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Badge Share Modal */}
          {selectedBadge && (
            <div className="mt-4 p-6 rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white shadow-xl animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedBadge.symbol}</span>
                  <div>
                    <h4 className="font-serif-title font-bold text-base text-emerald-200">
                      {selectedBadge.title}
                    </h4>
                    <p className="text-xs text-emerald-400/90 font-sans">
                      {selectedBadge.motto}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedBadge(null)}
                  className="text-stone-400 hover:text-white text-xs"
                >
                  ✕ Close
                </button>
              </div>

              <div className="py-4">
                <p className="font-serif-title text-sm italic text-emerald-100 leading-relaxed">
                  "{selectedBadge.shareableCardQuote}"
                </p>
                <p className="text-xs text-emerald-300/80 mt-2">
                  — Verified Grounding Milestone from Haven Recovery Sanctuary
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => handleShareBadge(selectedBadge)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-xs font-semibold shadow-sm transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{badgeCopied ? 'Card Copied to Clipboard!' : 'Share Card with a Friend'}</span>
                </button>

                <span className="text-[11px] text-stone-400">
                  Private & Safe
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: Recovery Coins for Substance Abuse Survivors */}
      {activeTrack === 'substance_abuse' && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-wide">
                Cool Recovery Coins (Tailored Substance Statements)
              </h3>
            </div>

            {/* Substance Selector Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">Substance:</span>
              <select
                value={selectedSubstance}
                onChange={(e) => onSelectSubstance(e.target.value as SubstanceType)}
                className="text-xs px-2.5 py-1.5 rounded-xl border border-stone-300 bg-stone-50 font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {Object.entries(substanceNames).map(([key, name]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-xs text-stone-500 mb-4">
            Click any coin to flip it in 3D and read the custom engraved statement for {substanceNames[selectedSubstance]}.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {coinsWithStatus.map((coin) => {
              const isFlipped = flippedCoinId === coin.id;
              const specificMessage = coin.specificSubstanceMessages[selectedSubstance];

              const metalColors = {
                bronze: 'from-amber-700 via-yellow-800 to-amber-900 border-amber-600 text-amber-100',
                silver: 'from-slate-400 via-zinc-200 to-slate-500 border-zinc-300 text-slate-900',
                gold: 'from-amber-300 via-yellow-400 to-amber-500 border-yellow-200 text-amber-950',
                amethyst: 'from-purple-800 via-violet-600 to-indigo-900 border-purple-400 text-purple-100',
                obsidian: 'from-stone-900 via-neutral-800 to-black border-stone-600 text-stone-100'
              };

              return (
                <div
                  key={coin.id}
                  onClick={() => coin.unlocked && setFlippedCoinId(isFlipped ? null : coin.id)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    coin.unlocked
                      ? 'cursor-pointer hover:shadow-lg bg-stone-50'
                      : 'opacity-50 bg-stone-100/60 border-dashed border-stone-300 cursor-not-allowed'
                  }`}
                >
                  {/* 3D Coin Graphic */}
                  <div className="w-24 h-24 mx-auto my-2 rounded-full relative shadow-md p-1.5 flex items-center justify-center transition-transform hover:scale-105">
                    <div
                      className={`w-full h-full rounded-full bg-gradient-to-br ${metalColors[coin.metalFinish]} border-2 flex flex-col items-center justify-center p-2 shadow-inner text-center`}
                    >
                      <span className="text-[10px] font-bold tracking-widest uppercase">
                        {isFlipped ? 'REVERSE' : coin.milestone}
                      </span>
                      <span className="text-[9px] font-extrabold uppercase mt-0.5 leading-tight">
                        {isFlipped ? coin.backStatement : coin.frontStatement}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-serif-title font-bold text-xs text-stone-900 mt-2">
                    {coin.milestone} Milestone
                  </h4>

                  <p className="text-[10px] text-stone-500 mt-0.5">
                    {coin.unlocked ? (
                      <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1">
                        <Rotate3d className="w-3 h-3" /> Tap to Flip
                      </span>
                    ) : (
                      `Needs ${coin.daysRequired} daily goals`
                    )}
                  </p>

                  {/* Engraved Statement Preview */}
                  {coin.unlocked && (
                    <div className="mt-2 p-2 bg-stone-100/90 rounded-xl text-[11px] text-stone-700 font-serif-title italic leading-tight text-left">
                      "{specificMessage}"
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
