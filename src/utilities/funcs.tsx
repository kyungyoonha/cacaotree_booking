export const changeNumberWithComma = (number: number) => {
  if (!number) return "0";
  return [number].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const changeTimeFormat = (time: string) => {
  let result = time;
  if (time.includes(":")) {
    let hour = Number(time.split(":")[0]);
    let etc = time.split(":")[1];

    if (hour === 0) {
      hour = 12;
    } else if (hour > 12) {
      hour = hour - 12;
    }

    result = hour + ":" + etc;
  }
  return result;
};
