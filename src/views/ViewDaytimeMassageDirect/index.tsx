import React, { useCallback, useEffect } from "react";
import LayoutQuestion from "@components/LayoutQuestion";
import {
  StyledButton,
  StyledForm,
  StyledH1,
  StyledInput,
} from "@styles/styledComponents";
import { Form, DatePicker, message, Input, Alert, Spin } from "antd";
import dayjs from "dayjs";
import FormItemMassage from "@components/FormItemMassage";
import massageDaytime from "@configs/massage-daytime";
import { FormDaytimeMassage, FormDaytimeMassageDirect } from "@types";
import { useRouter } from "next/router";
import { useUIContext } from "src/contexts";
import FormItemMassageTime from "@components/FormItemMassageTime";
import FormItemMemo from "@components/FormItemMemo";
import FormItemPickDrop from "@components/FormItemPickDrop";
import { EmailResponse } from "src/pages/api/CreateDaytimeMassage";
import useMutation from "src/libs/useMutation";
import { SpinWrapper } from "@components/ModalSpin/style";

const ViewDaytimeMassageDirect = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormDaytimeMassage>();

  const [createDaytimeMassage, { loading, data, error }] =
    useMutation<EmailResponse>("/api/CreateDaytimeMassage");

  const onFinish = (values: FormDaytimeMassageDirect) => {
    createDaytimeMassage(values);
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

        <StyledH1>이용날짜를 선택해주세요.</StyledH1>
        <Form.Item name="package" hidden initialValue="[2] Daytime" />

        <Form.Item label="쿠폰 목록" required hidden>
          <Form.List name="couponList" initialValue={[]}>
            {(fields) => (
              <>
                {fields.map((field) => (
                  <Form.Item {...field} key={field.key}>
                    <Input />
                  </Form.Item>
                ))}
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item
          label="이용날짜"
          name="date"
          rules={[{ required: true, message: "이용날짜를 선택해주세요." }]}
          style={{ width: "100%" }}
          // initialValue={dayjs().add(1, "days")}
          // extra="당일 예약은 카톡으로 문의주세요."
        >
          <DatePicker
            format={"YYYY-MM-DD"}
            placeholder="이용날짜를 선택해주세요."
            className="ant-input"
            style={{ height: "60px", borderRadius: "10px" }}
            disabledDate={disabledDate}
          />
        </Form.Item>
        <FormItemMassage form={form} selectOption={massageDaytime} />
        <StyledH1 style={{ textAlign: "center" }}>
          픽업 장소를 적어주세요.
        </StyledH1>
        <FormItemPickDrop
          form={form}
          keyLocation="pickLocation"
          keyTime="pickTime"
          titleLocation="픽업 장소"
          titleTime="픽업 시간"
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
              fixedValueLoc: "개별 이동하겠습니다.",
              fixedValueTime: "",
              placeholderLoc: "",
              placeholderTime: "개별 이동하겠습니다.",
            },
            noNeed: {
              title: "필요 없습니다.",
              disabledLoc: true,
              disabledTime: true,
              fixedValueLoc: "픽업 필요 없습니다.",
              fixedValueTime: "",
              placeholderLoc: "",
              placeholderTime: "픽업 필요 없습니다.",
            },
          }}
        />
        <Alert
          message="픽업 안내"
          description="공항 픽업은 첫날팩을 이용해주세요."
          type="warning"
          showIcon
          style={{ width: "100%", margin: "20px 0" }}
        />
        <FormItemMassageTime />
        <StyledH1 style={{ textAlign: "center" }}>
          드랍 장소를 적어주세요.
        </StyledH1>
        <FormItemPickDrop
          form={form}
          keyLocation="dropLocation"
          keyTime="dropTime"
          titleLocation="드랍 장소"
          titleTime="드랍 시간"
          options={{
            mactan: {
              title: "막탄지역",
              disabledLoc: false,
              disabledTime: true,
              fixedValueLoc: "",
              fixedValueTime: "",
              placeholderLoc: "",
              placeholderTime: "마사지 후 드랍하겠습니다.",
            },
            cebu: {
              title: "세부시티",
              disabledLoc: true,
              disabledTime: true,
              fixedValueLoc: "개별 이동하겠습니다.",
              fixedValueTime: "",
              placeholderLoc: "",
              placeholderTime: "개별 이동하겠습니다.",
            },
            noNeed: {
              title: "필요 없습니다.",
              disabledLoc: true,
              disabledTime: true,
              fixedValueLoc: "필요 없습니다.",
              fixedValueTime: "",
              placeholderLoc: "",
              placeholderTime: "필요 없습니다.",
            },
          }}
        />
        <Alert
          message="드랍 안내"
          description="공항 드랍은 막날팩을 이용해주세요."
          type="warning"
          showIcon
          style={{ width: "100%", margin: "20px 0" }}
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

export default ViewDaytimeMassageDirect;
