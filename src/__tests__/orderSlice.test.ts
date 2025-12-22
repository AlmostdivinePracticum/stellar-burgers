// ./__tests__/orderSlice.test.ts
import orderReducer, { createOrder, fetchOrderByNumber } from '../slices/orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '3',
  status: 'created',
  name: 'Флюоресцентный бургер',
  createdAt: '2024-01-03T00:00:00.000Z',
  updatedAt: '2024-01-03T00:00:00.000Z',
  number: 125,
  ingredients: ['ing5']
};

describe('orderSlice', () => {
  const initialState = {
    order: null,
    isLoading: false,
    error: null
  };

  describe('createOrder', () => {
    it('handles createOrder.pending', () => {
      const action = { type: createOrder.pending.type };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('handles createOrder.fulfilled', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.order).toEqual(mockOrder);
    });

    it('handles createOrder.rejected', () => {
      const action = {
        type: createOrder.rejected.type,
        payload: 'Добавьте булку'
      };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Добавьте булку');
    });
  });

  describe('fetchOrderByNumber', () => {
    it('Проверка получения заказа (ожидание)', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Проверка получения заказа (получен)', () => {
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.order).toEqual(mockOrder);
    });

    it('Проверка получения заказа (отказ)', () => {
      const action = {
        type: fetchOrderByNumber.rejected.type,
        payload: 'Заказ не найден'
      };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Заказ не найден');
    });
  });
});
