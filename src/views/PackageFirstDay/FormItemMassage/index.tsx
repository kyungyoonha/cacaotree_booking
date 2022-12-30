import React, { useState } from "react";
import { Form, Row, Col, Card, Typography, Select } from "antd";
import theme from "@styles/theme";
import massageFirstday from "src/configs/massage-firstday";

const { Title } = Typography;

interface prop {
  itemLength: number;
}

const FormItemMassage = ({ itemLength }: prop) => {
  if (!itemLength || itemLength === 0) {
    return null;
  }

  return (
    <Form.Item name="good">
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
                name="count"
                rules={[{ required: true, message: "인원수를 입력해주세요." }]}
              >
                <Select options={massageFirstday} size="large" />
              </Form.Item>
            </Card>
          </Col>
        ))}
      </Row>
    </Form.Item>
  );
};

export default FormItemMassage;
