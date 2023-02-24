import React from "react";
import styled from "styled-components";

import { SVGFlightArrival, SVGVan, SVGFlightDeparture } from "@components/Svg";
import QuestionSelect from "@components/QuestionSelect";

const itemList = [
  {
    id: 1,
    svg: <SVGFlightArrival />,
    alt: "flight-arrival",
    title: "첫날 패키지",
    description: "첫날 새벽에 공항에 도착하시는 분들을 위한 패키지",
  },
  {
    id: 2,
    svg: <SVGVan />,
    alt: "van",
    title: "숙소 픽드랍 패키지",
    description: "막탄 내 원하는 곳에서 픽업 및 드랍이 가능한 패키지",
  },
  {
    id: 3,
    svg: <SVGFlightDeparture />,
    alt: "flight-departure",
    title: "마지막날 패키지",
    description: "마지막날 체크아웃 후 짐보관 및 공항드랍이 가능한 패키지",
  },
];

const HomeView = () => {
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
        itemList={itemList}
      />
    </Wrapper>
  );
};

export default HomeView;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 80px;
`;
