import React from "react";

import LayoutBasic from "@components/LayoutBasic";
import ViewFirstdayMassageDirect from "@views/ViewFirstdayMassageDirect";
import axios from "axios";

const FirstdayMassage = () => {
  return (
    <LayoutBasic>
      <ViewFirstdayMassageDirect />
    </LayoutBasic>
  );
};

export default FirstdayMassage;
