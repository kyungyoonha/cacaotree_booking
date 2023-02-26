import React from "react";
import Header from "@components/Header";

import styled from "styled-components";

interface Props {
  children;
}

const LayoutBasic = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default LayoutBasic;

const Wrapper = styled.div`
  margin-top: 70px;
  height: calc(100vh - 70px);
`;
