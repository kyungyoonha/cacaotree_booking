import React, { useEffect } from "react";
import LayoutQuestion from "@components/LayoutQuestion";
import { StyledButton, StyledForm, StyledH1 } from "@styles/styledComponents";
import { Form, DatePicker, message } from "antd";
import dayjs from "dayjs";
import FormItemInputWithOption from "@components/FormItemInputWithOption";
import FormItemMassage from "@components/FormItemMassage";
import massageDaytime from "@configs/massage-daytime";
import { FormDaytimeMassage, ItemKey } from "@types";
import { useRouter } from "next/router";
import { useUIContext } from "src/contexts";
import CartService from "src/services/CartService";
import FormItemMassageTime from "@components/FormItemMassageTime";
import FormItemMemo from "@components/FormItemMemo";
import DROP_OPTIONS from "@views/ViewFirstdayMassage/feature";
import couponMap from "@configs/couponMap";

const ViewDaytimeMassage = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormDaytimeMassage>();
  const { cartItem, onFinishForm, onChangeCartItem, dispatch } = useUIContext();

  const pick = Form.useWatch("pickLocation", form);
  const drop = Form.useWatch("dropLocation", form);
  const itemKey = router.pathname.split("/")[2] as ItemKey;
  const seq = router.query.seq ? Number(router.query.seq) : null;

  const onFinish = (values: FormDaytimeMassage) => {
    const newCartItem = { ...cartItem, key: itemKey, form: values };
    onFinishForm({ itemKey, cartItem: newCartItem }, dispatch);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("잠시후에 다시 시도해주세요.");
  };

  const onChangeCoupon = (couponKey) => {
    const { couponList } = cartItem;
    let except = DROP_OPTIONS.filter((i) => !!i.coupon).map((i) => i.coupon);
    let initCoupons = couponList.filter((item) => !except.includes(item.key));

    const newCoupons = couponKey
      ? [...initCoupons, couponMap[couponKey]]
      : initCoupons;
    onChangeCartItem({ ...cartItem, couponList: newCoupons }, dispatch);
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

        <FormItemInputWithOption
          value={pick}
          onChange={(value) => form.setFieldValue("pickLocation", value)}
          label="픽업장소"
          name="pickLocation"
          placeholder="픽업장소를 입력해주세요."
          defaultValue="mactan"
          options={[
            {
              key: "mactan",
              title: "막탄지역",
              disabled: false,
              suffixText: "막탄지역",
            },
            {
              key: "cebu",
              title: "세부시티, 코르도바",
              disabled: true,
              suffixText: "개별적으로 스파로 오겠습니다.",
            },
            {
              key: "no-need",
              title: "필요 없습니다.",
              disabled: true,
              suffixText: "필요 없습니다.",
            },
          ]}
        />
        <FormItemMassageTime />

        <StyledH1 style={{ textAlign: "center" }}>
          드랍 장소를 적어주세요.
        </StyledH1>

        <FormItemInputWithOption
          value={drop}
          onChange={(value) => form.setFieldValue("dropLocation", value)}
          onChangeCoupon={onChangeCoupon}
          label="드랍장소"
          name="dropLocation"
          placeholder="드랍장소를 입력해주세요."
          defaultValue="mactan"
          options={[
            {
              key: "mactan",
              title: "막탄지역",
              disabled: false,
              suffixText: "막탄지역",
            },
            {
              key: "cebu",
              title: "세부시티, 코르도바",
              disabled: true,
              suffixText: "개별 드랍하겠습니다.",
            },
            {
              key: "no-need",
              title: "필요 없습니다.",
              disabled: true,
              suffixText: "필요 없습니다.",
            },
          ]}
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
