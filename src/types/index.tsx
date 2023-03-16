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
  | FormLastdayMassage
  | FormLastdayHopping;

export interface CartItemType {
  seq?: number;
  key?: string;
  isSolo: boolean;
  isRevisit: boolean;
  isHappyhour: boolean;
  hasSixtyMinutesMassage: boolean;
  itemPrice?: number;
  itemDiscount?: number;
  itemPayment?: number;
  paymentMethod?: "peso" | "won";
  massageText: string;
  form: FormType;
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
    "firstday-hopping": CartItemType[];
    "lastday-massage": CartItemType[];
    "lastday-hopping": CartItemType[];
  };
}

export type ItemKey =
  | "daytime-massage"
  | "firstday-massage"
  | "firstday-hopping"
  | "lastday-massage"
  | "lastday-hopping";

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
