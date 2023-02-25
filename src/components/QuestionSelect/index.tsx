import React from "react";
import { Alert, Button } from "antd";
import styled from "styled-components";
import { ArrowRightOutlined } from "@ant-design/icons";
import { SCREENS } from "@configs/screens";

interface Props {
  title: React.ReactNode;
  itemList: Item[];
  selectItem: Item;
  onChangeSelectItem: (Item) => void;
}

type Item = {
  id: string;
  svg: React.ReactElement<any>;
  alt: string;
  title: React.ReactNode;
  description: string;
};

const QuestionSelect = ({
  title,
  itemList,
  selectItem,
  onChangeSelectItem,
}: Props) => {
  const onClickItem = (id) => () => {
    const seleced = itemList.find((item) => item.id === id);
    onChangeSelectItem(seleced);
  };

  return (
    <Wrapper>
      <h1 className="title">{title}</h1>
      <p className="description">아래 선택지 중에서 선택해주세요.</p>
      <br />
      <ItemsWrapper>
        {itemList.map((item) => (
          <ItemWrapper
            id={item.id}
            key={item.id}
            onClick={onClickItem(item.id)}
            className={item.id === selectItem?.id ? "active" : ""}
          >
            {React.cloneElement(item.svg, { isActive: false })}
            {item.title}
          </ItemWrapper>
        ))}
      </ItemsWrapper>
      {selectItem && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // padding: "30px 0",
            marginBottom: "30px",
          }}
        >
          <Button
            type="default"
            size="large"
            style={{ width: "200px" }}
            onClick={() => {}}
          >
            예약하기
            <ArrowRightOutlined
              style={{ animation: "animation-arrow 1s infinite ease" }}
            />
          </Button>
        </div>
      )}

      {selectItem && (
        <Alert description={selectItem.description} type="warning" showIcon />
      )}
    </Wrapper>
  );
};

export default QuestionSelect;
const Wrapper = styled.div`
  width: 700px;
  margin-bottom: 40px;

  & > h1.title {
    padding: 30px 0;
    text-align: center;
  }

  & > p.description {
    margin-top: 30px;
    color: ${(props) => props.theme.main};
    text-align: center;
    font-weight: 500;
  }

  @media (max-width: ${SCREENS.md}) {
    width: 100%;
    padding: 0 20px;

    & > h1.title {
      font-size: 25px;
    }

    & > p.description {
      font-size: 16px;
    }
  }

  @media (max-width: ${SCREENS.sm}) {
    min-width: 354px;
  }
`;

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;

  & > div {
    margin-right: 15px;
  }

  & > div:last-child {
    margin-right: 0;
  }

  @media (max-width: ${SCREENS.sm}) {
    flex-direction: column;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  width: 100%;
  border: 1px solid ${(props) => props.theme.line};
  border-radius: 10px;

  & > svg {
    margin-bottom: 15px;
    width: 70px;
    height: 70px;
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.main};
    color: ${(props) => props.theme.main};
    svg {
      fill: ${(props) => props.theme.main};
    }
  }

  &.active {
    background-color: ${(props) => props.theme.main};
    color: #fff;
    svg {
      fill: #fff;
    }
  }

  & > p {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    span {
      margin-right: 5px;
    }
  }

  @media (max-width: ${SCREENS.md}) {
    & > svg {
      width: 50px;
      height: 50px;
    }
  }

  @media (max-width: ${SCREENS.sm}) {
    padding: 20px 0;
    margin-bottom: 15px;

    & > svg {
      margin-bottom: 10px;
      width: 40px;
      height: 40px;
    }
  }
`;
