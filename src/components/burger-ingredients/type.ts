import { TIngredient, TTabMode } from '@utils-types';

export type TIngredientsCounters = Record<string, number>;

export type TIngredientsCategoryProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
  ingredients: TIngredient[];
  ingredientsCounters: TIngredientsCounters;
};
