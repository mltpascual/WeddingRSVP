# Wedding RSVP

A simple wedding RSVP site built with **React + Vite** and backed by **Firebase (Firestore + Auth)**.

## Features

- Public RSVP form (stores responses in Firestore)
- Admin dashboard at `/admin` (login via Firebase Email/Password auth)
- CSV export + basic stats for RSVP responses

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS
- Firebase (Firestore, Authentication)

## Getting started (local)

Prereqs: Node.js + npm

```bash
npm install
```

Create a `.env.local` in the repo root:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Run the dev server:

```bash
npm run dev
```

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — build to `dist/`
- `npm run preview` — preview the production build
- `npm run check` — TypeScript typecheck
- `npm run format` — format with Prettier

## Firebase setup

See `FIREBASE_SETUP.md` for:

- Required environment variables (Vercel + local)
- Services to enable (Firestore + Auth)
- Suggested Firestore security rules

## Deployment (Vercel)

1. Import the repo into Vercel (framework preset: **Vite**)
2. Set the Firebase environment variables in **Settings → Environment Variables**
3. Deploy

This repo includes a `vercel.json` with an SPA rewrite so routes like `/admin` work on refresh.

