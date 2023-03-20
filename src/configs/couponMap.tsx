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
    title: "재방문 할인",
    peso: 240,
    won: 6000,
    color: "green",
    type: "perPax",
  },
  happyhour: {
    key: "happyhour",
    title: "해피아워 할인",
    peso: 240,
    won: 6000,
    color: "cyan",
    type: "perPax",
  },
  solo: {
    key: "solo",
    title: "1인 추가차지",
    peso: -400,
    won: -10000,
    color: "red",
    type: "perPax",
  },
  dropPort: {
    key: "dropPort",
    title: "항구드랍",
    peso: -200,
    won: -5000,
    color: "red",
    type: "perTeam",
  },
  hoppingDropCebu: {
    key: "hoppingDropCebu",
    title: "세부시티 드랍",
    peso: -500,
    won: -12500,
    color: "red",
    type: "perTeam",
  },
};

export default couponMap;
