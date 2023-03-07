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
}

export interface FormDaytimeMassage extends FormBasicMassage {}
export interface FormFirstdayMassage extends FormBasicMassage {
  arrivalTime: Date;
  pickFlight: string;
}
export interface FormFirstdayHopping extends FormFirstdayMassage {}
export interface FormLastdayMassage extends FormBasicMassage {
  departTime: Date;
}
export interface FormLastdayHopping extends FormLastdayMassage {}

export type FormType =
  | FormDaytimeMassage
  | FormFirstdayMassage
  | FormFirstdayHopping
  | FormLastdayMassage
  | FormLastdayHopping;

export interface CartItem {
  seq?: number;
  key?: string;
  isSolo: boolean;
  isRevisit: boolean;
  isHappyhour: boolean;
  itemPrice?: number;
  itemDiscount?: number;
  itemPayment?: number;
  paymentMethod?: "peso" | "won";
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
    "daytime-massage": CartItem[];
    "firstday-massage": CartItem[];
    "firstday-hopping": CartItem[];
    "lastday-massage": CartItem[];
    "lastday-hopping": CartItem[];
  };
}

export type ItemKey =
  | "daytime-massage"
  | "firstday-massage"
  | "firstday-hopping"
  | "lastday-massage"
  | "lastday-hopping";

export interface CartItemResult extends CartItem {
  massageText: string;
}
