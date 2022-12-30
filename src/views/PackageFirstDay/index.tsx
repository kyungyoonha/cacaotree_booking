import React, { useRef, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import FormItemMassage from "./FormItemMassage";
import FormItemDrop from "./FormItemDrop";
import FormItemBasic from "./FormItemBasic";
import FormItemPick from "./FormItemPick";

const { Title } = Typography;

const PackageFirstDay = () => {
  const [form] = Form.useForm();
  const fieldPax = Form.useWatch("pax", form);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        requiredMark={false}
      >
        <FormItemBasic />
        <FormItemMassage itemLength={fieldPax} />
        <FormItemPick />
        <FormItemDrop />

        <Title
          level={4}
          type="warning"
          style={{ fontWeight: 700, marginTop: "30px" }}
        >
          기타 정보
        </Title>

        <Form.Item label="기타참고사항" name="etc">
          <Input.TextArea
            allowClear
            showCount
            placeholder="기타참고사항을 적어주세요"
            size="large"
          />
        </Form.Item>
        <br />
        <Button type="primary" htmlType="submit" size="large" block>
          예약하기
        </Button>
      </Form>
    </>
  );
};

export default PackageFirstDay;
