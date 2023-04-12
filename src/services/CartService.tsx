import Storage from "./index";
import {
  CartItemType,
  Carts,
  CartsResult,
  FormType,
  ItemKey,
  OrderInfo,
} from "@types";
import { changeNumberWithComma } from "src/utilities/funcs";
import dayjs from "dayjs";
import couponMap from "@configs/couponMap";

const KEY = "cacaotree-cart";

const defualtCart: Carts = {
  formBasic: {
    name: null,
    email: null,
    phone: null,
  },
  totalItemCnt: 0,
  totalPricePeso: 0,
  totalPriceWon: 0,
  totalDiscountPeso: 0,
  totalDiscountWon: 0,
  totalPaymentPeso: 0,
  totalPaymentWon: 0,
  items: {
    "daytime-massage": [],
    "firstday-massage": [],
    "firstday-gold": [],
    "firstday-pirate": [],
    "firstday-south": [],
    "lastday-massage": [],
    "lastday-pirate": [],
    "lastday-gold": [],
  },
};

export const defaultCartItem: CartItemType = {
  key: null,
  itemPrice: 0,
  itemDiscount: 0,
  itemAdditional: 0,
  itemPayment: 0,
  hasSixtyMinutesMassage: false,
  paymentMethod: "won",
  massageText: "",
  form: null,
  // couponList: [],
};

