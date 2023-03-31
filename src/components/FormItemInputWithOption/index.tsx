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
  onChangeCoupon?: (coupon: string) => void;
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
  suffixText: string;
  coupon?: string;
}

const FormItemInputWithOption = ({
  value,
  onChange,
  onChangeCoupon,
  label,
  name,
  placeholder,
  defaultValue,
  options,
}: Props) => {
  const [selectItem, setSelectItem] = useState<Option>(options[0]);

  const [afterText, setAfterText] = useState<string>("");

  const { key, disabled, suffixText, coupon } = selectItem;

  const onChnageAfterText = (e) => setAfterText(e.target.value);

  const onChangeRadio = (e) => {
    const newSeletedItem = options.find((item) => item.key === e.target.value);
    setSelectItem(newSeletedItem);
    setAfterText("");
    onChangeCoupon && onChangeCoupon(newSeletedItem.coupon);
  };

  useEffect(() => {
    let text = suffixText;
    text += suffixText && afterText ? ` / ${afterText}` : afterText;

    onChange(text);
  }, [suffixText, afterText, onChange]);

  useEffect(() => {
    if (!value) return;
    const newSelectedItem = options.find(
      (item) => item.suffixText && value.indexOf(item.suffixText) !== -1
    );

    setSelectItem(newSelectedItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <Form.Item label={label} style={{ width: "100%", marginBottom: "0" }}>
        <StyledRadioGroup
          defaultValue={defaultValue}
          size="large"
          onChange={onChangeRadio}
          value={key}
        >
          {options.map((option) => (
            <StyledRadioButton key={option.key} value={option.key}>
              {option.title}
            </StyledRadioButton>
          ))}
        </StyledRadioGroup>
      </Form.Item>
      {!!suffixText && (
        <Form.Item style={{ width: "100%" }}>
          <StyledInput value={suffixText} size="large" disabled={true} />
        </Form.Item>
      )}
      {!disabled && (
        <Form.Item
          rules={[{ required: true, message: placeholder }]}
          style={{ width: "100%" }}
        >
          <StyledInput
            value={afterText}
            size="large"
            placeholder={placeholder}
            onChange={onChnageAfterText}
          />
        </Form.Item>
      )}
      <Form.Item
        name={name}
        rules={[{ required: true, message: placeholder }]}
        style={{ width: "100%" }}
        hidden
      >
        <StyledInput value={value} size="large" placeholder={placeholder} />
      </Form.Item>
    </>
  );
};

export default FormItemInputWithOption;
