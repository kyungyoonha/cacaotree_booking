import React from "react";
import { Form, DatePicker, TimePicker, Input, Typography } from "antd";

const { Title } = Typography;

const FormItemDrop = () => {
  return (
    <>
      <Title
        level={4}
        type="warning"
        style={{ fontWeight: 700, marginTop: "30px" }}
      >
        공항 드랍
      </Title>

      <Form.Item
        label="드랍장소"
        name="drop"
        rules={[{ required: true, message: "" }]}
        initialValue="막탄공항"
      >
        <Input disabled size="large" />
      </Form.Item>

      <Form.Item
        label="비행기 출발 시간"
        name="departTime"
        rules={[{ required: true, message: "비행기 출발시간을 선택해주세요." }]}
      >
        <TimePicker
          style={{ borderRadius: 0, width: "100%" }}
          format="HH:mm"
          placeholder="비행기 출발시간을 선택해주세요."
          size="large"
        />
      </Form.Item>

      <Form.Item
        label="항공기 편명"
        name="flight"
        rules={[{ required: true, message: "항공기 편명을 입력해주세요." }]}
      >
        <Input placeholder="항공기 편명을 입력해주세요." size="large" />
      </Form.Item>
    </>
  );
};

export default FormItemDrop;
