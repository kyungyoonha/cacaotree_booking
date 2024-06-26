import React, { useCallback, useEffect } from "react";
import LayoutQuestion from "@components/LayoutQuestion";
import {
  StyledButton,
  StyledForm,
  StyledH1,
  StyledInput,
} from "@styles/styledComponents";
import { DatePicker, Form, message } from "antd";
import massageLastday from "@configs/massage-lastday";
import dayjs from "dayjs";
import FormItemMassage from "@components/FormItemMassage";
import { FormLastdayHopping, ItemKey } from "@types";
import { useRouter } from "next/router";
import { useUIContext } from "src/contexts";
import CartService from "src/services/CartService";
import InputTimePicker from "@components/InputTimePicker";
import FormItemMemo from "@components/FormItemMemo";
import FormItemPickDrop from "@components/FormItemPickDrop";

const ViewLastdayHopping = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormLastdayHopping>();
  const { cartItem, blockDates, onFinishForm, onChangeCartItem, dispatch } =
    useUIContext();

  const itemKey = router.pathname.split("/")[2] as ItemKey;
  const seq = router.query.seq ? Number(router.query.seq) : null;

  const onFinish = (values: FormLastdayHopping) => {
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
      if (blockDates?.blockDatesDaytime.length) {
        return (
          dayjs().add(0, "days") >= current ||
          !!blockDates.blockDatesDaytime.find(
            (date) => date === dayjs(current).format("YYYY-MM-DD")
          )
        );
      }
      return dayjs().add(0, "days") >= current;
    },
    [blockDates?.blockDatesDaytime]
  );

  useEffect(() => {
    if (!seq) return;
    const prevCartItem = CartService.findItemBySeq(itemKey, seq);
    const cartItemForm = prevCartItem.form as FormLastdayHopping;

    onChangeCartItem(prevCartItem, dispatch);
    form.setFieldsValue({
      ...cartItemForm,
      date: dayjs(cartItemForm.date),
    });
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
        <StyledH1>이용날짜를 선택해주세요.</StyledH1>
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
          label="이용날짜"
          name="date"
          rules={[{ required: true, message: "이용날짜를 선택해주세요." }]}
          style={{ width: "100%" }}
        >
          <DatePicker
            format={"YYYY-MM-DD"}
            placeholder="이용날짜를 선택해주세요."
            className="ant-input"
            style={{ height: "60px", borderRadius: "10px", paddingTop: "15px" }}
            disabledDate={disabledDate}
          />
        </Form.Item>

        <StyledH1 style={{ textAlign: "center" }}>
          픽업 정보를 적어주세요.
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
              fixedValueLoc: "개별 이동하겠습니다.",
              fixedValueTime: "개별 이동하겠습니다.",
            },
          }}
        />

        <StyledH1>공항드랍 정보를 입력해주세요.</StyledH1>

        <Form.Item
          label="드랍시간"
          name="departTime"
          rules={[{ required: true, message: "드랍시간을 입력해주세요." }]}
          style={{ width: "100%" }}
        >
          <InputTimePicker placeholder="드랍시간을 입력해주세요.(최소 비행 2시간 전으로 해주시는 것이 좋습니다.)" />
        </Form.Item>

        <Form.Item
          label="드랍장소"
          name="dropLocation"
          rules={[{ required: true, message: "" }]}
          initialValue="막탄공항"
          style={{ width: "100%" }}
        >
          <StyledInput disabled size="large" />
        </Form.Item>

        <FormItemMassage form={form} selectOption={massageLastday} />

        <FormItemMemo />

        <StyledButton type="primary" htmlType="submit">
          작성 완료
        </StyledButton>
      </StyledForm>
    </LayoutQuestion>
  );
};

export default ViewLastdayHopping;
