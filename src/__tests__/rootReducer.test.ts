import rootReducer from '../services/rootReducer';
import constructorReducer from '../slices/burgerConstructorSlice';
import feedReducer from '../slices/feedSlice';
import ingredientsReducer from '../slices/ingredientsSlice';
import orderReducer from '../slices/orderSlice';
import profileOrdersReducer from '../slices/profileOrdersSlice';
import userReducer from '../slices/userSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('rootReducer', () => {
  it('Проверка инит стейта', () => {
    const store = configureStore({ reducer: rootReducer });
    const state = store.getState();

    expect(state.ingredients).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });
    expect(state.user).toMatchObject({
      user: null,
      isAuthChecked: false,
      loginRequest: false,
      loginError: null,
      registerRequest: false,
      registerError: null
    });
    expect(state.burgerConstructor).toEqual({ bun: null, ingredients: [] });
    expect(state.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: null
    });
    expect(state.order).toEqual({ order: null, isLoading: false, error: null });
    expect(state.profileOrders).toEqual({
      orders: [],
      loading: false,
      error: null
    });
  });

  it('Проверка обработки неизвестного экшна', () => {
    const fakeAction = { type: 'UNKNOWN_ACTION' };

    const state = rootReducer(undefined, fakeAction);

    expect(state).toEqual({
      burgerConstructor: constructorReducer(undefined, fakeAction),
      feed: feedReducer(undefined, fakeAction),
      ingredients: ingredientsReducer(undefined, fakeAction),
      order: orderReducer(undefined, fakeAction),
      profileOrders: profileOrdersReducer(undefined, fakeAction),
      user: userReducer(undefined, fakeAction)
    });

    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });
    expect(state.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: null
    });
    expect(state.ingredients).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });
    expect(state.order).toEqual({
      order: null,
      isLoading: false,
      error: null
    });
    expect(state.profileOrders).toEqual({
      orders: [],
      loading: false,
      error: null
    });
    expect(state.user).toEqual({
      user: null,
      isAuthChecked: false,
      loginRequest: false,
      loginError: null,
      registerRequest: false,
      registerError: null
    });
  });
});