export default Object.freeze({
  // 전체 데이터 조회
  findAll(): Carts {
    return Storage.get(KEY, defualtCart);
  },

  // 전체 데이터 저장
  saveAll(carts: Carts) {
    return Storage.set(KEY, carts);
  },

  removeAll() {
    return Storage.remove(KEY);
  },

  saveOrderInfo(form: OrderInfo) {
    let carts: Carts = this.findAll();
    carts.formBasic = form;
    this.saveAll(carts);
    return this.getCarts();
  },

  // 아이템 리스트 찾기
  findItemAll(itemKey: ItemKey) {
    const carts = this.findAll();

    return carts.items[itemKey];
  },

  // 아이템 리스트 저장
  saveItemAll(itemKey: ItemKey, cartItems: CartItemType[]) {
    let carts: Carts = this.findAll();

    carts.items[itemKey] = cartItems;
    this.saveAll(carts);
  },

  // 아이템 찾기
  findItemBySeq(itemKey: ItemKey, seq: number): CartItemType {
    return this.findAll().items[itemKey].find((v) => v.seq === seq);
  },

  // 아이템 추가
  addItem(itemKey: ItemKey, cartItem: CartItemType) {
    let cartItems: CartItemType[] = this.findItemAll(itemKey);

    let newCartItem = {
      ...cartItem,
      seq: cartItems.reduce((seq, cur) => Math.max(seq, cur.seq), 0) + 1,
    };

    newCartItem = this.checkCouponHappyhour(newCartItem);
    newCartItem = this.checkCouponSolo(newCartItem);

    cartItems.push(newCartItem);

    this.saveItemAll(itemKey, cartItems);
    this.changeCount("up");
    return newCartItem;
  },

  // 아이템 제거
  removeItem(itemKey: ItemKey, seq: number) {
    let cartItems = this.findItemAll(itemKey);
    cartItems = cartItems.filter((cartItem) => cartItem.seq !== seq);

    this.saveItemAll(itemKey, cartItems);
    this.changeCount("down");
  },

  // 아이템 업데이트
  updateItem(itemKey: ItemKey, newCartItem: CartItemType) {
    let cartItems: CartItemType[] = this.findItemAll(itemKey);

    newCartItem = this.checkCouponHappyhour(newCartItem);
    newCartItem = this.checkCouponSolo(newCartItem);

    cartItems = cartItems.map((cartItem) =>
      cartItem.seq === newCartItem.seq ? newCartItem : cartItem
    );

    this.saveItemAll(itemKey, cartItems);
  },

  // 추가 또는 제거시 재방문 할인 계산
  changeCount(cntType: "up" | "down") {
    let carts: Carts = this.findAll();
    let { totalItemCnt } = carts;

    carts.totalItemCnt = cntType === "up" ? totalItemCnt + 1 : totalItemCnt - 1;
    this.saveAll(carts);

    let sortedCartItems: CartItemType[] = [];

    Object.keys(carts.items).forEach((key) => {
      let cartItems = carts.items[key];
      cartItems.forEach((cartItem) => sortedCartItems.push(cartItem));
    });

    sortedCartItems = sortedCartItems.sort(
      (a, b) =>
        new Date(a.form.date).getTime() - new Date(b.form.date).getTime()
    );

    // [재방문 할인]
    sortedCartItems.forEach((cartItem, idx) => {
      let newCartItem = this.checkCouponRevisit(
        cartItem,
        idx !== 0 ? true : false
      );
      this.updateItem(cartItem.key, newCartItem);
    });
  },

  // 최종 데이터
  getCarts(): CartsResult {
    let result: CartItemType[] = [];
    let carts: Carts = this.findAll();
    let totalPricePeso = 0;
    let totalPriceWon = 0;
    let totalDiscountPeso = 0;
    let totalDiscountWon = 0;
    let totalPaymentPeso = 0;
    let totalPaymentWon = 0;

    Object.keys(carts.items).forEach((key) => {
      let cartItems: CartItemType[] = carts.items[key];
      let newCartItems = cartItems.map((cartItem) => {
        let itemPrice = 0;
        let itemDiscount = 0;
        let itemAdditional = 0;
        let itemPayment = 0;
        let massageText = "";
        let hasSixtyMinutesMassage = false;
        let {
          paymentMethod,
          form: { massageList, couponList },
        } = cartItem;
        let coupons = couponList.map((couponKey) => couponMap[couponKey]);

        let downPerPax = coupons.filter((i) => i.isPerPax && !i.isPriceUp);
        let downPerTeam = coupons.filter((i) => !i.isPerPax && !i.isPriceUp);
        let upPerPax = coupons.filter((i) => i.isPerPax && i.isPriceUp);
        let upPerTeam = coupons.filter((i) => !i.isPerPax && i.isPriceUp);

        downPerTeam.forEach((coupon) => {
          itemDiscount += coupon[paymentMethod];
        });

        upPerTeam.forEach((coupon) => {
          itemAdditional += coupon[paymentMethod];
        });

        massageList.forEach((massageItem, idx) => {
          let { massage, sex } = massageItem;
          let [massageKor, massagEng, price] = massage.split("/");
          let temp_price =
            paymentMethod === "peso" ? Number(price) / 25 : Number(price);
          let afterText = paymentMethod === "won" ? "원" : "페소";
          itemPrice += temp_price;

          if (massagEng.includes("60")) {
            hasSixtyMinutesMassage = true;
          } else {
            downPerPax.forEach((coupon) => {
              itemDiscount += coupon[paymentMethod];
            });

            upPerPax.forEach((coupon) => {
              itemAdditional += coupon[paymentMethod];
            });
          }

          sex = sex === "f" ? "여" : "남";
          massageText +=
            `${massageKor} (${sex}) ${changeNumberWithComma(
              temp_price
            )} ${afterText}` + (idx < massageList.length - 1 ? ` ・ ` : "");
        });
        itemPayment = itemPrice + itemAdditional - itemDiscount;

        if (paymentMethod === "peso") {
          totalPricePeso += itemPrice + itemAdditional;
          totalDiscountPeso += itemDiscount;
          totalPaymentPeso += itemPayment;
        } else {
          totalPriceWon += itemPrice + itemAdditional;
          totalDiscountWon += itemDiscount;
          totalPaymentWon += itemPayment;
        }

        const newCartItem = {
          ...cartItem,
          itemPrice,
          itemDiscount,
          itemAdditional,
          itemPayment,
          massageText,
          hasSixtyMinutesMassage,
        };
        result.push(newCartItem);
        return newCartItem;
      });

      result = result.sort(
        (a, b) =>
          new Date(a.form.date).getTime() - new Date(b.form.date).getTime()
      );

      carts.items[key] = newCartItems;
    });

    this.saveAll(carts);
    return {
      summary: {
        totalPricePeso,
        totalPriceWon,
        totalDiscountPeso,
        totalDiscountWon,
        totalPaymentPeso,
        totalPaymentWon,
        totalItemCnt: result.length,
      },
      cartItems: result,
      orderInfo: carts.formBasic,
    };
  },
  checkCouponHappyhour(cartItem: CartItemType) {
    let { key, form } = cartItem;
    let { massageTime, couponList } = form;
    couponList = couponList.filter((item) => item !== "happyhour");
    if (!key.includes("firstday")) {
      const hour = dayjs(massageTime).hour();
      if (hour < 16) {
        couponList.push("happyhour");
      }
    }
    return { ...cartItem, form: { ...form, couponList } };
  },
  checkCouponSolo(cartItem: CartItemType) {
    let { form } = cartItem;
    let { couponList } = form;
    couponList = couponList.filter((item) => item !== "solo");

    if (Number(form.pax) === 1) {
      couponList.push("solo");
    }

    return { ...cartItem, form: { ...form, couponList } };
  },
  checkCouponRevisit(cartItem: CartItemType, isRevisit) {
    let { form } = cartItem;
    let { couponList } = form;

    couponList = couponList.filter((item) => item !== "revisit");

    if (isRevisit) {
      couponList.push("revisit");
    }
    return { ...cartItem, form: { ...form, couponList } };
  },
});
