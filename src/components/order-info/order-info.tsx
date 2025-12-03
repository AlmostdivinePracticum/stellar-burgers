import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient } from '@utils-types';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import {
  fetchOrderByNumber,
  selectOrder,
  selectOrderLoading
} from '../../slices/orderSlice';
import {
  fetchIngredients,
  selectIngredients,
  selectIngredientsLoading
} from '../../slices/ingredientsSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number?: string }>();
  const dispatch = useAppDispatch();

  const orderData = useAppSelector(selectOrder);
  const isLoadingOrder = useAppSelector(selectOrderLoading);

  const allIngredients = useAppSelector(selectIngredients);
  const isLoadingIngredients = useAppSelector(selectIngredientsLoading);

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [dispatch, number]);

  useEffect(() => {
    if (allIngredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, allIngredients.length]);

  const isLoading = isLoadingOrder || isLoadingIngredients;

  if (isLoading || !orderData || !allIngredients.length) {
    return <Preloader />;
  }

  const ingredientsInfo = orderData.ingredients.reduce(
    (acc: Record<string, TIngredient & { count: number }>, id: string) => {
      const ingredient = allIngredients.find((ing) => ing._id === id);
      if (ingredient) {
        if (!acc[id]) {
          acc[id] = { ...ingredient, count: 1 };
        } else {
          acc[id].count += 1;
        }
      }
      return acc;
    },
    {}
  );

  const total = Object.values(ingredientsInfo).reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  const orderInfo = {
    ...orderData,
    ingredientsInfo,
    total,
    date: new Date(orderData.createdAt)
  };

  return <OrderInfoUI orderInfo={orderInfo} />;
};
