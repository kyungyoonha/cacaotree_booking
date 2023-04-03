import React, { useEffect } from "react";
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
  const { cartItem, onFinishForm, onChangeCartItem, dispatch } = useUIContext();

  const itemKey = router.pathname.split("/")[2] as ItemKey;
  const seq = router.query.seq ? Number(router.query.seq) : null;

  const onFinish = (values: FormDaytimeMassage) => {
    const newCartItem = { ...cartItem, key: itemKey, form: values };
    onFinishForm({ itemKey, cartItem: newCartItem }, dispatch);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("잠시후에 다시 시도해주세요.");
  };

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
      >
        <StyledH1>예약날짜를 선택해주세요.</StyledH1>
        <Form.Item name="package" hidden initialValue="[2] Daytime" />

        <Form.Item label="쿠폰 목록" required>
          <Form.List name="couponList">
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
              title: "세부시티, 코르도바",
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
              title: "세부시티, 코르도바",
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
