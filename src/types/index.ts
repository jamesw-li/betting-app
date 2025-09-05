export interface User {
  id: string
  email: string
  name: string
  venmoHandle?: string
  paypalEmail?: string
  createdAt: string
}

export interface Event {
  id: string
  hostId: string
  title: string
  description: string
  date: string
  eventCode: string
  minBetAmount: number
  maxBetAmount: number
  status: 'upcoming' | 'active' | 'completed'
  createdAt: string
  host?: User
  questions?: Question[]
  participants?: User[]
}

export type QuestionType = 'multiple_choice' | 'yes_no' | 'numeric' | 'free_text'

export interface Question {
  id: string
  eventId: string
  text: string
  type: QuestionType
  options?: string[]
  correctAnswer?: string
  cutoffTime: string
  status: 'open' | 'locked' | 'completed'
  createdAt: string
  bets?: Bet[]
}

export interface Bet {
  id: string
  userId: string
  questionId: string
  answer: string
  amount: number
  status: 'pending' | 'won' | 'lost' | 'settled'
  potentialPayout?: number
  createdAt: string
  user?: User
}

export interface EventStats {
  totalEvents: number
  totalBets: number
  totalWinnings: number
  winRate: number
}

export interface CreateEventData {
  title: string
  description: string
  date: string
  minBetAmount: number
  maxBetAmount: number
  questions: CreateQuestionData[]
}

export interface CreateQuestionData {
  text: string
  type: QuestionType
  options?: string[]
  cutoffTime: string
}