import { CommunityMessage } from '../types';

export const INITIAL_COMMUNITY_MESSAGES: CommunityMessage[] = [
  {
    id: 'msg-mod-1',
    authorAlias: 'Haven Safety Sentinel',
    avatarSeed: 'shield',
    avatarBg: 'bg-emerald-700',
    track: 'general',
    content: '🛡️ STRICT ANONYMITY & ZERO TOLERANCE NOTICE: Haven is a sacred survivor sanctuary. Never post real names, contact handles, or locations. Victim-blaming, predatory DMs, or boundary violations result in an immediate, irreversible permanent ban. You are safe here.',
    timestamp: 'Pinned Policy',
    likes: 142,
    likedByMe: true,
    hugs: 89,
    huggedByMe: true,
    isModeratorNote: true
  },
  // PTSD Group
  {
    id: 'msg-ptsd-1',
    authorAlias: 'WillowBreeze77',
    avatarSeed: 'fox',
    avatarBg: 'bg-teal-600',
    track: 'ptsd',
    content: 'I had my first night in four months without waking up in a full sweat hypervigilance panic. The 5-4-3-2-1 tool right before bed anchored my feet. To anyone struggling with flashbacks right now: your nervous system will learn peace again.',
    timestamp: '15m ago',
    likes: 24,
    likedByMe: false,
    hugs: 18,
    huggedByMe: false,
  },
  {
    id: 'msg-ptsd-2',
    authorAlias: 'OceanAnchor33',
    avatarSeed: 'anchor',
    avatarBg: 'bg-blue-600',
    track: 'ptsd',
    content: 'Sending love to anyone experiencing somatic tremors or throat tightness today. Place both feet flat on the ground. You survived 100% of the worst days of your life. You are not back in that danger.',
    timestamp: '1h ago',
    likes: 56,
    likedByMe: false,
    hugs: 44,
    huggedByMe: false,
  },
  {
    id: 'msg-ptsd-3',
    authorAlias: 'QuietSentinel92',
    avatarSeed: 'tree',
    avatarBg: 'bg-emerald-600',
    track: 'ptsd',
    content: 'A loud bang outside startled me into fight-or-flight freeze today. Instead of berating myself for "being jumpy", I put my hand on my chest and told my amygdala: "Thank you for trying to protect me, but we are safe in our living room right now."',
    timestamp: '3h ago',
    likes: 38,
    likedByMe: false,
    hugs: 29,
    huggedByMe: false,
  },

  // Stockholm Syndrome Group
  {
    id: 'msg-stk-1',
    authorAlias: 'QuietStarlight14',
    avatarSeed: 'rabbit',
    avatarBg: 'bg-rose-600',
    track: 'stockholm',
    content: 'Today I didn\'t check my abuser\'s social media or obsess over defending them in my head. I hugged Barnaby (my plush bear from Haven) and told myself: "It was survival, not love." It hurts, but it is real freedom.',
    timestamp: '25m ago',
    likes: 31,
    likedByMe: false,
    hugs: 27,
    huggedByMe: false,
  },
  {
    id: 'msg-stk-2',
    authorAlias: 'GentleOak55',
    avatarSeed: 'leaf',
    avatarBg: 'bg-purple-600',
    track: 'stockholm',
    content: 'The trauma bond makes your brain crave the intermittent kindness like a drug. If you are feeling guilt for going No-Contact, remember: healthy love never requires you to sacrifice your sanity.',
    timestamp: '2h ago',
    likes: 47,
    likedByMe: false,
    hugs: 36,
    huggedByMe: false,
  },
  {
    id: 'msg-stk-3',
    authorAlias: 'MeadowBreeze18',
    avatarSeed: 'bird',
    avatarBg: 'bg-pink-600',
    track: 'stockholm',
    content: 'I made dinner tonight without feeling afraid of doing it "wrong". Relearning that my own preferences matter is slow, but every small independent choice is an act of defiance against coercive control.',
    timestamp: '4h ago',
    likes: 42,
    likedByMe: false,
    hugs: 31,
    huggedByMe: false,
  },

  // Sexual Abuse Survivors Group
  {
    id: 'msg-sa-1',
    authorAlias: 'DawnSparrow82',
    avatarSeed: 'bird',
    avatarBg: 'bg-purple-600',
    track: 'sexual_abuse',
    content: 'Gentle win: I bought soft oversized pajamas that feel like a protective hug. For so long I felt disconnected from my physical body. Today I put my hand over my heart and felt tenderness toward myself.',
    timestamp: '40m ago',
    likes: 28,
    likedByMe: false,
    hugs: 32,
    huggedByMe: false,
  },
  {
    id: 'msg-sa-2',
    authorAlias: 'ResilientRose64',
    avatarSeed: 'flower',
    avatarBg: 'bg-rose-700',
    track: 'sexual_abuse',
    content: 'Reminder to all of us today: Freeze and tonic immobility are biological survival reflexes commanded by the spinal cord. You did NOT consent. You did not ask for it. You survived, and your body is holy.',
    timestamp: '2h ago',
    likes: 64,
    likedByMe: false,
    hugs: 51,
    huggedByMe: false,
  },
  {
    id: 'msg-sa-3',
    authorAlias: 'SilverCedar09',
    avatarSeed: 'moon',
    avatarBg: 'bg-indigo-600',
    track: 'sexual_abuse',
    content: 'I practiced setting a gentle boundary with a coworker today. I said no without apologizing 10 times. Learning to trust my own voice after having it taken away feels like a miracle.',
    timestamp: '5h ago',
    likes: 39,
    likedByMe: false,
    hugs: 25,
    huggedByMe: false,
  },

  // Substance Abuse Group
  {
    id: 'msg-sub-1',
    authorAlias: 'MountainPine09',
    avatarSeed: 'tree',
    avatarBg: 'bg-amber-600',
    track: 'substance_abuse',
    content: '30 days clean today! 🌿 My first gold recovery coin in Haven unlocked. In the past I drank every time my PTSD flashbacks spiked. Sitting through the emotions sober was terrifying, but I am actually proud of who I see in the mirror today.',
    timestamp: '50m ago',
    likes: 49,
    likedByMe: false,
    hugs: 35,
    huggedByMe: false,
  },
  {
    id: 'msg-sub-2',
    authorAlias: 'CedarHorizon41',
    avatarSeed: 'flame',
    avatarBg: 'bg-orange-600',
    track: 'substance_abuse',
    content: 'Had a strong urge an hour ago when memories flooded in. Used the 15-Minute Pause rule from Haven, drank two cold glasses of water, and did box breathing. The urge crested and passed. Still clean.',
    timestamp: '3h ago',
    likes: 53,
    likedByMe: false,
    hugs: 40,
    huggedByMe: false,
  },
  {
    id: 'msg-sub-3',
    authorAlias: 'GoldenSunbeam23',
    avatarSeed: 'sun',
    avatarBg: 'bg-yellow-600',
    track: 'substance_abuse',
    content: 'Remember that relapse is not a failure of character; addiction was how our wounded nervous systems learned to cope with intolerable agony. Every sober breath is rewriting that script.',
    timestamp: '6h ago',
    likes: 44,
    likedByMe: false,
    hugs: 38,
    huggedByMe: false,
  }
];

export const PSEUDONYM_PREFIXES = [
  'Gentle', 'Quiet', 'Serene', 'Brave', 'Patient', 'Peaceful', 'Resilient', 'Misty',
  'Golden', 'Silent', 'Meadow', 'Starlight', 'Cedar', 'Haven', 'Dawn', 'River'
];

export const PSEUDONYM_SUFFIXES = [
  'Sparrow', 'Willow', 'Anchor', 'Oak', 'Otter', 'Pebble', 'Lantern', 'Breeze',
  'Pine', 'Fox', 'Horizon', 'Fern', 'Brook', 'Clover', 'Robin', 'Harbor'
];

export function generateSafeAlias(): string {
  const prefix = PSEUDONYM_PREFIXES[Math.floor(Math.random() * PSEUDONYM_PREFIXES.length)];
  const suffix = PSEUDONYM_SUFFIXES[Math.floor(Math.random() * PSEUDONYM_SUFFIXES.length)];
  const num = Math.floor(10 + Math.random() * 89);
  return `${prefix}${suffix}${num}`;
}
