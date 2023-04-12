import React from "react";

import { QuestionSelectWithSvg } from "@components/QuestionSelect";
import { itemList } from "./feature";
import LayoutQuestion from "@components/LayoutQuestion";

const HomeView = () => {
  return (
    <LayoutQuestion>
      <QuestionSelectWithSvg
        buttonName="예약하기"
        itemList={itemList}
        title={
          <>
            어떤 패키지를
            <br />
            생각중이신가요?
          </>
        }
      />
    </LayoutQuestion>
  );
};

export default HomeView;
