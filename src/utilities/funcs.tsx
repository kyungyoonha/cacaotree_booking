export const changeNumberWithComma = (number: number) => {
  if (!number) return "0";
  return [number].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
