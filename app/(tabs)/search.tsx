/**
 * The Search tab, ported from `Search.swift` + `SearchLogic.swift`.
 *
 * SwiftUI's `.searchable` modifier has no cross-platform equivalent, so the
 * field is built into the screen. The Swift version searched on submit only;
 * this also searches as you pause typing, with stale responses discarded so a
 * slow early request can't overwrite a newer one.
 */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { DrinkList } from '@/components/drink-list';
import { ListLoadingView } from '@/components/list-loading-view';
import { MessageView } from '@/components/message-view';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { searchDrinks } from '@/lib/cocktail-api';
import { cacheDrinks } from '@/lib/drink-cache';
import type { Drink } from '@/lib/drink';

const DEBOUNCE_MS = 350;

type SearchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'failed' }
  | { status: 'noResults'; query: string }
  | { status: 'success'; drinks: Drink[] };

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [state, setState] = useState<SearchState>({ status: 'idle' });
  /** Guards against an earlier, slower request landing after a later one. */
  const requestId = useRef(0);

  const card = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const muted = useThemeColor({}, 'muted');
  const text = useThemeColor({}, 'text');

  const runSearch = useCallback(async (query: string) => {
    const trimmed = query.trim();
    const id = ++requestId.current;

    if (trimmed.length === 0) {
      setState({ status: 'idle' });
      return;
    }

    setState({ status: 'loading' });
    try {
      const drinks = await searchDrinks(trimmed);
      if (id !== requestId.current) return;
      cacheDrinks(drinks);
      setState(
        drinks.length === 0 ? { status: 'noResults', query: trimmed } : { status: 'success', drinks },
      );
    } catch {
      if (id !== requestId.current) return;
      setState({ status: 'failed' });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => runSearch(searchText), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchText, runSearch]);

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.searchBar, { backgroundColor: card, borderColor: border }]}>
        <MaterialCommunityIcons name="magnify" size={20} color={muted} />
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={() => runSearch(searchText)}
          placeholder="Search drinks"
          placeholderTextColor={muted}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          accessibilityLabel="Search drinks"
          style={[styles.input, { color: text }]}
        />
        {searchText.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            hitSlop={12}
            onPress={() => setSearchText('')}>
            <MaterialCommunityIcons name="close-circle" size={20} color={muted} />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.results}>
        {state.status === 'idle' ? (
          <View style={styles.centered}>
            <MessageView
              icon="magnify"
              title="Find a drink"
              caption="Search by name — try “margarita”, “mojito” or “sour”."
            />
          </View>
        ) : null}

        {state.status === 'loading' ? <ListLoadingView /> : null}

        {state.status === 'failed' ? (
          <View style={styles.centered}>
            <MessageView
              icon="magnify"
              title="4 oh 4"
              caption="Couldn't run that search. Check your connection and try again."
              actionLabel="Try again"
              onAction={() => runSearch(searchText)}
            />
          </View>
        ) : null}

        {state.status === 'noResults' ? (
          <View style={styles.centered}>
            <MessageView
              icon="magnify"
              title="No results found!"
              caption={`Nothing matched “${state.query}”.`}
            />
          </View>
        ) : null}

        {state.status === 'success' ? <DrinkList drinks={state.drinks} /> : null}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 12,
    minHeight: 48,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    fontSize: 16,
    // The field is its own tap target, so it carries the 44pt minimum itself
    // rather than inheriting the row's height.
    minHeight: 44,
    paddingVertical: 8,
  },
  results: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
  },
});
