import { TOrder } from '@utils-types';
import { TConstructorIngredient } from '@utils-types';

export type TConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export type BurgerConstructorUIProps = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
  isOrderDisabled: boolean;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  onRemove?: (id: string) => void;
};
