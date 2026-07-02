# 🎬 Movies Explorer

A responsive movie discovery web app built with **React 19** and **Vite**, powered by the [TMDB API](https://www.themoviedb.org/). Browse Top Rated, Popular, and Upcoming films, search by title, and filter by rating score.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- 🎥 **Real-time data** from the TMDB REST API (Top Rated, Popular, Upcoming)
- 🔍 **Search** movies by title
- ⭐ **Filter** by minimum / maximum rating score
- 📄 **Pagination** to browse thousands of movies
- 💾 **Persisted category** selection via `localStorage`
- ⏳ **Loading & error states** for a smooth UX
- 📱 **Fully responsive** grid layout with hover-to-reveal overview

## 🛠️ Tech Stack

- **React 19** (Hooks: `useState`, `useEffect`, `useMemo`)
- **Vite** — fast dev server & build tool
- **Axios** — HTTP client with request cancellation
- **CSS3** — responsive grid, custom properties, transitions

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Create a .env file (see .env.example) and add your TMDB API key
VITE_TMDB_API_KEY=your_tmdb_api_key_here

# 3. Start the dev server
npm run dev
```

Get a free API key from the [TMDB settings page](https://www.themoviedb.org/settings/api).

## 📂 Project Structure

```
src/
├── components/
│   ├── Movies.jsx       # Movie grid & cards
│   ├── Search.jsx       # Title & rating filters
│   └── Pagination.jsx   # Page navigation
├── App.jsx              # State, data fetching & filtering
├── index.css            # Global styles
└── main.jsx             # Entry point
```

## 📸 Screenshots

_Add screenshots or a GIF of the app here._

---

Built by [java1777](https://github.com/java1777)
