import {
  StyledInput,
  StyledRadioButton,
  StyledRadioGroup,
} from "@styles/styledComponents";
import { Form } from "antd";
import React, { useState } from "react";

interface Props {
  value: string;
  onChange: (e) => void;
}

const FormItemPick = ({ value, onChange }: Props) => {
  const [disabled, setDisabled] = useState(false);

  const onChangeInput = (e) => onChange(e.target.value);

  const onChangeRadio = (e) => {
    switch (e.target.value) {
      case "mactan":
        setDisabled(false);
        onChange("");
        return;
      case "cebu":
        setDisabled(true);
        onChange("개별적으로 스파로 오겠습니다.");
        return;
      case "no-need":
        setDisabled(true);
        onChange("필요 없습니다.");
        return;
    }
  };

  return (
    <Form.Item
      label="픽업장소"
      name="pick"
      rules={[{ required: true, message: "픽업장소를 입력해주세요." }]}
      style={{ width: "100%" }}
    >
      <StyledRadioGroup
        defaultValue="mactan"
        size="large"
        onChange={onChangeRadio}
      >
        <StyledRadioButton value="mactan">막탄지역</StyledRadioButton>
        <StyledRadioButton value="cebu">세부시티, 코르도바</StyledRadioButton>
        <StyledRadioButton value="no-need">필요 없습니다.</StyledRadioButton>
      </StyledRadioGroup>
      <StyledInput
        value={value}
        size="large"
        placeholder="픽업장소를 적어주세요."
        disabled={disabled}
        onChange={onChangeInput}
      />
    </Form.Item>
  );
};

export default FormItemPick;
