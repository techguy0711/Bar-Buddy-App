/**
 * The scrolling list of drinks, ported from `DrinkList.swift`.
 *
 * A `FlatList` replaces SwiftUI's `List` so rows are recycled rather than all
 * mounted at once, and it carries the pull-to-refresh that `Popular.swift`
 * attached with `.refreshable`.
 */
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

import { DrinkRow } from '@/components/drink-row';
import type { Drink } from '@/lib/drink';

type DrinkListProps = {
  drinks: Drink[];
  onRefresh?: () => void;
  isRefreshing?: boolean;
  ListHeaderComponent?: React.ComponentProps<typeof FlatList>['ListHeaderComponent'];
};

export function DrinkList({
  drinks,
  onRefresh,
  isRefreshing = false,
  ListHeaderComponent,
}: DrinkListProps) {
  return (
    <FlatList
      data={drinks}
      keyExtractor={(drink) => drink.idDrink}
      renderItem={({ item }) => <DrinkRow drink={item} />}
      contentContainerStyle={styles.content}
      ListHeaderComponent={ListHeaderComponent}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      refreshControl={
        onRefresh ? <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} /> : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 16,
  },
});
