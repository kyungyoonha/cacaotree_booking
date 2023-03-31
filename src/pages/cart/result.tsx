import React from "react";
import { Button, Result } from "antd";
import styled from "styled-components";
import Logo from "@components/Logo";
import Link from "next/link";

const ResultPage: React.FC = () => {
  return (
    <Wrapper>
      <Result
        icon={<Logo width="100" height="100" />}
        title="카카오트리스파 예약이 완료되었습니다."
        subTitle="예약정보는 이메일로 확인가능하며, 빠른시간내에 연락드리도록 하겠습니다."
        style={{ marginTop: "-150px" }}
        extra={[
          <Link
            href="https://pf.kakao.com/_mRQxbT/chat"
            key="chat"
            target="_blank"
          >
            <Button type="primary" key="console" size="large">
              바로 문의하기
            </Button>
          </Link>,
          <Link href="https://cacaotreespa.co.kr/" key="chat" target="_blank">
            <Button key="buy" size="large">
              홈페이지 보기
            </Button>
          </Link>,
        ]}
      />
    </Wrapper>
  );
};

export default ResultPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
