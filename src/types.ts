export type TraumaTrack = 'ptsd' | 'stockholm' | 'sexual_abuse' | 'substance_abuse';

export type SubstanceType =
  | 'alcohol'
  | 'opioids'
  | 'stimulants'
  | 'sedatives'
  | 'cannabis'
  | 'prescription'
  | 'polysubstance'
  | 'nicotine';

export interface DailyGoal {
  id: string;
  track: TraumaTrack | 'all';
  title: string;
  description: string;
  category: 'mindfulness' | 'grounding' | 'boundaries' | 'self-compassion' | 'sobriety';
  completed: boolean;
  points: number;
  streakCount?: number;
}

export type StreakIconType = 'flame' | 'heart';

export interface ConsistencyStreakData {
  currentStreak: number;
  longestStreak: number;
  completedDates: string[];
  iconPreference: StreakIconType;
  isCompletedToday: boolean;
  streakStatus: 'completed_today' | 'pending_today' | 'fresh_start';
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  source?: string;
  traumaFocus: TraumaTrack | 'general';
  bgGradient: string;
  bgImageUrl?: string;
  reflectionQuestion: string;
  gentleAffirmation: string;
}

export type GiftType = 'stuffed_animal' | 'courage_badge' | 'recovery_coin';

export interface StuffedAnimal {
  id: string;
  name: string;
  species: string;
  title: string;
  unlockThreshold: number; // goals completed
  unlocked: boolean;
  imageEmoji: string;
  colorScheme: string;
  comfortMessage: string;
  snuggleLevel: number;
  specialTrauma: 'stockholm' | 'sexual_abuse';
  soundAffirmation: string;
}

export interface CourageBadge {
  id: string;
  title: string;
  motto: string;
  symbol: string;
  description: string;
  unlockThreshold: number;
  unlocked: boolean;
  themeColor: string;
  shareableCardQuote: string;
}

export interface RecoveryCoin {
  id: string;
  milestone: string; // "24 Hours", "1 Week", "1 Month", "90 Days", "6 Months", "1 Year"
  daysRequired: number;
  unlocked: boolean;
  frontStatement: string;
  backStatement: string;
  metalFinish: 'bronze' | 'silver' | 'gold' | 'amethyst' | 'obsidian';
  specificSubstanceMessages: Record<SubstanceType, string>;
}

export interface BookResource {
  id: string;
  title: string;
  author: string;
  coverColor: string;
  iconName: string;
  description: string;
  primaryTrack: TraumaTrack | 'general';
  keyTakeaway: string;
  triggerRating: 'Mild' | 'Moderate' | 'Heavy (Read with care)';
  triggerWarningNote: string;
  purchaseLinks: {
    name: string;
    url: string;
    type: 'indie' | 'library' | 'audio' | 'general';
  }[];
}

export interface CommunityMessage {
  id: string;
  authorAlias: string;
  avatarSeed: string;
  avatarBg: string;
  track: TraumaTrack | 'general';
  content: string;
  timestamp: string;
  likes: number;
  likedByMe: boolean;
  hugs: number;
  huggedByMe: boolean;
  triggerWarning?: string;
  isModeratorNote?: boolean;
}
