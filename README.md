# 🎬 Movies Explorer

A responsive movie discovery web app built with **React 19 + TypeScript** and **Vite**, powered by the [TMDB API](https://www.themoviedb.org/). Browse Top Rated, Popular and Upcoming films, search the full catalog, filter by rating, watch trailers, and save favorites — in 3 languages, with a dark/light theme.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-5-FF4154?logo=reactquery&logoColor=white)

## ✨ Features

- 🎥 **Real-time data** from the TMDB REST API (Top Rated, Popular, Upcoming)
- 🔍 **Full-catalog search** (`/search/movie`) with debounced input
- ⭐ **Server-side rating filter** (`/discover/movie`)
- 📄 **Pagination** with cached pages (instant back/forward)
- 🎬 **Movie details + YouTube trailer** in an accessible modal
- ❤️ **Favorites** & 🔖 **Watchlist**, persisted to `localStorage` (synced across tabs)
- 🌐 **i18n** — Uzbek, Russian, English (UI **and** movie data)
- 🌙 **Dark / Light** theme
- 🔗 **URL state** — view, page, filters and the open movie live in the URL (shareable, back-button friendly)
- 💀 **Skeleton loaders** and graceful error/retry states

## 🛠️ Tech Stack & Architecture

| Concern | Choice |
| --- | --- |
| Language | **TypeScript** (strict) |
| Data fetching | **TanStack Query** (caching, dedup, retries, cancellation) |
| Routing / URL state | **React Router** (`useSearchParams`) |
| HTTP | **Axios** instance (`src/api/tmdbClient.ts`) + service layer (`src/api/movies.ts`) |
| Global state | **Context** (`SettingsProvider`) + custom hooks |
| Testing | **Vitest** + **React Testing Library** |
| CI | **GitHub Actions** (lint → typecheck → test → build) |

```
src/
├── api/          # tmdbClient (axios instance) + movies service
├── components/   # UI components (MovieCard, MovieModal, Search, ...)
├── context/      # SettingsProvider + context definition
├── hooks/        # useMovies, useSavedMovies, useDebounce, useLocalStorage, useSettings
├── i18n/         # translations (uz / ru / en)
├── types/        # TMDB domain types
└── test/         # test setup
```

## 🚀 Getting Started

```bash
npm install
cp .env.example .env      # then add your TMDB API key
npm run dev
```

Get a free API key from the [TMDB settings page](https://www.themoviedb.org/settings/api).

## 📜 Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run typecheck` | TypeScript check only |
| `npm run lint` | ESLint |
| `npm test` | Run tests |

## ☁️ Deployment (Vercel)

Add `VITE_TMDB_API_KEY` in **Project → Settings → Environment Variables**, then deploy. `vercel.json` provides the SPA fallback so client-side routes resolve on refresh.

---

Built by [java1777](https://github.com/java1777)
