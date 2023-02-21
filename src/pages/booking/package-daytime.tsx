import LayoutForm from "@components/LayoutForm";
import PackageDaytime from "@views/PackageDaytime";
import React from "react";

const PackageDaytimePage = () => {
  return (
    <LayoutForm title="데이타임 마사지" description="">
      <PackageDaytime />
    </LayoutForm>
  );
};

export default PackageDaytimePage;
