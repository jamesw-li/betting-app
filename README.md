# Bet On It - Social Betting Platform

A React-based platform where event organizers create prediction games and participants place friendly bets in USD amounts on various outcomes. Perfect for weddings, parties, sports events, and corporate gatherings.

## 🎯 Key Features

- **Event Creation**: Hosts can create events with custom prediction questions
- **Multiple Question Types**: Multiple choice, Yes/No, numeric guesses, and free text
- **USD Betting**: Track real money bets (settlement occurs outside the app)
- **Social Features**: Invite participants, chat, and view leaderboards
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Secure Authentication**: Email/password authentication with Supabase

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for database and authentication)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd betting-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your Supabase credentials in `.env`:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server:
```bash
npm run dev
```

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Forms**: React Hook Form + Zod validation
- **State Management**: TanStack Query
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Build Tool**: Vite

## 📱 Core Functionality

### For Event Hosts
- Create events with custom titles, descriptions, and dates
- Add multiple prediction questions with different types
- Set minimum/maximum bet amounts per question
- Manage participants and view event analytics
- Manually score subjective questions

### For Participants
- Browse and join available events
- Place bets on prediction outcomes
- View leaderboards and track winnings/losses
- Settle bets outside the app (Venmo, PayPal, etc.)

## 🔒 Important Legal Notice

**This platform does not process or hold real money.** All bets are tracked for entertainment and accountability purposes only. Settlement must occur outside the app through services like Venmo, PayPal, CashApp, or in-person transactions.

## 🎨 Design Philosophy

The app follows modern design principles with:
- Clean, intuitive user interface
- Responsive design for all devices
- Consistent color system and typography
- Accessible components and interactions
- Apple-level attention to detail

## 🚀 Deployment

The app is designed to be deployed on:
- **Frontend**: Vercel (recommended)
- **Database**: Supabase (managed PostgreSQL)
- **Authentication**: Supabase Auth

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.