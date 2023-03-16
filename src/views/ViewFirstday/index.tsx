import LayoutQuestion from "@components/LayoutQuestion";
import { QuestionSelectWithSubtitle } from "@components/QuestionSelect";
import productMap from "@configs/productMap";
import React from "react";

const ViewFirstday = () => {
  const keys = Object.keys(productMap).filter((item) =>
    item.includes("firstday")
  );

  const itemList = Object.values(productMap).filter((item) =>
    keys.includes(item.id)
  );
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
