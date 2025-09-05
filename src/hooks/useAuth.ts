import { useState, useEffect } from 'react'
import { User } from '../types'

// Mock authentication hook for development
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('mockUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    // Mock sign in
    const mockUser: User = {
      id: 'mock-user-id',
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString()
    }
    setUser(mockUser)
    localStorage.setItem('mockUser', JSON.stringify(mockUser))
    return { user: mockUser, error: null }
  }

  const signUp = async (email: string, password: string, name: string) => {
    // Mock sign up
    const mockUser: User = {
      id: 'mock-user-id',
      email,
      name,
      createdAt: new Date().toISOString()
    }
    setUser(mockUser)
    localStorage.setItem('mockUser', JSON.stringify(mockUser))
    return { user: mockUser, error: null }
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem('mockUser')
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut
  }
}