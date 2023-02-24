import React from "react";
import { Form, Button } from "antd";
import FormItemBasic from "@components/FormItemBasic";
import FormItemMassage from "@components/FormItemMassage";
import FormItemDetail from "./FormItemDetail";

const ViewDaytimeMassage = () => {
  const [form] = Form.useForm();
  const fieldPax = Form.useWatch("pax", form);

  const onFinish = (values: any) => {
    console.log("Success", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
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
      <FormItemDetail />
      <FormItemMassage itemLength={fieldPax} form={form} />

      <br />
      <Button type="primary" htmlType="submit" size="large" block>
        예약하기
      </Button>
    </Form>
  );
};

export default ViewDaytimeMassage;
