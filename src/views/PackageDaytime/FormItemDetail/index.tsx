import React from "react";
import { Form, DatePicker, Input, Typography } from "antd";

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
        name="픽업장소"
        rules={[{ required: true, message: "픽업장소를 입력해주세요." }]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="드랍장소"
        name="드랍장소"
        rules={[{ required: true, message: "드랍장소를 입력해주세요." }]}
      >
        <Input size="large" />
      </Form.Item>
    </>
  );
};

export default FormItemPick;
