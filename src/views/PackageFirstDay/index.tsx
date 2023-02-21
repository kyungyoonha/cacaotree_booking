import React from "react";
import { Form, Input, Button, Typography } from "antd";
import FormItemDrop from "./FormItemDrop";
import FormItemPick from "./FormItemPick";
import FormItemBasic from "@components/FormItemBasic";
import FormItemMassage from "@components/FormItemMassage";

const { Title } = Typography;

const PackageFirstDay = () => {
  const [form] = Form.useForm();
  const fieldPax = Form.useWatch("pax", form);
  const drop = Form.useWatch("drop", form);

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
        <FormItemMassage itemLength={fieldPax} form={form} />
        <FormItemPick />
        <FormItemDrop
          value={drop}
          onChange={(value) => form.setFieldValue("drop", value)}
        />

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
