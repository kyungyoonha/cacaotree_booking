import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Card,
  Typography,
  Select,
  FormInstance,
  InputNumber,
  Radio,
} from "antd";
import theme from "@styles/theme";
import massageFirstday from "src/configs/massage-firstday";

const { Title } = Typography;

interface prop {
  itemLength: number;
  form: FormInstance;
}

const FormItemMassage = ({ itemLength, form }: prop) => {
  const [massages, setMassages] = useState([]);

  const onChangeMassage = (i) => (newMassage) => {
    let newMassages = [...massages];
    newMassages[i] = newMassage;
    setMassages(newMassages);
  };

  const onChange = (value) => {
    form.setFieldValue("good", value);
  };

  useEffect(() => {
    if (!itemLength || itemLength === 0) return;

    const newMassages = [...new Array(itemLength)].map((_, i) => {
      return massages[i] ? massages[i] : "";
    });
    setMassages(newMassages);
  }, [itemLength]);

  useEffect(() => {
    onChange(massages);
  }, [massages]);

  return (
    <Form.Item name="good" wrapperCol={{ span: 23 }}>
      <Title level={4} type="warning" style={{ fontWeight: 700 }}>
        마사지 정보
      </Title>
      <Form.Item
        label="인원수"
        name="pax"
        rules={[{ required: true, message: "인원수를 입력해주세요." }]}
        initialValue={1}
        labelCol={{ span: 5 }}
      >
        <InputNumber
          placeholder="인원수를 입력해주세요."
          addonAfter="명"
          style={{ borderRadius: 0 }}
          className="input-radius"
          min={0}
          size="large"
        />
      </Form.Item>
      {itemLength >= 1 && (
        <Row gutter={[16, 16]}>
          {[...new Array(itemLength)].map((_, i) => (
            <Col span={24} key={i}>
              <Card
                type="inner"
                title={`고객${i + 1}`}
                style={{ background: theme.gray }}
              >
                <Form.Item
                  label="마사지 종류"
                  rules={[
                    { required: true, message: "인원수를 입력해주세요." },
                  ]}
                >
                  <Select
                    options={massageFirstday}
                    size="large"
                    onChange={onChangeMassage(i)}
                    value={massages[i]}
                  />
                </Form.Item>
                <Form.Item label="성별" name={`sex${i + 1}`}>
                  <Radio.Group defaultValue="f">
                    <Radio.Button value="f">여자</Radio.Button>
                    <Radio.Button value="m">남자</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Form.Item>
  );
};

export default FormItemMassage;
