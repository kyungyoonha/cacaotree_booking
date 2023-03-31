import React, { useEffect } from "react";
import LayoutQuestion from "@components/LayoutQuestion";
import {
  StyledButton,
  StyledForm,
  StyledH1,
  StyledInput,
} from "@styles/styledComponents";
import { DatePicker, Form, message } from "antd";
import FormItemInputWithOption from "@components/FormItemInputWithOption";
import massageLastday from "@configs/massage-lastday";
import dayjs from "dayjs";
import FormItemMassage from "@components/FormItemMassage";
import { FormLastdayHopping, ItemKey } from "@types";
import { useRouter } from "next/router";
import { useUIContext } from "src/contexts";
import CartService from "src/services/CartService";
import InputTimePicker from "@components/InputTimePicker";
import FormItemMemo from "@components/FormItemMemo";

const ViewLastdayHopping = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormLastdayHopping>();
  const { cartItem, onFinishForm, onChangeCartItem, dispatch } = useUIContext();

  const pick = Form.useWatch("pickLocation", form);
  const itemKey = router.pathname.split("/")[2] as ItemKey;
  const seq = router.query.seq ? Number(router.query.seq) : null;

  const onFinish = (values: FormLastdayHopping) => {
    const newCartItem = { ...cartItem, key: itemKey, form: values };
    onFinishForm({ itemKey, cartItem: newCartItem }, dispatch);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("잠시후에 다시 시도해주세요.");
  };

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

        <StyledH1 style={{ textAlign: "center" }}>
          픽업 정보를 적어주세요.
        </StyledH1>

        <Form.Item
          label="픽업시간"
          name="pickTime"
          rules={[{ required: true, message: "픽업시간을 입력해주세요." }]}
          style={{ width: "100%" }}
        >
          <InputTimePicker placeholder="픽업시간을 입력해주세요." />
        </Form.Item>

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
              title: "세부시티(편도 500페소)",
              disabled: false,
              suffixText: "세부시티(편도 500페소)",
            },
          ]}
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
