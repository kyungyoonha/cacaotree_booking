import React from "react";
import { Form, DatePicker, TimePicker, Input, Typography } from "antd";

const { Title } = Typography;

const FormItemPick = () => {
  return (
    <>
      <Title
        level={4}
        type="warning"
        style={{ fontWeight: 700, marginTop: "30px" }}
      >
        공항 픽업
      </Title>
      <Form.Item
        label="도착날짜"
        name="date"
        rules={[{ required: true, message: "예약날짜를 선택해주세요." }]}
      >
        <DatePicker
          format={"YYYY/MM/DD"}
          placeholder="비행기 도착날짜를 선택해주세요."
          className="ant-input"
          size="large"
        />
      </Form.Item>

      <Form.Item
        label="도착시간"
        name="arrivalTime"
        rules={[{ required: true, message: "도착시간을 선택해주세요." }]}
      >
        <TimePicker
          style={{ borderRadius: 0, width: "100%" }}
          format="HH:mm"
          placeholder="도착시간을 선택해주세요."
          size="large"
        />
      </Form.Item>

      <Form.Item
        label="픽업장소"
        name="픽업장소"
        rules={[{ required: true, message: "" }]}
        initialValue="막탄공항"
      >
        <Input disabled size="large" />
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

export default FormItemPick;
