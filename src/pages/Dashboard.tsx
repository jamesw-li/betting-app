import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { useAuth } from '../hooks/useAuth'
import { formatCurrency } from '../lib/utils'
import { 
  Plus, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Trophy,
  Clock,
  Users
} from 'lucide-react'

export function Dashboard() {
  const { user } = useAuth()

  // Mock data for demonstration
  const stats = {
    totalEvents: 12,
    totalBets: 45,
    totalWinnings: 234.50,
    winRate: 67
  }

  const recentEvents = [
    {
      id: '1',
      title: 'Sarah & Mike\'s Wedding',
      date: '2024-06-15',
      status: 'upcoming' as const,
      myBets: 3,
      potentialWinnings: 85.00
    },
    {
      id: '2',
      title: 'Super Bowl Party 2024',
      date: '2024-02-11',
      status: 'completed' as const,
      myBets: 2,
      actualWinnings: 45.00
    }
  ]

  const activeBets = [
    {
      id: '1',
      event: 'Sarah & Mike\'s Wedding',
      question: 'Will the groom cry during the vows?',
      answer: 'Yes',
      amount: 25.00,
      potentialPayout: 67.50
    },
    {
      id: '2',
      event: 'Sarah & Mike\'s Wedding',
      question: 'How long will the first speech last?',
      answer: '5-10 minutes',
      amount: 15.00,
      potentialPayout: 42.00
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your bets
          </p>
        </div>
        <Link to="/create-event">
          <Button className="mt-4 sm:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEvents}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bets</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBets}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Winnings</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalWinnings)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Win Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.winRate}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(event.date).toLocaleDateString()}
                      <span className="mx-2">•</span>
                      <Users className="w-4 h-4 mr-1" />
                      {event.myBets} bets
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'upcoming' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {event.status}
                    </div>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {event.status === 'upcoming' 
                        ? formatCurrency(event.potentialWinnings) + ' potential'
                        : formatCurrency(event.actualWinnings!) + ' won'
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/events">
                <Button variant="outline" className="w-full">
                  View All Events
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Active Bets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Active Bets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeBets.map((bet) => (
                <div key={bet.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{bet.event}</h4>
                    <span className="text-sm font-medium text-green-600">
                      {formatCurrency(bet.potentialPayout)} potential
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{bet.question}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      <strong>Your bet:</strong> {bet.answer}
                    </span>
                    <span className="text-sm font-medium">
                      {formatCurrency(bet.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {activeBets.length === 0 && (
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No active bets</p>
                <Link to="/events" className="mt-2 inline-block">
                  <Button variant="outline" size="sm">
                    Browse Events
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Settlement Reminder */}
      <Card className="mt-8 bg-yellow-50 border-yellow-200">
        <CardContent>
          <div className="flex items-start">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
              <DollarSign className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-medium text-yellow-800 mb-1">Settlement Reminder</h3>
              <p className="text-sm text-yellow-700">
                Remember: This app tracks bets for fun but doesn't process payments. 
                Please settle winnings directly with other participants via Venmo, PayPal, or cash.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}