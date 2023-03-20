import React, { useReducer, useMemo } from "react";
import { defaultCartItem } from "src/services/CartService";
import {
  State,
  Action,
  ActionType,
  getCartsAll,
  onFinishForm,
  onOpenModalForm,
  onChangeCartItem,
} from "./types";

const initialState: State = {
  carts: {
    summary: {
      totalDiscountPeso: 0,
      totalDiscountWon: 0,
      totalPaymentPeso: 0,
      totalPaymentWon: 0,
      totalPricePeso: 0,
      totalPriceWon: 0,
      totalItemCnt: 0,
    },
    cartItems: [],
  },
  cartItem: defaultCartItem,
  modalOpenForm: false,
  getCartsAll,
  onFinishForm,
  onOpenModalForm,
  onChangeCartItem,
  dispatch: () => null,
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.GET_CARTS:
      return {
        ...state,
        carts: action.payload,
      };

    case ActionType.OPEN_MODAL_FORM:
      return {
        ...state,
        modalOpenForm: action.payload,
      };

    case ActionType.CHANGE_CART_ITEM:
      return {
        ...state,
        cartItem: action.payload,
      };
  }
};

const UIContext = React.createContext<State>(initialState);
UIContext.displayName = "UIContext";

export const UIProvider = ({ children, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({
      ...state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <UIContext.Provider value={value} {...props}>
      {children}
    </UIContext.Provider>
  );
};
export const useUIContext = () => {
  const context = React.useContext(UIContext);

  if (context === undefined) {
    throw new Error("useUIContext must be used  within a UIProvider");
  }
  return context;
};
