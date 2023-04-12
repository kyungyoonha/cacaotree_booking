import LayoutQuestion from "@components/LayoutQuestion";
import {
  StyledButton,
  StyledForm,
  StyledInput,
} from "@styles/styledComponents";
import { Form, message } from "antd";
import React, { useEffect } from "react";
import { StyledH1 } from "@styles/styledComponents";
import CartService from "src/services/CartService";
import { OrderInfo } from "@types";
import { EmailResponse } from "src/pages/api/nodemailer";
import useMutation from "src/libs/useMutation";
import ModalSpin from "@components/ModalSpin";
import { useUIContext } from "src/contexts";
import { useRouter } from "next/router";

const ViewOrder = () => {
  const [form] = Form.useForm();
  const { carts } = useUIContext();
  const { orderInfo } = carts;
  const router = useRouter();

  const [
    sendEmail,
    { loading: loadingEmail, data: dataEmail, error: errorEmail },
  ] = useMutation<EmailResponse>("/api/nodemailer");

  const [
    addBooking,
    { loading: loadingBooking, data: dataBooking, error: errorBooking },
  ] = useMutation<EmailResponse>("/api/addBooking");

  const onFinish = (values: OrderInfo) => {
    CartService.saveOrderInfo(values);
    const carts = CartService.getCarts();
    addBooking(carts);
    sendEmail(carts);
  };
  const onFinishFailed = (errorInfo: any) => {
    let errorMessage = "잠시후에 다시 시도해주세요.";
    if (errorInfo?.errorFields.length) {
      errorMessage = errorInfo.errorFields[0]?.errors[0];
    }
    message.error(errorMessage);
  };

  useEffect(() => {
    if (!errorEmail) return;
    message.error("예약서 작성이 실패하였습니다.");
  }, [errorEmail]);

  useEffect(() => {
    form.setFieldsValue({
      ...orderInfo,
    });
  }, [form, orderInfo]);

  useEffect(() => {
    if (dataBooking?.ok && dataEmail?.ok) {
      message.success("예약서 작성이 완료되었습니다.");
      CartService.removeAll();
      router.push("/");
    }
  }, [dataBooking, dataEmail, router]);

  return (
    <LayoutQuestion>
      <ModalSpin loading={loadingBooking} />
      <StyledH1>대표 예약자 정보를 입력해주세요.</StyledH1>
      <StyledForm
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
        scrollToFirstError={true}
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
