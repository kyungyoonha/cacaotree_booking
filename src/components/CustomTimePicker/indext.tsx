import { TimePicker } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  value?: any;
  disabled?: boolean;
  defaultTime?: string;
  placeholder?: string;
  onChange?: (time) => {};
}

const CustomTimePicker = ({
  value,
  disabled,
  placeholder = "",
  defaultTime = "00:00",
  onChange,
}: Props) => {
  return (
    <StyledTimePicker
      placeholder={placeholder}
      format="HH:mm"
      showNow={false}
      value={value ? dayjs(value, "HH:mm") : dayjs(defaultTime, "HH:mm")}
      disabled={disabled}
      onSelect={(value) => {
        onChange(value);
      }}
    />
  );
};

export default CustomTimePicker;

export const StyledTimePicker = styled(TimePicker)`
  height: 60px;
  border-radius: 10px !important;
  width: 100%;

  .ant-picker-footer {
    display: none !important;
  }
`;
