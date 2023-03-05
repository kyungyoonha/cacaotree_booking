import React from "react";
import { DatePicker, Form, TimePicker } from "antd";
import LayoutQuestion from "@components/LayoutQuestion";
import {
  StyledButton,
  StyledForm,
  StyledH1,
  StyledInput,
} from "@styles/styledComponents";
import FormItemGuestInfo from "@components/FormItemGuestInfo";
import massageFirstday from "@configs/massage-firstday";
import FormItemInputWithOption from "@components/FormItemInputWithOption";
import dayjs from "dayjs";
import FormItemMassage from "@components/FormItemMassage";

const ViewFirstdayMassage = () => {
  const [form] = Form.useForm();
  const drop = Form.useWatch("drop", form);

  const onFinish = (values: any) => {
    console.log("Success", values);

    const { name, email, phone } = values;
    const guestInfo = { name, email, phone };
    localStorage.setItem("guestInfo", JSON.stringify(guestInfo));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

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
        <FormItemGuestInfo form={form} />

        <StyledH1>공항픽업 정보를 입력해주세요.</StyledH1>

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
          label="도착시간"
          name="arrivalTime"
          rules={[{ required: true, message: "도착시간을 선택해주세요." }]}
          style={{ width: "100%" }}
        >
          <TimePicker
            style={{
              width: "100%",
              height: "60px",
              borderRadius: "10px",
            }}
            format="HH:mm"
            placeholder="도착시간을 선택해주세요."
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="항공기 편명"
          name="pickFlight"
          rules={[{ required: true, message: "항공기 편명을 입력해주세요." }]}
          style={{ width: "100%" }}
        >
          <StyledInput placeholder="항공기 편명을 입력해주세요." size="large" />
        </Form.Item>

        <Form.Item
          label="픽업장소"
          name="픽업장소"
          rules={[{ required: true, message: "" }]}
          initialValue="막탄공항"
          style={{ width: "100%" }}
        >
          <StyledInput disabled size="large" />
        </Form.Item>

        <StyledH1 style={{ textAlign: "center" }}>
          드랍 장소를 적어주세요.
        </StyledH1>

        <FormItemInputWithOption
          value={drop}
          onChange={(value) => form.setFieldValue("drop", value)}
          label="드랍장소"
          name="drop"
          placeholder="드랍장소를 입력해주세요."
          defaultValue="mactan"
          options={[
            {
              key: "mactan",
              title: "막탄지역",
              disabled: false,
              value: "",
            },
            {
              key: "cebu",
              title: "세부시티, 코르도바",
              disabled: true,
              value: "개별적으로 스파로 오겠습니다.",
            },
            {
              key: "port",
              title: "항구드랍",
              disabled: true,
              value: "항구드랍 (1인 200페소 추가)",
            },
            {
              key: "no-need",
              title: "필요 없습니다.",
              disabled: true,
              value: "필요 없습니다.",
            },
          ]}
        />

        <FormItemMassage form={form} selectOption={massageFirstday} />

        <StyledButton type="primary" htmlType="submit">
          작성 완료
        </StyledButton>
      </StyledForm>
    </LayoutQuestion>
  );
};

export default ViewFirstdayMassage;
