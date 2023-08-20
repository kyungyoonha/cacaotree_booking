import React, { useState, useEffect } from "react";
import { Select } from "antd";
import dayjs from "dayjs";
import { StyledSelect } from "@styles/styledComponents";

type Props = {
  value?: string;
  onChange?: (e) => void;
  placeholder?: string;
  startTime?: number;
  endTime?: number;
  isHappyhour?: boolean;
  disabled?: boolean;
};
const { Option } = Select;

const InputTimePicker = ({
  value,
  onChange,
  placeholder,
  startTime = 0,
  endTime = 25,
  isHappyhour = false,
  disabled,
}: Props) => {
  const [selectTime, setSelectTime] = useState<string>(null);

  let hourList = [...Array(24).keys()];
  hourList = hourList.filter((i) => i >= startTime && i < endTime);

  const onChangeSelect = (time) => {
    onChange(time);
  };

  useEffect(() => {
    if (value) {
      setSelectTime(value);
    }
  }, [value]);

  return (
    <StyledSelect
      onChange={onChangeSelect}
      value={selectTime}
      placeholder={placeholder}
      size="large"
      disabled={disabled}
    >
      {hourList.map((h) => {
        return ["00", "10", "20", "30", "40", "50"].map((m) => {
          let hour = String(h).length === 1 ? "0" + h : h;
          let stringAA = h < 12 ? "AM" : "PM";
          let stringTime = hour + ":" + m + " " + stringAA;
          let stringValue = hour + "시 " + m + "분";

          return (
            <Option key={stringTime} value={stringTime}>
              {(stringAA === "AM" ? "오전 " : "오후 ") + stringValue}
              {/* {isHappyhour && h < 16 && ` (해피아워 할인)`} */}
            </Option>
          );
        });
      })}
    </StyledSelect>
  );
};
export default InputTimePicker;
