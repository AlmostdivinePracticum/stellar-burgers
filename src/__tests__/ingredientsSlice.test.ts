import ingredientsReducer, {
  fetchIngredients
} from '../slices/ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: '',
    image_large: '',
    image_mobile: ''
  }
];

describe('ingredientsSlice', () => {
  const initialState = { ingredients: [], loading: false, error: null };

  it('Проверка ожидания получения ингредиентов', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Проверка получения ингредиентов (получены)', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('Проверка получения ингредиентов (отказ)', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const action = {
      type: fetchIngredients.rejected.type,
      payload: errorMessage
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
