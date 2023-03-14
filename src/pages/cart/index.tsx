import React from "react";
import LayoutBasic from "@components/LayoutBasic";
import ViewCart from "@views/ViewCart";
import theme from "@styles/theme";

const CartPage = () => {
  return (
    <LayoutBasic background={theme.gray}>
      <ViewCart />
    </LayoutBasic>
  );
};
export default CartPage;
