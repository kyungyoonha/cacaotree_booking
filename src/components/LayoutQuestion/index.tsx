import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

interface LayoutQuestionProps {
  children: React.ReactNode;
}

const LayoutQuestion = ({ children }: LayoutQuestionProps) => {
  const router = useRouter();
  const onClickArrow = () => {
    router.back();
  };
  return (
    <Wrapper>
      <QuestionHeader>
        <ArrowLeftOutlined onClick={onClickArrow} />
      </QuestionHeader>
      {children}
    </Wrapper>
  );
};

export default LayoutQuestion;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  padding-right: 0;
`;

const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding-left: 10px;
`;
