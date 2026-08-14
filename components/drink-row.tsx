/**
 * A single drink row, ported from `DrinkRow.swift`: artwork, the drink's name,
 * and its tags, wrapped in a navigation link to the detail screen.
 */
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { tagsOf, titleOf, type Drink } from '@/lib/drink';

/** The SwiftUI row showed every tag in a small scroll area; three is plenty. */
const MAX_VISIBLE_TAGS = 3;

export function DrinkRow({ drink }: { drink: Drink }) {
  const router = useRouter();
  const card = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const chip = useThemeColor({}, 'chip');
  const muted = useThemeColor({}, 'muted');
  const placeholder = useThemeColor({}, 'placeholder');

  const name = titleOf(drink);
  const tags = tagsOf(drink).slice(0, MAX_VISIBLE_TAGS);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      onPress={() => router.push({ pathname: '/drink/[id]', params: { id: drink.idDrink } })}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: card, borderColor: border, opacity: pressed ? 0.85 : 1 },
      ]}>
      {drink.strDrinkThumb ? (
        <Image
          source={{ uri: drink.strDrinkThumb }}
          style={[styles.image, { backgroundColor: placeholder }]}
          contentFit="cover"
          transition={200}
          accessibilityIgnoresInvertColors
        />
      ) : null}
      <View style={styles.body}>
        <ThemedText style={styles.title} numberOfLines={3}>
          {name}
        </ThemedText>
        {tags.length > 0 ? (
          <View style={styles.tags}>
            {tags.map((tag) => (
              <View key={tag} style={[styles.chip, { backgroundColor: chip }]}>
                <ThemedText style={[styles.chipText, { color: muted }]}>{tag}</ThemedText>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  body: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  chipText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
});
