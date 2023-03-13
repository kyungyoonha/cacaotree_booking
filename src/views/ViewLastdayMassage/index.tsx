import LayoutQuestion from "@components/LayoutQuestion";
import {
  StyledButton,
  StyledForm,
  StyledH1,
  StyledInput,
} from "@styles/styledComponents";
import { DatePicker, Form, message, TimePicker } from "antd";
import React, { useEffect } from "react";
import massageLastday from "@configs/massage-lastday";
import dayjs from "dayjs";
import FormItemInputWithOption from "@components/FormItemInputWithOption";
import FormItemMassage from "@components/FormItemMassage";
import { FormLastdayMassage, ItemKey } from "@types";
import { useRouter } from "next/router";
import { useUIContext } from "src/contexts";
import CartService from "src/services/CartService";
import InputTimePicker from "@components/InputTimePicker";

const ViewLastdayMassage = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormLastdayMassage>();
  const urlPath = router.pathname.split("/")[2];
  const pick = Form.useWatch("pick", form);
  const { onFinishForm, dispatch } = useUIContext();
  const cartId = router.query.cartId as string;

  const onFinish = (values: FormLastdayMassage) => {
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
        <StyledH1>예약날짜를 선택해주세요.</StyledH1>

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

        <FormItemMassage form={form} selectOption={massageLastday} />

        <StyledH1 style={{ textAlign: "center" }}>
          픽업정보를 적어주세요.
        </StyledH1>

        <Form.Item
          label="픽업시간"
          name="pickTime"
          rules={[{ required: true, message: "픽업시간을 입력해주세요." }]}
          style={{ width: "100%" }}
        >
          <InputTimePicker placeholder="픽업시간을 입력해주세요." />
        </Form.Item>

        <FormItemInputWithOption
          value={pick}
          onChange={(value) => form.setFieldValue("pick", value)}
          label="픽업장소"
          name="pick"
          placeholder="픽업장소를 입력해주세요."
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
              title: "세부시티, 코르도바",
              disabled: true,
              value: "개별적으로 스파로 오겠습니다.",
            },
            {
              key: "no-need",
              title: "필요 없습니다.",
              disabled: true,
              value: "필요 없습니다.",
            },
          ]}
        />

        <StyledH1>공항드랍 정보를 입력해주세요.</StyledH1>

        <Form.Item
          label="드랍시간"
          name="departTime"
          rules={[{ required: true, message: "드랍시간을 입력해주세요." }]}
          style={{ width: "100%" }}
        >
          <InputTimePicker placeholder="드랍시간을 입력해주세요.(최소 비행 2시간 전으로 해주시는 것이 좋습니다.)" />
        </Form.Item>

        <Form.Item
          label="드랍장소"
          name="drop"
          rules={[{ required: true, message: "" }]}
          initialValue="막탄공항"
          style={{ width: "100%" }}
        >
          <StyledInput disabled size="large" />
        </Form.Item>

        <StyledButton type="primary" htmlType="submit">
          작성 완료
        </StyledButton>
      </StyledForm>
    </LayoutQuestion>
  );
};

export default ViewLastdayMassage;
