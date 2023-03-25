import FormItemEtc from "@components/FormItemEtc";
import FormItemMassage from "@components/FormItemMassage";
import InputTimePicker from "@components/InputTimePicker";
import LayoutQuestion from "@components/LayoutQuestion";
import massageFirstday from "@configs/massage-firstday";
import {
  StyledButton,
  StyledForm,
  StyledH1,
  StyledInput,
  StyledSelect,
} from "@styles/styledComponents";
import { FormFirstdaySouth, ItemKey } from "@types";
import { DatePicker, Form, message } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUIContext } from "src/contexts";
import CartService from "src/services/CartService";

const ViewFirstdaySouth = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { cartItem, onFinishForm, onChangeCartItem, dispatch } = useUIContext();

  const itemKey = router.pathname.split("/")[2] as ItemKey;
  const seq = router.query.seq ? Number(router.query.seq) : null;

  const onFinish = (values: FormFirstdaySouth) => {
    const newCartItem = { ...cartItem, key: itemKey, form: values };
    onFinishForm({ itemKey, cartItem: newCartItem }, dispatch);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo);
  };

  useEffect(() => {
    if (!seq) return;
    const prevCartItem = CartService.findItemBySeq(itemKey, seq);
    const cartItemForm = prevCartItem.form as FormFirstdaySouth;

    onChangeCartItem(prevCartItem, dispatch);

    form.setFieldsValue({
      ...cartItemForm,
      date: dayjs(cartItemForm.date),
      arrivalTime: dayjs(cartItemForm.arrivalTime),
    });
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
          name="pick"
          rules={[{ required: true, message: "" }]}
          initialValue="막탄공항"
          style={{ width: "100%" }}
        >
          <StyledInput disabled size="large" />
        </Form.Item>

        <FormItemMassage form={form} selectOption={massageFirstday} />

        <StyledH1 style={{ textAlign: "center" }}>
          투어 정보를 입력해주세요.
        </StyledH1>

        <Form.Item
          label="투어 선택"
          name="tour"
          rules={[{ required: true, message: "인원수를 입력해주세요." }]}
          style={{ width: "100%" }}
        >
          <StyledSelect
            options={[
              {
                label: "오슬롭(고래상어)+투말록",
                value: "oslob",
              },
              {
                label: "오슬롭(고래상어)+투말록+캐녀닝",
                value: "oslob+canyon",
              },
              {
                label: "오슬롭(고래상어)+투말록+모알보알 호핑",
                value: "oslob+moal",
              },
              { label: "모알보알 호핑+캐녀닝", value: "moal+canyon" },
            ]}
            size="large"
            style={{ height: "60px" }}
            placeholder="투어를 선택해주세요."
          />
        </Form.Item>

        <Form.Item
          label="드랍장소"
          name="드랍장소"
          rules={[
            { required: true, message: "투어 후 드랍장소를 입력해주세요." },
          ]}
          style={{ width: "100%" }}
        >
          <StyledInput
            size="large"
            placeholder="투어 후 드랍장소를 입력해주세요."
          />
        </Form.Item>
        <FormItemEtc />

        <StyledButton type="primary" htmlType="submit">
          작성 완료
        </StyledButton>
      </StyledForm>
    </LayoutQuestion>
  );
};

export default ViewFirstdaySouth;
