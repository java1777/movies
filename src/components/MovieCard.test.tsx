import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import MovieCard from "./MovieCard";
import { SettingsProvider } from "../context/SettingsProvider";
import type { SavedMovies } from "../hooks/useSavedMovies";
import type { Movie } from "../types/tmdb";

const movie: Movie = {
  id: 1,
  title: "Test Movie",
  overview: "overview",
  poster_path: null,
  backdrop_path: null,
  vote_average: 8,
  release_date: "2020-01-01",
};

function makeSaved(overrides: Partial<SavedMovies> = {}): SavedMovies {
  return {
    liked: [],
    watchlist: [],
    isLiked: () => false,
    isWatched: () => false,
    toggleLike: vi.fn(),
    toggleWatch: vi.fn(),
    ...overrides,
  };
}

function renderCard(props: Partial<Parameters<typeof MovieCard>[0]> = {}) {
  const finalProps = {
    movie,
    onSelect: vi.fn(),
    saved: makeSaved(),
    ...props,
  };
  render(
    <SettingsProvider>
      <MovieCard {...finalProps} />
    </SettingsProvider>,
  );
  return finalProps;
}

describe("MovieCard", () => {
  it("renders the title and formatted score", () => {
    renderCard();
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("8.0")).toBeInTheDocument();
  });

  it("calls onSelect when the card is clicked", async () => {
    const onSelect = vi.fn();
    renderCard({ onSelect });
    await userEvent.click(screen.getByText("Test Movie"));
    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it("toggles like without triggering onSelect", async () => {
    const onSelect = vi.fn();
    const saved = makeSaved();
    renderCard({ onSelect, saved });

    await userEvent.click(screen.getByRole("button", { name: /like/i }));

    expect(saved.toggleLike).toHaveBeenCalledWith(movie);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
