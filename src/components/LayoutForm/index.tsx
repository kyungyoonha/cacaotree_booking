import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

const LayoutForm = ({ title, description, children }: Props) => {
  return (
    <Wrapper>
      <div className="inner">
        <Title>{title}</Title>
        <Description>{description}</Description>
        <div>{children}</div>
      </div>
    </Wrapper>
  );
};

export default LayoutForm;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  & > .inner {
    margin-top: 100px;
    width: 1000px;
    border: 1px solid red;
  }
`;

const Title = styled.h3``;
const Description = styled.p``;
