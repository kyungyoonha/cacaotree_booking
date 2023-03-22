import React from "react";
import styled from "styled-components";
import { Button, Card, Image } from "antd";
// import Image from "next/image";
import { eventCard } from "./feature";
import { useRouter } from "next/router";
import { SCREENS } from "@configs/screens";

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
                  width: 200,
                  padding: "10px 10px 20px",
                  cursor: "pointer",
                }}
                cover={
                  <Image
                    alt="example"
                    src={item.imageSrc}
                    width="200"
                    height="150"
                    className="recommend-image"
                  />
                }
              >
                <Card.Meta
                  title={item.title}
                  description={item.description}
                  style={{ margin: "5px 0", height: "80px" }}
                />

                <Button block style={{ borderRadius: 0 }} type="dashed">
                  장바구니 추가
                </Button>
              </Card>
            );
          })}
        </CardWrapper>
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
  margin-bottom: 80px;
  width: 100%;
  background: #fff;
  color: #000;
  flex: 1;

  & > .inner {
    width: 1000px;
  }

  @media (max-width: ${SCREENS.md}) {
    padding: 30px 20px;
    margin-bottom: 120px;
    & > .inner {
      width: 100%;
    }
  }
`;

const CardTitle = styled.div`
  margin-bottom: 15px;
  font-size: 20px;

  & > span {
    color: ${(props) => props.theme.main};
    font-weight: bold;
  }

  @media (max-width: ${SCREENS.md}) {
    font-size: 17px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  & .card-item {
    margin-right: 20px;
  }

  @media (max-width: ${SCREENS.md}) {
    & .card-item {
      width: 120px !important;
      padding: 0 !important;
      border: none;
    }

    .ant-card-body {
      padding: 0;
    }

    .ant-card-meta-title {
      font-size: 15px;
    }

    .ant-card-meta-description {
      font-size: 12px;
    }

    .recommend-image {
      border-radius: 5px !important;
    }
  }
`;
