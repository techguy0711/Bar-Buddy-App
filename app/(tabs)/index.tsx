/**
 * The Popular tab, ported from `Popular.swift` + `PopularLogic.swift`.
 *
 * The Swift `PopularState` enum (loading / failed / success) is carried over
 * as-is; `.refreshable` becomes the list's pull-to-refresh.
 */
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DrinkList } from '@/components/drink-list';
import { ListLoadingView } from '@/components/list-loading-view';
import { MessageView } from '@/components/message-view';
import { ThemedView } from '@/components/themed-view';
import { fetchPopularDrinks } from '@/lib/cocktail-api';
import { cacheDrinks } from '@/lib/drink-cache';
import type { Drink } from '@/lib/drink';

type PopularState =
  | { status: 'loading' }
  | { status: 'failed' }
  | { status: 'success'; drinks: Drink[] };

export default function PopularScreen() {
  const [state, setState] = useState<PopularState>({ status: 'loading' });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const load = useCallback(async ({ isRefresh = false } = {}) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setState({ status: 'loading' });
    }
    try {
      const drinks = await fetchPopularDrinks();
      cacheDrinks(drinks);
      setState({ status: 'success', drinks });
    } catch {
      setState({ status: 'failed' });
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ThemedView style={styles.container}>
      {state.status === 'loading' ? <ListLoadingView /> : null}

      {state.status === 'failed' ? (
        <View style={styles.centered}>
          <MessageView
            icon="glass-cocktail"
            title="4 oh 4"
            caption="Couldn't reach the bar. Check your connection and try again."
            actionLabel="Try again"
            onAction={() => load()}
          />
        </View>
      ) : null}

      {state.status === 'success' ? (
        <DrinkList
          drinks={state.drinks}
          isRefreshing={isRefreshing}
          onRefresh={() => load({ isRefresh: true })}
        />
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
  },
});
