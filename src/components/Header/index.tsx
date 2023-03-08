import Logo from "@components/Logo";
import { Badge, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useUIContext } from "src/contexts";
import styled from "styled-components";

const Header = () => {
  const {
    carts: {
      summary: { totalItemCnt },
    },
  } = useUIContext();

  return (
    <Wrapper>
      <Logo width="50" height="50" href="/" />

      <Title>
        <Link href="/">마사지 예약하기</Link>
      </Title>

      <div>
        <StyledLink
          href="https://pf.kakao.com/_mRQxbT"
          target="_blank"
          style={{ marginRight: "10px" }}
        >
          <Tooltip title="문의하기">
            <Image
              src="/message.svg"
              alt="shopping icon"
              width="25"
              height="25"
            />
          </Tooltip>
        </StyledLink>
        <StyledLink href="/cart">
          <Tooltip title="장바구니">
            <Badge count={totalItemCnt} size="small">
              <Image
                src="/shopping-cart.svg"
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
  margin-left: 10px;
  img:hover {
    transform: scale(1.1);
    transition: 0.4s;
  }
`;
