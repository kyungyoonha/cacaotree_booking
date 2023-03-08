import { CartsResult } from "@types";
import CartService from "src/services/CartService";

export interface State {
  carts: CartsResult;
  getCartsAll: typeof getCartsAll;
  dispatch: React.Dispatch<Action>;
}

export enum ActionType {
  GET_CARTS,
}

export type Action = {
  type: ActionType.GET_CARTS;
  payload: CartsResult;
};

export const getCartsAll = async (_, dispatch: React.Dispatch<Action>) => {
  const data = CartService.getCarts();
  dispatch({
    type: ActionType.GET_CARTS,
    payload: data,
  });
};
