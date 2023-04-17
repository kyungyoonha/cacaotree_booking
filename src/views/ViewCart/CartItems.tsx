import { SCREENS } from "@configs/screens";
import { CartItemType } from "@types";
import { Button } from "antd";
import React from "react";
import { useRouter } from "next/router";

import styled from "styled-components";
import CartItem from "./CartItem";

interface CartItemsProps {
  cartItems: CartItemType[];
}

const CartItems = ({ cartItems }: CartItemsProps) => {
  const router = useRouter();
  return (
    <Wrapper>
      {cartItems.map((cartItem) => (
        <CartItem key={`${cartItem.key}-${cartItem.seq}`} cartItem={cartItem} />
      ))}

      {!cartItems.length ? (
        <CardEmptyWrapper>
          <p>장바구니에 담긴 상품이 없습니다</p>
          원하는 상품을 장바구니에 담아보세요!
          <Button
            size="large"
            style={{ margin: "30px 0", borderRadius: 0 }}
            onClick={() => router.push("/")}
          >
            상품 추가하기
          </Button>
        </CardEmptyWrapper>
      ) : (
        <Button
          size="large"
          style={{ margin: "20px 0", borderRadius: 0 }}
          onClick={() => router.push("/")}
        >
          상품 추가하기
        </Button>
      )}
    </Wrapper>
  );
};

export default CartItems;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  width: 100%;

  background: ${(props) => props.theme.gray};

  .ant-card-body {
    padding: 0;
  }

  .ant-card-head {
    border-bottom: 2px solid rgba(0, 0, 0, 0.15);
  }

  @media (max-width: ${SCREENS.lg}) {
    padding: 50px 10px 0;
  }
`;

const CardEmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0 150px;

  & > p {
    margin-bottom: 5px;
    font-size: 20px;
    color: ${(props) => props.theme.main};
    font-weight: bold;
  }
`;
