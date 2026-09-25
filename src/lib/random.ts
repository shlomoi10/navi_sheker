import { ANSWER_BEGINNINGS, ANSWER_ENDINGS, ANSWER_MIDDLES, RANDOM_RESPONSES } from '../constants/content'

export function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

export function generateRandomAnswer(): string {
  return pickRandom(ANSWER_BEGINNINGS) + ' ' + pickRandom(ANSWER_MIDDLES) + ' ' + pickRandom(ANSWER_ENDINGS)
}

export function pickProphecy(): string {
  const randomChoice = Math.random()
  return randomChoice < 0.5 ? pickRandom(RANDOM_RESPONSES) : generateRandomAnswer()
}
