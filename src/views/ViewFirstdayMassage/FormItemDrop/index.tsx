import React, { useEffect, useState } from "react";
import { Form, Row, Col, Card, Radio, Input, Typography } from "antd";
import { DropItems } from "./feature";
import styled from "styled-components";

const { Title } = Typography;

interface Props {
  value: string;
  onChange: (e) => void;
}

const FormItemDrop = ({ value, onChange }: Props) => {
  const [dropPlace, setDropPlace] = useState(null);
  const [dropPort, setDropPort] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isPort, setIsPort] = useState(false);
  const [key, setKey] = useState(null);

  const onClick = (key) => () => setKey(key);
  const onChangePort = (e) => setDropPort(e.target.value);

  const onChangeDrop = (e) => setDropPlace(e.target.value);

  useEffect(() => {
    if (!key) return;
    const { dropPlace, disabled, isPort } = DropItems.find(
      (item) => item.key === key
    );
    setDropPlace(dropPlace);
    setDisabled(disabled);
    setIsPort(isPort);
  }, [key]);

  useEffect(() => {
    if (!value && !dropPlace) return;
    let result = dropPlace + (dropPort && isPort ? " " + dropPort : "");
    console.log({ result });
    onChange(result);
  }, [value, dropPlace, isPort, dropPort, onChange]);

  return (
    <>
      <Title
        level={4}
        type="warning"
        style={{ fontWeight: 700, marginTop: "30px" }}
      >
        드랍 정보
      </Title>

      <Row gutter={[16, 16]}>
        {DropItems.map((item, i) => {
          return (
            <Col sm={12} xs={24} key={item.key} onClick={onClick(item.key)}>
              <div style={{ display: "flex", justifyContent: "center" }}></div>
              <StyledCard
                hoverable
                style={{ height: "130px" }}
                className={key === item.key ? "active" : ""}
              >
                <Radio checked={key === item.key} />
                {item.title}
                <br />
                {item.description}
              </StyledCard>
            </Col>
          );
        })}
      </Row>
      <br />
      <Form.Item
        label="드랍장소"
        name="drop"
        rules={[{ required: true, message: "드랍장소를 입력해주세요." }]}
      >
        <Input
          placeholder="드랍장소를 입력해주세요."
          size="large"
          value={value}
          onChange={onChangeDrop}
          disabled={disabled}
        />
      </Form.Item>

      {isPort && (
        <Form.Item label="티켓시간">
          <Input
            placeholder="티켓시간을 입력해주세요."
            size="large"
            value={dropPort}
            onChange={onChangePort}
          />
        </Form.Item>
      )}
    </>
  );
};

export default FormItemDrop;

const StyledCard = styled(Card)`
  &.active {
    border: 1px solid ${(props) => props.theme.success};
  }
`;
