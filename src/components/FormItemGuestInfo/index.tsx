import React, { useEffect } from "react";
import { StyledH1, StyledInput } from "@styles/styledComponents";
import { Form, FormInstance } from "antd";

interface Props {
  form: FormInstance<any>;
}

const FormItemGuestInfo = ({ form }: Props) => {
  useEffect(() => {
    const guestInfo = localStorage.getItem("guestInfo");
    if (guestInfo) {
      form.setFieldsValue(JSON.parse(guestInfo));
    }
  }, [form]);

  return (
    <>
      <StyledH1>대표예약자 정보를 입력해주세요.</StyledH1>

      <Form.Item
        label="예약자 성함"
        name="name"
        rules={[{ required: true, message: "예약자 성함을 입력해주세요." }]}
        style={{ width: "100%" }}
      >
        <StyledInput
          placeholder="예약자 성함을 입력해주세요."
          size="large"
          allowClear
        />
      </Form.Item>

      <Form.Item
        label="이메일"
        name="email"
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
        <StyledInput
          size="large"
          placeholder="이메일을 입력해주세요."
          allowClear
        />
      </Form.Item>

      <Form.Item
        label="연락처"
        name="phone"
        rules={[
          { required: true, message: "연락처를 입력해주세요." },
          {
            pattern: new RegExp(/^\d{2,3}\d{3,4}\d{4}$/),
            message: "전화번호 양식에 맞게 입력해주세요",
          },
        ]}
        style={{ width: "100%" }}
      >
        <StyledInput
          size="large"
          placeholder="연락처를 입력해주세요."
          allowClear
        />
      </Form.Item>
    </>
  );
};

export default FormItemGuestInfo;
