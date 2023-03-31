type Product = {
  id: string;
  alt: string;
  title: string;
  subTitle: string;
  description: string;
  href: string;
  thumbnail: string;
  imageList: string[];
  format: {
    package: string;
    pickLocation?: string;
    massageTime?: string;
    pickTime?: string;
    dropTime?: string;
  };
};

type ProductMap = {
  "firstday-massage": Product;
  "firstday-pirate": Product;
  "firstday-gold": Product;
  "firstday-south": Product;
  "daytime-massage": Product;
  "lastday-massage": Product;
  "lastday-pirate": Product;
  "lastday-gold": Product;
};

const productMap: ProductMap = {
  "firstday-massage": {
    id: "firstday-massage",
    alt: "첫날 0.5박 공항픽업 마사지",
    title: "첫날 0.5박 공항픽업 마사지",
    subTitle: "",
    description: "첫날 새벽에 공항에 도착하시는 분들을 위한 패키지입니다.",
    href: "/firstday/firstday-massage",
    thumbnail:
      "https://user-images.githubusercontent.com/29701385/222157820-1166f98e-3306-42fe-bc7b-1986e201e05d.jpeg",
    imageList: [
      "https://user-images.githubusercontent.com/29701385/223688305-8d3f11da-3b0e-4adf-84be-cf24ecbc5ae6.png",
      "https://user-images.githubusercontent.com/29701385/223688286-8f987bba-307e-44bc-b66d-bf9c9cc9347f.png",
    ],
    format: {
      package: "[1] Airport Pick",
      pickLocation: "Airport",
      massageTime: "after Arrive",
    },
  },
  "firstday-pirate": {
    id: "firstday-pirate",
    alt: "첫날 0.5박 패키지 + 해적호핑",
    title: "첫날 0.5박 패키지",
    subTitle: "+ 해적호핑",
    description:
      "마지막날 체크아웃 후 짐보관 및 공항드랍이 가능한 패키지입니다.",
    href: "/firstday/firstday-pirate",
    thumbnail:
      "https://user-images.githubusercontent.com/29701385/222971706-fc3764b8-897f-40df-90f1-6d5fb465be93.jpeg",
    imageList: [
      "https://user-images.githubusercontent.com/29701385/224490792-0b2ff7c7-d600-4b81-9152-52ef534846d9.png",
      "https://user-images.githubusercontent.com/29701385/224490797-a950a5e7-5700-43b9-9f9e-2c912df44676.png",
    ],
    format: {
      package: "[1] Airport Pick",
      pickLocation: "Airport",
      massageTime: "after Arrive",
    },
  },
  "firstday-gold": {
    id: "firstday-gold",
    alt: "첫날 0.5박 패키지 + 골드호핑",
    title: "첫날 0.5박 패키지",
    subTitle: "+ 골드호핑",
    description: "막탄 내 원하는 곳에서 픽업 및 드랍이 가능한 패키지입니다.",
    href: "/firstday/firstday-gold",
    thumbnail:
      "https://user-images.githubusercontent.com/29701385/222971706-fc3764b8-897f-40df-90f1-6d5fb465be93.jpeg",
    imageList: [
      "https://user-images.githubusercontent.com/29701385/224490773-5531829a-c935-47b4-8feb-6d411e2e365d.png",
      "https://user-images.githubusercontent.com/29701385/224490778-496ab12a-d558-4daf-89f4-7ec611ad3a6a.png",
      "https://user-images.githubusercontent.com/29701385/224490784-903e1e74-4277-4baf-8d90-5312386ef4ed.png",
      "https://user-images.githubusercontent.com/29701385/224490789-345047ad-7d79-4ddc-be09-0fcb00ca5ea3.png",
    ],
    format: {
      package: "[1] Airport Pick",
      pickLocation: "Airport",
      massageTime: "after Arrive",
    },
  },
  "firstday-south": {
    id: "firstday-south",
    alt: "첫날 0.5박 패키지 + 남부투어",
    title: "첫날 0.5박 패키지",
    subTitle: "+ 남부투어",
    description:
      "오슬롭 / 캐녀닝 / 모알보알 호핑을 같이 즐길 수 있는 패키지 입니다.",
    href: "/firstday/firstday-south",
    thumbnail:
      "https://user-images.githubusercontent.com/29701385/222971706-fc3764b8-897f-40df-90f1-6d5fb465be93.jpeg",
    imageList: [
      "https://user-images.githubusercontent.com/29701385/225563653-f2db6963-086e-429b-9081-7b42998905d8.png",
      "https://user-images.githubusercontent.com/29701385/225563235-58e9dedf-dc43-4bfe-acab-2cc5a92df65a.png",
      "https://user-images.githubusercontent.com/29701385/225563241-23cfb017-c8a9-464d-8bed-7059c34b909f.png",
      "https://user-images.githubusercontent.com/29701385/225563248-e17b80f1-d3f8-4d60-8d6a-ad8d78259f7e.png",
      "https://user-images.githubusercontent.com/29701385/225563254-e406e3fa-2af3-487a-9c75-12817a28a880.png",
    ],
    format: {
      package: "[1] Airport Pick",
      pickLocation: "Airport",
    },
  },
  "daytime-massage": {
    id: "daytime-massage",
    alt: "숙소 픽드랍 패키지",
    title: "숙소 픽드랍 패키지",
    subTitle: "",
    description:
      "오슬롭 / 캐녀닝 / 모알보알 호핑을 같이 즐길 수 있는 패키지 입니다.",
    href: "/daytime/daytime-massage",
    thumbnail:
      "https://user-images.githubusercontent.com/29701385/222971698-80b80417-e605-4365-ad4c-571949053f53.jpeg",
    imageList: [],
    format: {
      package: "[2] Daytime",
      pickTime: "?",
      dropTime: "After Massage",
    },
  },
  "lastday-massage": {
    id: "lastday-massage",
    alt: "마지막날 공항드랍 마사지",
    title: "마지막날 공항드랍 마사지",
    subTitle: "",
    description: "-",
    href: "/lastday/lastday-massage",
    thumbnail:
      "https://user-images.githubusercontent.com/29701385/224727535-b197094d-5f7e-4b72-b724-e24839b44405.png",
    imageList: [],
    format: {
      package: "[4] Airport Drop",
    },
  },
  "lastday-pirate": {
    id: "lastday-pirate",
    alt: "마지막날 해적호핑 패키지",
    title: "마지막날 해적호핑 패키지",
    subTitle: "",
    description: "-",
    href: "/lastday/lastday-pirate",
    thumbnail:
      "https://user-images.githubusercontent.com/29701385/222971702-ddc2fbe1-761b-4ec1-bf53-1c1f00d59d7c.png",
    imageList: [],
    format: {
      package: "[4] Airport Drop",
    },
  },
  "lastday-gold": {
    id: "lastday-gold",
    alt: "마지막날 골드호핑 패키지",
    title: "마지막날 골드호핑 패키지",
    subTitle: "",
    description: "-",
    href: "/lastday/lastday-gold",
    thumbnail:
      "https://user-images.githubusercontent.com/29701385/222971702-ddc2fbe1-761b-4ec1-bf53-1c1f00d59d7c.png",
    imageList: [],
    format: {
      package: "[4] Airport Drop",
    },
  },
};

export default productMap;
