/**
 * A tiny in-memory handoff between a list and the detail screen.
 *
 * expo-router passes route params as strings, so rather than serialising a
 * whole drink through the URL, lists drop what they already fetched in here and
 * `drink/[id]` picks it up to paint immediately instead of showing a spinner
 * for data it already has. It is a cache, not a store: a miss is always safe
 * and simply falls back to a lookup.
 */
import type { Drink } from './drink';

const cache = new Map<string, Drink>();

export function cacheDrinks(drinks: Drink[]): void {
  for (const drink of drinks) {
    cacheDrink(drink);
  }
}

export function cacheDrink(drink: Drink): void {
  const existing = cache.get(drink.idDrink);
  // Never let a sparse list stub overwrite a full detail payload.
  if (existing && Object.keys(existing).length > Object.keys(drink).length) return;
  cache.set(drink.idDrink, drink);
}

export function getCachedDrink(id: string): Drink | undefined {
  return cache.get(id);
}
