import { DailyGoal } from '../types';

export const INITIAL_DAILY_GOALS: DailyGoal[] = [
  // PTSD specific mini goals
  {
    id: 'goal-ptsd-1',
    track: 'ptsd',
    title: '5-Second Horizon Anchor',
    description: 'Look across the room or out a window. Find 3 neutral objects and orient yourself: "I am here, and I am safe right now."',
    category: 'grounding',
    completed: false,
    points: 15,
    streakCount: 0
  },
  {
    id: 'goal-ptsd-2',
    track: 'ptsd',
    title: 'Gentle Shoulder Exhale',
    description: 'Inhale through your nose, drop your shoulders away from your ears, and release a long, sighing exhale.',
    category: 'mindfulness',
    completed: false,
    points: 10,
    streakCount: 0
  },
  {
    id: 'goal-ptsd-3',
    track: 'ptsd',
    title: 'Safe Sensation Check-in',
    description: 'Notice one physical sensation that feels comfortable right now (a soft blanket, warm tea cup, feet touching the floor).',
    category: 'mindfulness',
    completed: false,
    points: 10,
    streakCount: 0
  },

  // Stockholm Syndrome / Coercive Control mini goals
  {
    id: 'goal-stk-1',
    track: 'stockholm',
    title: 'Honor One Personal Preference',
    description: 'Make a small everyday choice purely based on what you desire, without anticipating someone else\'s approval.',
    category: 'boundaries',
    completed: false,
    points: 15,
    streakCount: 0
  },
  {
    id: 'goal-stk-2',
    track: 'stockholm',
    title: 'Distinguish Survival from Love',
    description: 'Whisper this truth to yourself: "Appeasing an abuser was survival, not proof that they were safe or good to me."',
    category: 'self-compassion',
    completed: false,
    points: 20,
    streakCount: 0
  },
  {
    id: 'goal-stk-3',
    track: 'stockholm',
    title: 'Practice Saying "I Need to Think About It"',
    description: 'Give yourself permission to pause before agreeing to any request or demand.',
    category: 'boundaries',
    completed: false,
    points: 15,
    streakCount: 0
  },

  // Sexual Abuse Survivor mini goals
  {
    id: 'goal-sa-1',
    track: 'sexual_abuse',
    title: 'Affirm Body Autonomy',
    description: 'Touch your arm or hand gently with warm intention. Remind yourself: "This skin is mine. I decide who touches me."',
    category: 'self-compassion',
    completed: false,
    points: 20,
    streakCount: 0
  },
  {
    id: 'goal-sa-2',
    track: 'sexual_abuse',
    title: 'Somatic Blanket or Clothing Comfort',
    description: 'Choose clothing or layers today that make your physical form feel protected, cozy, and entirely respected.',
    category: 'grounding',
    completed: false,
    points: 15,
    streakCount: 0
  },
  {
    id: 'goal-sa-3',
    track: 'sexual_abuse',
    title: 'Release One Shred of False Guilt',
    description: 'Say out loud or in your heart: "What happened was never my fault. A child/person is never responsible for abuse."',
    category: 'self-compassion',
    completed: false,
    points: 20,
    streakCount: 0
  },

  // Substance Abuse mini goals
  {
    id: 'goal-sub-1',
    track: 'substance_abuse',
    title: 'The 15-Minute Urge Pause',
    description: 'If an urge arises today, promise yourself 15 minutes of gentle breathing or water before any reaction.',
    category: 'sobriety',
    completed: false,
    points: 25,
    streakCount: 0
  },
  {
    id: 'goal-sub-2',
    track: 'substance_abuse',
    title: 'Hydrate & Nourish the Vessel',
    description: 'Drink a glass of cold water with complete awareness, thanking your body for carrying you forward.',
    category: 'mindfulness',
    completed: false,
    points: 10,
    streakCount: 0
  },
  {
    id: 'goal-sub-3',
    track: 'substance_abuse',
    title: 'One Day, Just for Today',
    description: 'Commit only to this current day. Sobriety is built one single morning, afternoon, and evening at a time.',
    category: 'sobriety',
    completed: false,
    points: 20,
    streakCount: 0
  },

  // Universal Gentle Goals
  {
    id: 'goal-univ-1',
    track: 'all',
    title: 'Complete 3 Minutes of Box Breathing',
    description: 'Use the interactive breathing tool in Haven to bring your heart rate and nervous system back into balance.',
    category: 'grounding',
    completed: false,
    points: 20,
    streakCount: 0
  },
  {
    id: 'goal-univ-2',
    track: 'all',
    title: 'Acknowledge Your Survival Strength',
    description: 'You are alive today against terrifying odds. Acknowledge this monumental victory with quiet reverence.',
    category: 'self-compassion',
    completed: false,
    points: 15,
    streakCount: 0
  }
];
