import LayoutQuestion from "@components/LayoutQuestion";
import {
  StyledButton,
  StyledForm,
  StyledH1,
  StyledInput,
  StyledSelect,
} from "@styles/styledComponents";
import { Alert, DatePicker, Form, message, Select, Spin } from "antd";
import React, { useCallback, useEffect } from "react";
import massageLastday from "@configs/massage-lastday";
import FormItemMassage from "@components/FormItemMassage";
import { FormLastdayMassage, FormLastdayMassageDirect } from "@types";
import { useRouter } from "next/router";

import FormItemMassageTime from "@components/FormItemMassageTime";
import FormItemMemo from "@components/FormItemMemo";
import FormItemPickDrop from "@components/FormItemPickDrop";
import useMutation from "src/libs/useMutation";
import { EmailResponse } from "src/pages/api/CreateFirstdayMassage";
import { SpinWrapper } from "@components/ModalSpin/style";
import dayjs from "dayjs";
import { useUIContext } from "src/contexts";

const { Option } = Select;

const ViewLastdayMassageDirect = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormLastdayMassage>();
  const { blockDates } = useUIContext();

  const [createFirstdayMassage, { loading, data, error }] =
    useMutation<EmailResponse>("/api/CreateLastdayMassage");

  const onFinish = (values: FormLastdayMassageDirect) => {
    createFirstdayMassage(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    let errorMessage = "잠시후에 다시 시도해주세요.";
    if (errorInfo?.errorFields.length) {
      errorMessage = errorInfo.errorFields[0]?.errors[0];
    }
    message.error(errorMessage);
  };

  const disabledDate = useCallback((current): boolean => {
    return dayjs().add(-1, "days") >= current;
  }, []);

  useEffect(() => {
    if (data?.ok) {
      router.push("/cart/success");
    }
  }, [data, router]);

  useEffect(() => {
    if (error) {
      message.error("잠시후에 다시 시도해주세요. 문의: cacaotreespa");
    }
  }, [error]);

  return (
    <LayoutQuestion>
      <StyledForm
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
        scrollToFirstError={true}
      >
        <StyledH1>대표 예약자 정보를 입력해주세요.</StyledH1>
        <Form.Item
          label="예약자 성함"
          name="name"
          rules={[{ required: true, message: "예약자 성함을 입력해주세요." }]}
          style={{ width: "100%" }}
        >
          <StyledInput placeholder="예약자 성함을 입력해주세요." />
        </Form.Item>

        <Form.Item
          name="email"
          label="이메일"
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
          <StyledInput placeholder="이메일을 입력해주세요." />
        </Form.Item>

        <Form.Item
          name="phone"
          label="연락처"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "연락처를 입력해주세요." }]}
        >
          <StyledInput placeholder="연락처를 입력해주세요." />
        </Form.Item>

        <StyledH1>예약날짜를 선택해주세요.</StyledH1>
        <Form.Item name="package" hidden initialValue="[4] Airport Drop" />
        <Form.Item name="dropLocation" hidden initialValue="Airport" />

        <Form.Item label="쿠폰 목록" required hidden>
          <Form.List name="couponList" initialValue={[]}>
            {(fields) => (
              <>
                {fields.map((field) => (
                  <Form.Item {...field} key={field.key}>
                    <StyledInput />
                  </Form.Item>
                ))}
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item
          label="예약날짜"
          name="date"
          rules={[{ required: true, message: "예약날짜를 선택해주세요." }]}
          style={{ width: "100%" }}
        >
          <DatePicker
            format={"YYYY-MM-DD"}
            placeholder="예약날짜를 선택해주세요."
            className="ant-input"
            style={{ height: "60px", borderRadius: "10px" }}
            disabledDate={disabledDate}
          />
        </Form.Item>

        <FormItemMassage form={form} selectOption={massageLastday} />

        <StyledH1 style={{ textAlign: "center" }}>
          픽업정보를 적어주세요.
        </StyledH1>

        <FormItemPickDrop
          form={form}
          keyLocation="pickLocation"
          keyTime="pickTime"
          titleLocation="픽업장소"
          titleTime="픽업시간"
          options={{
            mactan: {
              title: "막탄지역",
              disabledLoc: false,
              disabledTime: false,
              fixedValueLoc: "",
              fixedValueTime: "",
            },
            cebu: {
              title: "세부시티",
              disabledLoc: true,
              disabledTime: true,
              fixedValueLoc: "개별적으로 이동하겠습니다.",
              fixedValueTime: "",
            },
            noNeed: {
              title: "필요 없습니다.",
              disabledLoc: true,
              disabledTime: true,
              fixedValueLoc: "필요 없습니다.",
              fixedValueTime: "",
            },
          }}
        />
        <Alert
          message="픽업 불가"
          description="플랜테이션베이, 솔레아, 공항근처, 세부시티"
          type="warning"
          showIcon
          style={{ width: "100%" }}
        />

        <FormItemMassageTime />

        <StyledH1>공항드랍 정보를 입력해주세요.</StyledH1>

        <Form.Item
          label="드랍시간"
          name="dropTime"
          rules={[{ required: true, message: "드랍시간을 선택해주세요." }]}
          style={{ width: "100%" }}
        >
          <StyledSelect size="large" placeholder="드랍시간을 선택해주세요.">
            <Option value="09:00 pm">저녁 09시</Option>
            <Option value="10:00 pm">저녁 10시</Option>
            <Option value="11:00 pm">저녁 11시</Option>
            <Option value="12:00 am">자정 00시</Option>
          </StyledSelect>
        </Form.Item>

        <Form.Item
          label="드랍장소"
          name="dropLocation"
          rules={[{ required: true, message: "" }]}
          initialValue="막탄 공항"
          style={{ width: "100%" }}
        >
          <StyledInput disabled size="large" />
        </Form.Item>

        <Alert
          message="공항드랍 불가"
          description="오전, 오후 공항 드랍은 예약이 어렵습니다."
          type="warning"
          showIcon
          style={{ width: "100%" }}
        />

        <FormItemMemo />

        {loading ? (
          <SpinWrapper>
            <Spin />
          </SpinWrapper>
        ) : (
          <StyledButton type="primary" htmlType="submit">
            작성 완료
          </StyledButton>
        )}
      </StyledForm>
    </LayoutQuestion>
  );
};

export default ViewLastdayMassageDirect;
