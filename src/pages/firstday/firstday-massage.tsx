import React from "react";
import LayoutForm from "@components/LayoutForm";
import ViewFirstdayMassage from "@views/ViewFirstdayMassage";

const FirstdayMassage = () => {
  return (
    <LayoutForm
      title="첫날팩 마사지"
      // description="공항픽업 + 마사지 + 수면/휴식 + 숙소드랍"
      description=""
    >
      <ViewFirstdayMassage />
    </LayoutForm>
  );
};

export default FirstdayMassage;
