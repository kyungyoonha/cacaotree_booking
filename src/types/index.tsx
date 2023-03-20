export type SelectOption = SelectOptionItem[];

interface SelectOptionItem {
  label: string;
  options: OptionItem[];
}

interface OptionItem {
  label: string;
  value: string;
}

export interface Massage {
  massage: string;
  sex: string;
}

export interface FormBasicMassage {
  date: Date;
  pax: number;
  massageList: Massage[];
  pick: string;
  drop: string;
  massageTime?: Date;
}

export interface FormDaytimeMassage extends FormBasicMassage {
  massageTime: Date;
}
export interface FormFirstdayMassage extends FormBasicMassage {
  arrivalTime: Date;
  pickFlight: string;
}
export interface FormFirstdayHopping extends FormFirstdayMassage {}
export interface FormFirstdaySouth extends FormFirstdayMassage {
  package: string;
}
export interface FormLastdayMassage extends FormBasicMassage {
  massageTime: Date;
  departTime: Date;
}
export interface FormLastdayHopping extends FormLastdayMassage {
  massageTime: Date;
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
  itemDiscount?: number;
  itemPayment?: number;
  paymentMethod?: "peso" | "won";
  massageText: string;
  form: FormType;
  couponList: Coupon[];
}

export interface Coupon {
  key: string;
  title: string;
  peso: number;
  won: number;
  color: string;
  type: "perPax" | "perTeam";
}

export interface Carts {
  formBasic: {
    name: string;
    email: string;
    phone: string;
  };
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
}
