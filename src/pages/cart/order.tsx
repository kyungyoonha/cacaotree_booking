import React from "react";
import LayoutBasic from "@components/LayoutBasic";

import theme from "@styles/theme";
import ViewOrder from "@views/ViewOrder";

const OrderPage = () => {
  return (
    <LayoutBasic background={theme.gray}>
      <ViewOrder />
    </LayoutBasic>
  );
};
export default OrderPage;
