import React, { useEffect, useState } from "react";
import { DatePicker, Form, message } from "antd";
import LayoutQuestion from "@components/LayoutQuestion";
import {
  StyledButton,
  StyledForm,
  StyledH1,
  StyledInput,
} from "@styles/styledComponents";
import massageFirstday from "@configs/massage-firstday";
import FormItemInputWithOption from "@components/FormItemInputWithOption";
import dayjs from "dayjs";
import FormItemMassage from "@components/FormItemMassage";
import { FormFirstdayMassage, ItemKey } from "@types";
import { useRouter } from "next/router";
import { useUIContext } from "src/contexts";
import CartService from "src/services/CartService";
import InputTimePicker from "@components/InputTimePicker";
import FormItemEtc from "@components/FormItemEtc";
import DROP_OPTIONS from "./feature";
import couponMap from "@configs/couponMap";

const ViewFirstdayMassage = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormFirstdayMassage>();
  const { cartItem, onFinishForm, onChangeCartItem, dispatch } = useUIContext();

  const drop = Form.useWatch("drop", form);
  const itemKey = router.pathname.split("/")[2] as ItemKey;
  const seq = router.query.seq ? Number(router.query.seq) : null;

  const onFinish = (values: FormFirstdayMassage) => {
    const newCartItem = { ...cartItem, key: itemKey, form: values };

    onFinishForm({ itemKey, cartItem: newCartItem }, dispatch);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo);
  };

  const onChangeCoupon = (couponKey) => {
    const { couponList } = cartItem;
    let except = DROP_OPTIONS.filter((i) => !!i.coupon).map((i) => i.coupon);
    let initCoupons = couponList.filter((item) => !except.includes(item.key));

    const newCoupons = couponKey
      ? [...initCoupons, couponMap[couponKey]]
      : initCoupons;
    onChangeCartItem({ ...cartItem, couponList: newCoupons }, dispatch);
  };

  useEffect(() => {
    if (!seq) return;
    const initCartItem = CartService.findItemBySeq(itemKey, seq);
    const cartItemForm = initCartItem.form as FormFirstdayMassage;
    form.setFieldsValue({
      ...cartItemForm,
      date: dayjs(cartItemForm.date),
      arrivalTime: dayjs(cartItemForm.arrivalTime),
    });
    onChangeCartItem(initCartItem, dispatch);
  }, [itemKey, form, seq, dispatch, onChangeCartItem]);

  return (
    <LayoutQuestion>
      <StyledForm
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
      >
        <StyledH1>공항픽업 정보를 입력해주세요.</StyledH1>

        <Form.Item
          label="예약날짜"
          name="date"
          rules={[{ required: true, message: "예약날짜를 선택해주세요." }]}
          style={{ width: "100%" }}
          initialValue={dayjs()}
        >
          <DatePicker
            format={"YYYY-MM-DD"}
            placeholder="예약날짜를 선택해주세요."
            className="ant-input"
            style={{ height: "60px", borderRadius: "10px", paddingTop: "15px" }}
          />
        </Form.Item>

        <Form.Item
          label="도착시간"
          name="arrivalTime"
          rules={[{ required: true, message: "도착시간을 선택해주세요." }]}
          style={{ width: "100%" }}
        >
          <InputTimePicker placeholder="도착시간을 선택해주세요." />
        </Form.Item>

        <Form.Item
          label="항공기 편명"
          name="pickFlight"
          rules={[{ required: true, message: "항공기 편명을 입력해주세요." }]}
          style={{ width: "100%" }}
        >
          <StyledInput placeholder="항공기 편명을 입력해주세요." size="large" />
        </Form.Item>

        <Form.Item
          label="픽업장소"
          name="픽업장소"
          rules={[{ required: true, message: "" }]}
          initialValue="막탄공항"
          style={{ width: "100%" }}
        >
          <StyledInput disabled size="large" />
        </Form.Item>

        <FormItemMassage form={form} selectOption={massageFirstday} />

        <StyledH1 style={{ textAlign: "center" }}>
          드랍 장소를 적어주세요.
        </StyledH1>

        <FormItemInputWithOption
          value={drop}
          onChange={(value) => form.setFieldValue("drop", value)}
          onChangeCoupon={onChangeCoupon}
          label="드랍장소"
          name="drop"
          placeholder="드랍장소를 입력해주세요."
          defaultValue="mactan"
          options={DROP_OPTIONS}
        />

        <FormItemEtc />

        <StyledButton type="primary" htmlType="submit">
          작성 완료
        </StyledButton>
      </StyledForm>
    </LayoutQuestion>
  );
};

export default ViewFirstdayMassage;
