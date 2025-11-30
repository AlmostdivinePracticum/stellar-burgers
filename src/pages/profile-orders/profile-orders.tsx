import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  fetchProfileOrders,
  selectProfileOrders,
  selectProfileOrdersLoading
} from '../../slices/profileOrdersSlice';
import {
  fetchIngredients,
  selectIngredients,
  selectIngredientsLoading
} from '../../slices/ingredientsSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectProfileOrders);
  const isLoadingOrders = useAppSelector(selectProfileOrdersLoading);
  const ingredients = useAppSelector(selectIngredients);
  const isLoadingIngredients = useAppSelector(selectIngredientsLoading);

  useEffect(() => {
    dispatch(fetchProfileOrders());
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  const isLoading = isLoadingOrders || isLoadingIngredients;

  return <ProfileOrdersUI orders={orders} />;
};
