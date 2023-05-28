import Logo from "@components/Logo";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const ViewOrderSuccess = () => {
  return (
    <Wrapper>
      <Logo width="80" height="80" />
      <Card>
        <h3>예약서 작성이 완료되었습니다.</h3>
        <p>
          고객님, 안녕하세요. 현재 예약 <span>대기상태</span>이며,
        </p>
        <p>
          작성해주신 연락처로 최대한 빠르게 연락드려 예약확정을 도와드리도록
          하겠습니다.
        </p>
        <p>예약확정 연락이 오지 않거나, 빠른 처리를 원하시는 경우</p>
        <p>
          카카오톡 ID: <span>cacaotreespa</span> 로 연락주시면 더욱 더 빠르게
          처리해드립니다.
        </p>

        <StyledLink
          href="https://pf.kakao.com/_mRQxbT/chat"
          target="_blank"
          rel="noreferrer noopener"
        >
          바로 문의하기
        </StyledLink>
      </Card>
    </Wrapper>
  );
};

export default ViewOrderSuccess;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 15px;
  padding: 35px 45px;
  width: 500px;
  height: 400px;
  background: #fff;
  border-top: 10px solid #b69e65;
  border-radius: 10px;

  & > h3 {
    margin-bottom: 20px;
    color: #b69e65;
  }

  & > p {
    margin-bottom: 15px;
    text-align: center;

    & > span {
      font-weight: bold;
      font-size: 17px;
    }
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 19px 20px;
  margin-top: 15px;
  background-color: #1c1d1e;
  font-size: 16px;
  color: #ffffff;
  text-decoration: none;
  outline: 0px;
  text-align: center;
  box-sizing: border-box;
  vertical-align: top;
  line-height: 1;
`;
