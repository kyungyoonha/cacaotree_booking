import React from "react";
import styled from "styled-components";

interface LayoutQuestionProps {
  children: React.ReactNode;
}

const LayoutQuestion = ({ children }: LayoutQuestionProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default LayoutQuestion;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
`;
