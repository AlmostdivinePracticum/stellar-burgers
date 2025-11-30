import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  selectConstructorBun,
  selectConstructorIngredients,
  moveIngredient,
  clearConstructor
} from '../../slices/burgerConstructorSlice';
import { selectUser } from '../../slices/userSlice';
import { createOrder, clearOrder } from '../../slices/orderSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { TOrder } from '@utils-types';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const bun = useAppSelector(selectConstructorBun);
  const ingredients = useAppSelector(selectConstructorIngredients);

  const onMoveUp = (index: number) => {
    if (index > 0) {
      dispatch(moveIngredient({ from: index, to: index - 1 }));
    }
  };

  const onMoveDown = (index: number) => {
    if (index < ingredients.length - 1) {
      dispatch(moveIngredient({ from: index, to: index + 1 }));
    }
  };

  const orderRequest = useAppSelector(
    (state: { order: { isLoading: boolean } }) => state.order.isLoading
  );

  const orderModalData = useAppSelector(
    (state: { order: { order: TOrder | null } }) => state.order.order
  );

  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();
  const isOrderDisabled = !bun || ingredients.length === 0;

  const onOrderClick = () => {
    if (isOrderDisabled || orderRequest) return;
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    dispatch(createOrder())
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = Array.isArray(ingredients)
      ? ingredients.reduce((s, v) => s + v.price, 0)
      : 0;
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const constructorItems = {
    bun: bun ?? null,
    ingredients: Array.isArray(ingredients) ? ingredients : []
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      isOrderDisabled={isOrderDisabled}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
    />
  );
};
