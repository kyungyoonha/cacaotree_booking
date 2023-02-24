import React from "react";
import styled from "styled-components";

interface Props {
  title: React.ReactNode;
  itemList: Item[];
}

type Item = {
  id: number;
  svg: React.ReactElement<any>;
  alt: string;
  title: string;
  description: string;
};

const QuestionSelect = ({ title, itemList }: Props) => {
  return (
    <InnerWrapper>
      <Question>
        어떤 패키지를
        <br />
        생각중이신가요?
      </Question>
      <Description>아래 선택지 중에서 선택해주세요.</Description>
      <br />
      <ItemsWrapper>
        {itemList.map((item) => (
          <ItemWrapper id={String(item.id)} key={item.id} data-key={item.id}>
            {React.cloneElement(item.svg, { isActive: false })}
            {item.title}
          </ItemWrapper>
        ))}
      </ItemsWrapper>
    </InnerWrapper>
  );
};

export default QuestionSelect;
const InnerWrapper = styled.div`
  width: 700px;
`;

const Question = styled.h1`
  padding: 30px 0;
  text-align: center;
`;

const Description = styled.p`
  margin-top: 30px;
  color: ${(props) => props.theme.main};
  text-align: center;
  font-weight: 500;
`;

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  & > div {
    margin-right: 15px;
  }

  & > div:last-child {
    margin-right: 0;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  width: 100%;
  border: 1px solid ${(props) => props.theme.line};
  border-radius: 10px;

  & > svg {
    margin-bottom: 15px;
    width: 70px;
    height: 70px;
  }

  &:hover {
    background-color: ${(props) => props.theme.main};
    color: #fff;
    svg {
      fill: #fff;
    }
  }
`;
