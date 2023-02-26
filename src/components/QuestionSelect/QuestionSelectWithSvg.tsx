import React, { useState } from "react";
import { Alert, Button } from "antd";
import * as S from "./styled";
import { QuestionSelectWithSvgProps } from "./types";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const QuestionSelectWithSvg = ({
  title,
  itemList,
  buttonName,
}: QuestionSelectWithSvgProps) => {
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
    <S.Wrapper>
      <h1 className="title">{title}</h1>
      <p className="description">아래 선택지 중에서 선택해주세요.</p>
      <br />
      <S.ItemsWrapper>
        {itemList.map((item) => (
          <S.ItemWrapper
            id={item.id}
            key={item.id}
            onClick={onClickItem(item.id)}
            className={item.id === selectItem?.id ? "active" : ""}
          >
            {!!item.svg && React.cloneElement(item.svg)}
            {item.title}
          </S.ItemWrapper>
        ))}
      </S.ItemsWrapper>

      <div className="children-wrapper">
        <Button
          type="default"
          size="large"
          style={{ width: "300px", height: "70px" }}
          onClick={onClickButton}
        >
          {buttonName}
          <ArrowRightOutlined
            style={{ animation: "animation-arrow 1s infinite ease" }}
          />
        </Button>
      </div>

      <Alert description={selectItem.description} type="warning" showIcon />
    </S.Wrapper>
  );
};

export default QuestionSelectWithSvg;
