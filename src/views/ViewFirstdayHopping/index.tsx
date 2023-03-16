import React, { useEffect } from "react";
import { DatePicker, Form, message, TimePicker } from "antd";
import LayoutQuestion from "@components/LayoutQuestion";
import {
  StyledButton,
  StyledForm,
  StyledH1,
  StyledInput,
} from "@styles/styledComponents";

import massageFirstday from "@configs/massage-firstday";
import dayjs from "dayjs";
import FormItemInputWithOption from "@components/FormItemInputWithOption";
import FormItemMassage from "@components/FormItemMassage";
import { FormFirstdayHopping, ItemKey } from "@types";
import { useRouter } from "next/router";
import { useUIContext } from "src/contexts";
import CartService from "src/services/CartService";
import InputTimePicker from "@components/InputTimePicker";
import FormItemEtc from "@components/FormItemEtc";

const ViewFirstdayHopping = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormFirstdayHopping>();
  const urlPath = router.pathname.split("/")[2];
  const { onFinishForm, dispatch } = useUIContext();

  const drop = Form.useWatch("drop", form);
  const cartId = router.query.cartId as string;

  const onFinish = (values: FormFirstdayHopping) => {
    onFinishForm(
      {
        key: urlPath as ItemKey,
        form: values,
        seq: cartId ? Number(cartId) : null,
      },
      dispatch
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo);
  };

  useEffect(() => {
    if (!cartId) return;
    const data = CartService.findItemBySeq(urlPath as ItemKey, Number(cartId));

    form.setFieldsValue({
      ...data.form,
      date: dayjs(data.form.date),
      arrivalTime: dayjs(data.form.arrivalTime),
    });
  }, [urlPath, form, cartId]);

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
          label="드랍장소"
          name="drop"
          placeholder="드랍장소를 입력해주세요."
          defaultValue="mactan"
          options={[
            {
              key: "mactan",
              title: "막탄지역",
              disabled: false,
              value: "",
            },
            {
              key: "cebu",
              title: "세부시티(편도 500페소)",
              disabled: false,
              value: "세부시티(편도 500페소)",
            },
          ]}
        />

        <FormItemEtc />

        <StyledButton type="primary" htmlType="submit">
          작성 완료
        </StyledButton>
      </StyledForm>
    </LayoutQuestion>
  );
};

export default ViewFirstdayHopping;
