export const LANGUAGES = [
  { code: "uz", label: "O'zbekcha", short: "UZ" },
  { code: "ru", label: "Русский", short: "RU" },
  { code: "en", label: "English", short: "EN" },
] as const;

export type Lang = (typeof LANGUAGES)[number]["code"];

export const TMDB_LANG: Record<Lang, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

export type TranslationKey =
  | "topRated"
  | "popular"
  | "upcoming"
  | "favorites"
  | "watchLater"
  | "searchPlaceholder"
  | "minRating"
  | "maxRating"
  | "loading"
  | "fetchError"
  | "noMovies"
  | "noFavorites"
  | "noWatchlist"
  | "description"
  | "noInfo"
  | "prev"
  | "next"
  | "trailer"
  | "noTrailer"
  | "detailsError"
  | "liked"
  | "like"
  | "inWatchlist"
  | "addWatchLater"
  | "minutes"
  | "retry";

export const translations: Record<Lang, Record<TranslationKey, string>> = {
  uz: {
    topRated: "Top reyting",
    popular: "Ommabop",
    upcoming: "Kutilayotgan",
    favorites: "Sevimlilar",
    watchLater: "Keyinroq",
    searchPlaceholder: "Kino nomi bo'yicha qidirish...",
    minRating: "Min reyting",
    maxRating: "Max reyting",
    loading: "Yuklanmoqda...",
    fetchError: "Kinolarni yuklashda xatolik yuz berdi.",
    noMovies: "Hech qanday kino topilmadi.",
    noFavorites: "Hali sevimli kinolar yo'q. Kinolarni ❤️ bilan belgilang.",
    noWatchlist: "Ro'yxat bo'sh. Kinolarni 🏷️ bilan keyinroq ko'rishga qo'shing.",
    description: "Tavsif",
    noInfo: "Ma'lumot mavjud emas.",
    prev: "Oldingi",
    next: "Keyingi",
    trailer: "Treyler",
    noTrailer: "Bu kino uchun treyler topilmadi.",
    detailsError: "Ma'lumotlarni yuklashda xatolik yuz berdi.",
    liked: "Yoqdi",
    like: "Like",
    inWatchlist: "Ro'yxatda",
    addWatchLater: "Keyinroq ko'rish",
    minutes: "min",
    retry: "Qayta urinish",
  },
  ru: {
    topRated: "Топ рейтинг",
    popular: "Популярные",
    upcoming: "Скоро",
    favorites: "Избранное",
    watchLater: "Позже",
    searchPlaceholder: "Поиск по названию фильма...",
    minRating: "Мин рейтинг",
    maxRating: "Макс рейтинг",
    loading: "Загрузка...",
    fetchError: "Ошибка при загрузке фильмов.",
    noMovies: "Фильмы не найдены.",
    noFavorites: "Пока нет избранных фильмов. Отмечайте фильмы значком ❤️.",
    noWatchlist:
      "Список пуст. Добавляйте фильмы значком 🏷️, чтобы посмотреть позже.",
    description: "Описание",
    noInfo: "Информация отсутствует.",
    prev: "Назад",
    next: "Вперёд",
    trailer: "Трейлер",
    noTrailer: "Трейлер для этого фильма не найден.",
    detailsError: "Ошибка при загрузке данных.",
    liked: "Нравится",
    like: "Лайк",
    inWatchlist: "В списке",
    addWatchLater: "Посмотреть позже",
    minutes: "мин",
    retry: "Повторить",
  },
  en: {
    topRated: "Top Rated",
    popular: "Popular",
    upcoming: "Upcoming",
    favorites: "Favorites",
    watchLater: "Watch Later",
    searchPlaceholder: "Search movies by title...",
    minRating: "Min rating",
    maxRating: "Max rating",
    loading: "Loading...",
    fetchError: "Failed to load movies.",
    noMovies: "No movies found.",
    noFavorites: "No favorite movies yet. Mark movies with ❤️.",
    noWatchlist: "Your list is empty. Add movies with 🏷️ to watch later.",
    description: "Overview",
    noInfo: "No information available.",
    prev: "Previous",
    next: "Next",
    trailer: "Trailer",
    noTrailer: "No trailer found for this movie.",
    detailsError: "Failed to load details.",
    liked: "Liked",
    like: "Like",
    inWatchlist: "In list",
    addWatchLater: "Watch later",
    minutes: "min",
    retry: "Retry",
  },
};
