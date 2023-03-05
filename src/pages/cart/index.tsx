import React from "react";
import LayoutBasic from "@components/LayoutBasic";
import ViewCart from "@views/ViewCart";
import theme from "@styles/theme";

const Card = () => {
  return (
    <LayoutBasic background={theme.gray}>
      <ViewCart />
    </LayoutBasic>
  );
};
export default Card;
