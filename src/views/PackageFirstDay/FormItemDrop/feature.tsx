export const DropItems = [
  {
    key: "a",
    title: "옵션1",
    description: (
      <p>
        막탄지역 입니다.
        <br />
        (11시 출발)
      </p>
    ),
    dropPlace: null,
    disabled: false,
    isPort: false,
  },
  {
    key: "b",
    title: "옵션2",
    description: (
      <p>
        세부시티 또는
        <br />
        코르도바 지역(솔레아리조트)
        <br />
        입니다.
      </p>
    ),
    dropPlace: "x",
    disabled: true,
    isPort: false,
  },
  {
    key: "c",
    title: "옵션3",
    description: (
      <p>
        항구드랍 입니다.
        <br />
        (오션젯 탑승)
      </p>
    ),
    dropPlace: "Port(항구)",
    disabled: true,
    isPort: false,
  },
  {
    key: "d",
    title: "옵션4",
    description: (
      <p>
        투어출발 입니다.
        <br />
        (오션젯 탑승)
      </p>
    ),
    dropPlace: "Tour Pickup(투어픽업)",
    disabled: true,
    isPort: true,
  },
];
