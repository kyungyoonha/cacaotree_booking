import { SVGFlightArrival, SVGFlightDeparture, SVGVan } from "@components/Svg";

export const itemList = [
  {
    id: "flightArrival",
    svg: <SVGFlightArrival />,
    alt: "flight-arrival",
    title: "첫날 패키지",
    description: "첫날 새벽에 공항에 도착하시는 분들을 위한 패키지입니다.",
    href: "/firstday/firstday-massage-direct",
    imageList: [
      "https://github.com/user-attachments/assets/51d2861d-754a-4363-b8b3-3bf19b3e1377",
      "https://github.com/user-attachments/assets/2ceb18f7-91fa-4ac5-94a1-04224b23f85c",
      "https://github.com/user-attachments/assets/02bd48ec-81df-4831-ba6a-73c5895cd844",
      "https://github.com/user-attachments/assets/2fe64d5a-30c2-4592-918c-295c996bd959",
      "https://github.com/user-attachments/assets/c5b06a39-a891-44f5-8a8b-2aef5144daf3",
      "https://github.com/user-attachments/assets/8b93e0e3-7d66-4d30-a544-ff9088c6bc38",
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
    href: "/daytime/daytime-massage-direct",
    imageList: [
      "https://github.com/user-attachments/assets/ae9d7d3d-c559-4f70-ad04-a24744565709",
      "https://github.com/user-attachments/assets/7c08d187-7f03-4d73-a98a-b5e90c092a36",
      "https://github.com/user-attachments/assets/1186f0e1-b5da-42d4-8287-61a40706bb2d",
      "https://github.com/user-attachments/assets/ee079f1d-60fa-4ba3-9aa6-aca8097475ac",
      "https://github.com/user-attachments/assets/26551489-f4e3-4843-a4d4-027c2e26ef6d",
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
    href: "/lastday/lastday-massage-direct",
    imageList: [
      "https://github.com/user-attachments/assets/0534c23e-2eac-44ed-b510-ce4ff10468fc",
      "https://github.com/user-attachments/assets/b9f73c29-a0a2-43ff-977c-57a3ab46d2b1",
      "https://github.com/user-attachments/assets/3258a1ec-18c4-409d-b6eb-684a87c17dd8",
      "https://github.com/user-attachments/assets/d85f96f8-1c96-4d80-9fe3-775e1163528b",
      "https://github.com/user-attachments/assets/3472fbfb-6bd4-46f2-9e63-3fdce33c35bf",
      "https://github.com/user-attachments/assets/335092a5-4212-46f3-9c39-7e19a963edc8",
    ],
  },
];
