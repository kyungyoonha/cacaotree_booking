import React, { useEffect } from "react";
import LayoutQuestion from "@components/LayoutQuestion";
import {
  StyledButton,
  StyledForm,
  StyledH1,
  StyledInput,
  StyledSelect,
} from "@styles/styledComponents";
import { Form, DatePicker, Card, Select, Radio } from "antd";
import dayjs from "dayjs";
import theme from "@styles/theme";
import massageFirstday from "src/configs/massage-firstday";
import FormItemDrop from "./FormItemDrop";
import FormItemPick from "./FormItemPick";

const ViewDaytimeMassage = () => {
  const [form] = Form.useForm();
  const fieldPax = Number(Form.useWatch("pax", form)) || 1;
  const fieldMsgList = Form.useWatch("massageList", form) || [];
  const pick = Form.useWatch("pick", form);
  const drop = Form.useWatch("drop", form);

  const onFinish = (values: any) => {
    console.log("Success", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (fieldPax === fieldMsgList.length) return;

    let initialValue = { sex: "f", massage: "" };
    let newMsgList =
      fieldPax < fieldMsgList.length
        ? fieldMsgList.slice(0, fieldPax)
        : [...new Array(fieldPax).keys()].map((_, idx) => {
            return fieldMsgList[idx] ? fieldMsgList[idx] : initialValue;
          });

    console.log(newMsgList);
    form.setFieldValue("massageList", newMsgList);
  }, [form, fieldPax]);

  return (
    <LayoutQuestion>
      <StyledForm
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
      >
        <StyledH1>대표예약자 정보를 입력해주세요.</StyledH1>

        <Form.Item
          label="예약날짜"
          name="date"
          rules={[{ required: true, message: "예약날짜를 선택해주세요." }]}
          style={{ width: "100%" }}
          initialValue={dayjs()}
        >
          <DatePicker
            format={"YYYY-MM-DD"}
            placeholder="예약날짜를 선택해주세요."
            className="ant-input"
            style={{ height: "60px", borderRadius: "10px", paddingTop: "15px" }}
            defaultValue={dayjs()}
          />
        </Form.Item>

        <Form.Item
          label="예약자 성함"
          name="name"
          rules={[{ required: true, message: "예약자 성함을 입력해주세요." }]}
          style={{ width: "100%" }}
        >
          <StyledInput placeholder="예약자 성함을 입력해주세요." size="large" />
        </Form.Item>

        <Form.Item
          label="이메일"
          name="email"
          style={{ width: "100%" }}
          rules={[
            {
              type: "email",
              message: "이메일 형식으로 입력해주세요.",
            },
            {
              required: true,
              message: "이메일을 입력해주세요.",
            },
          ]}
        >
          <StyledInput size="large" placeholder="이메일을 입력해주세요." />
        </Form.Item>

        <Form.Item
          label="연락처"
          name="phone"
          rules={[
            { required: true, message: "연락처를 입력해주세요." },
            {
              pattern: new RegExp(/^\d{2,3}\d{3,4}\d{4}$/),
              message: "전화번호 양식에 맞게 입력해주세요",
            },
          ]}
          style={{ width: "100%" }}
        >
          <StyledInput size="large" placeholder="연락처를 입력해주세요." />
        </Form.Item>

        <StyledH1>총 인원수를 선택해주세요</StyledH1>

        <Form.Item
          label="인원수"
          name="pax"
          rules={[{ required: true, message: "인원수를 입력해주세요." }]}
          initialValue={1}
          style={{ width: "100%" }}
        >
          <StyledSelect
            options={[
              ...new Array(30).fill(null).map((_, idx) => ({
                label: `${idx + 1}명`,
                value: `${idx + 1}`,
              })),
            ]}
            size="large"
            style={{ height: "60px" }}
          />
        </Form.Item>

        <StyledH1>마사지를 선택해주세요</StyledH1>

        <Form.List name="massageList">
          {(fields) => {
            return (
              <>
                {fields.map((field) => (
                  <Card
                    key={field.key}
                    type="inner"
                    title={`고객 ${field.key + 1}`}
                    style={{
                      background: theme.gray,
                      width: "100%",
                      marginBottom: "15px",
                      marginTop: "15px",
                    }}
                  >
                    <Form.Item required style={{ marginBottom: "5px" }}>
                      <Form.Item
                        {...field}
                        key={`${field.key}-1`}
                        name={[field.name, "massage"]}
                        initialValue=""
                        rules={[
                          { required: true, message: "마사지를 선택해주세요" },
                        ]}
                      >
                        <Select options={massageFirstday} size="large" />
                      </Form.Item>

                      <Form.Item
                        key={`${field.key}-2`}
                        name={[field.name, "sex"]}
                        noStyle
                        initialValue="f"
                      >
                        <Radio.Group>
                          <Radio.Button value="f">여자</Radio.Button>
                          <Radio.Button value="m">남자</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    </Form.Item>
                  </Card>
                ))}
              </>
            );
          }}
        </Form.List>

        <StyledH1 style={{ textAlign: "center" }}>
          픽업 및 드랍장소를 적어주세요.
        </StyledH1>

        <FormItemPick
          value={pick}
          onChange={(value) => form.setFieldValue("pick", value)}
        />

        <FormItemDrop
          value={drop}
          onChange={(value) => form.setFieldValue("drop", value)}
        />

        <StyledButton type="primary" htmlType="submit">
          작성 완료
        </StyledButton>
      </StyledForm>
    </LayoutQuestion>
  );
};

export default ViewDaytimeMassage;
