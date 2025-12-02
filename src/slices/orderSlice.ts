import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import {
  selectConstructorBun,
  selectConstructorIngredients
} from './burgerConstructorSlice';
import { RootState } from '../services/store';

interface OrderState {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  isLoading: false,
  error: null
};

export const createOrder = createAsyncThunk<TOrder, void, { state: RootState }>(
  'order/createOrder',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const bun = selectConstructorBun(state);
    const ingredients = selectConstructorIngredients(state);

    if (!bun) {
      return rejectWithValue('Добавьте булку');
    }

    const ingredientIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    try {
      const response = await orderBurgerApi(ingredientIds);
      return response.order;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('Ошибка создания заказа');
      }
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('order/fetchOrderByNumber', async (number, { rejectWithValue }) => {
  try {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    } else {
      return rejectWithValue('Ошибка загрузки заказа');
    }
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

export const selectOrder = (state: { order: OrderState }) => state.order.order;
export const selectOrderLoading = (state: { order: OrderState }) =>
  state.order.isLoading;
export const selectOrderError = (state: { order: OrderState }) =>
  state.order.error;
