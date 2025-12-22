import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../slices/burgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

const bun: TConstructorIngredient = {
  _id: '1',
  id: 'bun-1',
  name: 'Краторная булка',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: '',
  image_large: '',
  image_mobile: ''
};

const ingredient1: TConstructorIngredient = {
  _id: '2',
  id: 'ing-1',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 25,
  carbohydrates: 40,
  calories: 300,
  price: 90,
  image: '',
  image_large: '',
  image_mobile: ''
};

const ingredient2: TConstructorIngredient = {
  _id: '3',
  id: 'ing-2',
  name: 'Мясо бессмертных моллюсков',
  type: 'main',
  proteins: 430,
  fat: 120,
  carbohydrates: 50,
  calories: 1337,
  price: 1100,
  image: '',
  image_large: '',
  image_mobile: ''
};

describe('burgerConstructor reducer', () => {
  it('Проверка добавления ингредиента (булка)', () => {
    const initialState = { bun: null, ingredients: [] };
    const newState = burgerConstructorReducer(initialState, addIngredient(bun));
    expect(newState.bun).toEqual(bun);
    expect(newState.ingredients).toEqual([]);
  });

  it('Проверка добавления ингредиента (не булка)', () => {
    const initialState = { bun: null, ingredients: [] };
    const newState = burgerConstructorReducer(initialState, addIngredient(ingredient1));
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toEqual([ingredient1]);
  });

  it('Проверка удаления ингредиента', () => {
    const initialState = { bun: null, ingredients: [ingredient1, ingredient2] };
    const newState = burgerConstructorReducer(
      initialState,
      removeIngredient(ingredient1.id)
    );
    expect(newState.ingredients).toEqual([ingredient2]);
  });

  it('Проверка перемещения ингредиента', () => {
    const initialState = { bun: null, ingredients: [ingredient1, ingredient2] };
    const newState = burgerConstructorReducer(
      initialState,
      moveIngredient({ from: 0, to: 1 })
    );
    expect(newState.ingredients).toEqual([ingredient2, ingredient1]);
  });

  it('Проверка очистки', () => {
    const initialState = { bun, ingredients: [ingredient1] };
    const newState = burgerConstructorReducer(initialState, clearConstructor());
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toEqual([]);
  });
});
