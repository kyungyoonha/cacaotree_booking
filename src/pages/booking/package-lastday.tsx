import React from "react";
import LayoutForm from "@components/LayoutForm";
import PackageLastDay from "@views/PackageLastDay";

const PackageLastDayPage = () => {
  return (
    <LayoutForm title="막날팩 마사지" description="">
      <PackageLastDay />
    </LayoutForm>
  );
};

export default PackageLastDayPage;
