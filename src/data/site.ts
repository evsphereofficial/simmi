// All content lives here. Copy is real and specific; anything we cannot know for sure is
// flagged `placeholder: true` so it can be replaced before the site is sent.

export const site = {
  name: 'For Simmi',
  title: 'For Simmi: one night, under your moon',
  description:
    'A night built for Simmi: an apology, ten months remembered, and the world she loves, drawn by someone who was listening.',
  url: 'https://one-night-for-simmi.vercel.app', // placeholder: update after the real deploy
  email: '', // placeholder: no contact form; the site is a letter, not a funnel
};

/* ------------------------------------------------------------------ the letter */

export const letter = {
  kicker: 'the letter',
  date: 'the night after the night you stayed up', // handwritten margin note
  paragraphs: [
    'Last night I fainted.',
    'A headache I had been carrying all day simply turned the lights off. I went down, with our DMs still open on the screen, exactly where you had left them. You noticed before anyone else did. And instead of sleeping, you stayed. You texted all night. You asked if I was okay, again and again, while I could not answer.',
    'I am so sorry, Simmi.',
    'Not the quick sorry you say so a moment can pass. The real one. I am sorry for the worry. I am sorry you spent the night watching a screen for signs of life from me. I am sorry that the last thing on your mind before sleep was someone else’s health instead of your own dreams. You deserved to be asleep, rested, thinking about your exams and your paintings and nothing heavier.',
    'And I am sorry for all of it: every wrong turn that led us here, to a place where we are not together anymore. I know where I was careless. I know where I let fear speak louder than sense.',
    'This month would have been our tenth. Ten months of you. I have thought about that number more than I should admit, not because a number proves anything, but because it measures how much of this year already belongs to you. Your jokes in my notifications. Your voice notes. The way you say “yap” and then actually yap for twenty minutes about organic chemistry. Ten months of a life I still want.',
    'You ended it, and I have not forgotten. I am not writing this to undo your decision or to ask you for anything tonight. I am writing because you stayed up all night for me, and you deserve to wake up to more than a thank you.',
    'You told me once: “I want us to want each other, not need each other. Needing can come from fear; wanting comes from choice.” I carry that sentence with me. It is the reason this letter is quiet instead of desperate. I want you. That is my choice, made clear-headed, in the middle of the night, with nothing to gain except the truth.',
    'So here is what I can promise. Steady. Calm. Care that does not expire when you are absent, and affection that does not vanish when you are busy. You once said you wanted to be loved exactly like that: someone who does not get angry with me, even when I am far away. I can be that man. I am practising at it every day.',
    'You also said: “We can cook, eat, listen to songs, dance, work, study, sleep, cry, laugh… we can do everything together.” I still believe that sentence. I believe it about the small things and the bakery with sage tiles and the Europe trip after your MBBS and the ordinary Tuesday where we do nothing at all.',
    'I am not giving up on you. I am giving you space, and I am staying close enough that if you ever turn around, I am still here. That is not a promise made at 2 a.m. This whole night is the proof. I listened to you: your moon, your rain, your ruby red, your peonies, your songs. I built it all back for you, because paying attention to you is the one thing I never want to stop doing.',
  ],
  signoff: 'yours, on every night there is',
  signature: 'the one who is still here',
};

/* ------------------------------------------------------------------ timeline */

export type Event = {
  id: string;
  when: string;
  title: string;
  body: string;
  flash?: boolean;
  placeholder?: boolean;
};

