export type SelectOption = SelectOptionItem[];

interface SelectOptionItem {
  label: string;
  options: OptionItem[];
}

interface OptionItem {
  label: string;
  value: string;
  price: number;
}
