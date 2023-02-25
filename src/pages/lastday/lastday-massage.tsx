import React from "react";
import LayoutForm from "@components/LayoutForm";
import ViewLastdayMassage from "@views/ViewLastdayMassage";

const LastdayMassage = () => {
  return (
    <LayoutForm title="막날팩 마사지" description="">
      <ViewLastdayMassage />
    </LayoutForm>
  );
};

export default LastdayMassage;
