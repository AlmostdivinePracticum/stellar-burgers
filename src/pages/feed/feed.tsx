import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  fetchFeeds,
  selectFeeds,
  selectFeedLoading
} from '../../slices/feedSlice';
import {
  fetchIngredients,
  selectIngredients,
  selectIngredientsLoading
} from '../../slices/ingredientsSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectFeeds);
  const isLoadingFeeds = useAppSelector(selectFeedLoading);
  const ingredients = useAppSelector(selectIngredients);
  const isLoadingIngredients = useAppSelector(selectIngredientsLoading);

  useEffect(() => {
    dispatch(fetchFeeds());
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  const isLoading = isLoadingFeeds || isLoadingIngredients;

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
