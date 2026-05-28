# STITCH — Proximity Dating Platform

A monorepo containing:
- `packages/web` — Marketing landing page (Vite + React + TypeScript)
- `packages/admin` — Admin dashboard (Vite + React + TypeScript)
- `packages/mobile` — iOS + Android app (Expo React Native + TypeScript)
- `supabase/` — Database migrations

## Quick Start

```bash
# Install dependencies
pnpm install

# Run web (localhost:5173)
pnpm dev:web

# Run admin (localhost:5174)
pnpm dev:admin

# Run mobile
cd packages/mobile && npx expo start
```

## Environment Variables

Copy `.env.example` to `.env.local` in each package and fill in your Supabase credentials.

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Deployment

- `packages/web` → Vercel project `stitch-web`
- `packages/admin` → Vercel project `stitch-admin`
- `packages/mobile` → Expo EAS Build

## Design System

All interfaces use the Stitch Vibe Mode Dark design system:
- Background: `#0A0F24` (Deep Navy)
- Primary: `#00F0FF` (Electric Blue)
- Accent: `#FF5A5F` (Coral)
- Success: `#00E676` (System Green)
- Fonts: Inter (headlines/body) + JetBrains Mono (data readouts)
