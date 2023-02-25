import React, { useState } from "react";
import styled from "styled-components";

import QuestionSelect from "@components/QuestionSelect";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { itemList } from "./feature";

const HomeView = () => {
  const router = useRouter();
  const [selectItem, setSelectItem] = useState(itemList[0]);

  const onChangeSelectItem = (item) => setSelectItem(item);

  const onClickButton = () => {
    if (!selectItem) return;
    router.push(selectItem.href);
  };

  return (
    <Wrapper>
      <QuestionSelect
        title={
          <>
            어떤 패키지를
            <br />
            생각중이신가요?
          </>
        }
        selectItem={selectItem}
        itemList={itemList}
        onChangeSelectItem={onChangeSelectItem}
      />

      {/* {selectItem && (
        <Button
          type="default"
          size="large"
          style={{ width: "200px" }}
          onClick={onClickButton}
        >
          계속하기
          <ArrowRightOutlined
            style={{ animation: "animation-arrow 1s infinite ease" }}
          />
        </Button>
      )} */}
    </Wrapper>
  );
};

export default HomeView;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;

  button {
    transition: 0.5s;
  }
`;
