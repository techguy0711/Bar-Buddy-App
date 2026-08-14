# Bar Buddy

Alcoholic beverage dictionary — browse popular cocktails, search the catalogue,
and keep a list of favourites.

Originally a SwiftUI/iOS app; now an [Expo](https://expo.dev) app running on
iOS, Android and the web from one codebase. The original Swift sources are kept
under [`ios-native-original/`](ios-native-original) for reference.

## Running it

```bash
npm install
npx expo start
```

Scan the QR code with [Expo Go](https://expo.dev/go) (SDK 54) on your phone, or
press `w` for the browser.

## How it's laid out

```
app/                     screens (expo-router file-based routing)
  (tabs)/index.tsx       Popular
  (tabs)/favorites.tsx   Favorites
  (tabs)/search.tsx      Search
  drink/[id].tsx         Drink details
components/              DrinkRow, DrinkList, shimmer, ingredients, video embed
lib/                     data layer — API client, drink model, favourites store
```

## Where the data comes from

[TheCocktailDB](https://www.thecocktaildb.com/api.php)'s free public API — no
key and no account required.

The SwiftUI version called the RapidAPI mirror of the same service with a
hardcoded key, which no longer works (that subscription returns HTTP 403), so
the port talks to the public endpoints directly. One consequence: the free
tier's `popular.php` only ever returns a single drink, so the Popular tab is
built from a curated set of IBA classics looked up by id — the list lives in
`lib/cocktail-api.ts` and is a one-line edit.

## Notes on the port

| SwiftUI | Expo |
| --- | --- |
| `TabView` | `expo-router` tabs |
| SwiftData `@Model` / `@Query` | `FavoritesProvider` over AsyncStorage |
| `AsyncImage` | `expo-image` |
| `WKWebView` YouTube embed | `react-native-webview` (iframe on web) |
| `.searchable` | in-screen search field, debounced |
| `.refreshable` | `FlatList` pull-to-refresh |
| Shimmer gradient mask | animated highlight band |

Two behaviour changes worth knowing about: ingredients listed without a measure
are now shown (the Swift version required both fields and silently dropped
things like "Ice" or "Mint"), and search runs as you pause typing rather than
only on submit.
