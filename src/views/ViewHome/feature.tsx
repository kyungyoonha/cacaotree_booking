import { SVGFlightArrival, SVGFlightDeparture, SVGVan } from "@components/Svg";

export const itemList = [
  {
    id: "flightArrival",
    svg: <SVGFlightArrival />,
    alt: "flight-arrival",
    title: "첫날 패키지",
    description: "첫날 새벽에 공항에 도착하시는 분들을 위한 패키지입니다.",
    href: "/firstday",
    imageList: [
      "https://user-images.githubusercontent.com/29701385/223688305-8d3f11da-3b0e-4adf-84be-cf24ecbc5ae6.png",
      "https://user-images.githubusercontent.com/29701385/223688286-8f987bba-307e-44bc-b66d-bf9c9cc9347f.png",
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
      "https://user-images.githubusercontent.com/29701385/223690170-b97c43eb-9d2e-4385-8121-28a77673a3d3.png",
      "https://user-images.githubusercontent.com/29701385/223690191-01d7b018-513a-4c7d-aa37-de7a7ba2cd84.png",
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
      "https://user-images.githubusercontent.com/29701385/223690477-a6ad306f-55f3-477f-8e56-83389aeecbe3.png",
      "https://user-images.githubusercontent.com/29701385/223690501-5d1c29c4-8cd1-4cf9-afce-31f38fa8a6e9.png",
    ],
  },
];
