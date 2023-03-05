import React, { useEffect } from "react";
import FormItemGuestInfo from "@components/FormItemGuestInfo";
import LayoutQuestion from "@components/LayoutQuestion";
import {
  StyledButton,
  StyledForm,
  StyledH1,
  StyledInput,
} from "@styles/styledComponents";
import { DatePicker, Form, TimePicker } from "antd";
import FormItemInputWithOption from "@components/FormItemInputWithOption";
import massageLastday from "@configs/massage-lastday";
import dayjs from "dayjs";
import FormItemMassage from "@components/FormItemMassage";

const ViewLastdayHopping = () => {
  const [form] = Form.useForm();
  const pick = Form.useWatch("pick", form);

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

        <StyledH1>예약날짜를 선택해주세요.</StyledH1>

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

        <StyledH1 style={{ textAlign: "center" }}>
          픽업 장소를 적어주세요.
        </StyledH1>

        <FormItemInputWithOption
          value={pick}
          onChange={(value) => form.setFieldValue("pick", value)}
          label="픽업장소"
          name="pick"
          placeholder="픽업장소를 입력해주세요."
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
              title: "세부시티(편도 500페소)",
              disabled: false,
              value: "",
            },
          ]}
        />

        <StyledH1>공항드랍 정보를 입력해주세요.</StyledH1>

        <Form.Item
          label="드랍시간을 입력해주세요."
          name="departTime"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "드랍시간을 입력해주세요." }]}
        >
          <TimePicker
            style={{
              width: "100%",
              height: "60px",
              borderRadius: "10px",
            }}
            format="HH:mm"
            placeholder="드랍시간을 입력해주세요.(최소 비행 2시간 전으로 해주시는 것이 좋습니다.)"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="드랍장소"
          name="drop"
          rules={[{ required: true, message: "" }]}
          initialValue="막탄공항"
          style={{ width: "100%" }}
        >
          <StyledInput disabled size="large" />
        </Form.Item>

        <FormItemMassage form={form} selectOption={massageLastday} />

        <StyledButton type="primary" htmlType="submit">
          작성 완료
        </StyledButton>
      </StyledForm>
    </LayoutQuestion>
  );
};

export default ViewLastdayHopping;
