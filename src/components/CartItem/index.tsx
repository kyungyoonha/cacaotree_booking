import StatisticText from "@components/StatisticText";
import productMap from "@configs/productMap";
import { CartItemResult } from "@types";
import { Button, Card, Checkbox, Radio, Tag } from "antd";
import Image from "next/image";
import React from "react";
import { changeNumberWithComma } from "src/utilities/funcs";

import styled from "styled-components";

interface CartItemProps {
  cartItem: CartItemResult;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const {
    paymentMethod,
    itemDiscount,
    itemPayment,
    itemPrice,
    isHappyhour,
    isRevisit,
    isSolo,
  } = cartItem;
  const { name, src } = productMap[cartItem.key];
  const afterText = paymentMethod === "won" ? "원" : "페소";
  return (
    <Wrapper
      title={
        <div>
          <Checkbox
            onChange={() => {}}
            checked={true}
            style={{ marginRight: "10px" }}
          />
          {name}
          {isHappyhour && (
            <Tag style={{ marginLeft: "5px" }} color="cyan">
              해피아워 할인
            </Tag>
          )}
          {isRevisit && (
            <Tag style={{ marginLeft: "5px" }} color="green">
              재방문 할인
            </Tag>
          )}
          {isSolo && (
            <Tag style={{ marginLeft: "5px" }} color="red">
              추가 1인차지
            </Tag>
          )}
        </div>
      }
      extra={
        <Button type="primary" ghost size="small">
          삭제
        </Button>
      }
    >
      <CartItemWrapper>
        <div className="item">
          <Image width="100" height="100" src={src} alt="image" />
        </div>

        <div className="item left">
          <p style={{ marginBottom: "10px" }}>{cartItem?.massageText}</p>

          <Button size="small">수정하기</Button>
        </div>

        <div className="item">
          <StatisticText
            title={paymentMethod === "won" ? "계좌이체" : "페소지불"}
            value={itemPrice}
          />
          <Radio.Group
            defaultValue="won"
            buttonStyle="solid"
            style={{ marginTop: "10px" }}
          >
            <Radio.Button value="won">계좌이체</Radio.Button>
            <Radio.Button value="peso">페소지불</Radio.Button>
          </Radio.Group>
        </div>
      </CartItemWrapper>
      <CartPriceWrapper>
        <div className="item">
          <StatisticText
            title="선택상품금액"
            value={itemPrice}
            afterText={afterText}
          />

          <TextSymbol>-</TextSymbol>
          <StatisticText
            title="할인예상금액"
            value={itemDiscount}
            afterText={afterText}
            valueColor="red"
          />
        </div>
        <div className="item">
          <TextTotal>총 금액 </TextTotal>
          <TextTotal className="active">
            {changeNumberWithComma(itemPayment)}원
          </TextTotal>
        </div>
      </CartPriceWrapper>
    </Wrapper>
  );
};
export default CartItem;

const Wrapper = styled(Card)`
  margin: 15px 0 20px;
  width: 1000px;
`;

const CartItemWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.line3};

  & > div.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 20px;
    border-right: 1px solid ${(props) => props.theme.line3};
  }

  & > div:first-child {
    width: 200px;
    flex: none;
  }

  & > div:last-child {
    width: 300px;
    flex: none;
    border-right: none;
  }

  & > div.item.left {
    align-items: flex-start;
  }
`;

const CartPriceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 150px;

  & > .item {
    display: flex;
    justify-content: center;
    flex: 1;
    border-right: 1px solid ${(props) => props.theme.line3};
  }

  & > div:last-child {
    border-right: none;
  }
`;

const TextSymbol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 30px;
`;

const TextTotal = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 20px;
  font-weight: bold;

  &.active {
    color: ${(props) => props.theme.main};
  }
`;
