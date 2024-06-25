import React, { useCallback, useEffect } from "react";
import LayoutQuestion from "@components/LayoutQuestion";
import { StyledButton, StyledForm, StyledH1 } from "@styles/styledComponents";
import { Form, DatePicker, message, Input } from "antd";
import dayjs from "dayjs";
import FormItemMassage from "@components/FormItemMassage";
import massageDaytime from "@configs/massage-daytime";
import { FormDaytimeMassage, ItemKey } from "@types";
import { useRouter } from "next/router";
import { useUIContext } from "src/contexts";
import CartService from "src/services/CartService";
import FormItemMassageTime from "@components/FormItemMassageTime";
import FormItemMemo from "@components/FormItemMemo";
import FormItemPickDrop from "@components/FormItemPickDrop";

const ViewDaytimeMassage = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormDaytimeMassage>();
  const { cartItem, blockDates, onFinishForm, onChangeCartItem, dispatch } =
    useUIContext();

  const itemKey = router.pathname.split("/")[2] as ItemKey;
  const seq = router.query.seq ? Number(router.query.seq) : null;

  const onFinish = (values: FormDaytimeMassage) => {
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
    const cartItemForm = prevCartItem.form as FormDaytimeMassage;
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
          extra="당일 예약은 카톡으로 문의주세요."
        >
          <DatePicker
            format={"YYYY-MM-DD"}
            placeholder="이용날짜를 선택해주세요."
            className="ant-input"
            style={{ height: "60px", borderRadius: "10px", paddingTop: "15px" }}
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
              fixedValueLoc: "개별 드랍하겠습니다.",
              fixedValueTime: "개별 드랍하겠습니다.",
            },
            noNeed: {
              title: "필요 없습니다.",
              disabledLoc: true,
              disabledTime: true,
              fixedValueLoc: "픽업 필요 없습니다.",
              fixedValueTime: "픽업 필요 없습니다.",
            },
          }}
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
              fixedValueTime: "After Massage",
            },
            cebu: {
              title: "세부시티",
              disabledLoc: true,
              disabledTime: true,
              fixedValueLoc: "개별적으로 스파로 오겠습니다.",
              fixedValueTime: "개별적으로 스파로 오겠습니다.",
            },
            noNeed: {
              title: "필요 없습니다.",
              disabledLoc: true,
              disabledTime: true,
              fixedValueLoc: "필요 없습니다.",
              fixedValueTime: "필요 없습니다.",
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

export default ViewDaytimeMassage;
