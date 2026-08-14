/**
 * The drink detail screen, ported from `DrinkDetails.swift` +
 * `DrinkDetailsLogic.swift`.
 *
 * Same two-stage load as the original: render whatever the list already handed
 * over, and fetch the full record in the background when that payload has no
 * ingredients — which is what fixed favourites opening without them.
 */
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { IngredientsView } from '@/components/ingredients-view';
import { MessageView } from '@/components/message-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { YouTubeView } from '@/components/youtube-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { fetchDrinkDetails } from '@/lib/cocktail-api';
import { cacheDrink, getCachedDrink } from '@/lib/drink-cache';
import { hasIngredients, titleOf, type Drink } from '@/lib/drink';
import { useFavorites } from '@/lib/favorites';

export default function DrinkDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isFavorite, addFavorite } = useFavorites();

  const [drink, setDrink] = useState<Drink | null>(() => getCachedDrink(id) ?? null);
  const [hasFailed, setHasFailed] = useState(false);

  const accent = useThemeColor({}, 'accent');
  const card = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const muted = useThemeColor({}, 'muted');
  const placeholder = useThemeColor({}, 'placeholder');

  useEffect(() => {
    // Everything already present — nothing left to fetch.
    if (drink && hasIngredients(drink)) return;

    let cancelled = false;
    (async () => {
      try {
        const full = await fetchDrinkDetails(id);
        if (cancelled || !full) return;
        cacheDrink(full);
        setDrink(full);
      } catch {
        if (!cancelled) setHasFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, drink]);

  if (!drink) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <Stack.Screen options={{ title: '' }} />
        {hasFailed ? (
          <MessageView
            icon="glass-cocktail"
            title="4 oh 4"
            caption="Couldn't load this drink. Check your connection and try again."
          />
        ) : (
          <ActivityIndicator size="large" />
        )}
      </ThemedView>
    );
  }

  const name = titleOf(drink);
  const alreadySaved = isFavorite(drink.idDrink);
  const isLoadingIngredients = !hasIngredients(drink) && !hasFailed;

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: name }} />
      <ScrollView contentContainerStyle={styles.content}>
        {drink.strVideo ? (
          <YouTubeView url={drink.strVideo} />
        ) : drink.strDrinkThumb ? (
          <Image
            source={{ uri: drink.strDrinkThumb }}
            style={[styles.hero, { backgroundColor: placeholder }]}
            contentFit="cover"
            transition={200}
            accessibilityIgnoresInvertColors
          />
        ) : null}

        <View style={styles.body}>
          <ThemedText style={styles.title}>{name}</ThemedText>

          {drink.strGlass ? (
            <View style={[styles.glass, { backgroundColor: card, borderColor: border }]}>
              <MaterialCommunityIcons name="glass-cocktail" size={16} color={muted} />
              <ThemedText style={[styles.glassText, { color: muted }]}>{drink.strGlass}</ThemedText>
            </View>
          ) : null}

          {drink.strInstructions ? (
            <ThemedText style={styles.instructions}>{drink.strInstructions}</ThemedText>
          ) : null}

          {isLoadingIngredients ? (
            <ActivityIndicator style={styles.ingredientsSpinner} />
          ) : (
            <IngredientsView drink={drink} />
          )}

          {alreadySaved ? (
            <View style={[styles.savedChip, { backgroundColor: card, borderColor: border }]}>
              <MaterialCommunityIcons name="star" size={20} color={accent} />
              <ThemedText style={[styles.savedLabel, { color: muted }]}>In Favorites</ThemedText>
            </View>
          ) : (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Add ${name} to favorites`}
              onPress={() => addFavorite(drink)}
              style={({ pressed }) => [
                styles.favoriteButton,
                { backgroundColor: accent, opacity: pressed ? 0.8 : 1 },
              ]}>
              <MaterialCommunityIcons name="star" size={20} color="#FFFFFF" />
              <ThemedText style={styles.favoriteLabel}>Add to Favorites</ThemedText>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingBottom: 40,
  },
  hero: {
    width: '100%',
    aspectRatio: 1,
    maxHeight: 320,
  },
  body: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
  },
  glass: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  glassText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
  },
  ingredientsSpinner: {
    alignSelf: 'flex-start',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 52,
    borderRadius: 16,
  },
  favoriteLabel: {
    color: '#FFFFFF',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
  savedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 52,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  savedLabel: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
});