export const timeline: Event[] = [
  {
    id: 'beginning',
    when: 'where it started',
    title: 'You answered',
    body: 'A message sent without much thought, and a reply that changed the year. You were funnier than the internet prepared me for, and somehow you kept being that funny in person.',
    placeholder: true, // replace with the real date and how you actually met
  },
  {
    id: 'months',
    when: 'the months that felt like weeks',
    title: 'I fell for the whole world',
    body: 'Not just you: your paintings drying by the window, your rants about reactions and mechanisms, your playlists that skipped from Magic Shop to Aditya Rikhari without warning. I fell for a person who has a world inside her.',
  },
  {
    id: 'breakup',
    when: 'the day it ended',
    title: 'You let go',
    body: 'You said it was over, and I did not argue my way out of your decision. It hurt. It still hurts. But your choice deserves my respect, and respect is not something I will take back because I am lonely.',
    placeholder: true, // replace with the real date if you want it named
  },
  {
    id: 'fainting',
    when: 'last night, 1-ish a.m.',
    title: 'I fainted, and you stayed',
    body: 'The headache won. The DMs stayed open. And you, who could have slept, who have your own exams and your own wounds, texted me all night instead. Nobody makes you do that. You did it because that is who you are.',
    flash: true,
  },
  {
    id: 'ten',
    when: 'this month',
    title: 'Ten months, unbegun',
    body: 'It would have been ten months. I mark it anyway, not as a debt, but as a measurement of how much of this year I would happily live again, every day, the same way.',
  },
  {
    id: 'tonight',
    when: 'tonight',
    title: 'This night',
    body: 'So I built you one. A night with your moon in it, your rain in it, your red in it. Read it slowly. There is no timer here, and nothing here will ask you for anything.',
  },
];

/* ------------------------------------------------------------------ reasons */

export type Reason = { n: string; title: string; body: string };

export const reasons: Reason[] = [
  {
    n: '01',
    title: 'Your mind',
    body: 'You love organic chemistry the way other people love weather: loudly, specifically, at dinner. You are studying to be a doctor while carrying whole fantasy universes in your head. Being out-thought by you is my favourite kind of losing.',
  },
  {
    n: '02',
    title: 'Your heart at 2 a.m.',
    body: 'When I went down, you stayed up. You could have closed the app and slept like a sensible person with exams in the morning. You did not. That is not obligation. That is character.',
  },
  {
    n: '03',
    title: 'Your art',
    body: 'Watercolours, because you can control the flow. Pink, purple, blue and green in every drawing since you were a child. I have watched you turn a blank page into a whole mood and I still do not know how you do it.',
  },
  {
    n: '04',
    title: 'Your taste',
    body: 'Romantic goth: black with red added, ruby and amethyst, silver rings instead of diamonds, peonies over everything. You know exactly what you like, and what you like is beautiful.',
  },
  {
    n: '05',
    title: 'Your spine',
    body: 'You don’t let heroines get trampled. You don’t let people lie to you, either. You named your red flags the way a cartographer names rivers: precisely, and with a warning sign.',
  },
  {
    n: '06',
    title: 'Your softness',
    body: 'Forehead kisses, head pats, sleeping on a chest so you can hear a heartbeat. You want gentle, and you are gentle. Most people ask for tenderness while practising something harder.',
  },
  {
    n: '07',
    title: 'Your voice',
    body: 'Opera practice in a room that was never built for it. Your Nani’s lullabies in a language that only exists when you sing it. I would listen to you sing the phone book and call it an evening well spent.',
  },
  {
    n: '08',
    title: 'Your ambition',
    body: 'MBBS, NEET, a bakery with sage-green tiles somewhere in a white wooden house surrounded by trees. You want to save lives and sell bread and I have never once met a dream too big for you.',
  },
  {
    n: '09',
    title: 'Your loyalty',
    body: 'You stayed awake for me. You check on the people you love like it is a duty you actually wanted. Loyalty like yours is not common, and I am not going to pretend I found it everywhere.',
  },
  {
    n: '10',
    title: 'The way you love',
    body: '“Want each other, not need each other.” Calm, not rushed. Healthy, not heavy. You described the love you want with more clarity than most people describe their job, and then you lived it.',
  },
];

/* ------------------------------------------------------------------ the vault */

export type VaultLetter = { id: string; label: string; title: string; body: string[] };

