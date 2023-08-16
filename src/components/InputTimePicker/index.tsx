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
    // let tempTime = time.split(" ")[0];
    let hour = time.split(":")[0];
    let mins = time.split(":")[1];

    let timeFormat = dayjs().hour(hour);
    timeFormat = timeFormat.minute(mins);

    onChange(timeFormat);
  };

  useEffect(() => {
    if (value) {
      let hour = String(new Date(value).getHours());
      let minute = String(new Date(value).getMinutes());

      hour = hour.length === 1 ? "0" + hour : hour;
      minute = minute.length === 1 ? "0" + minute : minute;

      const stringTime = hour + ":" + minute;
      setSelectTime(stringTime);
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
        return ["00", "15", "30", "45"].map((m) => {
          let hour = String(h).length === 1 ? "0" + h : h;
          let stringTime = hour + ":" + m;
          return (
            <Option key={stringTime} value={stringTime}>
              {stringTime}
              {/* {isHappyhour && h < 16 && ` (해피아워 할인)`} */}
            </Option>
          );
        });
      })}
    </StyledSelect>
  );
};
export default InputTimePicker;
