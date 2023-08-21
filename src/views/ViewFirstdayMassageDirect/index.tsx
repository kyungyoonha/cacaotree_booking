import React, { useCallback, useEffect } from "react";
import { Alert, DatePicker, Form, Spin, TimePicker, message } from "antd";
import LayoutQuestion from "@components/LayoutQuestion";
import {
  StyledButton,
  StyledForm,
  StyledH1,
  StyledInput,
} from "@styles/styledComponents";
import massageFirstday from "@configs/massage-firstday";
import dayjs from "dayjs";
import FormItemMassage from "@components/FormItemMassage";
import { FormFirstdayMassageDirect } from "@types";
import { useRouter } from "next/router";
import { useUIContext } from "src/contexts";
import FormItemMemo from "@components/FormItemMemo";
import FormItemPickDrop from "@components/FormItemPickDrop";
import { EmailResponse } from "src/pages/api/nodemailer";
import useMutation from "src/libs/useMutation";
import { SpinWrapper } from "@components/ModalSpin/style";
import InputTimePicker from "@components/InputTimePicker";
import { GetBuyListResult } from "src/pages/api/GetBlockDate";
import useSWR from "swr";
import styled from "styled-components";

const ViewFirstdayMassageDirect = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormFirstdayMassageDirect>();
  const { blockDates, dispatch, getBlockDates } = useUIContext();
  const { data: dataBlock, isLoading } = useSWR<GetBuyListResult>(
    `/api/GetBlockDate`,
    {}
  );

  const [createFirstdayMassage, { loading, data, error }] =
    useMutation<EmailResponse>("/api/CreateFirstdayMassage");

  const onFinish = (values: FormFirstdayMassageDirect) => {
    createFirstdayMassage(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    let errorMessage = "잠시후에 다시 시도해주세요.";
    if (errorInfo?.errorFields.length) {
      errorMessage = errorInfo.errorFields[0]?.errors[0];
    }
    message.error(errorMessage);
  };

  const disabledDate = useCallback(
    (current): boolean => {
      if (blockDates?.blockDatesFirstday.length) {
        return (
          dayjs().add(1, "days") >= current ||
          !!blockDates.blockDatesFirstday.find(
            (date) => date === dayjs(current).format("YYYY-MM-DD")
          )
        );
      }
      return dayjs().add(1, "days") >= current;
    },
    [blockDates?.blockDatesFirstday]
  );

  useEffect(() => {
    if (!dataBlock?.ok) return;
    getBlockDates(dataBlock.data, dispatch);
  }, [dataBlock, dispatch, getBlockDates]);

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
    <>
      {isLoading ? (
        <SpinWrapper2>
          <Spin />
        </SpinWrapper2>
      ) : (
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
              rules={[
                { required: true, message: "예약자 성함을 입력해주세요." },
              ]}
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

            <StyledH1>공항픽업 정보를 입력해주세요.</StyledH1>
            <Form.Item name="package" hidden initialValue="[1] Airport Pick" />

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
            >
              <DatePicker
                format={"YYYY-MM-DD"}
                placeholder="예약날짜를 선택해주세요."
                className="ant-input"
                style={{ height: "60px", borderRadius: "10px" }}
                disabledDate={disabledDate}
              />
            </Form.Item>

            <Alert
              message="예약 날짜 참고"
              description={
                <div>
                  전날도착: 20일 저녁 11:30분 도착 → 21일
                  <br />
                  당일도착: 21일 00시 10분 → 21일
                </div>
              }
              type="warning"
              showIcon
              style={{ width: "100%" }}
            />
            <br />

            <Form.Item
              label="도착시간"
              name="pickTime"
              rules={[{ required: true, message: "도착시간을 선택해주세요." }]}
            >
              {/* <CustimeTimePicker placeholder="도착시간을 선택해주세요." /> */}
              <InputTimePicker placeholder="도착시간을 선택해주세요." />
            </Form.Item>

            <Form.Item
              label="항공기 편명"
              name="pickFlight"
              rules={[
                { required: true, message: "항공기 편명을 입력해주세요." },
              ]}
            >
              <StyledInput
                placeholder="항공기 편명을 입력해주세요."
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="픽업장소"
              name="pickLocation"
              rules={[{ required: true, message: "" }]}
              initialValue="막탄공항"
            >
              <StyledInput disabled size="large" />
            </Form.Item>

            <FormItemMassage form={form} selectOption={massageFirstday} />

            <StyledH1 style={{ textAlign: "center" }}>
              드랍 장소를 적어주세요.
            </StyledH1>

            <FormItemPickDrop
              form={form}
              keyLocation="dropLocation"
              keyTime="dropTime"
              titleLocation="드랍장소"
              titleTime="드랍시간"
              options={{
                mactan: {
                  title: "막탄지역",
                  disabledLoc: false,
                  disabledTime: true,
                  fixedValueLoc: "",
                  fixedValueTime: "11:00 am",
                  helpLoc: (
                    <Alert
                      message="드랍 불가"
                      description="플랜테이션베이, 솔레아, 공항근처, 세부시티"
                      type="warning"
                      showIcon
                      style={{ width: "100%", margin: "20px 0" }}
                    />
                  ),
                },
                cebu: {
                  title: "세부시티",
                  disabledLoc: true,
                  disabledTime: true,
                  fixedValueLoc: "개별적으로 이동하겠습니다.",
                  fixedValueTime: "",
                  placeholderLoc: "",
                  placeholderTime: "개별적으로 이동하겠습니다.",
                },
                port: {
                  title: "항구드랍",
                  disabledLoc: true,
                  disabledTime: false,
                  fixedValueLoc: "항구드랍 (1인 200페소 추가)",
                  fixedValueTime: "",
                  helpTime: (
                    <Alert
                      message="항구 드랍 시간을 적어주세요."
                      description={
                        <div>
                          티켓시간 보다 2시간 전에 출발입니다.
                          <br />
                          예) 8시 20분 티켓 → 6시 20분
                        </div>
                      }
                      type="warning"
                      showIcon
                      style={{ width: "100%", margin: "20px 0" }}
                    />
                  ),
                  couponKey: "dropPort",
                },
                noNeed: {
                  title: "필요 없습니다.",
                  disabledLoc: false,
                  disabledTime: true,
                  fixedValueLoc: "",
                  fixedValueTime: "",
                  placeholderLoc: "개별이동 이유를 적어주세요.",
                  placeholderTime: "필요 없습니다.",
                  helpLoc: (
                    <Alert
                      message="개별 이동 사유를 적어주세요."
                      description="투어픽업은 투어종류를 적어주세요."
                      type="warning"
                      showIcon
                      style={{ width: "100%", margin: "20px 0" }}
                    />
                  ),
                },
              }}
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
      )}
    </>
  );
};

export default ViewFirstdayMassageDirect;
const SpinWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
