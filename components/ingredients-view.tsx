/**
 * The ingredients checklist, ported from `IngredientsView` /
 * `IngredientView` in `DrinkDetails.swift`.
 *
 * The Swift version spelled out all fifteen slots by hand; `ingredientsOf`
 * collapses that into a list, so this just renders it.
 */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ingredientsOf, type Drink } from '@/lib/drink';

export function IngredientsView({ drink }: { drink: Drink }) {
  const muted = useThemeColor({}, 'muted');
  const ingredients = ingredientsOf(drink);

  if (ingredients.length === 0) return null;

  return (
    <View style={styles.container}>
      <ThemedText style={styles.heading}>Ingredients</ThemedText>
      {ingredients.map((ingredient) => (
        <View key={`${ingredient.name}-${ingredient.measure ?? ''}`} style={styles.row}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color="rgba(52, 199, 89, 0.7)"
            style={styles.icon}
          />
          <ThemedText style={styles.name}>{ingredient.name}</ThemedText>
          {ingredient.measure ? (
            <ThemedText style={[styles.measure, { color: muted }]}>{ingredient.measure}</ThemedText>
          ) : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  heading: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  icon: {
    marginTop: 2,
  },
  name: {
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  measure: {
    fontSize: 16,
    lineHeight: 22,
  },
});
