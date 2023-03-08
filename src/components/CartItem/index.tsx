import React from "react";
import Image from "next/image";

import StatisticText from "@components/StatisticText";
import productMap from "@configs/productMap";
import { CartItemType, ItemKey } from "@types";
import { Button, Card, Checkbox, message, Radio, Tag } from "antd";
import CartService from "src/services/CartService";
import { changeNumberWithComma } from "src/utilities/funcs";

import styled from "styled-components";
import dayjs from "dayjs";
import { useUIContext } from "src/contexts";

interface CartItemProps {
  cartItem: CartItemType;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const {
    key,
    seq,
    paymentMethod,
    itemDiscount,
    itemPayment,
    itemPrice,
    isHappyhour,
    isRevisit,
    isSolo,
    hasSixtyMinutesMassage,
  } = cartItem;
  const { getCartsAll, dispatch } = useUIContext();
  const { name, src } = productMap[cartItem.key];
  const afterText = paymentMethod === "won" ? "원" : "페소";

  const onClickDelete = () => {
    CartService.removeItem(key as ItemKey, seq);
    getCartsAll({}, dispatch);
    message.success("삭제 완료되었습니다.");
  };

  const onChangePaymentMethod = (e) => {
    const paymentMethod = e.target.value;
    const newCartItem = {
      ...cartItem,
      paymentMethod,
    };
    CartService.updateItem(key as ItemKey, newCartItem);
    getCartsAll({}, dispatch);
  };

  return (
    <StyledCard
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
        </div>
      }
      extra={
        <Button type="primary" ghost size="small" onClick={onClickDelete}>
          삭제
        </Button>
      }
    >
      <CartItemWrapper>
        <div className="item">
          <Image
            width="130"
            height="130"
            src={src}
            alt="image"
            style={{ borderRadius: "10px" }}
          />
        </div>

        <div className="item left">
          <p>예약날짜: {dayjs(cartItem?.form?.date).format("YYYY-MM-DD")}</p>
          <p>
            총인원수: {cartItem?.form.pax} 명
            {isSolo && (
              <Tag style={{ marginLeft: "5px" }} color="red">
                1인 추가차지
              </Tag>
            )}
          </p>
          <p>{cartItem?.massageText}</p>
          {(isHappyhour || isRevisit) && hasSixtyMinutesMassage && (
            <p style={{ color: "red" }}>
              (60분 마사지는 할인 적용이 어렵습니다)
            </p>
          )}
          <br />

          <Button size="small">수정하기</Button>
        </div>

        <div className="item">
          <StatisticText
            title={paymentMethod === "won" ? "계좌이체" : "페소지불"}
            value={itemPrice}
            afterText={afterText}
          />
          <Radio.Group
            defaultValue="won"
            buttonStyle="solid"
            style={{ marginTop: "10px" }}
            onChange={onChangePaymentMethod}
            value={paymentMethod}
          >
            <Radio.Button value="won">계좌이체</Radio.Button>
            <Radio.Button value="peso" disabled={key.includes("first")}>
              페소지불
            </Radio.Button>
          </Radio.Group>
          {key.includes("first") && (
            <p style={{ color: "red" }}>첫날팩은 계좌이체만 가능합니다.</p>
          )}
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
            {`${changeNumberWithComma(itemPayment)} ${afterText}`}
          </TextTotal>
        </div>
      </CartPriceWrapper>
    </StyledCard>
  );
};
export default CartItem;

const StyledCard = styled(Card)`
  position: relative;
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

const TextBottom = styled.div`
  position: absolute;
  bottom: -25px;
  left: 20px;
  color: red;
`;
