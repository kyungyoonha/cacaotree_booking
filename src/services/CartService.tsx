import Storage from "./index";
import { CartItemType, Carts, CartsResult, FormType, ItemKey } from "@types";
import { changeNumberWithComma } from "src/utilities/funcs";
import dayjs from "dayjs";
import discountMap from "@configs/discountMap";

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

const defaultCartItem: CartItemType = {
  itemPrice: 0,
  itemDiscount: 0,
  itemPayment: 0,
  hasSixtyMinutesMassage: false,
  paymentMethod: "won",
  massageText: "",
  form: null,
  discountByPax: [],
  discountByTeam: [],
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
  findItemBySeq(itemKey: ItemKey, seq: number) {
    return this.findAll().items[itemKey].find((v) => v.seq === seq);
  },

  // 아이템 추가
  addItem(itemKey: ItemKey, form: FormType) {
    let cartItems: CartItemType[] = this.findItemAll(itemKey);

    let newCartItem = {
      ...defaultCartItem,
      key: itemKey,
      form,
      seq: cartItems.reduce((seq, cur) => Math.max(seq, cur.seq), 0) + 1,
    };

    newCartItem = this.checkHappyhour(newCartItem);
    newCartItem = this.checkSolo(newCartItem);

    cartItems.push(newCartItem);

    this.saveItemAll(itemKey, cartItems);
    this.changeCount("up");
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

    newCartItem = this.checkHappyhour(newCartItem);
    newCartItem = this.checkSolo(newCartItem);

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
      let newCartItem = this.checkRevisit(cartItem, idx !== 0 ? true : false);
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
        let itemPayment = 0;
        let massageText = "";
        let hasSixtyMinutesMassage = false;
        let {
          paymentMethod,
          discountByPax,
          form: { massageList },
        } = cartItem;

        let isSolo = !!discountByPax.filter((i) => i.key === "solo").length;
        let isRevisit = !!discountByPax.filter((i) => i.key === "revisit")
          .length;
        let isHappyhour = !!discountByPax.filter((i) => i.key === "happyhour")
          .length;

        massageList.forEach((massageItem, idx) => {
          let { massage, sex } = massageItem;
          let [massageKor, massagEng, price] = massage.split("/");
          let temp_price =
            paymentMethod === "peso" ? Number(price) / 25 : Number(price);
          let afterText = paymentMethod === "won" ? "원" : "페소";
          itemPrice += temp_price;

          if (massagEng.includes("60")) {
            hasSixtyMinutesMassage = true;
          }

          if (!massagEng.includes("60") && isRevisit) {
            itemDiscount += discountMap.revisit[paymentMethod];
          }

          if (!massagEng.includes("60") && isHappyhour) {
            itemDiscount += discountMap.happyhour[paymentMethod];
          }

          if (isSolo) {
            itemPrice -= discountMap.solo[paymentMethod];
          }

          sex = sex === "f" ? "여" : "남";
          massageText +=
            `${massageKor} (${sex}) ${changeNumberWithComma(
              temp_price
            )} ${afterText}` + (idx < massageList.length - 1 ? ` ・ ` : "");
        });
        itemPayment = itemPrice - itemDiscount;

        if (paymentMethod === "peso") {
          totalPricePeso += itemPrice;
          totalDiscountPeso += itemDiscount;
          totalPaymentPeso += itemPayment;
        } else {
          totalPriceWon += itemPrice;
          totalDiscountWon += itemDiscount;
          totalPaymentWon += itemPayment;
        }

        const newCartItem = {
          ...cartItem,
          itemPrice,
          itemDiscount,
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
    };
  },
  checkHappyhour(cartItem: CartItemType) {
    let { discountByPax, key, form } = cartItem;
    discountByPax = discountByPax.filter((item) => item.key !== "happyhour");

    if (!key.includes("firstday")) {
      const hour = dayjs(form.massageTime).hour();
      if (hour < 16) {
        discountByPax.push(discountMap["happyhour"]);
      }
    }
    return { ...cartItem, discountByPax };
  },
  checkSolo(cartItem: CartItemType) {
    let {
      discountByPax,
      form: { pax },
    } = cartItem;
    discountByPax = discountByPax.filter((item) => item.key !== "solo");

    if (pax === 1) {
      discountByPax.push(discountMap["solo"]);
    }

    return { ...cartItem, discountByPax };
  },
  checkRevisit(cartItem: CartItemType, isRevisit) {
    let { discountByPax } = cartItem;
    discountByPax = discountByPax.filter((item) => item.key !== "revisit");

    if (isRevisit) {
      discountByPax.push(discountMap["revisit"]);
    }
    return { ...cartItem, discountByPax };
  },
});
