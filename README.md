# CampFlow

Summer camp registration platform for Indian parents — register your child for sports camps, pick 3 sports, pay ₹12,000, done.

## Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 — dark mode, glassmorphism design system
- **Animation**: GSAP 3 (scroll-triggered) + Framer Motion (micro-interactions)
- **Database**: Supabase (Postgres + Auth + RLS)
- **Auth**: Auth.js v5 with Google OAuth
- **Payments**: Razorpay (INR)
- **Bot**: WhatsApp Cloud API with conversational registration
- **Sync**: Google Sheets (admin view) + Tally (accounting)

## Getting Started

```bash
# Clone & install
git clone https://github.com/<your-username>/campflow.git
cd campflow
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in Supabase, Google OAuth, Razorpay, and Meta credentials

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Landing page (unauthenticated)
│   ├── (auth)/            # Login page
│   ├── (dashboard)/       # Protected routes (dashboard, register)
│   └── api/               # Route handlers (payments, webhooks, sync)
├── components/
│   ├── ui/                # Button, Card, Input, Drawer
│   ├── landing/           # Landing page sections
│   └── registration/      # Multi-step form components
├── lib/
│   ├── supabase/          # Client & server Supabase wrappers
│   ├── gsap/              # GSAP plugin config
│   ├── razorpay/          # Payment instance
│   ├── whatsapp/          # Meta Cloud API service + state machine
│   └── google/            # Sheets API wrapper
├── store/                 # Zustand stores
└── types/                 # Shared TypeScript interfaces
```

## Features

- **Landing Page** — GSAP scroll animations, glassmorphism UI, responsive
- **Registration Flow** — Multi-step form: child details → pick 3 sports → review → pay
- **Razorpay Checkout** — INR payments with webhook signature verification
- **WhatsApp Bot** — State-machine-driven conversational registration via Meta Cloud API
- **Google Sheets** — Auto-sync paid registrations to an admin spreadsheet
- **Tally Sync** — Daily CRON job pushing payment vouchers to Tally

## Environment Variables

See `.env.example` for the full list. Key services:

| Variable | Service |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase |
| `GOOGLE_CLIENT_ID` | Google OAuth |
| `RAZORPAY_KEY_ID` | Razorpay |
| `META_WHATSAPP_TOKEN` | WhatsApp Cloud API |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | Google Sheets |

## Database

Run the migration in your Supabase SQL editor:

```bash
# File: supabase/migrations/001_initial_schema.sql
```

Tables: `profiles`, `children`, `sports`, `registrations`, `whatsapp_sessions`

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npx ts-node scripts/tally-sync.ts  # Manual Tally sync
```

## License

MIT