export const vaultLetters: VaultLetter[] = [
  {
    id: 'sad',
    label: 'open when you’re sad',
    title: 'For the heavy days',
    body: [
      'Put your hand flat on the table. Feel that? That is the ground, and it is holding you up without asking anything in return.',
      'You are allowed to have a day that is only weather. Rain does not apologise for raining, and you do not have to perform okay-ness for anybody, including me.',
      'If you want company without conversation, I am a text away that never gets tired. If you want silence, take it. I will be somewhere nearby, quietly on your side.',
    ],
  },
  {
    id: 'miss',
    label: 'open when you miss me',
    title: 'Then I’m close too',
    body: [
      'If you miss me, talk to me. Send the message, miss-call me, say my name at 2 a.m. I am right here, and I plan to stay right here.',
      'You do not need a good reason, and you do not need to wait until you are calm about it. Missing me is allowed. So is telling me about your day, or a song, or nothing at all.',
      'Nothing you say tonight can be too much, and there is no correct way to start. My side of the conversation is already open. I am right here.',
    ],
  },
  {
    id: 'angry',
    label: 'open when you’re angry at me',
    title: 'Say it all',
    body: [
      'Go on. I can take it. Anger told to the right person is just hurt trying to find a door, and I would rather be the door than have you carry it around.',
      'You do not have to soften it for my sake. You never had to manage my feelings while yours were busy happening.',
      'When you are done, I will still be here, not defending myself from your truth, but listening to it. That is the least I owe you.',
    ],
  },
  {
    id: 'doubt',
    label: 'open when you doubt you’re loved',
    title: 'Re-read the evidence',
    body: [
      'Exhibit A: someone built you an entire night with your moon in it, because your name means moon and they never forgot that.',
      'Exhibit B: you texted all night for a person who fainted, and you did not think twice about it, because caring for people is your resting state.',
      'Exhibit C: every favourite of yours is somewhere on this site. Ruby. Peonies. Monsoon. Silver. Someone was paying very close attention to you, and still is.',
    ],
  },
  {
    id: 'ready',
    label: 'open when you’re ready to talk',
    title: 'The door is open',
    body: [
      'No speech prepared. No list of demands waiting for you. Just a person who would like to hear your voice again, at whatever volume you choose to give it.',
      'Say hi, say nothing, send a song. There is no correct way to open this, and there is no wrong amount of time you are allowed to take.',
      'I meant every word of the letter on the first page. The rest of this is just me, keeping the light on.',
    ],
  },
];

/* ------------------------------------------------------------------ her world */

export const palette = [
  { name: 'ruby', hex: '#d01a2e', note: '“My favourite colour is red too.”' },
  { name: 'oxblood', hex: '#7a0c1a', note: 'the dark red, for the gothic days' },
  { name: 'amethyst', hex: '#8b5fbf', note: '“I like ruby and amethyst, major gothic vibe.”' },
  { name: 'lavender', hex: '#b9a3e3', note: 'the light purple of the dream lehenga' },
  { name: 'hot pink', hex: '#ff4fa3', note: 'colourful pants, no apologies' },
  { name: 'deep blue', hex: '#2b3a8f', note: '“I used to add pink, purple and blue to every drawing.”' },
  { name: 'sage', hex: '#9caf88', note: 'the tiles of the house you dreamed of' },
  { name: 'moon silver', hex: '#d9d4e0', note: '“I love white hair, it looks like a snow waterfall.”' },
  { name: 'wheat', hex: '#e4c98f', note: 'warm golden evenings, never summer' },
];

export const gems = [
  { name: 'Ruby', line: 'gothic, warm, unbothered' },
  { name: 'Amethyst', line: 'quiet purple, winter light' },
  { name: 'Silver bands', line: 'simple ones. never diamonds' },
];

export const flowers = [
  { name: 'Peony', line: 'your favourite: soft, full, a little romantic' },
  { name: 'Rose', line: 'the red kind, obviously' },
  { name: 'Cherry blossom', line: 'for the brief weeks everything is pink' },
  { name: 'Yellow flowers', line: 'because you said yes to those too' },
];

export const weather = [
  { id: 'rain', label: 'rain', line: 'monsoon on the window, everything smelling like wet earth' },
  { id: 'thunder', label: 'thunder', line: 'the loud kind: you clap along with the sky' },
  { id: 'breeze', label: 'breezy wind', line: 'no rain, just wind deciding where to go' },
  { id: 'golden', label: 'golden sunset', line: 'the sky doing its best work, five minutes a day' },
  { id: 'winter', label: 'cold winter', line: 'sweaters, warm water, chai going cold because you forgot it' },
] as const;

