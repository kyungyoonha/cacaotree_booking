interface Massage {
  massage: string;
  sex: string;
}

interface FormBasicMassage {
  date: Date;
  pax: number;
  massageList: Massage[];
  pick: string;
  drop: string;
}

interface FormDaytimeMassage extends FormBasicMassage {}
interface FormFirstdayMassage extends FormBasicMassage {
  arrivalTime: Date;
  pickFlight: string;
}
interface FormFirstdayHopping extends FormFirstdayMassage {}
interface FormLastdayMassage extends FormBasicMassage {
  departTime: Date;
}
interface FormLastdayHopping extends FormLastdayMassage {}

interface ItemBasic {
  seq: number;
  url: string;
  isChecked: boolean;
  paymentMethod: "peso" | "won";
  totalPrice: number;
  totalDiscount: number;
  totalPayment: number;
}

interface ItemDayTimeMassage extends ItemBasic {
  form: FormDaytimeMassage;
}
interface ItemFirstdayMassage extends ItemBasic {
  form: FormFirstdayMassage;
}
interface ItemFirstdayHopping extends ItemBasic {
  form: FormFirstdayHopping;
}
interface ItemLastdayMassage extends ItemBasic {
  form: FormLastdayMassage;
}
interface ItemLastdayHopping extends ItemBasic {
  form: FormLastdayHopping;
}

export const Item = {
  url: "daytime-massage",
  isChecked: true,
  paymentMethod: "peso",
  totalPay: 90000,
  form: {},
};

export interface Carts {
  formBasic: {
    name: string;
    email: string;
    phone: string;
  };
  totalItemCnt: number;
  totalPaymentPeso: number;
  totalPaymentWon: number;
  totalDiscountPeso: number;
  totalDiscountWon: number;
  itemsDaytimeMassage: ItemDayTimeMassage[];
  itemsFirstdayMassage: ItemFirstdayMassage[];
  itemsFirstdayHopping: ItemFirstdayHopping[];
  itemsLastdayMassage: ItemLastdayMassage[];
  itemsLastdayHopping: ItemLastdayHopping[];
}
