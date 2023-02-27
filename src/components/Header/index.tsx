import Logo from "@components/Logo";
import { Badge, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <Logo width="50" height="50" href="/" />

      <Title>스파 예약하기</Title>

      <div>
        <StyledLink
          href="https://pf.kakao.com/_mRQxbT"
          target="_blank"
          style={{ marginRight: "10px" }}
        >
          <Tooltip title="문의하기">
            <Image src="/chat.svg" alt="shopping icon" width="25" height="25" />
          </Tooltip>
        </StyledLink>
        <StyledLink href="/">
          <Tooltip title="장바구니">
            <Badge count={5} size="small">
              <Image
                src="/shopping.svg"
                alt="shopping icon"
                width="25"
                height="25"
              />
            </Badge>
          </Tooltip>
        </StyledLink>
      </div>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 70px;
  background: #fff;
  border-bottom: 3px solid #eceff3;
  min-width: 354px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10 !important;
`;

const Title = styled.p`
  font-family: "Noto Serif KR", serif;
  text-align: center;
`;

const StyledLink = styled(Link)`
  img:hover {
    transform: scale(1.1);
    transition: 0.4s;
  }
`;
