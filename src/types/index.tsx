export type SelectOption = SelectOptionItem[];

interface SelectOptionItem {
  label: string;
  options: OptionItem[];
}

interface OptionItem {
  label: string;
  value: string;
}

export interface BlockDates {
  blockDatesFirstday: string[];
  blockDatesDaytime: string[];
}

export interface Massage {
  massage: string;
  sex: string;
}

export interface FormBasicMassage {
  package: string;
  date: Date;
  pax: number;
  massageList: Massage[];
  pick: string;
  drop: string;
  massageTime?: Date;
  couponList: string[];
}

export interface FormDaytimeMassage extends FormBasicMassage {
  massageTime: Date;
}
export interface FormFirstdayMassage extends FormBasicMassage {
  pickTime: Date;
  pickFlight: string;
}
export interface FormFirstdayHopping extends FormFirstdayMassage {}
export interface FormFirstdaySouth extends FormFirstdayMassage {}
export interface FormLastdayMassage extends FormBasicMassage {
  massageTime: Date;
  departTime: Date;
}
export interface FormLastdayHopping extends FormLastdayMassage {
  massageTime: Date;
}

export interface FormDaytimeMassageDirect extends FormBasicMassage {
  name: string;
  email: string;
  phone: string;
}

export interface FormFirstdayMassageDirect extends FormFirstdayMassage {
  name: string;
  email: string;
  phone: string;
}

export interface FormLastdayMassageDirect extends FormLastdayMassage {
  name: string;
  email: string;
  phone: string;
}

export type FormType =
  | FormDaytimeMassage
  | FormFirstdayMassage
  | FormFirstdayHopping
  | FormFirstdaySouth
  | FormLastdayMassage
  | FormLastdayHopping;

export interface CartItemType {
  seq?: number;
  key: string;
  hasSixtyMinutesMassage: boolean;
  itemPrice?: number;
  itemDiscount: number;
  itemAdditional: number;
  itemPayment: number;
  paymentMethod?: "peso" | "won";
  massageText: string;
  form: FormType;
  // couponList: Coupon[];
}

export type CouponKey =
  | "revisit"
  | "happyhour"
  | "solo"
  | "dropPort"
  | "hoppingDropCebu";

export interface Coupon {
  key: CouponKey;
  title: string;
  peso: number;
  won: number;
  color: string;
  isPerPax: boolean;
  isPriceUp: boolean;
}

export interface OrderInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Carts {
  formBasic: OrderInfo;
  totalItemCnt: number;
  totalPricePeso: number;
  totalPriceWon: number;
  totalDiscountPeso: number;
  totalDiscountWon: number;
  totalPaymentPeso: number;
  totalPaymentWon: number;
  items: {
    "daytime-massage": CartItemType[];
    "firstday-massage": CartItemType[];
    "firstday-pirate": CartItemType[];
    "firstday-gold": CartItemType[];
    "firstday-south": CartItemType[];
    "lastday-massage": CartItemType[];
    "lastday-gold": CartItemType[];
    "lastday-pirate": CartItemType[];
  };
}

export type ItemKey =
  | "daytime-massage"
  | "firstday-massage"
  | "firstday-gold"
  | "firstday-pirate"
  | "lastday-massage"
  | "lastday-gold"
  | "lastday-pirate";

export interface CartsResult {
  summary: {
    totalItemCnt: number;
    totalPricePeso: number;
    totalPriceWon: number;
    totalDiscountPeso: number;
    totalDiscountWon: number;
    totalPaymentPeso: number;
    totalPaymentWon: number;
  };
  cartItems: CartItemType[];
  orderInfo: OrderInfo;
}

export interface FormItemInputOption {
  key: string;
  title: string;
  disabled: boolean;
  suffixText: string;
  coupon?: string;
  placeholder?: string;
  autoOptions?: {
    [key: string]: string;
  };
}
