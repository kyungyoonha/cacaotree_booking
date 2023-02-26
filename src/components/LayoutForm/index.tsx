import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Card } from "antd";
import Header from "@components/Header";

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

const LayoutForm = ({ title, description, children }: Props) => {
  return (
    <>
      <Header />
      <Wrapper>
        <Image src="/background.jpeg" fill alt="background" />

        <Card
          className="inner"
          title={title}
          bodyStyle={{
            overflowY: "scroll",
            height: "550px",
            paddingBottom: "50px",
          }}
        >
          <Description>{description}</Description>
          <div>{children}</div>
        </Card>
      </Wrapper>
    </>
  );
};

export default LayoutForm;

const Wrapper = styled.div`
  position: relative;
  height: calc(100vh - 70px);
  overflow: hidden;

  & > img {
    object-fit: cover;
    z-index: 0;
  }

  & > .inner {
    position: relative;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    padding: 40px;
    width: 600px;
    max-height: calc(100% - 150px);

    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const Description = styled.p`
  margin-bottom: 20px;
`;
