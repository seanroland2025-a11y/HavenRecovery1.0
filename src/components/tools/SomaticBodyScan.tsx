import React, { useState } from 'react';
import { Activity, Sparkles, Check, Heart, ShieldAlert } from 'lucide-react';

interface BodyZone {
  id: string;
  name: string;
  traumaPattern: string;
  symptom: string;
  releaseExercise: string;
  affirmation: string;
}

export const SomaticBodyScan: React.FC<{ onClose: () => void; onComplete: () => void }> = ({ onClose, onComplete }) => {
  const [selectedZone, setSelectedZone] = useState<string>('jaw');
  const [releasedZones, setReleasedZones] = useState<string[]>([]);

  const zones: BodyZone[] = [
    {
      id: 'jaw',
      name: 'Jaw, Throat & Voice',
      traumaPattern: 'Unspoken truths, suppressed cries, or habitual "fawn" smiling to placate an abuser.',
      symptom: 'Clenching teeth, lump in throat, tension around temples and lips.',
      releaseExercise: 'Part your lips slightly. Move your lower jaw gently left to right 3 times. Exhale with a soft, audible hum like "Voo" or "Mmm".',
      affirmation: 'My voice is worthy. I am allowed to speak my truth or remain quietly sovereign.'
    },
    {
      id: 'shoulders',
      name: 'Shoulders & Neck',
      traumaPattern: 'Carrying the burden of walking on eggshells, braced for an explosion or assault.',
      symptom: 'Shoulders pulled up toward ears, rigid neck, headache at skull base.',
      releaseExercise: 'Inhale and intentionally squeeze shoulders all the way to your ears for 3 seconds. On the exhale, drop them completely with a heavy sigh.',
      affirmation: 'I set down the responsibility for other people’s emotional volatility.'
    },
    {
      id: 'chest',
      name: 'Chest & Heart Center',
      traumaPattern: 'Betrayal trauma, broken trust, Stockholm bonding panic, and shallow fear breathing.',
      symptom: 'Tight band across ribs, rapid shallow breath, feeling guarded or hollow.',
      releaseExercise: 'Place one warm hand over your sternum. Feel the gentle rise and fall. Whisper: "I am safe in this room right now."',
      affirmation: 'My heart has survived immense cruelty, and its gentle pulse is still mine.'
    },
    {
      id: 'stomach',
      name: 'Gut & Solar Plexus',
      traumaPattern: 'The "pit of dread" (visceral fight-or-flight enteric nervous system alarm).',
      symptom: 'Knot in stomach, nausea, hypervigilant contraction, nervous tremors.',
      releaseExercise: 'Gently rub your belly clockwise with soft flat palm. Allow your belly to push outward softly on the inhale without holding it in.',
      affirmation: 'The ancient danger has passed. My body has permission to soften.'
    },
    {
      id: 'hands_feet',
      name: 'Hands, Pelvis & Feet',
      traumaPattern: 'Fight/Flight immobilization (freeze response) or sexual trauma boundary violations.',
      symptom: 'Numb fingers, cold toes, pelvis guarded/locked, disconnected from ground.',
      releaseExercise: 'Press your bare feet firmly into the floor. Wiggle your toes. Touch something textured. Feel gravity holding you securely.',
      affirmation: 'The earth welcomes and holds my full weight. I belong here.'
    }
  ];

  const currentZone = zones.find(z => z.id === selectedZone) || zones[0];

  const handleMarkReleased = (id: string) => {
    if (!releasedZones.includes(id)) {
      const updated = [...releasedZones, id];
      setReleasedZones(updated);
      if (updated.length >= 3) {
        onComplete();
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-stone-200 animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          <span className="text-xs font-semibold tracking-wider uppercase text-indigo-900">Somatic Tension Release</span>
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-700 text-sm font-medium p-1 rounded-lg"
        >
          ✕ Close
        </button>
      </div>

      <p className="text-xs text-stone-500 mb-4">
        Trauma lives in physical tissue. Select where you feel tension to unlock somatic relief.
      </p>

      {/* Body Selector Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {zones.map((zone) => {
          const isReleased = releasedZones.includes(zone.id);
          const isSelected = selectedZone === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(zone.id)}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-indigo-700 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {isReleased && <Check className="w-3 h-3 text-emerald-400" />}
              <span>{zone.name.split(',')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Zone Details Card */}
      <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 mb-5 text-left">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-serif-title font-semibold text-lg text-indigo-950">
            {currentZone.name}
          </h3>
          {releasedZones.includes(currentZone.id) ? (
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
              <Check className="w-3 h-3" /> Softened
            </span>
          ) : (
            <span className="text-xs text-stone-500">Unreleased</span>
          )}
        </div>

        <div className="mb-3">
          <span className="text-xs font-semibold text-indigo-800 uppercase tracking-wider block mb-1">Trauma Echo:</span>
          <p className="text-xs text-stone-700 leading-relaxed">
            {currentZone.traumaPattern}
          </p>
        </div>

        <div className="mb-3 p-3 bg-white/80 rounded-xl border border-indigo-100">
          <span className="text-xs font-semibold text-indigo-900 uppercase tracking-wider block mb-1">
            🌱 Guided Somatic Micro-Release:
          </span>
          <p className="text-xs font-medium text-stone-800 leading-relaxed">
            {currentZone.releaseExercise}
          </p>
        </div>

        <div className="text-xs italic text-indigo-800/90 bg-indigo-100/40 p-2 rounded-lg">
          "{currentZone.affirmation}"
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => handleMarkReleased(currentZone.id)}
          className="flex-1 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-indigo-200" />
          <span>I have practiced releasing this zone</span>
        </button>
      </div>

      {releasedZones.length > 0 && (
        <p className="text-xs text-center text-stone-500 mt-3">
          {releasedZones.length} of {zones.length} tension centers softened today.
        </p>
      )}
    </div>
  );
};
