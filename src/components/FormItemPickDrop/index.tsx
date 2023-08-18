import { Form, FormInstance, Input } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { Coupon, CouponKey } from "@types";
import {
  StyledInput,
  StyledRadioButton,
  StyledRadioGroup,
} from "@styles/styledComponents";
import translator from "@configs/translatorMap";
import InputTimePicker from "@components/InputTimePicker";

interface Props {
  form: FormInstance<any>;
  keyLocation: string;
  keyTime: string;
  titleLocation: string;
  titleTime: string;
  options: {
    [key: string]: FormItemPickDropOption;
  };
}

export interface FormItemPickDropOption {
  title: string;
  disabledLoc: boolean;
  disabledTime: boolean;
  fixedValueLoc: string;
  fixedValueTime: string;
  placeholderLoc?: string;
  placeholderTime?: string;
  helpLoc?: React.ReactNode;
  helpTime?: React.ReactNode;
  couponKey?: CouponKey;
}

const FormItemPickDrop = ({
  form,
  keyLocation,
  keyTime,
  titleLocation,
  titleTime,
  options,
}: Props) => {
  const FORM_NAME_SELECT_KEY = keyLocation + "_hidden";
  const defaultKey = Object.keys(options)[0];
  const valueLocation = Form.useWatch(keyLocation, form);
  const initSelectKey = Form.useWatch(FORM_NAME_SELECT_KEY, form);
  const couponList = Form.useWatch("couponList", form);

  const valueTime = Form.useWatch(keyTime, form);
  const [selectKey, setSelectKey] = useState<string>(defaultKey);

  const {
    disabledLoc,
    disabledTime,
    fixedValueTime,
    helpLoc,
    helpTime,
    placeholderLoc,
    placeholderTime,
  } = useMemo(() => options[selectKey], [options, selectKey]);

  const onChangeCoupon = (newCouponKey) => {
    let except = Object.values(options)
      .filter((opt) => !!opt.couponKey)
      .map((i) => i.couponKey);

    let initCoupons = couponList || [];
    initCoupons = initCoupons.filter((item) => !except.includes(item));
    const newCoupons = newCouponKey
      ? [...initCoupons, newCouponKey]
      : initCoupons;
    form.setFieldValue("couponList", newCoupons);
  };

  const onChangeRadio = (e) => {
    const newKey = e.target.value;
    const { fixedValueLoc, fixedValueTime, couponKey } = options[newKey];
    setSelectKey(e.target.value);

    form.setFieldValue(FORM_NAME_SELECT_KEY, newKey);
    form.setFieldValue(keyLocation, fixedValueLoc);
    form.setFieldValue(keyTime, fixedValueTime);

    onChangeCoupon(couponKey);
  };

  const onChangeLocation = (e) => {
    form.setFieldValue(keyLocation, e.target.value);
  };

  useEffect(() => {
    if (!valueLocation) return;
  }, [valueLocation]);

  useEffect(() => {
    if (!initSelectKey) return;
    setSelectKey(initSelectKey);
  }, [initSelectKey]);

  return (
    <>
      <Form.Item style={{ width: "100%", marginBottom: "0" }}>
        <StyledRadioGroup
          defaultValue={Object.keys(options)[0]}
          size="large"
          onChange={onChangeRadio}
          value={selectKey}
        >
          {Object.keys(options).map((optionKey) => (
            <StyledRadioButton key={optionKey} value={optionKey}>
              {options[optionKey].title}
            </StyledRadioButton>
          ))}
        </StyledRadioGroup>
      </Form.Item>

      <Form.Item name={FORM_NAME_SELECT_KEY} initialValue={selectKey} hidden>
        -
        <Input value={selectKey} />
      </Form.Item>

      <Form.Item
        label={titleLocation}
        name={keyLocation}
        rules={[{ required: !disabledLoc, message: "장소를 입력해주세요." }]}
        help={helpLoc}
      >
        <StyledInput
          value={
            translator[valueLocation]
              ? translator[valueLocation]
              : valueLocation
          }
          size="large"
          placeholder={placeholderLoc ? placeholderLoc : "장소를 입력해주세요."}
          disabled={disabledLoc}
          onChange={onChangeLocation}
        />
      </Form.Item>

      <Form.Item
        name={keyTime}
        label={titleTime}
        rules={[{ required: !disabledTime, message: "시간을 입력해주세요." }]}
        initialValue={fixedValueTime}
        help={helpTime}
      >
        {disabledTime ? (
          <StyledInput
            value={valueTime}
            size="large"
            placeholder={
              placeholderTime ? placeholderTime : "시간을 입력해주세요."
            }
            disabled={disabledTime}
          />
        ) : (
          <InputTimePicker
            value={valueTime}
            placeholder={
              placeholderTime ? placeholderTime : "시간을 입력해주세요."
            }
            isHappyhour={true}
            disabled={disabledTime}
          />
        )}
      </Form.Item>
    </>
  );
};

export default FormItemPickDrop;
