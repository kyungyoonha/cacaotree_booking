import React from "react";
import { Form, DatePicker, Input, Typography, TimePicker } from "antd";

const { Title } = Typography;

const FormItemPick = () => {
  return (
    <>
      <Title
        level={4}
        type="warning"
        style={{ fontWeight: 700, marginTop: "30px" }}
      >
        예약 정보
      </Title>
      <Form.Item
        label="예약날짜"
        name="date"
        rules={[{ required: true, message: "예약날짜를 선택해주세요." }]}
      >
        <DatePicker
          format={"YYYY/MM/DD"}
          placeholder="예약날짜를 선택해주세요."
          className="ant-input"
          size="large"
        />
      </Form.Item>

      <Form.Item
        label="픽업장소"
        name="pick"
        rules={[{ required: true, message: "픽업장소를 입력해주세요." }]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="도착시간"
        name="pickTime"
        rules={[{ required: true, message: "픽업시간을 선택해주세요." }]}
      >
        <TimePicker
          style={{ borderRadius: 0, width: "100%" }}
          format="HH:mm"
          placeholder="도착시간을 선택해주세요."
          size="large"
        />
      </Form.Item>
    </>
  );
};

export default FormItemPick;
