/**
 * TheCocktailDB client, ported from `PopularLogic.swift`, `SearchLogic.swift`
 * and `DrinkDetailsLogic.swift`.
 *
 * The SwiftUI app called the RapidAPI mirror of this API with a hardcoded key.
 * That key is dead (the subscription returns HTTP 403), so this talks to
 * TheCocktailDB's free public API directly instead — same payload shape, same
 * endpoints, no key and no account to keep alive.
 */
import type { Drink } from './drink';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

/** Matches the 10s `timeoutInterval` the Swift requests used. */
const REQUEST_TIMEOUT_MS = 10_000;

/**
 * The free tier's `popular.php` only ever returns a single drink, so the
 * Popular tab is built from this curated set of IBA classics and crowd
 * favourites instead. Each is looked up in full, which is what gives the rows
 * their tags.
 */
const POPULAR_DRINK_IDS = [
  '11000', // Mojito
  '11007', // Margarita
  '11001', // Old Fashioned
  '11003', // Negroni
  '11004', // Whiskey Sour
  '11006', // Daiquiri
  '11008', // Manhattan
  '11009', // Moscow Mule
  '17196', // Cosmopolitan
  '11005', // Dry Martini
  '11002', // Long Island Tea
  '11410', // Gin Fizz
  '11014', // Alexander
  '11423', // Godfather
  '11728', // Martini
];

async function getJson(path: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${BASE_URL}${path}`, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return (await response.json()) as unknown;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Normalises the `drinks` field, which is not always a list: the API answers a
 * query with no matches as either `{"drinks": null}` or, for an empty search
 * term, the *string* `{"drinks": "no data found"}`. Both mean "no results".
 */
function parseDrinks(payload: unknown): Drink[] {
  if (typeof payload !== 'object' || payload === null) return [];
  const drinks = (payload as { drinks?: unknown }).drinks;
  if (!Array.isArray(drinks)) return [];
  return drinks.filter(
    (drink): drink is Drink =>
      typeof drink === 'object' && drink !== null && typeof (drink as Drink).idDrink === 'string',
  );
}

export async function fetchPopularDrinks(): Promise<Drink[]> {
  const results = await Promise.all(
    POPULAR_DRINK_IDS.map(async (id) => {
      try {
        return await fetchDrinkDetails(id);
      } catch {
        return null;
      }
    }),
  );

  const drinks = results.filter((drink): drink is Drink => drink !== null);
  if (drinks.length === 0) {
    throw new Error('Could not load the popular drinks list');
  }
  return drinks;
}

export async function searchDrinks(searchText: string): Promise<Drink[]> {
  const query = searchText.trim();
  if (query.length === 0) return [];
  return parseDrinks(await getJson(`/search.php?s=${encodeURIComponent(query)}`));
}

export async function fetchDrinkDetails(id: string): Promise<Drink | null> {
  const drinks = parseDrinks(await getJson(`/lookup.php?i=${encodeURIComponent(id)}`));
  return drinks[0] ?? null;
}
