import { StuffedAnimal, CourageBadge, RecoveryCoin } from '../types';

export const STUFFED_ANIMALS: StuffedAnimal[] = [
  {
    id: 'plush-1',
    name: 'Barnaby',
    species: 'Brave Bear',
    title: 'The Guardian of Boundaries',
    unlockThreshold: 1, // unlocked after 1 goal
    unlocked: true,
    imageEmoji: '🧸',
    colorScheme: 'from-amber-100 to-amber-200 border-amber-300 text-amber-900',
    comfortMessage: 'Barnaby stays by your side with soft, sturdy paws. He whispers: "You are allowed to say no to anyone, anytime."',
    snuggleLevel: 10,
    specialTrauma: 'stockholm',
    soundAffirmation: '"I guard your perimeter. You are safe here."'
  },
  {
    id: 'plush-2',
    name: 'Luna',
    species: 'Comfort Bunny',
    title: 'The Whisperer of Softness',
    unlockThreshold: 2,
    unlocked: false,
    imageEmoji: '🐰',
    colorScheme: 'from-pink-100 to-rose-200 border-pink-300 text-rose-900',
    comfortMessage: 'Luna has velvet ears that listen without judgment. She never demands anything from you, offering pure, safe comfort.',
    snuggleLevel: 10,
    specialTrauma: 'sexual_abuse',
    soundAffirmation: '"Your body belongs to you. Take all the time you need."'
  },
  {
    id: 'plush-3',
    name: 'Oliver',
    species: 'Gentle Otter',
    title: 'The Joy & Flow Restorer',
    unlockThreshold: 4,
    unlocked: false,
    imageEmoji: '🦦',
    colorScheme: 'from-teal-100 to-cyan-200 border-teal-300 text-teal-900',
    comfortMessage: 'Oliver floats peacefully on calm waters. He reminds you that you do not have to be vigilant every single second.',
    snuggleLevel: 10,
    specialTrauma: 'stockholm',
    soundAffirmation: '"You are allowed to simply float and rest."'
  },
  {
    id: 'plush-4',
    name: 'Willow',
    species: 'Warm Fox',
    title: 'The Den of Sovereignty',
    unlockThreshold: 6,
    unlocked: false,
    imageEmoji: '🦊',
    colorScheme: 'from-orange-100 to-amber-200 border-orange-300 text-orange-950',
    comfortMessage: 'Willow curls up like a warm scarf around your shoulders, keeping away cold echoes of the past with gentle, cozy warmth.',
    snuggleLevel: 10,
    specialTrauma: 'sexual_abuse',
    soundAffirmation: '"No one can dim the light you are reclaiming."'
  },
  {
    id: 'plush-5',
    name: 'Pippin',
    species: 'Cozy Penguin',
    title: 'The Endurer of Icy Storms',
    unlockThreshold: 8,
    unlocked: false,
    imageEmoji: '🐧',
    colorScheme: 'from-slate-100 to-blue-200 border-blue-300 text-slate-900',
    comfortMessage: 'Pippin survived the coldest blizzards by huddling in safe warmth. He holds your hand through any lingering tremor.',
    snuggleLevel: 10,
    specialTrauma: 'stockholm',
    soundAffirmation: '"The freezing storm is over. Spring has arrived in you."'
  }
];

export const COURAGE_BADGES: CourageBadge[] = [
  {
    id: 'badge-1',
    title: 'Shield of Grounded Peace',
    motto: 'Anchored in the Present',
    symbol: '🛡️',
    description: 'Awarded for taking your first intentional step to ground yourself in the present reality.',
    unlockThreshold: 1,
    unlocked: true,
    themeColor: 'from-emerald-500 to-teal-700 text-white',
    shareableCardQuote: 'I withstood the echo of the past and grounded myself in the peace of today.'
  },
  {
    id: 'badge-2',
    title: 'The Lionheart Emblem',
    motto: 'Fierce Gentleness',
    symbol: '🦁',
    description: 'Recognizes the immense, quiet courage required to face flashbacks and choose self-compassion.',
    unlockThreshold: 3,
    unlocked: false,
    themeColor: 'from-amber-500 to-orange-700 text-white',
    shareableCardQuote: 'True courage is not never trembling; it is breathing through the tremor with gentle kindness.'
  },
  {
    id: 'badge-3',
    title: 'Storm Weatherer',
    motto: 'Rooted Through the Tempest',
    symbol: '⚡',
    description: 'Awarded for holding your center when the nervous system felt overwhelmed by hyperarousal.',
    unlockThreshold: 5,
    unlocked: false,
    themeColor: 'from-cyan-600 to-blue-800 text-white',
    shareableCardQuote: 'I am the mountain, not the weather that blows across it.'
  },
  {
    id: 'badge-4',
    title: 'Boundary Sentinel',
    motto: 'Sacred Perimeter',
    symbol: '🏰',
    description: 'Awarded for honoring and holding an essential personal boundary without guilt or apology.',
    unlockThreshold: 7,
    unlocked: false,
    themeColor: 'from-violet-600 to-purple-900 text-white',
    shareableCardQuote: 'My boundaries are the sanctuary where my healing takes root.'
  },
  {
    id: 'badge-5',
    title: 'Phoenix of Rebirth',
    motto: 'Rising in Sovereignty',
    symbol: '🔥',
    description: 'Honors the survivor who transforms past devastation into sacred wisdom and unbreakable selfhood.',
    unlockThreshold: 10,
    unlocked: false,
    themeColor: 'from-rose-600 to-pink-900 text-white',
    shareableCardQuote: 'From the ashes of what tried to destroy me, I rise sovereign, protected, and whole.'
  }
];

