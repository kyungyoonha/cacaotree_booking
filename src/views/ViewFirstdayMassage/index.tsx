import React, { useCallback, useEffect } from "react";
import { DatePicker, Form, message } from "antd";
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
import { FormFirstdayMassage, ItemKey } from "@types";
import { useRouter } from "next/router";
import { useUIContext } from "src/contexts";
import CartService from "src/services/CartService";
import InputTimePicker from "@components/InputTimePicker";
import FormItemMemo from "@components/FormItemMemo";
import FormItemPickDrop from "@components/FormItemPickDrop";

const ViewFirstdayMassage = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormFirstdayMassage>();
  const { cartItem, blockDates, onFinishForm, onChangeCartItem, dispatch } =
    useUIContext();

  const itemKey = router.pathname.split("/")[2] as ItemKey;
  const seq = router.query.seq ? Number(router.query.seq) : null;

  const onFinish = (values: FormFirstdayMassage) => {
    const newCartItem = { ...cartItem, key: itemKey, form: values };

    onFinishForm({ itemKey, cartItem: newCartItem }, dispatch);
    message.success("장바구니 추가완료");
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
          dayjs().add(0, "days") >= current ||
          !!blockDates.blockDatesFirstday.find(
            (date) => date === dayjs(current).format("YYYY-MM-DD")
          )
        );
      }
      return dayjs().add(0, "days") >= current;
    },
    [blockDates?.blockDatesFirstday]
  );

  useEffect(() => {
    if (!seq) return;
    const initCartItem = CartService.findItemBySeq(itemKey, seq);
    const cartItemForm = initCartItem.form as FormFirstdayMassage;
    form.setFieldsValue({
      ...cartItemForm,
      date: dayjs(cartItemForm.date),
      pickTime: dayjs(cartItemForm.pickTime),
    });
    onChangeCartItem(initCartItem, dispatch);
  }, [itemKey, form, seq, dispatch, onChangeCartItem]);

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
          extra="당일 예약은 카톡으로 문의주세요."
        >
          <DatePicker
            format={"YYYY-MM-DD"}
            placeholder="예약날짜를 선택해주세요."
            className="ant-input"
            style={{ height: "60px", borderRadius: "10px", paddingTop: "15px" }}
            disabledDate={disabledDate}
          />
        </Form.Item>

        <Form.Item
          label="도착시간"
          name="pickTime"
          rules={[{ required: true, message: "도착시간을 선택해주세요." }]}
        >
          <InputTimePicker placeholder="도착시간을 선택해주세요." />
        </Form.Item>

        <Form.Item
          label="항공기 편명"
          name="pickFlight"
          rules={[{ required: true, message: "항공기 편명을 입력해주세요." }]}
        >
          <StyledInput placeholder="항공기 편명을 입력해주세요." size="large" />
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
              fixedValueTime: "11:00 AM",
            },
            cebu: {
              title: "세부시티",
              disabledLoc: true,
              disabledTime: true,
              fixedValueLoc: "개별 이동하겠습니다.",
              fixedValueTime: "개별 이동하겠습니다.",
            },
            port: {
              title: "항구드랍",
              disabledLoc: true,
              disabledTime: false,
              fixedValueLoc: "항구드랍 (1인 200페소 추가)",
              fixedValueTime: "",
              helpTime: "오션젯 티켓 시간을 적어주세요.",
              couponKey: "dropPort",
            },
            noNeed: {
              title: "필요 없습니다.",
              disabledLoc: true,
              disabledTime: true,
              fixedValueLoc: "드랍 필요 없습니다.",
              fixedValueTime: "드랍 필요 없습니다.",
            },
          }}
        />

        <FormItemMemo />

        <StyledButton type="primary" htmlType="submit">
          작성 완료
        </StyledButton>
      </StyledForm>
    </LayoutQuestion>
  );
};

export default ViewFirstdayMassage;
