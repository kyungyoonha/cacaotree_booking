import InputTimePicker from "@components/InputTimePicker";
import { StyledH1 } from "@styles/styledComponents";
import { Alert, Form } from "antd";
import React from "react";

const FormItemMassageTime = () => {
  return (
    <>
      <StyledH1 style={{ textAlign: "center" }}>
        마사지 시간을 선택해주세요.
      </StyledH1>
      <Form.Item
        label="마사지 시간"
        name="massageTime"
        rules={[{ required: true, message: "마사지 시간을 입력해주세요." }]}
        style={{ width: "100%" }}
      >
        <InputTimePicker
          placeholder="마사지시간을 입력해주세요."
          startTime={10}
          endTime={23}
          isHappyhour={true}
        />
      </Form.Item>
      <Alert
        message="해피아워 적용 시간"
        description="10:00 am ~ 16:00 pm"
        type="info"
        showIcon
        style={{ width: "100%" }}
      />
    </>
  );
};

export default FormItemMassageTime;
