import { SCREENS } from "@configs/screens";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 700px;
  margin-bottom: 40px;
  margin-top: 80px;

  & > h1.title {
    padding: 30px 0;
    text-align: center;
  }

  & > p.description {
    margin-top: 30px;
    color: ${(props) => props.theme.main};
    text-align: center;
    font-weight: 500;
  }

  & > .children-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  @media (max-width: ${SCREENS.md}) {
    width: 100%;
    padding: 0 20px;
    margin-top: 60px;

    & > h1.title {
      font-size: 25px;
    }

    & > p.description {
      font-size: 16px;
    }
  }

  @media (max-width: ${SCREENS.sm}) {
    min-width: 354px;
    margin-top: 30px;
  }
`;

export const ItemsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;

  & > div {
    margin-right: 15px;
  }

  & > div:last-child {
    margin-right: 0;
  }

  @media (max-width: ${SCREENS.sm}) {
    flex-direction: column;
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  width: 100%;
  border: 1px solid ${(props) => props.theme.line2};
  border-radius: 10px;
  cursor: pointer;

  & > svg {
    margin-bottom: 15px;
    width: 70px;
    height: 70px;
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.main};
    color: ${(props) => props.theme.main};
    svg {
      fill: ${(props) => props.theme.main};
    }
  }

  &.active {
    background-color: ${(props) => props.theme.background};
    /* color: #fff; */
    border: 1px solid ${(props) => props.theme.main};
    svg {
      fill: #fff;
    }
  }

  & > p {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    span {
      margin-right: 5px;
    }
  }

  @media (max-width: ${SCREENS.md}) {
    & > svg {
      width: 50px;
      height: 50px;
    }
  }

  @media (max-width: ${SCREENS.sm}) {
    padding: 20px 0;
    margin-bottom: 15px;

    & > svg {
      margin-bottom: 10px;
      width: 40px;
      height: 40px;
    }
  }
`;
