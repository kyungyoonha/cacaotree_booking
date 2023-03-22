import { SCREENS } from "@configs/screens";
import React from "react";

import styled from "styled-components";

const CartInfo = () => {
  return (
    <Wrapper>
      <Notice>
        <li>1인 추가차지 비용은 10,000원 입니다.</li>
        <li>첫날팩은 계좌이체만 가능합니다.</li>
      </Notice>
    </Wrapper>
  );
};

export default CartInfo;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: ${SCREENS.lg}) {
    padding: 20px 20px 0;
  }

  @media (max-width: ${SCREENS.md}) {
    padding: 0;
  }
`;

const Notice = styled.ul`
  margin-top: 30px;
  padding: 30px 30px !important;
  width: 1000px;

  background: ${(props) => props.theme.gray};
  font-size: 14px;

  & > li {
    list-style: square;
    margin-bottom: 5px;
  }

  @media (max-width: ${SCREENS.md}) {
    margin-top: 0px;
    padding: 0;
  }
`;
