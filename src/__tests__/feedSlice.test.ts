import feedReducer, { fetchFeeds } from '../slices/feedSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Бургер',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 123,
    ingredients: ['ing1', 'ing2']
  }
];

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  it('Проверка ожидания получения фида', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Проверка получения фида (получен)', () => {
    const payload = {
      orders: mockOrders,
      total: 100,
      totalToday: 10
    };
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload
    };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  it('Проверка получения фида (отказ)', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка сети' }
    };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка сети');
  });
});
