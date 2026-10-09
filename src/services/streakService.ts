export type StreakIconType = 'flame' | 'heart';

export interface ConsistencyStreakData {
  currentStreak: number;
  longestStreak: number;
  completedDates: string[]; // YYYY-MM-DD
  iconPreference: StreakIconType;
  isCompletedToday: boolean;
  streakStatus: 'completed_today' | 'pending_today' | 'fresh_start';
}

export interface DayTrailItem {
  dateStr: string;
  dayLabel: string;
  dateNumber: number;
  isToday: boolean;
  isCompleted: boolean;
}

const STORAGE_KEY = 'haven_consistency_streak';

/**
 * Returns YYYY-MM-DD formatted string in local time
 */
export const getLocalDateString = (d: Date = new Date()): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Returns YYYY-MM-DD formatted string for N days in past
 */
export const getDaysAgoDateString = (daysAgo: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return getLocalDateString(d);
};

/**
 * Calculates current consecutive streak from an array of completed YYYY-MM-DD dates
 */
export const calculateStreakMetrics = (
  dates: string[],
  iconPref: StreakIconType = 'flame'
): ConsistencyStreakData => {
  const uniqueDates = Array.from(new Set(dates));
  const todayStr = getLocalDateString();
  const yesterdayStr = getDaysAgoDateString(1);

  const isCompletedToday = uniqueDates.includes(todayStr);

  let currentStreak = 0;
  let streakStatus: 'completed_today' | 'pending_today' | 'fresh_start' = 'fresh_start';

  if (isCompletedToday) {
    // Count consecutive days backwards starting from today
    let daysBack = 0;
    while (uniqueDates.includes(getDaysAgoDateString(daysBack))) {
      daysBack++;
    }
    currentStreak = daysBack;
    streakStatus = 'completed_today';
  } else if (uniqueDates.includes(yesterdayStr)) {
    // Active streak from yesterday waiting to be extended today
    let daysBack = 1;
    while (uniqueDates.includes(getDaysAgoDateString(daysBack))) {
      daysBack++;
    }
    currentStreak = daysBack - 1;
    streakStatus = 'pending_today';
  } else {
    currentStreak = 0;
    streakStatus = 'fresh_start';
  }

  // Calculate longest historical streak
  let longestStreak = currentStreak;
  if (uniqueDates.length > 0) {
    const sorted = [...uniqueDates].sort();
    let tempStreak = 1;
    let maxFound = 1;
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1]).getTime();
      const curr = new Date(sorted[i]).getTime();
      const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempStreak++;
        if (tempStreak > maxFound) maxFound = tempStreak;
      } else if (diffDays > 1) {
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, maxFound);
  }

  return {
    currentStreak,
    longestStreak,
    completedDates: uniqueDates,
    iconPreference: iconPref,
    isCompletedToday,
    streakStatus,
  };
};

/**
 * Retrieves saved streak data from localStorage with graceful initial seeding
 */
export const loadStreakData = (initialHasCompletedGoal: boolean = false): ConsistencyStreakData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return calculateStreakMetrics(parsed.completedDates || [], parsed.iconPreference || 'flame');
    }
  } catch (e) {
    console.error('Failed to parse streak data', e);
  }

  // If no saved streak, honor existing session progress gracefully
  const todayStr = getLocalDateString();
  const initialDates: string[] = [];

  if (initialHasCompletedGoal) {
    // Seed with yesterday and today so survivor feels validated
    initialDates.push(getDaysAgoDateString(2), getDaysAgoDateString(1), todayStr);
  } else {
    // Seed with yesterday and day before to give a 2-day warm start awaiting today's step!
    initialDates.push(getDaysAgoDateString(2), getDaysAgoDateString(1));
  }

  const initialMetrics = calculateStreakMetrics(initialDates, 'flame');
  saveStreakData(initialMetrics);
  return initialMetrics;
};

/**
 * Saves streak data to localStorage
 */
export const saveStreakData = (data: ConsistencyStreakData): void => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        completedDates: data.completedDates,
        iconPreference: data.iconPreference,
        longestStreak: data.longestStreak,
      })
    );
  } catch (e) {
    console.error('Failed to save streak data', e);
  }
};

/**
 * Record a goal completion for today
 */
export const recordGoalCompletionToday = (
  prevData: ConsistencyStreakData
): { updatedData: ConsistencyStreakData; isFirstToday: boolean } => {
  const todayStr = getLocalDateString();
  const alreadyCompletedToday = prevData.completedDates.includes(todayStr);

  const updatedDates = alreadyCompletedToday
    ? prevData.completedDates
    : [...prevData.completedDates, todayStr];

  const updatedMetrics = calculateStreakMetrics(updatedDates, prevData.iconPreference);
  saveStreakData(updatedMetrics);

  return {
    updatedData: updatedMetrics,
    isFirstToday: !alreadyCompletedToday,
  };
};

/**
 * Generates the last 7 days info for the visual calendar trail
 */
export const getPast7DaysTrail = (completedDates: string[]): DayTrailItem[] => {
  const trail: DayTrailItem[] = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = getLocalDateString(d);
    trail.push({
      dateStr,
      dayLabel: days[d.getDay()],
      dateNumber: d.getDate(),
      isToday: i === 0,
      isCompleted: completedDates.includes(dateStr),
    });
  }

  return trail;
};

/**
 * Sets streak to an exact number of consecutive days for demo, testing, or user milestones
 */
export const setCustomStreakDays = (
  days: number,
  prevData: ConsistencyStreakData
): ConsistencyStreakData => {
  const dates: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    dates.push(getDaysAgoDateString(i));
  }
  const updatedMetrics = calculateStreakMetrics(dates, prevData.iconPreference);
  saveStreakData(updatedMetrics);
  return updatedMetrics;
};

/**
 * Resets or restores streak back to default initial state
 */
export const resetStreakData = (iconPref: StreakIconType = 'flame'): ConsistencyStreakData => {
  const initialDates = [getDaysAgoDateString(2), getDaysAgoDateString(1)];
  const initialMetrics = calculateStreakMetrics(initialDates, iconPref);
  saveStreakData(initialMetrics);
  return initialMetrics;
};
