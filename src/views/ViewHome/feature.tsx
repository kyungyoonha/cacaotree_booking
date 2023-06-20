import { SVGFlightArrival, SVGFlightDeparture, SVGVan } from "@components/Svg";

export const itemList = [
  {
    id: "flightArrival",
    svg: <SVGFlightArrival />,
    alt: "flight-arrival",
    title: "첫날 패키지",
    description: "첫날 새벽에 공항에 도착하시는 분들을 위한 패키지입니다.",
    href: "/firstday/firstday-massage",
    imageList: [
      "https://github.com/kyungyoonha/TIL/assets/29701385/6ad62cda-ece9-4efe-892f-fb566b298a50",
      "https://github.com/kyungyoonha/TIL/assets/29701385/122d26fc-a155-44e8-9520-01b4f7c44ee8",
    ],
  },
  {
    id: "van",
    svg: <SVGVan />,
    alt: "van",
    title: (
      <p>
        <span>숙소 픽드랍 </span>패키지
      </p>
    ),
    description: "막탄 내 원하는 곳에서 픽업 및 드랍이 가능한 패키지입니다.",
    href: "/daytime/daytime-massage",
    imageList: [
      "https://github.com/kyungyoonha/TIL/assets/29701385/d98fa03c-ce54-440a-a827-5d2f7cf33e9a",
      "https://github.com/kyungyoonha/TIL/assets/29701385/50825cbe-86be-4200-81c4-5a675d4e55be",
    ],
  },
  {
    id: "flightDeparture",
    svg: <SVGFlightDeparture />,
    alt: "flight-departure",
    title: (
      <p>
        <span>마지막날 </span>패키지
      </p>
    ),
    description:
      "마지막날 체크아웃 후 짐보관 및 공항드랍이 가능한 패키지입니다.",
    href: "/lastday/lastday-massage",
    imageList: [
      "https://github.com/kyungyoonha/TIL/assets/29701385/68813c7b-b53f-475c-84ec-b7056a5dc7cf",
      "https://github.com/kyungyoonha/TIL/assets/29701385/ee5fd9d5-c747-449f-9394-ff941e137f80",
    ],
  },
];
