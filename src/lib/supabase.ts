import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Mock data for development
export const mockEvents = [
  {
    id: '1',
    hostId: 'user1',
    title: 'Sarah & Mike\'s Wedding',
    description: 'Place your bets on our special day! Will Mike cry during the vows?',
    date: '2024-06-15T18:00:00Z',
    eventCode: 'WEDDING1',
    minBetAmount: 5,
    maxBetAmount: 100,
    status: 'upcoming' as const,
    createdAt: '2024-01-15T10:00:00Z',
    host: {
      id: 'user1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      createdAt: '2024-01-01T00:00:00Z'
    }
  },
  {
    id: '2',
    hostId: 'user2',
    title: 'Super Bowl Party 2024',
    description: 'Who will win the big game? Place your bets!',
    date: '2024-02-11T23:30:00Z',
    eventCode: 'BOWL24',
    minBetAmount: 10,
    maxBetAmount: 200,
    status: 'active' as const,
    createdAt: '2024-01-20T10:00:00Z',
    host: {
      id: 'user2',
      name: 'Tom Wilson',
      email: 'tom@example.com',
      createdAt: '2024-01-01T00:00:00Z'
    }
  }
]

export const mockQuestions = [
  {
    id: '1',
    eventId: '1',
    text: 'Will the groom cry during the vows?',
    type: 'yes_no' as const,
    cutoffTime: '2024-06-15T17:30:00Z',
    status: 'open' as const,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    eventId: '1',
    text: 'How long will the first speech last?',
    type: 'multiple_choice' as const,
    options: ['Under 3 minutes', '3-5 minutes', '5-10 minutes', 'Over 10 minutes'],
    cutoffTime: '2024-06-15T19:00:00Z',
    status: 'open' as const,
    createdAt: '2024-01-15T10:00:00Z'
  }
]