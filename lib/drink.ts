/**
 * The drink model, ported from the SwiftUI app's `DrinksModelResponse.swift`.
 *
 * TheCocktailDB returns ingredients and measures as fifteen numbered pairs of
 * flat string fields rather than an array, so the shape below mirrors that
 * exactly and `ingredientsOf` folds it back into something worth rendering.
 */

const INGREDIENT_SLOTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] as const;

type Slot = (typeof INGREDIENT_SLOTS)[number];

type IngredientFields = Partial<Record<`strIngredient${Slot}` | `strMeasure${Slot}`, string | null>>;

export type Drink = IngredientFields & {
  idDrink: string;
  strDrink: string | null;
  strDrinkThumb: string | null;
  strTags: string | null;
  strInstructions: string | null;
  strGlass: string | null;
  strVideo: string | null;
  strCategory?: string | null;
  strAlcoholic?: string | null;
};

export type Ingredient = {
  name: string;
  /** Null for things the API lists without a quantity, e.g. a garnish. */
  measure: string | null;
};

function clean(value: string | null | undefined): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Pairs up the numbered ingredient/measure fields.
 *
 * The SwiftUI original only rendered a row when *both* the ingredient and its
 * measure were present, which silently dropped un-measured entries like "Mint"
 * or "Ice". Here an ingredient is kept whenever it has a name, and the measure
 * is simply omitted when the API doesn't give one.
 */
export function ingredientsOf(drink: Drink): Ingredient[] {
  const ingredients: Ingredient[] = [];
  for (const slot of INGREDIENT_SLOTS) {
    const name = clean(drink[`strIngredient${slot}`]);
    if (!name) continue;
    ingredients.push({ name, measure: clean(drink[`strMeasure${slot}`]) });
  }
  return ingredients;
}

/** True once a drink carries its full detail payload, not just a list stub. */
export function hasIngredients(drink: Drink): boolean {
  return ingredientsOf(drink).length > 0;
}

/** `"IBA,Classic,Alcoholic"` -> `["IBA", "Classic", "Alcoholic"]`. */
export function tagsOf(drink: Drink): string[] {
  const tags = clean(drink.strTags);
  if (!tags) return [];
  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

export function titleOf(drink: Drink): string {
  return clean(drink.strDrink) ?? 'Untitled drink';
}
