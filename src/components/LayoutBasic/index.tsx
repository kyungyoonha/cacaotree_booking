import React, { useEffect } from "react";
import Header from "@components/Header";

import styled from "styled-components";
import { GetBuyListResult } from "src/pages/api/GetBlockDate";
import useSWR from "swr";
import { useUIContext } from "src/contexts";
import { Spin } from "antd";

interface Props {
  background?: string;
  children;
}

const LayoutBasic = ({ background, children }: Props) => {
  const { dispatch, getBlockDates } = useUIContext();
  const { data, isLoading } = useSWR<GetBuyListResult>(`/api/GetBlockDate`);

  useEffect(() => {
    if (!data?.ok) return;
    getBlockDates(data.data, dispatch);
  }, [data, dispatch, getBlockDates]);

  return (
    <>
      <Header />
      <Wrapper background={background}>
        {isLoading ? (
          <SpinWrapper>
            <Spin />
          </SpinWrapper>
        ) : (
          children
        )}
      </Wrapper>
    </>
  );
};

export default LayoutBasic;

type Props2 = {
  background: string;
};

const Wrapper = styled.div<Props2>`
  background: ${(props) => props.background};
  margin-top: 50px;
  height: calc(100vh - 70px);
`;

const SpinWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
