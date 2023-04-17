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
import { useRouter } from "next/router";
import route from "@configs/route";
import { SCREENS } from "@configs/screens";
import couponMap from "@configs/couponMap";

interface CartItemProps {
  cartItem: CartItemType;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const {
    key,
    seq,
    paymentMethod,
    itemDiscount,
    itemAdditional,
    itemPayment,
    itemPrice,
    hasSixtyMinutesMassage,
    form,
  } = cartItem;
  const router = useRouter();
  const { getCartsAll, dispatch } = useUIContext();
  const { title, subTitle, thumbnail } = productMap[cartItem.key];
  const afterText = paymentMethod === "won" ? "원" : "페소";

  const couponList = form.couponList.map((key) => couponMap[key]);
  let downPerPax = couponList.filter((i) => i.isPerPax && !i.isPriceUp);

  const onClickDelete = () => {
    message.success("삭제 완료되었습니다.");
    CartService.removeItem(key as ItemKey, seq);
    getCartsAll({}, dispatch);
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

  const onClickUpdate = () => {
    const path = route[key];
    router.push(`${path}?seq=${seq}`);
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

          {`${title} ${subTitle ? subTitle : ""}`}
        </div>
      }
      extra={
        <Button type="primary" ghost size="small" onClick={onClickDelete}>
          삭제
        </Button>
      }
    >
      <CartItemBody>
        <CartItemBodyDetail className="item">
          <Image width="130" height="130" src={thumbnail} alt="image" />
          <div className="item detail">
            <p>예약날짜: {dayjs(cartItem?.form?.date).format("YYYY-MM-DD")}</p>
            <p>총인원수: {cartItem?.form.pax} 명</p>
            <p>{cartItem?.massageText}</p>
            {!!downPerPax.length && hasSixtyMinutesMassage && (
              <p style={{ color: "red" }}>
                (60분 마사지는 할인 적용이 어렵습니다)
              </p>
            )}
            <br />
          </div>
        </CartItemBodyDetail>

        <CartItemBodyCoupon className="item">
          <span>추가/할인</span>
          <div className="tag-wrapper">
            {couponList.map((item) => {
              return (
                <Tag key={item.key} color={item.color}>
                  {item.title}
                </Tag>
              );
            })}
          </div>
        </CartItemBodyCoupon>

        <CartItemBodyPayment className="item">
          <StatisticText
            title={paymentMethod === "won" ? "계좌이체" : "페소지불"}
            value={itemPrice}
            afterText={afterText}
          />
          <Radio.Group
            defaultValue="won"
            buttonStyle="solid"
            onChange={onChangePaymentMethod}
            value={paymentMethod}
            className="radio-wrapper"
          >
            <Radio.Button value="won" className="radio-item">
              계좌이체
            </Radio.Button>
            <Radio.Button
              value="peso"
              className="radio-item"
              disabled={key.includes("first")}
            >
              페소지불
            </Radio.Button>
          </Radio.Group>
          {key.includes("first") && (
            <p style={{ color: "red", marginTop: "5px" }}>
              첫날팩은 계좌이체만 가능합니다.
            </p>
          )}
        </CartItemBodyPayment>
      </CartItemBody>
      <CartItemFooter>
        <div className="item">
          <StatisticText
            title="선택상품금액"
            value={itemPrice}
            afterText={afterText}
          />
          <TextSymbol>+</TextSymbol>
          <StatisticText
            title="추가금액"
            value={itemAdditional}
            afterText={afterText}
            valueColor="blue"
          />

          <TextSymbol>-</TextSymbol>
          <StatisticText
            title="할인금액"
            value={-itemDiscount}
            afterText={afterText}
            valueColor="red"
          />
        </div>
        <div className="item">
          <TextTotal>
            <span>총 금액 </span>
            <span className="active">
              {`${changeNumberWithComma(itemPayment)} ${afterText}`}
            </span>
          </TextTotal>
          <Button onClick={onClickUpdate} style={{ marginLeft: "5px" }}>
            수정하기
          </Button>
        </div>
      </CartItemFooter>
    </StyledCard>
  );
};
export default CartItem;

const StyledCard = styled(Card)`
  position: relative;
  margin: 15px 0 20px;
  width: 100%;
  max-width: 1000px;
`;

const CartItemBody = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.line3};
  padding: 20px;

  & > .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid ${(props) => props.theme.line3};
  }

  & > .item:last-child {
    border-right: none;
  }

  @media (max-width: ${SCREENS.md}) {
    flex-direction: column;

    & > .item {
      border-right: none;
      padding: 20px 0px;
    }
  }
`;

const CartItemBodyDetail = styled.div`
  flex-direction: row !important;
  align-items: flex-start !important;
  flex: 1;

  img {
    margin-right: 20px;
    border-radius: 10px;
  }

  @media (max-width: ${SCREENS.md}) {
    border-right: none;
    padding: 0 !important;
    img {
      width: 80px;
      height: 80px;
    }
  }
`;

const CartItemBodyCoupon = styled.div`
  width: auto;
  padding: 0 30px;
  display: flex;
  align-items: center;
  text-align: center;

  & span {
    margin: 0 7px 7px 0;
  }

  & > .tag-wrapper {
    display: flex;
    flex-direction: column;
    text-align: start;
  }
  @media (max-width: ${SCREENS.md}) {
    flex-direction: row !important;
    width: 100%;
    background: ${(props) => props.theme.gray};
    padding: 20px 10px !important;

    & > span {
      margin: 0 10px 0 0;
    }

    & > .tag-wrapper {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
`;

const CartItemBodyPayment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: auto;
  flex: none;

  @media (max-width: ${SCREENS.md}) {
    width: 100%;

    .radio-wrapper {
      margin-top: 10px;
      width: 100%;
    }

    .radio-item {
      width: 50%;
      text-align: center;
      border-radius: 0;
      height: 40px;
      padding: 5px;
    }
  }
`;

const CartItemFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 50px;

  & > .item {
    display: flex;
    justify-content: center;
    flex: 1;
    border-right: 1px solid ${(props) => props.theme.line3};
  }

  & > div:last-child {
    border-right: none;
  }

  @media (max-width: ${SCREENS.md}) {
    flex-direction: column;
    padding: 20px;

    & > .item {
      flex-direction: column;
      width: 100%;
      margin-bottom: 5px;
      border-right: none;
    }
  }
`;

const TextSymbol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 30px;

  @media (max-width: ${SCREENS.md}) {
    display: none;
  }
`;

const TextTotal = styled.div`
  display: flex;
  min-width: 240px;

  & > span {
    display: flex;
    align-items: center;
    margin-right: 10px;
    font-size: 20px;
    font-weight: bold;
    flex: 1;

    &.active {
      color: ${(props) => props.theme.main};
    }
  }
  @media (max-width: ${SCREENS.md}) {
    margin-top: 15px;
    padding: 10px 0;
    border-top: 1px solid ${(props) => props.theme.line3};
    width: 100%;
    & > span {
      margin: 0;
    }

    & > span:last-child {
      justify-content: flex-end;
    }
  }
`;