export const music = [
  {
    group: 'BTS',
    note: 'since 2018: your siblings, your birthday, your photocards',
    songs: ['Magic Shop', 'Mikrokosmos', 'Spring Day', 'Pied Piper', 'Louder Than Bombs', 'Moon', 'Coffee', 'Black Swan'],
  },
  {
    group: 'Hindi / Urdu / Indie',
    note: 'the ones that sound like someone actually singing',
    songs: ['Tu Hi Mera Shab H', 'Aditya Rikhari, from ages ago', 'Mann Mera', 'Tere Liye', 'Deewana Deewana', 'your Nani’s lullabies'],
  },
  {
    group: 'Pop & slow nights',
    note: 'Havana opened a door, and you walked through it',
    songs: ['Taylor Swift', 'Ariana Grande', 'Camila Cabello, Havana', 'The Weeknd, slow', 'Sia', 'Alan Walker', 'Zara Larsson', 'Charlie Puth'],
  },
  {
    group: 'The ones you introduced me to',
    note: 'Enhypen · NewJeans · Katseye · UNI5, your girl group',
    songs: ['Enhypen', 'NewJeans', 'Katseye', 'UNI5'],
  },
];

export const stories = {
  manhwa: [
    'Viral Hit, the number one, always',
    'every murim manhwa you could find',
    'The Greatest Estate Developer',
    'Who Made Me a Princess, Roxana’s spine',
    'Omniscient Reader’s Viewpoint',
    'Solo Leveling · Lord of the Mysteries',
    'Nano Machine · Dandadan · Luneko · Crimson Feather',
    'After School Club',
  ],
  screen: ['Kenichi, your teacher', 'Dandadan', 'Doraemon, Nobita forever', 'Barbie movies, comfort status', 'animal documentaries'],
  games: ['Genshin Impact, Zhongli and Kaveh', 'Itzaland / Miracle Outfit', 'Minecraft', 'Undertale', 'Roblox'],
  fates: {
    title: 'Book of Fates',
    line: 'your universe, a blind flower-seller who sees anyway',
    characters: [
      { name: 'Elise Whitmore / Chandra Malika', role: 'seer, mage, flower-seller, the one who comes back to save everyone' },
      { name: 'Eshna Quinn · Amaira Nassar · Jennifer Scott', role: 'the friends worth reincarnating for' },
      { name: 'Sarah Qureshi · Ahana · Nana · Iris', role: 'the rest of the circle' },
      { name: 'Zhang Huan · Krish · Rezan Ray · Yichen · Rowan', role: 'Mr. Nobody, and the others who walk with her' },
    ],
  },
};

export const menu = [
  { name: 'Pomegranate', note: 'the favourite fruit, no debate' },
  { name: 'Grapes, then oranges', note: 'the official ranking' },
  { name: 'Paneer, any way', note: 'aloo masala, palak, curry with roti' },
  { name: 'Sambar & idli', note: '“South dishes is our favourite”' },
  { name: 'Pulao, not biryani', note: 'you eat it faster, you said it' },
  { name: 'A plate of pickles', note: '“I LOVE PICKLES”' },
  { name: 'Potatoes in any form', note: 'fries, wedges, boiled with lemon and chilli' },
  { name: 'Eggs & macaroni', note: 'the easy comfort, the fast comfort' },
  { name: 'Kheer & gulab jamun', note: 'and manda pitha with caramelised coconut' },
  { name: 'Coffee-chocolate ice cream', note: 'Oreo, Silk, always the dark ones' },
  { name: 'Lemon green tea', note: 'and grape juice, and chai going cold' },
];

export const fashion = [
  { name: 'The lehenga', line: 'light purple, cherry red, or black with pastel flowers' },
  { name: 'Silver rings', line: 'stacked, simple, never a diamond' },
  { name: 'High-waisted baggy jeans', line: 'with a fitted top and hot pink pants on Fridays' },
  { name: 'Leather jacket era', line: 'men in suits and ties: approved' },
  { name: 'Balletcore', line: 'frills, ribbons, bows, laces' },
  { name: 'Y2K accessories', line: 'the more beaded, the better' },
  { name: 'Dark lipstick, grunge eyes', line: 'mascara and gloss, no heavy foundation' },
];

/* ------------------------------------------------------------------ navigation */

export const nav = [
  { href: '/', label: 'the letter' },
  { href: '/world/', label: 'her world' },
  { href: '/vault/', label: 'sealed letters' },
];
