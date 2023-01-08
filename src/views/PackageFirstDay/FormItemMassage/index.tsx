import React, { useState, useEffect } from "react";
import { Form, Row, Col, Card, Typography, Select, FormInstance } from "antd";
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

  if (!itemLength || itemLength === 0) {
    return null;
  }

  return (
    <Form.Item name="good" wrapperCol={{ span: 23 }}>
      <Title level={4} type="warning" style={{ fontWeight: 700 }}>
        마사지 정보
      </Title>
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
                rules={[{ required: true, message: "인원수를 입력해주세요." }]}
              >
                <Select
                  options={massageFirstday}
                  size="large"
                  onChange={onChangeMassage(i)}
                  value={massages[i]}
                />
              </Form.Item>
            </Card>
          </Col>
        ))}
      </Row>
    </Form.Item>
  );
};

export default FormItemMassage;
