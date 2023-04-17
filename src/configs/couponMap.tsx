import { Coupon } from "@types";

interface CoupMapType {
  revisit: Coupon;
  happyhour: Coupon;
  solo: Coupon;
  dropPort: Coupon;
  hoppingDropCebu: Coupon;
}

const couponMap: CoupMapType = {
  revisit: {
    key: "revisit",
    title: "할인: 재방문(1인 240페소)",
    peso: 240,
    won: 6000,
    color: "green",
    isPerPax: true,
    isPriceUp: false,
  },
  happyhour: {
    key: "happyhour",
    title: "할인: 해피아워(1인 240페소)",
    peso: 240,
    won: 6000,
    color: "cyan",
    isPerPax: true,
    isPriceUp: false,
  },
  solo: {
    key: "solo",
    title: "추가: 1인 차지(1인 400페소)",
    peso: 400,
    won: 10000,
    color: "red",
    isPerPax: false,
    isPriceUp: true,
  },
  dropPort: {
    key: "dropPort",
    title: "추가: 항구드랍(1인 200페소)",
    peso: 200,
    won: 5000,
    color: "red",
    isPerPax: true,
    isPriceUp: true,
  },
  hoppingDropCebu: {
    key: "hoppingDropCebu",
    title: "추가: 세부시티드랍(팀당 500페소)",
    peso: 500,
    won: 12500,
    color: "red",
    isPerPax: false,
    isPriceUp: true,
  },
};

export default couponMap;
