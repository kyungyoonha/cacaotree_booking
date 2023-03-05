export const changeNumberWithComma = (number: number) => {
  if (!number) return "-";
  return [number].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
