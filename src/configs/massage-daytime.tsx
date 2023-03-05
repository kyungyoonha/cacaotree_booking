import { SelectOption } from "src/types";

const massageDaytime: SelectOption = [
  {
    label: "클래식 마사지",
    options: [
      { label: "60분 타이 (30,000원)", value: "60 Thai", price: 30000 },
      { label: "90분 타이 (40,000원)", value: "90 Thai", price: 40000 },
      { label: "120분 타이 (50,000원)", value: "120 Thai", price: 50000 },

      { label: "60분 시아추 (30,000원)", value: "60 Shiatsu", price: 30000 },
      { label: "90분 시아추 (40,000원)", value: "90 Shiatsu", price: 40000 },
      { label: "120분 시아추 (50,000원)", value: "120 Shiatsu", price: 50000 },

      { label: "60분 오일 (30,000원)", value: "60 Oil", price: 30000 },
      { label: "90분 오일 (40,000원)", value: "90 Oil", price: 40000 },
      { label: "120분 오일 (50,000원)", value: "120 Oil", price: 50000 },
    ],
  },
  {
    label: "스페셜 마사지",
    options: [
      {
        label: "90분 라바스톤 (45,000원)",
        value: "90 LavaStone",
        price: 45000,
      },
      {
        label: "120분 라바스톤 (55,000원)",
        value: "120 LavaStone",
        price: 55000,
      },

      {
        label: "90분 썬번 쿨 트리트먼트 (45,000원)",
        value: "90 Sun Burn",
        price: 45000,
      },
      {
        label: "120분 썬번 쿨 트리트먼트 (55,000원)",
        value: "120 Sun Burn",
        price: 55000,
      },
    ],
  },
  {
    label: "바디스크럽 마사지",
    options: [
      {
        label: "90분 타이+바디스크럽 (50,000원)",
        value: "90 Body+Thai",
        price: 50000,
      },
      {
        label: "120분 타이+바디스크럽 (60,000원)",
        value: "120 Body+Thai",
        price: 60000,
      },
      {
        label: "90분 시아추+바디스크럽 (50,000원)",
        value: "90 Body+Shiatsu",
        price: 50000,
      },
      {
        label: "120분 시아추+바디스크럽 (60,000원)",
        value: "120 Body+Shiatsu",
        price: 60000,
      },

      {
        label: "90분 오일+바디스크럽 (50,000원)",
        value: "90 Body+Oil",
        price: 50000,
      },
      {
        label: "120분 오일+바디스크럽 (60,000원)",
        value: "120 Body+Oil",
        price: 60000,
      },
    ],
  },
];

export default massageDaytime;
