import LayoutQuestion from "@components/LayoutQuestion";
import {
  StyledButton,
  StyledForm,
  StyledInput,
} from "@styles/styledComponents";
import { Form, message } from "antd";
import React from "react";
import { StyledH1 } from "@styles/styledComponents";
import CartService from "src/services/CartService";
import { OrderInfo } from "@types";
import { useUIContext } from "src/contexts";

const ViewOrder = () => {
  const [form] = Form.useForm();
  const { getCartsAll, dispatch } = useUIContext();

  const onFinish = (values: OrderInfo) => {
    CartService.saveOrderInfo(values);
    getCartsAll({}, dispatch);
  };
  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo);
  };
  return (
    <LayoutQuestion>
      <StyledH1>대표 예약자 정보를 입력해주세요.</StyledH1>
      <StyledForm
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          label="예약자 성함"
          name="name"
          rules={[{ required: true, message: "예약자 성함을 입력해주세요." }]}
          style={{ width: "100%" }}
        >
          <StyledInput placeholder="예약자 성함을 입력해주세요." />
        </Form.Item>

        <Form.Item
          name="email"
          label="이메일"
          style={{ width: "100%" }}
          rules={[
            {
              type: "email",
              message: "이메일 형식으로 입력해주세요.",
            },
            {
              required: true,
              message: "이메일을 입력해주세요.",
            },
          ]}
        >
          <StyledInput placeholder="이메일을 입력해주세요." />
        </Form.Item>

        <Form.Item
          name="phone"
          label="연락처"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "연락처를 입력해주세요." }]}
        >
          <StyledInput placeholder="연락처를 입력해주세요." />
        </Form.Item>

        <StyledButton type="primary" htmlType="submit">
          작성 완료
        </StyledButton>
      </StyledForm>
    </LayoutQuestion>
  );
};
export default ViewOrder;
