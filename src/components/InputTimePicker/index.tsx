import React, { useState, useEffect } from "react";
import { Select } from "antd";
import dayjs from "dayjs";
import { StyledSelect } from "@styles/styledComponents";

type Props = {
  value?: string;
  onChange?: (e) => void;
  placeholder?: string;
};
const { Option } = Select;

const InputTimePicker = ({ value, onChange, placeholder }: Props) => {
  const [selectTime, setSelectTime] = useState<string>(null);

  const onChangeSelect = (time) => {
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
    >
      {[...Array(24).keys()].map((h) => {
        return ["00", "15", "30", "45"].map((m) => {
          let hour = String(h).length === 1 ? "0" + h : h;
          let stringTime = hour + ":" + m;
          return (
            <Option key={stringTime} value={stringTime}>
              {stringTime}
            </Option>
          );
        });
      })}
    </StyledSelect>
  );
};
export default InputTimePicker;
