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
import InputTimePicker from "@components/InputTimePicker";

const ViewDaytimeMassage = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormDaytimeMassage>();
  const pick = Form.useWatch("pick", form);
  const drop = Form.useWatch("drop", form);
  const { onFinishForm, dispatch } = useUIContext();
  const urlPath = router.pathname.split("/")[2];
  const cartId = router.query.cartId as string;

  const onFinish = (values: FormDaytimeMassage) => {
    onFinishForm(
      {
        key: urlPath as ItemKey,
        form: values,
        seq: cartId ? Number(cartId) : null,
      },
      dispatch
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo);
  };

  useEffect(() => {
    if (!cartId) return;
    const data = CartService.findItemBySeq(urlPath as ItemKey, Number(cartId));
    form.setFieldsValue({
      ...data.form,
      date: dayjs(data.form.date),
    });
  }, [urlPath, form, cartId]);

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
              title: "세부시티, 코르도바",
              disabled: true,
              value: "개별적으로 스파로 오겠습니다.",
            },
            {
              key: "no-need",
              title: "필요 없습니다.",
              disabled: true,
              value: "필요 없습니다.",
            },
          ]}
        />
        <StyledH1 style={{ textAlign: "center" }}>
          마사지 시간을 선택해주세요.
        </StyledH1>
        <Form.Item
          label="마사지 시간"
          name="massageTime"
          rules={[{ required: true, message: "마사지 시간을 입력해주세요." }]}
          style={{ width: "100%" }}
        >
          <InputTimePicker placeholder="마사지시간을 입력해주세요." />
        </Form.Item>

        <StyledH1 style={{ textAlign: "center" }}>
          드랍 장소를 적어주세요.
        </StyledH1>

        <FormItemInputWithOption
          value={drop}
          onChange={(value) => form.setFieldValue("drop", value)}
          label="드랍장소"
          name="drop"
          placeholder="드랍장소를 입력해주세요."
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
              title: "세부시티, 코르도바",
              disabled: true,
              value: "개별 드랍하겠습니다.",
            },
            {
              key: "no-need",
              title: "필요 없습니다.",
              disabled: true,
              value: "필요 없습니다.",
            },
          ]}
        />

        <StyledButton type="primary" htmlType="submit">
          작성 완료
        </StyledButton>
      </StyledForm>
    </LayoutQuestion>
  );
};

export default ViewDaytimeMassage;
