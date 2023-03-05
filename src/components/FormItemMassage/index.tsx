import { StyledH1, StyledSelect } from "@styles/styledComponents";
import theme from "@styles/theme";
import { Card, Form, FormInstance, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { SelectOption } from "src/types";

interface FormItemMassage {
  form: FormInstance<any>;
  selectOption: SelectOption;
}

const FormItemMassage = ({ form, selectOption }) => {
  const fieldPax = Number(Form.useWatch("pax", form)) || 1;
  const fieldMsgList = Form.useWatch("massageList", form) || [];

  useEffect(() => {
    if (fieldPax === fieldMsgList.length) return;

    let initialValue = { sex: "f", massage: "" };
    let newMsgList =
      fieldPax < fieldMsgList.length
        ? fieldMsgList.slice(0, fieldPax)
        : [...new Array(fieldPax).keys()].map((_, idx) => {
            return fieldMsgList[idx] ? fieldMsgList[idx] : initialValue;
          });
    form.setFieldValue("massageList", newMsgList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, fieldPax]);
  return (
    <>
      <StyledH1>총 인원수를 선택해주세요.</StyledH1>

      <Form.Item
        label="인원수"
        name="pax"
        rules={[{ required: true, message: "인원수를 입력해주세요." }]}
        initialValue={1}
        style={{ width: "100%" }}
      >
        <StyledSelect
          options={[
            ...new Array(30).fill(null).map((_, idx) => ({
              label: `${idx + 1}명`,
              value: `${idx + 1}`,
            })),
          ]}
          size="large"
          style={{ height: "60px" }}
        />
      </Form.Item>

      <StyledH1>마사지를 선택해주세요.</StyledH1>

      <Form.List name="massageList">
        {(fields) => {
          return (
            <>
              {fields.map((field) => (
                <Card
                  key={field.key}
                  type="inner"
                  title={`고객 ${field.key + 1}`}
                  style={{
                    background: theme.gray,
                    width: "100%",
                    marginBottom: "15px",
                    marginTop: "15px",
                  }}
                >
                  <Form.Item required style={{ marginBottom: "5px" }}>
                    <Form.Item
                      {...field}
                      key={`${field.key}-1`}
                      name={[field.name, "massage"]}
                      initialValue=""
                      rules={[
                        { required: true, message: "마사지를 선택해주세요" },
                      ]}
                    >
                      <Select
                        options={selectOption}
                        size="large"
                        placeholder="마사지를 선택해주세요."
                      />
                    </Form.Item>

                    <Form.Item
                      key={`${field.key}-2`}
                      name={[field.name, "sex"]}
                      noStyle
                      initialValue="f"
                    >
                      <Radio.Group>
                        <Radio.Button value="f">여자</Radio.Button>
                        <Radio.Button value="m">남자</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                  </Form.Item>
                </Card>
              ))}
            </>
          );
        }}
      </Form.List>
    </>
  );
};

export default FormItemMassage;
