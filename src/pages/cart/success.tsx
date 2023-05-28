import React from "react";
import LayoutBasic from "@components/LayoutBasic";

import theme from "@styles/theme";
import ViewOrderSuccess from "@views/ViewOrderSuccess";

const SuccessPage = () => {
  return (
    <LayoutBasic background={theme.gray}>
      <ViewOrderSuccess />
    </LayoutBasic>
  );
};
export default SuccessPage;
