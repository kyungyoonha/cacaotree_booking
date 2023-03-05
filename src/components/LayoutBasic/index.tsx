import React from "react";
import Header from "@components/Header";

import styled from "styled-components";

interface Props {
  background?: string;
  children;
}

const LayoutBasic = ({ background, children }: Props) => {
  return (
    <>
      <Header />
      <Wrapper background={background}>{children}</Wrapper>
    </>
  );
};

export default LayoutBasic;

type Props2 = {
  background: string;
};

const Wrapper = styled.div<Props2>`
  background: ${(props) => props.background};
  margin-top: 70px;
  height: calc(100vh - 70px);
`;
