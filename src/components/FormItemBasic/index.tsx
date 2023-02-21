import React from "react";
import { Form, Input, Typography } from "antd";
const { Title } = Typography;

const FormItemBasic = () => {
  return (
    <>
      <Title level={4} type="warning" style={{ fontWeight: 700 }}>
        기본 정보
      </Title>
      <Form.Item
        label="예약자 성함"
        name="name"
        rules={[{ required: true, message: "예약자 성함을 입력해주세요." }]}
      >
        <Input placeholder="예약자 성함을 입력해주세요." size="large" />
      </Form.Item>

      <Form.Item
        name="email"
        label="이메일"
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
        <Input size="large" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="연락처"
        rules={[{ required: true, message: "연락처를 입력해주세요." }]}
      >
        <Input size="large" />
      </Form.Item>
    </>
  );
};

export default FormItemBasic;