export const RECOVERY_COINS: RecoveryCoin[] = [
  {
    id: 'coin-1',
    milestone: '24 Hours',
    daysRequired: 1,
    unlocked: true,
    frontStatement: 'ONE DAY AT A TIME',
    backStatement: 'COURAGE TO BEGIN',
    metalFinish: 'bronze',
    specificSubstanceMessages: {
      alcohol: '24 Hours of Clean Clarity: Today my liver, mind, and spirit rested in peace.',
      opioids: '24 Hours of True Feeling: The physical ache begins to yield to holy breath.',
      stimulants: '24 Hours of Sacred Stillness: My heart found its natural, calm tempo.',
      sedatives: '24 Hours of Genuine Wakefulness: I opened my eyes to real life.',
      cannabis: '24 Hours of Present Focus: I met reality face-to-face and stood tall.',
      prescription: '24 Hours of Unshackled Self: Reclaiming my authentic bodily agency.',
      polysubstance: '24 Hours of Absolute Freedom: Breaking all chains in one unified breath.',
      nicotine: '24 Hours of Pure Lungs: Fresh clean air filling my chest.'
    }
  },
  {
    id: 'coin-2',
    milestone: '1 Week',
    daysRequired: 7,
    unlocked: false,
    frontStatement: 'FREEDOM IN CLARITY',
    backStatement: 'SEVEN SUNRISES OF TRUTH',
    metalFinish: 'silver',
    specificSubstanceMessages: {
      alcohol: '7 Days of Awakening: Fog dissolves, revealing the sharp beauty of the morning.',
      opioids: '7 Days of Rebirth: Nerve endings celebrating genuine connection to the earth.',
      stimulants: '7 Days of Natural Energy: Replenishing deep reserves of real stamina.',
      sedatives: '7 Days of Genuine Rest: Learning that true calm lives within, not in a bottle.',
      cannabis: '7 Days of Clear Dreams: My imagination awakens without haze.',
      prescription: '7 Days of Self-Trust: Knowing I can handle life on life’s terms.',
      polysubstance: '7 Days of Total Wholeness: Reclaiming my sovereignty step by step.',
      nicotine: '7 Days of Deep Breath: Clean oxygen nourishing every cell.'
    }
  },
  {
    id: 'coin-3',
    milestone: '1 Month',
    daysRequired: 30,
    unlocked: false,
    frontStatement: 'ROOTED IN STRENGTH',
    backStatement: 'THIRTY DAYS OF LIGHT',
    metalFinish: 'gold',
    specificSubstanceMessages: {
      alcohol: '30 Days of Sovereignty: Reclaiming my dignity, health, and peace of mind.',
      opioids: '30 Days of Living Light: Walking out of the shadow into enduring vitality.',
      stimulants: '30 Days of Balanced Rhythm: Sustainable peace replacing frenzied burns.',
      sedatives: '30 Days of Brave Presence: Meeting emotions with compassion, not escape.',
      cannabis: '30 Days of Lucid Purpose: Building goals with crystalline clarity.',
      prescription: '30 Days of True Empowerment: My mind and body working as one team.',
      polysubstance: '30 Days of Miraculous Freedom: A brand new foundation for life.',
      nicotine: '30 Days of Clean Fire: Releasing toxic smoke for pure vitality.'
    }
  },
  {
    id: 'coin-4',
    milestone: '90 Days',
    daysRequired: 90,
    unlocked: false,
    frontStatement: 'UNBROKEN SPIRIT',
    backStatement: 'SEASON OF TRANSFORMATION',
    metalFinish: 'amethyst',
    specificSubstanceMessages: {
      alcohol: '90 Days of Sacred Clarity: A full season of pure, unadulterated life.',
      opioids: '90 Days of Deep Healing: Neurobiology rewriting itself toward peace.',
      stimulants: '90 Days of Steely Grace: Joy found in genuine, unforced moments.',
      sedatives: '90 Days of Resilient Truth: Braving every wave with an open heart.',
      cannabis: '90 Days of Sharp Precision: Life experienced in vibrant, authentic color.',
      prescription: '90 Days of Independent Power: Sovereign ruler of my own recovery.',
      polysubstance: '90 Days of Triumphant Anchor: Standing unwavering upon granite stone.',
      nicotine: '90 Days of Untethered Vitality: Heart and breath celebrating freedom.'
    }
  },
  {
    id: 'coin-5',
    milestone: '1 Year',
    daysRequired: 365,
    unlocked: false,
    frontStatement: 'TRIUMPH OVER SHADOW',
    backStatement: '365 DAYS UNCONQUERED',
    metalFinish: 'obsidian',
    specificSubstanceMessages: {
      alcohol: '365 Days of Radiance: A complete journey around the sun in absolute truth.',
      opioids: '365 Days of Pure Miracle: Fully restored to health, love, and life.',
      stimulants: '365 Days of Timeless Fortitude: Real power that never runs empty.',
      sedatives: '365 Days of Mastered Peace: An inner calm that no storm can shake.',
      cannabis: '365 Days of Vivid Reality: A masterpiece of living engagement.',
      prescription: '365 Days of Authentic Sovereignty: Living proof of human resilience.',
      polysubstance: '365 Days of Legendary Victory: Reborn into boundless possibility.',
      nicotine: '365 Days of Pure Breath: A year of pristine, untamed freedom.'
    }
  }
];
