import { Question } from '../types/questionnaire';

export const questions: Question[] = [
  {
    id: 'birthYear',
    type: 'text',
    question: "When did your internal clock officially start ticking? (aka, your birth year!)",
    placeholder: "Just drop the year, no need for a full life story... unless you want to!"
  },
  {
    id: 'definingEvent',
    type: 'text',
    question: "What's the most gloriously 'you' event that shaped your youth? (Don't be shy!)",
    placeholder: "First concert? Epic gaming session? That time you won the school's 'Most Likely to Wear Socks with Sandals' award?"
  },
  {
    id: 'musicFormat',
    type: 'multiple-choice',
    question: "Pick your auditory weapon of choice from back in the day!",
    options: [
      "Cassette tapes that always got tangled",
      "CDs that skipped at the best parts",
      "The sweet, sweet static of AM radio",
      "Walkman headphones that gave you a permanent head-lean",
      "I lived in the quite quite future, and had digital music then."
    ]
  },
  {
    id: 'favoriteMovie',
    type: 'multiple-choice',
    question: "Which cinematic masterpiece defined your generation?",
    options: [
      "A movie with questionable special effects and even more questionable fashion",
      "That one animated film that made you cry as a kid (and maybe still does)",
      "A cheesy action flick that you still quote today",
      "A romantic comedy that set unrealistic expectations for love"
    ],
    allowWriteIn: true
  },
  {
    id: 'fashionFauxPas',
    type: 'multiple-choice',
    question: "What was your go-to fashion faux pas? (Own it!)",
    options: [
      "Shoulder pads that could double as airplane wings",
      "Neon colors that could blind a small animal",
      "Hair that defied gravity and all known laws of physics",
      "Those jeans that were way too baggy… or way too tight",
      "I was a fashion icon, no faux pas here."
    ]
  },
  {
    id: 'hangoutSpot',
    type: 'text',
    question: "Where did you spend your precious free time? (Be specific!)",
    placeholder: "The arcade? The mall? Your friend's basement playing video games? The library? Your room listening to music? Tell us the story."
  },
  {
    id: 'slangPhrase',
    type: 'text',
    question: "What was the most iconic slang phrase you and your crew used?",
    placeholder: "Like, totally tubular? Or something even more… unique?"
  },
  {
    id: 'bedroomExhibit',
    type: 'text',
    question: "If your childhood bedroom was a museum exhibit, what would the main attraction be?",
    placeholder: "A mountain of stuffed animals? A collection of vintage posters? A computer that took 10 minutes to load a webpage?"
  },
  {
    id: 'favoriteGame',
    type: 'multiple-choice',
    question: "Was the best video game of your youth, one of these, or something else?",
    options: [
      "Super Mario Bros",
      "Tetris",
      "Pac-Man",
      "The Legend of Zelda",
      "Pokémon",
      "Minecraft"
    ],
    allowWriteIn: true
  },
  {
    id: 'wishToBringBack',
    type: 'text',
    question: "What is one thing that you wish you could bring back from your youth?",
    placeholder: "Be serious, be funny, be nostalgic!"
  }
]; 