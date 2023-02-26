import React, { useState } from "react";
import { Alert, Button, Radio } from "antd";
import { QuestionSelectWithSubtitleProps } from "./types";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

import styled from "styled-components";
import { Wrapper, ItemsWrapper, ItemWrapper } from "./styled";
import { SCREENS } from "@configs/screens";

const QuestionSelectWithOption = ({
  title,
  itemList,
  buttonName,
}: QuestionSelectWithSubtitleProps) => {
  const router = useRouter();
  const [selectItem, setSelectItem] = useState(itemList[0]);

  const onChangeSelectItem = (item) => setSelectItem(item);

  const onClickItem = (id) => () => {
    const seleced = itemList.find((item) => item.id === id);
    onChangeSelectItem(seleced);
  };

  const onClickButton = () => {
    if (!selectItem) return;
    router.push(selectItem.href);
  };

  return (
    <StyledWrapper>
      <h1 className="title">{title}</h1>
      <p className="description">아래 선택지 중에서 선택해주세요.</p>
      <br />
      <StyledItemsWrapper>
        {itemList.map((item) => (
          <StyledItemWrapper
            id={item.id}
            key={item.id}
            onClick={onClickItem(item.id)}
            className={item.id === selectItem?.id ? "active" : ""}
          >
            <div>
              <Radio
                checked={item.id === selectItem?.id}
                style={{ marginRight: "10px" }}
              />
              <span>{item.title}</span>
            </div>
            <span>{item.subTitle}</span>
          </StyledItemWrapper>
        ))}
      </StyledItemsWrapper>

      <div className="children-wrapper">
        <Button
          type="default"
          size="large"
          style={{ width: "200px" }}
          onClick={onClickButton}
        >
          {buttonName}
          <ArrowRightOutlined
            style={{ animation: "animation-arrow 1s infinite ease" }}
          />
        </Button>
      </div>

      <Alert description={selectItem.description} type="success" showIcon />
    </StyledWrapper>
  );
};

export default QuestionSelectWithOption;

const StyledWrapper = styled(Wrapper)`
  width: 500px;

  @media (max-width: ${SCREENS.md}) {
    width: 100%;
  }

  @media (max-width: ${SCREENS.sm}) {
    min-width: 354px;
    margin-top: 30px;
  }
`;

const StyledItemsWrapper = styled(ItemsWrapper)`
  flex-direction: column;
`;

const StyledItemWrapper = styled(ItemWrapper)`
  padding: 35px 50px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;

  & > span {
    font-size: 18px;
    font-weight: 500;
  }

  @media (max-width: ${SCREENS.sm}) {
    padding: 35px 30px;
    & span {
      font-size: 15px;
      font-weight: 500;
    }
  }
`;
