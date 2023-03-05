import React from "react";
import { changeNumberWithComma } from "src/utilities/funcs";
import styled from "styled-components";

interface StatisticTextProps {
  title: string;
  value: number;
  afterText?: string;
  valueColor?: string;
}

const StatisticText = ({
  title,
  value,
  afterText,
  valueColor,
}: StatisticTextProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Value valueColor={valueColor}>{`${changeNumberWithComma(value)}${
        afterText ? ` ${afterText}` : ""
      }`}</Value>
    </Wrapper>
  );
};

export default StatisticText;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div``;

const Value = styled.div<{ valueColor: string }>`
  color: ${(props) => (props.valueColor ? props.valueColor : "#000")};
  font-size: 15px;
`;
