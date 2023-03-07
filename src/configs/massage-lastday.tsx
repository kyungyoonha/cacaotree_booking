import { SelectOption } from "src/types";

const massageDaytime: SelectOption = [
  {
    label: "클래식 마사지",
    options: [
      {
        label: "90분 타이 (45,000원/1,800페소)",
        value: "90분 타이/90 Thai/45000",
      },
      {
        label: "120분 타이 (60,000원/2,400페소)",
        value: "120분 타이/120 Thai/45000",
      },

      {
        label: "90분 시아추 (45,000원/1,800페소)",
        value: "90분 시아추/90 Shiatsu/45000",
      },
      {
        label: "120분 시아추 (60,000원/2,400페소)",
        value: "120분 시아추/120 Shiatsu/60000",
      },

      {
        label: "90분 오일 (45,000원/1,800페소)",
        value: "90분 오일/90 Oil/45000",
      },
      {
        label: "120분 오일 (60,000원/2,400페소)",
        value: "120분 오일/120 Oil/60000",
      },
    ],
  },
  {
    label: "스페셜 마사지",
    options: [
      {
        label: "90분 라바스톤 (45,000원/1,800페소)",
        value: "90분 라바스톤/90 LavaStone/45000",
      },
      {
        label: "120분 라바스톤 (60,000원/2,400페소)",
        value: "120분 라바스톤/120 LavaStone/60000",
      },

      {
        label: "90분 썬번 쿨 트리트먼트 (45,000원/1,800페소)",
        value: "90분 썬번/90 Sun Burn/45000",
      },
      {
        label: "120분 썬번 쿨 트리트먼트 (60,000원/2,400페소)",
        value: "120분 썬번/120 Sun Burn/60000",
      },
    ],
  },
];

export default massageDaytime;
