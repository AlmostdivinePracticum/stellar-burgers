import rootReducer from '../services/rootReducer';
import { configureStore } from '@reduxjs/toolkit';

describe('rootReducer', () => {
  it('should initialize the state correctly', () => {
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
});
