import { TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
  isOrderDisabled: boolean;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
};
