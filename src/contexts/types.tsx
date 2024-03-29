import { CartItemType, CartsResult, BlockDates, ItemKey } from "@types";
import CartService from "src/services/CartService";

export interface State {
  blockDates: BlockDates;
  carts: CartsResult;
  cartItem: CartItemType;
  modalOpenForm: boolean;
  getCartsAll: typeof getCartsAll;
  onFinishForm: typeof onFinishForm;
  onOpenModalForm: typeof onOpenModalForm;
  onChangeCartItem: typeof onChangeCartItem;
  getBlockDates: typeof getBlockDates;
  dispatch: React.Dispatch<Action>;
}

export enum ActionType {
  GET_CARTS,
  OPEN_MODAL_FORM,
  CHANGE_CART_ITEM,
  GET_BLOCK_DATE,
}

export type Action =
  | {
      type: ActionType.GET_CARTS;
      payload: CartsResult;
    }
  | {
      type: ActionType.OPEN_MODAL_FORM;
      payload: boolean;
    }
  | {
      type: ActionType.CHANGE_CART_ITEM;
      payload: CartItemType;
    }
  | {
      type: ActionType.GET_BLOCK_DATE;
      payload: BlockDates;
    };

export const getBlockDates = async (
  blockDates: BlockDates,
  dispatch: React.Dispatch<Action>
) => {
  dispatch({
    type: ActionType.GET_BLOCK_DATE,
    payload: blockDates,
  });
};

export const getCartsAll = async (_, dispatch: React.Dispatch<Action>) => {
  const data = CartService.getCarts();
  dispatch({
    type: ActionType.GET_CARTS,
    payload: data,
  });
};

interface onFinishProps {
  itemKey: ItemKey;
  cartItem: CartItemType;
}

export const onFinishForm = (
  { itemKey, cartItem }: onFinishProps,
  dispatch: React.Dispatch<Action>
) => {
  cartItem.seq
    ? CartService.updateItem(itemKey, cartItem)
    : CartService.addItem(itemKey, cartItem);

  onOpenModalForm(true, dispatch);
  getCartsAll({}, dispatch);
};

export const onOpenModalForm = (
  open: boolean,
  dispatch: React.Dispatch<Action>
) => {
  dispatch({
    type: ActionType.OPEN_MODAL_FORM,
    payload: open,
  });
};

export const onChangeCartItem = (
  cartItem: CartItemType,
  dispatch: React.Dispatch<Action>
) => {
  dispatch({
    type: ActionType.CHANGE_CART_ITEM,
    payload: cartItem,
  });
};
