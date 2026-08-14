/**
 * The Favorites tab, ported from `Faves.swift`.
 *
 * `@Query private var queryFaveDrinks: [DrinkFav]` becomes `useFavorites()`,
 * and SwiftUI's `editActions: .delete` becomes a swipeable row.
 */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { DrinkRow } from '@/components/drink-row';
import { ListLoadingView } from '@/components/list-loading-view';
import { MessageView } from '@/components/message-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useFavorites } from '@/lib/favorites';
import { titleOf, type Drink } from '@/lib/drink';

function DeleteAction({ drink, onDelete }: { drink: Drink; onDelete: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Remove ${titleOf(drink)} from favorites`}
      onPress={onDelete}
      style={({ pressed }) => [styles.deleteAction, { opacity: pressed ? 0.8 : 1 }]}>
      <MaterialCommunityIcons name="trash-can-outline" size={24} color="#FFFFFF" />
      <ThemedText style={styles.deleteLabel}>Delete</ThemedText>
    </Pressable>
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
          <ReanimatedSwipeable
            friction={2}
            rightThreshold={40}
            overshootRight={false}
            renderRightActions={() => (
              <DeleteAction drink={item} onDelete={() => removeFavorite(item.idDrink)} />
            )}>
            <DrinkRow drink={item} />
          </ReanimatedSwipeable>
        )}
      />
      <View style={styles.hint}>
        <ThemedText style={styles.hintText}>Swipe a drink left to remove it.</ThemedText>
      </View>
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
    gap: 16,
  },
  deleteAction: {
    width: 96,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#FF3B30',
    borderRadius: 16,
    marginLeft: 12,
  },
  deleteLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  hint: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  hintText: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.6,
  },
});
