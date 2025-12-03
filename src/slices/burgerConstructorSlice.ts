import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: { payload: TConstructorIngredient }) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    removeIngredient: (state, action: { payload: string }) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: { payload: { from: number; to: number } }
    ) => {
      const { from, to } = action.payload;
      const dragged = state.ingredients[from];
      state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, dragged);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;

export const selectConstructorBun = (state: {
  burgerConstructor: ConstructorState;
}) => state.burgerConstructor.bun;
export const selectConstructorIngredients = (state: {
  burgerConstructor: ConstructorState;
}) => state.burgerConstructor.ingredients;
