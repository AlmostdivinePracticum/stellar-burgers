import profileOrdersReducer, {
  fetchProfileOrders
} from '../slices/profileOrdersSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '2',
    status: 'done',
    name: 'Двойной бургер',
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z',
    number: 124,
    ingredients: ['ing3', 'ing4']
  }
];

describe('profileOrdersSlice', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null
  };

  it('Проверка получения заказов профиля (ожидание)', () => {
    const action = { type: fetchProfileOrders.pending.type };
    const state = profileOrdersReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Проверка получения заказов профиля (получены)', () => {
    const action = {
      type: fetchProfileOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = profileOrdersReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it('Проверка получения заказов профиля (отказ)', () => {
    const action = {
      type: fetchProfileOrders.rejected.type,
      error: { message: 'Ошибка авторизации' }
    };
    const state = profileOrdersReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка авторизации');
  });
});
