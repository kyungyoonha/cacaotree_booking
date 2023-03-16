import {
  StyledInput,
  StyledRadioButton,
  StyledRadioGroup,
} from "@styles/styledComponents";
import { Form } from "antd";
import React, { useState, useEffect } from "react";

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

const FormItemInputWithOption = ({
  value,
  onChange,
  label,
  name,
  placeholder,
  defaultValue,
  options,
}: Props) => {
  const [selectItem, setSelectItem] = useState<Option>();

  const onChangeInput = (e) => onChange(e.target.value);

  const onChangeRadio = (e) => {
    const { value } = options.find((item) => e.target.value === item.key);

    onChange(value);
  };

  useEffect(() => {
    const newSelectedItem = options.find((item) => value === item.value);

    setSelectItem(newSelectedItem);
  }, [options, value]);

  return (
    <>
      <Form.Item label={label} style={{ width: "100%", marginBottom: "0" }}>
        <StyledRadioGroup
          defaultValue={defaultValue}
          size="large"
          onChange={onChangeRadio}
          value={selectItem?.key}
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
          disabled={selectItem?.disabled}
          onChange={onChangeInput}
        />
      </Form.Item>
    </>
  );
};

export default FormItemInputWithOption;
