import React, { useEffect } from "react";

import styled from "styled-components";
import { Button } from "antd";
import { changeNumberWithComma } from "src/utilities/funcs";
import { useUIContext } from "src/contexts";
import CartRecommend from "./CartRecommend";
import { useRouter } from "next/router";
import CartItems from "./CartItems";
import CartNotice from "./CartNotice";
import { SCREENS } from "@configs/screens";

const ViewCart = () => {
  const router = useRouter();
  const {
    carts: {
      summary: { totalPaymentPeso, totalPaymentWon },
      cartItems,
    },
    getCartsAll,
    dispatch,
  } = useUIContext();

  useEffect(() => {
    getCartsAll({}, dispatch);
  }, [getCartsAll, dispatch]);

  return (
    <Wrapper>
      <CartItems cartItems={cartItems} />
      <CartNotice />
      <CartRecommend />
      <CartFooter>
        <div className="inner">
          <CartFooterDetail>
            <span>
              총 계좌이체:{" "}
              <strong>
                {totalPaymentWon
                  ? `${changeNumberWithComma(totalPaymentWon)}`
                  : 0}
                원
              </strong>
            </span>
            <span className="hidden">+</span>
            <span>
              총 페소지불:{" "}
              <strong>
                {totalPaymentPeso
                  ? `${changeNumberWithComma(totalPaymentPeso)}`
                  : 0}
                페소
              </strong>
            </span>
          </CartFooterDetail>
          <Button
            size="large"
            style={{
              padding: "0px 40px",
              borderRadius: "5px",
              marginLeft: "10px",
            }}
            onClick={() => router.push("/cart/order")}
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
  overflow-y: scroll;
`;

const CartFooter = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  background: ${(props) => props.theme.main};
  height: 70px;
  z-index: 100;

  & > .inner {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 1000px;
  }
  @media (max-width: ${SCREENS.md}) {
    height: 100px;

    & > .inner {
      padding: 0 20px !important;
    }

    & > .inner button {
      padding: 0 20px !important;
    }
  }
`;

const CartFooterDetail = styled.div`
  display: flex;
  justify-content: flex-end;

  & > span {
    margin-right: 10px;
    color: #fff;
    font-size: 20px;
  }

  @media (max-width: ${SCREENS.md}) {
    flex: 1;
    flex-direction: column;

    span {
      font-size: 15px;
    }

    span strong {
      font-size: 17px;
    }

    span.hidden {
      display: none;
    }
  }
`;
