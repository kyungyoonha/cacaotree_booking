import { SCREENS } from "@configs/screens";
import { Button, Form, Input, Radio, Select } from "antd";
import styled from "styled-components";

export const StyledH1 = styled.h1`
  padding: 30px 0;
  @media (max-width: ${SCREENS.md}) {
    font-size: 25px;
  }
`;

export const StyledP = styled.p`
  @media (max-width: ${SCREENS.md}) {
    font-size: 16px;
  }
`;

export const StyledInput = styled(Input)`
  height: 60px;
  border-radius: 10px !important;
`;

export const StyledButton = styled(Button)`
  margin-top: 30px;
  height: 60px;
  width: 100%;
  border-radius: 10px !important;

  font-size: 20px;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0 150px;
  width: 600px;
`;

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    height: 60px !important;
    padding-top: 8px !important;
  }
`;

export const StyledRadioGroup = styled(Radio.Group)`
  width: 100%;
  display: flex;
  margin-bottom: 15px;

  .ant-radio-button-checked {
    background: ${(props) => props.theme.background};
    border-radius: 15px;
  }
`;

export const StyledRadioButton = styled(Radio.Button)`
  height: 60px !important;
  padding-top: 8px;
  flex: 1;
  text-align: center;
`;
