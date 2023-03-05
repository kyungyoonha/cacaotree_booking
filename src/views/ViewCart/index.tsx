import React from "react";
import CartItem from "@components/CartItem";
import LayoutQuestion from "@components/LayoutQuestion";

import styled from "styled-components";
import { Button } from "antd";

const ViewCart = () => {
  return (
    <Wrapper>
      <CardWrapper>
        <CartItem />
        <CartItem />
        <CartItem />
      </CardWrapper>
      <CartFooter>
        <div className="inner">
          <span>
            총 계좌이체: <strong>10,000원</strong>
          </span>
          <span>+</span>
          <span>
            총 페소지불: <strong>10,000페소</strong>
          </span>
          <Button
            size="large"
            style={{
              padding: "0px 40px",
              borderRadius: "5px",
              marginLeft: "10px",
            }}
          >
            주문 완료하기
          </Button>
        </div>
      </CartFooter>
    </Wrapper>
  );
};

export default ViewCart;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  width: 100%;
  height: calc(100% - 80px);
  overflow-y: scroll;

  .ant-card-body {
    padding: 0;
  }

  .ant-card-head {
    border-bottom: 2px solid rgba(0, 0, 0, 0.15);
  }
`;

const CartFooter = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  background: ${(props) => props.theme.main};

  & > div.inner {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 70px;
    width: 1000px;

    & > span {
      margin-right: 10px;
      color: #fff;
      font-size: 20px;
    }
  }
`;
