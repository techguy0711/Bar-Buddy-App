/**
 * The Favorites tab, ported from `Faves.swift`.
 *
 * `@Query private var queryFaveDrinks: [DrinkFav]` becomes `useFavorites()`.
 *
 * SwiftUI's `editActions: .delete` was first ported as a `ReanimatedSwipeable`
 * row, which is why this was the only screen wrapping its rows in a
 * gesture-handler component. Back navigation out of a drink opened from here
 * misbehaved in a way it did not from Popular or Search — the one structural
 * difference between the three — so the swipe is gone and removal is an
 * ordinary button. It is also more discoverable than a hidden swipe, and
 * behaves the same on iOS, Android and web.
 */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { DrinkRow } from '@/components/drink-row';
import { ListLoadingView } from '@/components/list-loading-view';
import { MessageView } from '@/components/message-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { titleOf, type Drink } from '@/lib/drink';
import { useFavorites } from '@/lib/favorites';

function FavoriteRow({ drink, onRemove }: { drink: Drink; onRemove: () => void }) {
  const muted = useThemeColor({}, 'muted');

  return (
    <View style={styles.item}>
      <DrinkRow drink={drink} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Remove ${titleOf(drink)} from favorites`}
        hitSlop={8}
        onPress={onRemove}
        style={({ pressed }) => [styles.remove, { opacity: pressed ? 0.5 : 1 }]}>
        <MaterialCommunityIcons name="trash-can-outline" size={18} color={muted} />
        <ThemedText style={[styles.removeLabel, { color: muted }]}>Remove</ThemedText>
      </Pressable>
    </View>
  );
}

export default function FavoritesScreen() {
  const { favorites, isLoading, removeFavorite } = useFavorites();

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ListLoadingView />
      </ThemedView>
    );
  }

  if (favorites.length === 0) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <MessageView
          emoji="🙁"
          title="No favorites yet!"
          caption="Tap the star on any drink to keep it here."
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(drink) => drink.idDrink}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <FavoriteRow drink={item} onRemove={() => removeFavorite(item.idDrink)} />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
  },
  content: {
    padding: 16,
    gap: 20,
  },
  item: {
    gap: 8,
  },
  remove: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 6,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  removeLabel: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
  },
});
