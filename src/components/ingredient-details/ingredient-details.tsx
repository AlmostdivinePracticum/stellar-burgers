import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import {
  selectIngredients,
  selectIngredientsLoading
} from '../../slices/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id?: string }>();
  const allIngredients = useAppSelector(selectIngredients);
  const isLoading = useAppSelector(selectIngredientsLoading);

  const ingredientData = allIngredients.find((ing) => ing._id === id);

  if (isLoading) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return <div>Ингредиент не найден</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
