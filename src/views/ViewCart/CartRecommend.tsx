import React from "react";
import styled from "styled-components";
import { Card } from "antd";
import Image from "next/image";

const CartRecommend = () => {
  return (
    <Wrapper>
      <div className="inner">
        <Card
          hoverable
          style={{ width: 200 }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              width="200"
              height="200"
            />
          }
        >
          <Card.Meta
            title="Europe Street beat"
            description="www.instagram.com"
          />
        </Card>
      </div>
    </Wrapper>
  );
};

export default CartRecommend;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 0 100px;

  width: 100%;
  background: #fff;
  color: #000;

  & > .inner {
    display: flex;
    flex-wrap: wrap;
    width: 1000px;
  }
`;
