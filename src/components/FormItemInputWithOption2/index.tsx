import {
  StyledInput,
  StyledRadioButton,
  StyledRadioGroup,
} from "@styles/styledComponents";
import { FormItemInputOption } from "@types";
import { Form, FormInstance, Input } from "antd";
import React, { useState, useEffect, useMemo } from "react";

interface Props {
  form: FormInstance<any>;
  value: string;
  onChangeCoupon?: (coupon: string) => void;
  label: string;
  name: string;
  placeholder: string;
  options: FormItemInputOption[];
}

const FormItemInputWithOption = ({
  form,
  value,
  // onChangeCoupon,
  label,
  name,
  placeholder,
  options,
}: Props) => {
  const [selectKey, setSelectKey] = useState<string>(options[0].key);
  const [afterText, setAfterText] = useState<string>("");

  const { key, disabled, suffixText, autoOptions } = useMemo(() => {
    return options.find((item) => item.key === selectKey);
  }, [options, selectKey]);

  // const [selectItem, setSelectItem] = useState<FormItemInputOption>(options[0]);

  const onChangeRadio = (e) => {
    // const newSeletedItem = options.find((item) => item.key === e.target.value);
    // setSelectItem(newSeletedItem);
    setSelectKey(e.target.value);
    setAfterText("");

    // onChangeCoupon && onChangeCoupon(newSeletedItem.coupon);
  };

  useEffect(() => {
    let text = suffixText;
    text += suffixText && afterText ? ` / ${afterText}` : afterText;

    form.setFieldValue(name, text);
  }, [suffixText, afterText, form, name]);

  useEffect(() => {
    if (!value) return;
    const newSelectedItem = options.find(
      (item) => item.suffixText && value.indexOf(item.suffixText) !== -1
    );

    // setSelectItem(newSelectedItem);
    setSelectKey(newSelectedItem.key);
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
            onChange={(e) => setAfterText(e.target.value)}
          />
        </Form.Item>
      )}

      {autoOptions &&
        Object.keys(autoOptions).map((keykey) => {
          return (
            <Form.Item
              key={keykey}
              name={keykey}
              initialValue={autoOptions[keykey]}
            >
              few
              <Input value={autoOptions[keykey]} />
            </Form.Item>
          );
        })}

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
