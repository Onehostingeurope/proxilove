# STITCH — Developer Setup Guide

## Prerequisites
- Node.js 20+
- pnpm 9+ (`npm install -g pnpm`)
- Expo CLI (`npm install -g expo-cli`)
- Git

## 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/proxilove.git
cd proxilove
pnpm install
```

## 2. Supabase Setup

1. Go to [supabase.com](https://supabase.com) → New Project
2. In the SQL editor, run `supabase/migrations/001_init.sql`
3. Copy your project URL and anon key from Settings → API

## 3. Environment Variables

**packages/web/.env.local**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**packages/admin/.env.local**
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**packages/mobile/.env**
```
EXPO_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 4. Run Locally

```bash
# Marketing website (Next.js) → localhost:3000
pnpm dev:web

# Admin dashboard (Vite) → localhost:5174
pnpm dev:admin

# Mobile app (Expo)
cd packages/mobile
npx expo start
# Press 'i' for iOS Simulator, 'a' for Android
# Or scan QR with Expo Go on your phone
```

## 5. Deploy to Vercel

### Marketing Website
```bash
cd packages/web
npx vercel --prod
```
Set env vars in Vercel dashboard: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Admin Dashboard
```bash
cd packages/admin
npx vercel --prod
```
Set env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## 6. Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Set Root Directory to `packages/web` (for web project)
4. Repeat for `packages/admin` (new project, root = `packages/admin`)
5. Every push to `main` auto-deploys both

## 7. Mobile — Build for App Stores

Install EAS CLI:
```bash
npm install -g eas-cli
eas login
```

Configure EAS:
```bash
cd packages/mobile
eas build:configure
```

Build for iOS:
```bash
eas build --platform ios
```

Build for Android:
```bash
eas build --platform android
```

## 8. GitHub Actions Setup

Add these secrets in GitHub → Settings → Secrets:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Architecture Overview

```
proxilove/
├── packages/
│   ├── web/          Next.js 14 + TypeScript  →  Vercel
│   ├── admin/        Vite + React + TypeScript →  Vercel
│   └── mobile/       Expo React Native + TS   →  App Store / Play Store
├── supabase/
│   └── migrations/   SQL schema + seed data
├── .github/
│   └── workflows/    CI: lint + typecheck + build
└── README.md
```

## Tech Stack

| Platform | Framework | Language | Deploy |
|----------|-----------|----------|--------|
| Marketing Site | Next.js 14 | TypeScript | Vercel |
| Admin Dashboard | Vite + React | TypeScript | Vercel |
| iOS + Android | Expo React Native | TypeScript | EAS Build |
| Database | Supabase (PostgreSQL) | SQL | Supabase Cloud |
| Auth | Supabase Auth | — | Supabase Cloud |
| Realtime | Supabase Realtime | — | Supabase Cloud |
| CI/CD | GitHub Actions | YAML | GitHub |

## Design System

All three interfaces share the STITCH Vibe Mode Dark system:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#0A0F24` | All backgrounds |
| `--color-primary` | `#00F0FF` | Interactive elements, CTAs |
| `--color-coral` | `#FF5A5F` | Paywall, danger actions |
| `--color-green` | `#00E676` | Success, live indicators |
| `--font-headline` | Inter | All headings |
| `--font-data` | JetBrains Mono | Numbers, IDs, distances |
