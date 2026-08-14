/**
 * Favourites persistence, replacing the SwiftData `@Model DrinkFav` and its
 * `@Query` / `modelContext` plumbing.
 *
 * SwiftData gave the original a persisted store plus live-updating views for
 * free. The equivalent here is one context holding the list in React state and
 * mirroring it to AsyncStorage, which every screen reads through `useFavorites`.
 * Because the whole drink is stored (as the Swift model did), a favourite still
 * opens with its ingredients even when the device is offline.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, use, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { cacheDrinks } from './drink-cache';
import type { Drink } from './drink';

const STORAGE_KEY = 'bar-buddy.favorites.v1';

type FavoritesContextValue = {
  favorites: Drink[];
  /** False once the persisted list has been read back at launch. */
  isLoading: boolean;
  isFavorite: (id: string) => boolean;
  addFavorite: (drink: Drink) => void;
  removeFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function parseStored(raw: string | null): Drink[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (drink): drink is Drink =>
        typeof drink === 'object' && drink !== null && typeof (drink as Drink).idDrink === 'string',
    );
  } catch {
    // A corrupt entry shouldn't wedge the tab — start over rather than throw.
    return [];
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Drink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasLoaded = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = parseStored(await AsyncStorage.getItem(STORAGE_KEY).catch(() => null));
      if (cancelled) return;
      // Seed the detail cache so a saved drink opens instantly and offline.
      cacheDrinks(stored);
      setFavorites(stored);
      hasLoaded.current = true;
      setIsLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // Skip the write triggered by the initial empty state, which would
    // otherwise clobber the stored list before it has been read back.
    if (!hasLoaded.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)).catch(() => {});
  }, [favorites]);

  const addFavorite = useCallback((drink: Drink) => {
    setFavorites((current) =>
      current.some((favorite) => favorite.idDrink === drink.idDrink) ? current : [...current, drink],
    );
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((current) => current.filter((favorite) => favorite.idDrink !== id));
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      isLoading,
      isFavorite: (id: string) => favorites.some((favorite) => favorite.idDrink === id),
      addFavorite,
      removeFavorite,
    }),
    [favorites, isLoading, addFavorite, removeFavorite],
  );

  return <FavoritesContext value={value}>{children}</FavoritesContext>;
}

/**
 * Read-only stand-in for when no provider is mounted above the caller — a
 * screen rendered on its own, in a test or a preview. Degrading to an empty
 * list keeps that screen renderable; throwing would take it down entirely.
 */
const NO_PROVIDER: FavoritesContextValue = {
  favorites: [],
  isLoading: false,
  isFavorite: () => false,
  addFavorite: () => {},
  removeFavorite: () => {},
};

export function useFavorites(): FavoritesContextValue {
  const context = use(FavoritesContext);
  if (!context) {
    if (__DEV__) {
      console.warn('useFavorites: no FavoritesProvider above this component; favorites are disabled.');
    }
    return NO_PROVIDER;
  }
  return context;
}
