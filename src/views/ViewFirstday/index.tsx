import LayoutQuestion from "@components/LayoutQuestion";
import { QuestionSelectWithSubtitle } from "@components/QuestionSelect";
import React from "react";
import { itemList } from "./feature";

const ViewFirstday = () => {
  return (
    <LayoutQuestion>
      <QuestionSelectWithSubtitle
        buttonName="예약하기"
        itemList={itemList}
        title={
          <>
            첫날 (0.5박) 패키지를
            <br />
            선택해주세요.
          </>
        }
      />
    </LayoutQuestion>
  );
};

export default ViewFirstday;
