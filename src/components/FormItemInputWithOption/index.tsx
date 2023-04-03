import {
  StyledInput,
  StyledRadioButton,
  StyledRadioGroup,
} from "@styles/styledComponents";
import { FormItemInputOption } from "@types";
import { Form, FormInstance } from "antd";
import React, { useState, useEffect } from "react";

interface Props {
  form: FormInstance<any>;
  value: string;
  onChangeCoupon?: (coupon: string) => void;
  label: string;
  name: string;
  options: FormItemInputOption[];
}

const FormItemInputWithOption = ({
  form,
  value,
  onChangeCoupon,
  label,
  name,
  options,
}: Props) => {
  const [selectItem, setSelectItem] = useState<FormItemInputOption>(options[0]);
  const [afterText, setAfterText] = useState<string>("");

  const { key, disabled, suffixText, autoOptions, placeholder } = selectItem;

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

    form.setFieldValue(name, text);
  }, [suffixText, afterText, name, form]);

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
          defaultValue={options[0].key}
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

      {autoOptions &&
        Object.keys(autoOptions).map((autoOptionKey) => {
          return (
            <Form.Item key={autoOptionKey} name={autoOptionKey}>
              {autoOptionKey}
              <StyledInput value={autoOptions[autoOptionKey]} />
            </Form.Item>
          );
        })}

      <Form.Item
        name={name}
        rules={[{ required: true }]}
        style={{ width: "100%" }}
        hidden
      >
        <StyledInput value={value} size="large" />
      </Form.Item>
    </>
  );
};

export default FormItemInputWithOption;
