import { StyledH1 } from "@styles/styledComponents";
import { Alert, Form, Input } from "antd";
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
      <Alert
        message="참고사항"
        description="예약확정 안내를 받을 수 있는 카카오톡ID를 첨부해주세요. (또는 위애 작성해주신 핸드폰 번호를 한번 더 확인해주세요)"
        type="warning"
        showIcon
        style={{ width: "100%" }}
      />
    </>
  );
};

export default FormItemMemo;
