import { StyledH1 } from "@styles/styledComponents";
import { Form, Input } from "antd";
import React from "react";

const FormItemMemo = () => {
  return (
    <>
      <StyledH1 style={{ textAlign: "center" }}>
        기타사항을 입력해주세요.
      </StyledH1>
      <Form.Item
        label="기타사항"
        name="memo"
        rules={[{ required: true, message: "기타사항을 입력해주세요." }]}
        style={{ width: "100%" }}
      >
        <Input.TextArea
          rows={4}
          style={{ borderRadius: "10px", padding: "15px" }}
        />
      </Form.Item>
    </>
  );
};

export default FormItemMemo;
