import React from "react";
import styled from "styled-components";
import { Button, Card } from "antd";
import Image from "next/image";
import { eventCard } from "./feature";
import { useRouter } from "next/router";

const CartRecommend = () => {
  const router = useRouter();
  const onClickCard = (route) => () => {
    router.push(route);
  };
  return (
    <Wrapper>
      <div className="inner">
        <CardTitle>
          <span>할인 가능한 상품</span>을 담아보세요.
        </CardTitle>
        <CardWrapper>
          {Object.values(eventCard).map((item) => {
            return (
              <Card
                key={item.key}
                className="card-item"
                onClick={onClickCard(item.href)}
                style={{
                  width: 150,
                  border: "none",
                  cursor: "pointer",
                }}
                cover={
                  <Image
                    alt="example"
                    src={item.imageSrc}
                    width="150"
                    height="150"
                  />
                }
              >
                <Card.Meta
                  title={item.title}
                  description={item.description}
                  style={{ margin: "5px 0", height: "80px" }}
                />

                <Button block style={{ borderRadius: 0 }}>
                  장바구니 추가
                </Button>
              </Card>
            );
          })}
        </CardWrapper>
        <Notice>
          <li>1인 추가차지 비용은 10,000원 입니다.</li>
          <li>첫날팩은 계좌이체만 가능합니다.</li>
        </Notice>
      </div>
    </Wrapper>
  );
};

export default CartRecommend;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;

  width: 100%;
  background: #fff;
  color: #000;

  & > .inner {
    width: 1000px;
  }
`;

const CardTitle = styled.div`
  margin-bottom: 15px;
  font-size: 20px;

  & > span {
    color: ${(props) => props.theme.main};
    font-weight: bold;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  & .card-item {
    margin-right: 20px;
  }
`;

const Notice = styled.ul`
  margin-top: 30px;
  padding: 15px 30px;
  background: ${(props) => props.theme.gray};
  font-size: 14px;

  & > li {
    list-style: square;
    margin-bottom: 5px;
  }
`;
