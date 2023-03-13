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
  label: string;
  name: string;
  placeholder: string;
  defaultValue: string;
  options: Option[];
}

interface Option {
  key: string;
  title: string;
  disabled: boolean;
  value: string;
}

const FormItemPick = ({
  value,
  onChange,
  label,
  name,
  placeholder,
  defaultValue,
  options,
}: Props) => {
  const [disabled, setDisabled] = useState(false);

  const onChangeInput = (e) => onChange(e.target.value);

  const onChangeRadio = (e) => {
    const { disabled, value } = options.find(
      (item) => e.target.value === item.key
    );

    setDisabled(disabled);
    onChange(value);
  };

  return (
    <>
      <Form.Item label={label} style={{ width: "100%", marginBottom: "0" }}>
        <StyledRadioGroup
          defaultValue={defaultValue}
          size="large"
          onChange={onChangeRadio}
        >
          {options.map((option) => (
            <StyledRadioButton key={option.key} value={option.key}>
              {option.title}
            </StyledRadioButton>
          ))}
        </StyledRadioGroup>
      </Form.Item>
      <Form.Item
        name={name}
        rules={[{ required: true, message: placeholder }]}
        style={{ width: "100%" }}
      >
        <StyledInput
          value={value}
          size="large"
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChangeInput}
        />
      </Form.Item>
    </>
  );
};

export default FormItemPick;
