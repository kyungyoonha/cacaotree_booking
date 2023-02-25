import { SVGFlightArrival, SVGFlightDeparture, SVGVan } from "@components/Svg";

export const itemList = [
  {
    id: "flightArrival",
    svg: <SVGFlightArrival />,
    alt: "flight-arrival",
    title: "첫날 패키지",
    description: "첫날 새벽에 공항에 도착하시는 분들을 위한 패키지입니다.",
    href: "/firstday",
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
    href: "/lastday",
  },
];
