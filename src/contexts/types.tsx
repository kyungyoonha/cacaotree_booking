import { CartsResult, FormType, ItemKey } from "@types";
import CartService from "src/services/CartService";

export interface State {
  carts: CartsResult;
  modalOpenForm: boolean;
  getCartsAll: typeof getCartsAll;
  onFinishForm: typeof onFinishForm;
  onOpenModalForm: typeof onOpenModalForm;
  dispatch: React.Dispatch<Action>;
}

export enum ActionType {
  GET_CARTS,
  OPEN_MODAL_FORM,
}

export type Action =
  | {
      type: ActionType.GET_CARTS;
      payload: CartsResult;
    }
  | {
      type: ActionType.OPEN_MODAL_FORM;
      payload: boolean;
    };

export const getCartsAll = async (_, dispatch: React.Dispatch<Action>) => {
  const data = CartService.getCarts();
  dispatch({
    type: ActionType.GET_CARTS,
    payload: data,
  });
};

interface onFinishProps {
  key: ItemKey;
  form: FormType;
  seq?: number;
}

export const onFinishForm = (
  { key, form, seq }: onFinishProps,
  dispatch: React.Dispatch<Action>
) => {
  if (seq) {
    let newCartItem = CartService.findItemBySeq(key, seq);
    CartService.updateItem(key, {
      ...newCartItem,
      form,
    });
  } else {
    CartService.addItem(key, form);
  }

  // onOpenModalForm(true, dispatch);
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
