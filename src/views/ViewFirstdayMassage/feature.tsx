const DROP_OPTIONS = [
  {
    key: "mactan",
    title: "막탄지역",
    disabled: false,
    suffixText: "",
  },
  {
    key: "cebu",
    title: "세부시티, 코르도바",
    disabled: false,
    suffixText: "개별적으로 스파로 오겠습니다.",
  },
  {
    key: "port",
    title: "항구드랍",
    disabled: true,
    suffixText: "항구드랍 (1인 200페소 추가)",
    coupon: "dropPort",
  },
  {
    key: "no-need",
    title: "필요 없습니다.",
    disabled: true,
    suffixText: "필요 없습니다.",
  },
];

export default DROP_OPTIONS;
