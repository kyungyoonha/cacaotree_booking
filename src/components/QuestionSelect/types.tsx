export interface QuestionSelectWithSvgProps {
  title: React.ReactNode;
  itemList: SelectItemWithSvg[];
  buttonName: string;
}

export interface QuestionSelectWithSubtitleProps {
  title: React.ReactNode;
  itemList: SelectItemWithSubtitle[];
  buttonName: string;
}

interface SelectItemWithSvg {
  id: string;
  svg?: React.ReactElement<any>;
  alt: string;
  title: React.ReactNode;
  description: string;
  href: string;
}

interface SelectItemWithSubtitle {
  id: string;
  alt: string;
  title: React.ReactNode;
  subTitle: React.ReactNode;
  description: string;
  href: string;
}
