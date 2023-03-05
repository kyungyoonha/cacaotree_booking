import StatisticText from "@components/StatisticText";
import { Button, Card, Checkbox, Radio } from "antd";
import Image from "next/image";
import React from "react";
import { changeNumberWithComma } from "src/utilities/funcs";

import styled from "styled-components";

const CartItem = () => {
  return (
    <Wrapper
      title={
        <div>
          <Checkbox
            onChange={() => {}}
            checked={true}
            style={{ marginRight: "10px" }}
          />
          첫날 0.5박 공항픽업 마사지
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
          <Image
            width="100"
            height="100"
            src="https://user-images.githubusercontent.com/29701385/222157820-1166f98e-3306-42fe-bc7b-1986e201e05d.jpeg"
            alt="image"
          />
        </div>

        <div className="item left">
          <p style={{ marginBottom: "10px" }}>
            90분 시아추(남) ・ 90분 타이(남) ・ 90분 시아추(여) ・ 90분 오일(여)
          </p>

          <Button size="small">수정하기</Button>
        </div>
        <div className="item">
          <StatisticText title="계좌이체" value={112893} />
          <Radio.Group
            defaultValue="a"
            buttonStyle="solid"
            style={{ marginTop: "10px" }}
          >
            <Radio.Button value="a">페소지불</Radio.Button>
            <Radio.Button value="b">계좌이체</Radio.Button>
          </Radio.Group>
        </div>
      </CartItemWrapper>
      <CartPriceWrapper>
        <div className="item">
          <StatisticText title="선택상품금액" value={112833} afterText="원" />

          <TextSymbol>-</TextSymbol>
          <StatisticText
            title="할인예상금액"
            value={10000}
            afterText="원"
            valueColor="red"
          />
        </div>
        <div className="item">
          <TextTotal>총 금액 </TextTotal>
          <TextTotal className="active">
            {changeNumberWithComma(232113)}원
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
