import { BookResource } from '../types';

export const READING_MATERIALS: BookResource[] = [
  {
    id: 'book-1',
    title: 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma',
    author: 'Dr. Bessel van der Kolk',
    coverColor: 'bg-emerald-900 text-emerald-100',
    iconName: 'HeartPulse',
    description: 'The definitive neurobiological exploration of how developmental trauma and abuse alter the brain and body, and the somatic methods (EMDR, yoga, theater, neurofeedback) that restore agency.',
    primaryTrack: 'ptsd',
    keyTakeaway: 'Trauma is remembered not just as cognitive thoughts, but as visceral somatic sensations. Healing requires helping the body know that the danger is in the past.',
    triggerRating: 'Moderate',
    triggerWarningNote: 'Contains clinical case histories of combat, childhood neglect, and sexual abuse. Take breaks when reading.',
    purchaseLinks: [
      { name: 'Bookshop.org (Supports Local Indie Bookstores)', url: 'https://bookshop.org/books/the-body-keeps-the-score-brain-mind-and-body-in-the-healing-of-trauma/9780143127741', type: 'indie' },
      { name: 'WorldCat (Find Free in Local Library)', url: 'https://www.worldcat.org/title/879555248', type: 'library' },
      { name: 'Audible / Audio Edition', url: 'https://www.audible.com/pd/The-Body-Keeps-the-Score-Audiobook/B00OBT7KAO', type: 'audio' }
    ]
  },
  {
    id: 'book-2',
    title: 'Trauma and Recovery: The Aftermath of Violence—From Domestic Abuse to Political Terror',
    author: 'Dr. Judith L. Herman',
    coverColor: 'bg-indigo-950 text-indigo-100',
    iconName: 'Shield',
    description: 'The foundational masterpiece that first coined Complex PTSD (C-PTSD) and explains the profound psychological dynamics of Stockholm Syndrome, coercive control, and hostage psychology in domestic abuse.',
    primaryTrack: 'stockholm',
    keyTakeaway: 'Coercive control functions by isolating the victim and oscillating between terror and intermittent small kindnesses, inducing an involuntary survival bond. Recovery begins with establishing physical safety.',
    triggerRating: 'Heavy (Read with care)',
    triggerWarningNote: 'Deep structural analysis of abuse tactics, domestic captivity, and hostage dynamics. Highly validating but emotionally intense.',
    purchaseLinks: [
      { name: 'Bookshop.org (Indie Booksellers)', url: 'https://bookshop.org/books/trauma-and-recovery-the-aftermath-of-violence-from-domestic-abuse-to-political-terror/9780465061716', type: 'indie' },
      { name: 'WorldCat (Local Library Search)', url: 'https://www.worldcat.org/title/24628224', type: 'library' }
    ]
  },
  {
    id: 'book-3',
    title: 'The Courage to Heal: A Guide for Women Survivors of Child Sexual Abuse',
    author: 'Ellen Bass & Laura Davis',
    coverColor: 'bg-rose-950 text-rose-100',
    iconName: 'Sparkles',
    description: 'An extraordinarily compassionate, non-judgmental guidebook for sexual abuse survivors, addressing repressed memories, bodily dissociation, shame, intimacy, and step-by-step recovery.',
    primaryTrack: 'sexual_abuse',
    keyTakeaway: 'You survived by doing whatever your mind and body had to do. Healing does not mean erasing history; it means stepping into full ownership of your present self.',
    triggerRating: 'Heavy (Read with care)',
    triggerWarningNote: 'Direct discussion of childhood sexual abuse and incest. We suggest reading alongside a supportive therapist or trusted companion.',
    purchaseLinks: [
      { name: 'Bookshop.org', url: 'https://bookshop.org/books/the-courage-to-heal-a-guide-for-women-survivors-of-child-sexual-abuse-20th-anniversary-edition/9780061284335', type: 'indie' },
      { name: 'WorldCat (Find at Local Library)', url: 'https://www.worldcat.org/title/213861214', type: 'library' }
    ]
  },
  {
    id: 'book-4',
    title: 'In the Realm of Hungry Ghosts: Close Encounters with Addiction',
    author: 'Dr. Gabor Maté',
    coverColor: 'bg-amber-950 text-amber-100',
    iconName: 'Flame',
    description: 'A revolutionary, deeply humanizing examination proving that addiction is an adaptive response to unhealed early trauma, childhood adversity, and emotional pain rather than a moral failure.',
    primaryTrack: 'substance_abuse',
    keyTakeaway: 'All substance dependency begins as an unconscious attempt to solve a profound problem: the problem of emotional suffering, emptiness, and chronic nervous system dysregulation.',
    triggerRating: 'Moderate',
    triggerWarningNote: 'Features visceral descriptions of addiction and overdose. Extremely compassionate toward the survivor.',
    purchaseLinks: [
      { name: 'Bookshop.org', url: 'https://bookshop.org/books/in-the-realm-of-hungry-ghosts-close-encounters-with-addiction/9781556438806', type: 'indie' },
      { name: 'WorldCat (Public Library Locator)', url: 'https://www.worldcat.org/title/319602447', type: 'library' },
      { name: 'Audible Audio Edition', url: 'https://www.audible.com/pd/In-the-Realm-of-Hungry-Ghosts-Audiobook/B07N8DTVF3', type: 'audio' }
    ]
  },
  {
    id: 'book-5',
    title: 'Complex PTSD: From Surviving to Thriving',
    author: 'Pete Walker',
    coverColor: 'bg-teal-950 text-teal-100',
    iconName: 'Compass',
    description: 'Written by a licensed therapist and survivor, this essential practical guide breaks down the "Outer Critic", emotional flashbacks, the 4F trauma responses (Fight, Flight, Freeze, Fawn), and daily emotional regulation.',
    primaryTrack: 'ptsd',
    keyTakeaway: 'Emotional flashbacks are sudden regressions into the intense terror, shame, or abandonment of childhood without a visual memory. Recognizing the flash is half the battle.',
    triggerRating: 'Mild',
    triggerWarningNote: 'Extremely gentle, reader-friendly, and specifically structured to minimize activation while providing actionable tools.',
    purchaseLinks: [
      { name: 'Bookshop.org (Paperback)', url: 'https://bookshop.org/books/complex-ptsd-from-surviving-to-thriving-a-guide-and-map-for-recovering-from-childhood-trauma/9781492871842', type: 'indie' },
      { name: 'Audible / Audio Format', url: 'https://www.audible.com/pd/Complex-PTSD-Audiobook/B072LX75W3', type: 'audio' }
    ]
  },
  {
    id: 'book-6',
    title: 'Healing Sex: A Mind-Body Approach to Healing Sexual Trauma',
    author: 'Staci K. Haines',
    coverColor: 'bg-purple-950 text-purple-100',
    iconName: 'Feather',
    description: 'A revolutionary somatic guide helping sexual abuse survivors reclaim erotic wholeness, establish boundaries, and reconnect safely with their own physical bodies without re-traumatization.',
    primaryTrack: 'sexual_abuse',
    keyTakeaway: 'You have full permission to redefine physical touch entirely on your terms, including moving at a snail\'s pace or halting at any time.',
    triggerRating: 'Moderate',
    triggerWarningNote: 'Contains discussions of sexual dissociation and trauma triggers.',
    purchaseLinks: [
      { name: 'Bookshop.org', url: 'https://bookshop.org/books/healing-sex-a-mind-body-approach-to-healing-sexual-trauma/9781573442930', type: 'indie' },
      { name: 'WorldCat (Search Libraries)', url: 'https://www.worldcat.org/title/879685933', type: 'library' }
    ]
  }
];
