# Arrival Massage Booking Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/booking/arrival-massage` 신규 예약 페이지 구현 — 다국어(ko/en/ja/zh-Hans/zh-Hant), SNS 연락처 필드, 개선된 TimePicker 포함.

**Architecture:** 기존 `/firstday/firstday-massage-direct` 코드 영향 없이 신규 파일만 추가. `next-i18next`로 URL 기반 다국어, `useBlockDates` 공통 훅으로 Context 의존성 제거, View를 섹션 단위(Contact/Airport/Massage)로 분리해 파일을 짧게 유지.

**Tech Stack:** Next.js 13 (pages router), next-i18next, Ant Design 5, styled-components, dayjs

---

## 파일 맵

```
신규 생성:
  next-i18next.config.js
  public/locales/ko/booking.json
  public/locales/en/booking.json
  public/locales/ja/booking.json
  public/locales/zh-Hans/booking.json
  public/locales/zh-Hant/booking.json
  src/libs/useBlockDates.ts
  src/components/TimePickerField.tsx
  src/components/FormItemSnsContact.tsx
  src/components/LayoutBooking/index.tsx
  src/views/ViewArrivalMassage/ContactSection.tsx
  src/views/ViewArrivalMassage/AirportSection.tsx
  src/views/ViewArrivalMassage/MassageSection.tsx
  src/views/ViewArrivalMassage/useArrivalMassageForm.ts
  src/views/ViewArrivalMassage/index.tsx
  src/pages/booking/arrival-massage.tsx

수정:
  next.config.js       ← i18n 블록 추가
  src/pages/_app.tsx   ← appWithTranslation 래핑
  src/types/index.tsx  ← FormArrivalMassage 타입 추가
  package.json         ← next-i18next 의존성 (npm install로 처리)
```

---

## Task 1: next-i18next 설치 & i18n 설정

**Files:**

- Create: `next-i18next.config.js`
- Modify: `next.config.js`
- Modify: `src/pages/_app.tsx`

- [ ] **Step 1: 패키지 설치**

```bash
npm install next-i18next react-i18next i18next
```

- [ ] **Step 2: next-i18next.config.js 생성**

```js
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en", "ja", "zh-Hans", "zh-Hant"],
  },
};
```

- [ ] **Step 3: next.config.js 수정**

기존 파일에서 `const { i18n } = require('./next-i18next.config');` 추가 후 nextConfig에 `i18n` 추가:

```js
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  i18n,
  images: {
    domains: ["user-images.githubusercontent.com", "github.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
```

- [ ] **Step 4: \_app.tsx 수정**

`appWithTranslation`으로 export 감싸기:

```tsx
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import theme from "../styles/theme";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import { UIProvider } from "src/contexts";
import { SWRConfig } from "swr";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>카카오트리스파 예약폼입니다.</title>
      </Head>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            fetch(url).then((response) => response.json()),
        }}
      >
        <UIProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: theme.main,
                },
              }}
            >
              <Component {...pageProps} />
            </ConfigProvider>
          </ThemeProvider>
        </UIProvider>
      </SWRConfig>
    </>
  );
}

export default appWithTranslation(App);
```

- [ ] **Step 5: 개발 서버 확인**

```bash
npm run dev
```

Expected: 서버 정상 기동, 기존 페이지 동작 이상 없음.

- [ ] **Step 6: 커밋**

```bash
git add next-i18next.config.js next.config.js src/pages/_app.tsx package.json package-lock.json
git commit -m "feat: next-i18next 설치 및 i18n 설정 추가"
```

---

## Task 2: 번역 파일 5개 생성

**Files:**

- Create: `public/locales/ko/booking.json`
- Create: `public/locales/en/booking.json`
- Create: `public/locales/ja/booking.json`
- Create: `public/locales/zh-Hans/booking.json`
- Create: `public/locales/zh-Hant/booking.json`

- [ ] **Step 1: ko/booking.json 생성**

```json
{
  "title": "대표 예약자 정보를 입력해주세요.",
  "section.airport": "공항 픽업 정보를 입력해주세요.",
  "field.name": "예약자 성함",
  "field.email": "이메일",
  "field.sns": "SNS 연락처",
  "field.snsId": "SNS 아이디 / 번호",
  "field.date": "이용 날짜",
  "field.arrivalTime": "도착 시간",
  "field.flight": "항공기 편명",
  "field.pickupLocation": "픽업 장소",
  "sns.kakao": "KakaoTalk",
  "sns.line": "LINE",
  "sns.whatsapp": "WhatsApp",
  "sns.wechat": "WeChat",
  "sns.messenger": "Messenger",
  "placeholder.name": "예약자 성함을 입력해주세요.",
  "placeholder.email": "이메일을 입력해주세요.",
  "placeholder.flight": "항공기 편명을 입력해주세요.",
  "placeholder.snsId.kakao": "카카오톡 아이디를 입력해주세요.",
  "placeholder.snsId.line": "LINE 아이디를 입력해주세요.",
  "placeholder.snsId.whatsapp": "WhatsApp 번호를 입력해주세요.",
  "placeholder.snsId.wechat": "WeChat 아이디를 입력해주세요.",
  "placeholder.snsId.messenger": "Messenger 아이디를 입력해주세요.",
  "placeholder.arrivalTime": "도착시간을 선택해주세요.",
  "error.name": "예약자 성함을 입력해주세요.",
  "error.email": "이메일을 입력해주세요.",
  "error.emailFormat": "이메일 형식으로 입력해주세요.",
  "error.sns": "SNS를 선택해주세요.",
  "error.snsId": "SNS 아이디/번호를 입력해주세요.",
  "error.date": "이용날짜를 선택해주세요.",
  "error.arrivalTime": "도착시간을 선택해주세요.",
  "error.flight": "항공기 편명을 입력해주세요.",
  "error.retry": "잠시 후 다시 시도해주세요.",
  "submit": "예약 완료",
  "alert.dateGuide.title": "예약 날짜 참고",
  "alert.dateGuide.desc": "전날도착: 20일 저녁 11:30분 도착 → 21일\n당일도착: 21일 00시 10분 → 21일"
}
```

- [ ] **Step 2: en/booking.json 생성**

```json
{
  "title": "Please enter the representative's booking information.",
  "section.airport": "Airport Pickup Information",
  "field.name": "Full Name",
  "field.email": "Email",
  "field.sns": "SNS Contact",
  "field.snsId": "ID / Number",
  "field.date": "Service Date",
  "field.arrivalTime": "Arrival Time",
  "field.flight": "Flight Number",
  "field.pickupLocation": "Pickup Location",
  "sns.kakao": "KakaoTalk",
  "sns.line": "LINE",
  "sns.whatsapp": "WhatsApp",
  "sns.wechat": "WeChat",
  "sns.messenger": "Messenger",
  "placeholder.name": "Enter your full name.",
  "placeholder.email": "Enter your email.",
  "placeholder.flight": "Enter your flight number.",
  "placeholder.snsId.kakao": "Enter your KakaoTalk ID.",
  "placeholder.snsId.line": "Enter your LINE ID.",
  "placeholder.snsId.whatsapp": "Enter your WhatsApp number.",
  "placeholder.snsId.wechat": "Enter your WeChat ID.",
  "placeholder.snsId.messenger": "Enter your Messenger ID.",
  "placeholder.arrivalTime": "Select arrival time.",
  "error.name": "Please enter your full name.",
  "error.email": "Please enter your email.",
  "error.emailFormat": "Please enter a valid email address.",
  "error.sns": "Please select an SNS.",
  "error.snsId": "Please enter your SNS ID or number.",
  "error.date": "Please select a service date.",
  "error.arrivalTime": "Please select an arrival time.",
  "error.flight": "Please enter your flight number.",
  "error.retry": "Please try again later.",
  "submit": "Complete Booking",
  "alert.dateGuide.title": "Date Reference",
  "alert.dateGuide.desc": "Arrived previous night: 11:30 PM on 20th → Book 21st\nArrived same day: 00:10 AM on 21st → Book 21st"
}
```

- [ ] **Step 3: ja/booking.json 생성**

```json
{
  "title": "代表予約者の情報を入力してください。",
  "section.airport": "空港送迎情報を入力してください。",
  "field.name": "お名前",
  "field.email": "メールアドレス",
  "field.sns": "SNS連絡先",
  "field.snsId": "ID / 番号",
  "field.date": "ご利用日",
  "field.arrivalTime": "到着時間",
  "field.flight": "フライト番号",
  "field.pickupLocation": "ピックアップ場所",
  "sns.kakao": "KakaoTalk",
  "sns.line": "LINE",
  "sns.whatsapp": "WhatsApp",
  "sns.wechat": "WeChat",
  "sns.messenger": "Messenger",
  "placeholder.name": "お名前を入力してください。",
  "placeholder.email": "メールアドレスを入力してください。",
  "placeholder.flight": "フライト番号を入力してください。",
  "placeholder.snsId.kakao": "KakaoTalk IDを入力してください。",
  "placeholder.snsId.line": "LINE IDを入力してください。",
  "placeholder.snsId.whatsapp": "WhatsAppの番号を入力してください。",
  "placeholder.snsId.wechat": "WeChat IDを入力してください。",
  "placeholder.snsId.messenger": "Messenger IDを入力してください。",
  "placeholder.arrivalTime": "到着時間を選択してください。",
  "error.name": "お名前を入力してください。",
  "error.email": "メールアドレスを入力してください。",
  "error.emailFormat": "正しいメール形式で入力してください。",
  "error.sns": "SNSを選択してください。",
  "error.snsId": "SNS IDまたは番号を入力してください。",
  "error.date": "ご利用日を選択してください。",
  "error.arrivalTime": "到着時間を選択してください。",
  "error.flight": "フライト番号を入力してください。",
  "error.retry": "しばらくしてからもう一度お試しください。",
  "submit": "予約完了",
  "alert.dateGuide.title": "予約日について",
  "alert.dateGuide.desc": "前日深夜到着: 20日23:30到着 → 21日を選択\n当日到着: 21日00:10到着 → 21日を選択"
}
```

- [ ] **Step 4: zh-Hans/booking.json 생성**

```json
{
  "title": "请输入代表预订人信息。",
  "section.airport": "请输入机场接送信息。",
  "field.name": "姓名",
  "field.email": "电子邮件",
  "field.sns": "SNS联系方式",
  "field.snsId": "账号 / 号码",
  "field.date": "使用日期",
  "field.arrivalTime": "到达时间",
  "field.flight": "航班号",
  "field.pickupLocation": "接机地点",
  "sns.kakao": "KakaoTalk",
  "sns.line": "LINE",
  "sns.whatsapp": "WhatsApp",
  "sns.wechat": "微信",
  "sns.messenger": "Messenger",
  "placeholder.name": "请输入姓名。",
  "placeholder.email": "请输入电子邮件。",
  "placeholder.flight": "请输入航班号。",
  "placeholder.snsId.kakao": "请输入KakaoTalk账号。",
  "placeholder.snsId.line": "请输入LINE账号。",
  "placeholder.snsId.whatsapp": "请输入WhatsApp号码。",
  "placeholder.snsId.wechat": "请输入微信账号。",
  "placeholder.snsId.messenger": "请输入Messenger账号。",
  "placeholder.arrivalTime": "请选择到达时间。",
  "error.name": "请输入姓名。",
  "error.email": "请输入电子邮件。",
  "error.emailFormat": "请输入有效的电子邮件格式。",
  "error.sns": "请选择SNS。",
  "error.snsId": "请输入SNS账号或号码。",
  "error.date": "请选择使用日期。",
  "error.arrivalTime": "请选择到达时间。",
  "error.flight": "请输入航班号。",
  "error.retry": "请稍后再试。",
  "submit": "完成预订",
  "alert.dateGuide.title": "预订日期说明",
  "alert.dateGuide.desc": "前一天深夜到达: 20日晚23:30到达 → 选择21日\n当天到达: 21日00:10到达 → 选择21日"
}
```

- [ ] **Step 5: zh-Hant/booking.json 생성**

```json
{
  "title": "請輸入代表訂位人資訊。",
  "section.airport": "請輸入機場接送資訊。",
  "field.name": "姓名",
  "field.email": "電子郵件",
  "field.sns": "SNS聯絡方式",
  "field.snsId": "帳號 / 號碼",
  "field.date": "使用日期",
  "field.arrivalTime": "抵達時間",
  "field.flight": "航班號碼",
  "field.pickupLocation": "接機地點",
  "sns.kakao": "KakaoTalk",
  "sns.line": "LINE",
  "sns.whatsapp": "WhatsApp",
  "sns.wechat": "微信",
  "sns.messenger": "Messenger",
  "placeholder.name": "請輸入姓名。",
  "placeholder.email": "請輸入電子郵件。",
  "placeholder.flight": "請輸入航班號碼。",
  "placeholder.snsId.kakao": "請輸入KakaoTalk帳號。",
  "placeholder.snsId.line": "請輸入LINE帳號。",
  "placeholder.snsId.whatsapp": "請輸入WhatsApp號碼。",
  "placeholder.snsId.wechat": "請輸入微信帳號。",
  "placeholder.snsId.messenger": "請輸入Messenger帳號。",
  "placeholder.arrivalTime": "請選擇抵達時間。",
  "error.name": "請輸入姓名。",
  "error.email": "請輸入電子郵件。",
  "error.emailFormat": "請輸入有效的電子郵件格式。",
  "error.sns": "請選擇SNS。",
  "error.snsId": "請輸入SNS帳號或號碼。",
  "error.date": "請選擇使用日期。",
  "error.arrivalTime": "請選擇抵達時間。",
  "error.flight": "請輸入航班號碼。",
  "error.retry": "請稍後再試。",
  "submit": "完成訂位",
  "alert.dateGuide.title": "訂位日期說明",
  "alert.dateGuide.desc": "前一天深夜抵達: 20日晚23:30抵達 → 選擇21日\n當天抵達: 21日00:10抵達 → 選擇21日"
}
```

- [ ] **Step 6: 커밋**

```bash
git add public/locales/
git commit -m "feat: 5개 언어 booking 번역 파일 추가 (ko/en/ja/zh-Hans/zh-Hant)"
```

---

## Task 3: FormArrivalMassage 타입 추가

**Files:**

- Modify: `src/types/index.tsx`

- [ ] **Step 1: FormArrivalMassage 인터페이스 추가**

`src/types/index.tsx`에서 `FormLastdayMassageDirect` 인터페이스 바로 아래에 추가:

```ts
export type SnsType = "kakao" | "line" | "whatsapp" | "wechat" | "messenger";

export interface FormArrivalMassage extends FormFirstdayMassage {
  name: string;
  email: string;
  snsType: SnsType;
  snsId: string;
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/types/index.tsx
git commit -m "feat: FormArrivalMassage 타입 추가"
```

---

## Task 4: useBlockDates 공통 훅 생성

**Files:**

- Create: `src/libs/useBlockDates.ts`

- [ ] **Step 1: useBlockDates.ts 생성**

```ts
import axios from "axios";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { BlockDates } from "src/types";

type BlockDateType = "firstday" | "daytime";

export default function useBlockDates(type: BlockDateType) {
  const [blockDates, setBlockDates] = useState<BlockDates | null>(null);

  useEffect(() => {
    axios.get("/api/GetBlockDate").then((res) => {
      setBlockDates(res.data.data);
    });
  }, []);

  const disabledDate = useCallback(
    (current: dayjs.Dayjs): boolean => {
      const dates =
        type === "firstday"
          ? blockDates?.blockDatesFirstday
          : blockDates?.blockDatesDaytime;

      if (dates?.length) {
        return (
          dayjs().add(1, "days") >= current ||
          !!dates.find((date) => date === dayjs(current).format("YYYY-MM-DD"))
        );
      }
      return dayjs().add(1, "days") >= current;
    },
    [blockDates, type],
  );

  return { disabledDate, isLoading: blockDates === null };
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/libs/useBlockDates.ts
git commit -m "feat: useBlockDates 공통 훅 추가 (Context 없이 독립 동작)"
```

---

## Task 5: TimePickerField 컴포넌트 생성

**Files:**

- Create: `src/components/TimePickerField.tsx`

- [ ] **Step 1: TimePickerField.tsx 생성**

```tsx
import { TimePicker } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";

interface Props {
  value?: dayjs.Dayjs;
  onChange?: (value: dayjs.Dayjs) => void;
  placeholder?: string;
  disabled?: boolean;
}

const TimePickerField = ({ value, onChange, placeholder, disabled }: Props) => (
  <StyledTimePicker
    value={value}
    onChange={onChange}
    format="HH:mm"
    minuteStep={10}
    placeholder={placeholder}
    size="large"
    disabled={disabled}
    showNow={false}
    inputReadOnly
  />
);

export default TimePickerField;

const StyledTimePicker = styled(TimePicker)`
  width: 100%;
  height: 60px;
  border-radius: 10px !important;
`;
```

- [ ] **Step 2: 커밋**

```bash
git add src/components/TimePickerField.tsx
git commit -m "feat: TimePickerField 컴포넌트 추가 (스크롤 휠 방식 시간 선택)"
```

---

## Task 6: FormItemSnsContact 컴포넌트 생성

**Files:**

- Create: `src/components/FormItemSnsContact.tsx`

- [ ] **Step 1: FormItemSnsContact.tsx 생성**

```tsx
import { Form, FormInstance } from "antd";
import { useTranslation } from "next-i18next";
import {
  StyledInput,
  StyledRadioButton,
  StyledRadioGroup,
} from "@styles/styledComponents";
import { SnsType } from "src/types";

const SNS_OPTIONS: SnsType[] = [
  "kakao",
  "line",
  "whatsapp",
  "wechat",
  "messenger",
];

interface Props {
  form: FormInstance;
}

const FormItemSnsContact = ({ form }: Props) => {
  const { t } = useTranslation("booking");
  const snsType = Form.useWatch("snsType", form) as SnsType | undefined;

  return (
    <>
      <Form.Item
        label={t("field.sns")}
        name="snsType"
        rules={[{ required: true, message: t("error.sns") }]}
        style={{ width: "100%" }}
      >
        <StyledRadioGroup>
          {SNS_OPTIONS.map((sns) => (
            <StyledRadioButton key={sns} value={sns}>
              {t(`sns.${sns}`)}
            </StyledRadioButton>
          ))}
        </StyledRadioGroup>
      </Form.Item>

      <Form.Item
        label={t("field.snsId")}
        name="snsId"
        rules={[{ required: true, message: t("error.snsId") }]}
        style={{ width: "100%" }}
      >
        <StyledInput
          placeholder={snsType ? t(`placeholder.snsId.${snsType}`) : ""}
          size="large"
        />
      </Form.Item>
    </>
  );
};

export default FormItemSnsContact;
```

- [ ] **Step 2: 커밋**

```bash
git add src/components/FormItemSnsContact.tsx
git commit -m "feat: FormItemSnsContact 컴포넌트 추가 (SNS 선택 + 아이디 입력)"
```

---

## Task 7: LayoutBooking 컴포넌트 생성

**Files:**

- Create: `src/components/LayoutBooking/index.tsx`

- [ ] **Step 1: LayoutBooking/index.tsx 생성**

```tsx
import Logo from "@components/Logo";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { SCREENS } from "@configs/screens";

const LOCALES = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "EN" },
  { code: "ja", label: "日本語" },
  { code: "zh-Hans", label: "简体" },
  { code: "zh-Hant", label: "繁體" },
];

const BookingHeader = () => {
  const router = useRouter();

  const switchLocale = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <Header>
      <Logo width="40" height="40" href="/" />
      <LocaleButtons>
        {LOCALES.map(({ code, label }) => (
          <LocaleButton
            key={code}
            $active={router.locale === code}
            onClick={() => switchLocale(code)}
          >
            {label}
          </LocaleButton>
        ))}
      </LocaleButtons>
    </Header>
  );
};

interface Props {
  children: React.ReactNode;
}

const LayoutBooking = ({ children }: Props) => (
  <Wrapper>
    <BookingHeader />
    <Content>{children}</Content>
  </Wrapper>
);

export default LayoutBooking;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f4f4f4;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 70px;
  background: #fff;
  border-bottom: 3px solid #eceff3;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;

  @media (max-width: ${SCREENS.sm}) {
    padding: 0 16px;
  }
`;

const LocaleButtons = styled.div`
  display: flex;
  gap: 4px;
`;

const LocaleButton = styled.button<{ $active: boolean }>`
  padding: 4px 10px;
  border: 1px solid ${({ $active }) => ($active ? "#EFB041" : "#d9d9d9")};
  border-radius: 6px;
  background: ${({ $active }) => ($active ? "#EFB041" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#555")};
  font-size: 12px;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};

  &:hover {
    border-color: #efb041;
    color: #efb041;
  }

  @media (max-width: ${SCREENS.sm}) {
    padding: 4px 6px;
    font-size: 11px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 100px;
`;
```

- [ ] **Step 2: 커밋**

```bash
git add src/components/LayoutBooking/
git commit -m "feat: LayoutBooking 컴포넌트 추가 (언어 전환 헤더 포함)"
```

---

## Task 8: ContactSection 생성

**Files:**

- Create: `src/views/ViewArrivalMassage/ContactSection.tsx`

- [ ] **Step 1: ContactSection.tsx 생성**

```tsx
import FormItemSnsContact from "@components/FormItemSnsContact";
import { StyledH1, StyledInput } from "@styles/styledComponents";
import { Form, FormInstance } from "antd";
import { useTranslation } from "next-i18next";

interface Props {
  form: FormInstance;
}

const ContactSection = ({ form }: Props) => {
  const { t } = useTranslation("booking");

  return (
    <>
      <StyledH1>{t("title")}</StyledH1>

      <Form.Item
        label={t("field.name")}
        name="name"
        rules={[{ required: true, message: t("error.name") }]}
        style={{ width: "100%" }}
      >
        <StyledInput placeholder={t("placeholder.name")} size="large" />
      </Form.Item>

      <Form.Item
        name="email"
        label={t("field.email")}
        style={{ width: "100%" }}
        rules={[
          { type: "email", message: t("error.emailFormat") },
          { required: true, message: t("error.email") },
        ]}
      >
        <StyledInput placeholder={t("placeholder.email")} size="large" />
      </Form.Item>

      <FormItemSnsContact form={form} />
    </>
  );
};

export default ContactSection;
```

- [ ] **Step 2: 커밋**

```bash
git add src/views/ViewArrivalMassage/ContactSection.tsx
git commit -m "feat: ViewArrivalMassage ContactSection 추가"
```

---

## Task 9: AirportSection 생성

**Files:**

- Create: `src/views/ViewArrivalMassage/AirportSection.tsx`

- [ ] **Step 1: AirportSection.tsx 생성**

```tsx
import FormItemPickDrop from "@components/FormItemPickDrop";
import TimePickerField from "@components/TimePickerField";
import { StyledH1, StyledInput } from "@styles/styledComponents";
import { Alert, DatePicker, Form, FormInstance } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";

interface Props {
  form: FormInstance;
  disabledDate: (current: dayjs.Dayjs) => boolean;
}

const AirportSection = ({ form, disabledDate }: Props) => {
  const { t } = useTranslation("booking");

  return (
    <>
      <StyledH1>{t("section.airport")}</StyledH1>

      <Form.Item
        label={t("field.date")}
        name="date"
        rules={[{ required: true, message: t("error.date") }]}
        style={{ width: "100%" }}
      >
        <DatePicker
          format="YYYY-MM-DD"
          placeholder={t("error.date")}
          className="ant-input"
          style={{ width: "100%", height: "60px", borderRadius: "10px" }}
          disabledDate={disabledDate}
        />
      </Form.Item>

      <Alert
        message={t("alert.dateGuide.title")}
        description={
          <span style={{ whiteSpace: "pre-line" }}>
            {t("alert.dateGuide.desc")}
          </span>
        }
        type="warning"
        showIcon
        style={{ width: "100%", marginBottom: "16px" }}
      />

      <Form.Item
        label={t("field.arrivalTime")}
        name="pickTime"
        rules={[{ required: true, message: t("error.arrivalTime") }]}
        style={{ width: "100%" }}
      >
        <TimePickerField placeholder={t("placeholder.arrivalTime")} />
      </Form.Item>

      <Form.Item
        label={t("field.flight")}
        name="pickFlight"
        rules={[{ required: true, message: t("error.flight") }]}
        style={{ width: "100%" }}
      >
        <StyledInput placeholder={t("placeholder.flight")} size="large" />
      </Form.Item>

      <Form.Item
        label={t("field.pickupLocation")}
        name="pickLocation"
        initialValue="막탄공항"
        style={{ width: "100%" }}
      >
        <StyledInput disabled size="large" />
      </Form.Item>

      <FormItemPickDrop
        form={form}
        keyLocation="dropLocation"
        keyTime="dropTime"
        titleLocation="드랍장소"
        titleTime="드랍시간"
        options={{
          mactan: {
            title: "막탄지역",
            disabledLoc: false,
            disabledTime: true,
            fixedValueLoc: "",
            fixedValueTime: "11:00 am",
            helpLoc: (
              <Alert
                message="드랍 불가"
                description="솔레아, 공항근처, 세부시티"
                type="warning"
                showIcon
                style={{ width: "100%", margin: "20px 0" }}
              />
            ),
          },
          cebu: {
            title: "세부시티",
            disabledLoc: true,
            disabledTime: true,
            fixedValueLoc: "개별 이동하겠습니다.",
            fixedValueTime: "",
            placeholderLoc: "",
            placeholderTime: "개별 이동하겠습니다.",
          },
          port: {
            title: "항구드랍",
            disabledLoc: true,
            disabledTime: false,
            fixedValueLoc: "항구드랍 (1인 200페소 추가)",
            fixedValueTime: "",
            helpTime: (
              <Alert
                message="항구 드랍 시간을 적어주세요."
                description={
                  <div>
                    티켓시간 보다 2시간 전에 출발입니다.
                    <br />
                    예) 8시 20분 티켓 → 6시 20분
                  </div>
                }
                type="warning"
                showIcon
                style={{ width: "100%", margin: "20px 0" }}
              />
            ),
            couponKey: "dropPort",
          },
          noNeed: {
            title: "필요 없습니다.",
            disabledLoc: false,
            disabledTime: true,
            fixedValueLoc: "",
            fixedValueTime: "",
            placeholderLoc: "개별이동 이유를 적어주세요.",
            placeholderTime: "필요 없습니다.",
            helpLoc: (
              <Alert
                message="개별 이동 사유를 적어주세요."
                description="투어픽업은 투어종류를 적어주세요."
                type="warning"
                showIcon
                style={{ width: "100%", margin: "20px 0" }}
              />
            ),
          },
        }}
      />
    </>
  );
};

export default AirportSection;
```

- [ ] **Step 2: 커밋**

```bash
git add src/views/ViewArrivalMassage/AirportSection.tsx
git commit -m "feat: ViewArrivalMassage AirportSection 추가"
```

---

## Task 10: MassageSection 생성

**Files:**

- Create: `src/views/ViewArrivalMassage/MassageSection.tsx`

- [ ] **Step 1: MassageSection.tsx 생성**

```tsx
import FormItemMassage from "@components/FormItemMassage";
import FormItemMemo from "@components/FormItemMemo";
import massageFirstday from "@configs/massage-firstday";
import { FormInstance } from "antd";
import { useTranslation } from "next-i18next";

interface Props {
  form: FormInstance;
}

const MassageSection = ({ form }: Props) => {
  return (
    <>
      <FormItemMassage form={form} selectOption={massageFirstday} />
      <FormItemMemo />
    </>
  );
};

export default MassageSection;
```

- [ ] **Step 2: 커밋**

```bash
git add src/views/ViewArrivalMassage/MassageSection.tsx
git commit -m "feat: ViewArrivalMassage MassageSection 추가"
```

---

## Task 11: useArrivalMassageForm 훅 생성

**Files:**

- Create: `src/views/ViewArrivalMassage/useArrivalMassageForm.ts`

- [ ] **Step 1: useArrivalMassageForm.ts 생성**

`pickTime`은 TimePicker에서 dayjs 객체로 오므로 API 전송 전에 문자열로 포맷 (`"HH:mm A"` → `changeTimeFormat`이 처리 가능한 형식).
`snsType` + `snsId` → `phone` 필드로 합쳐서 전송.

```ts
import { message, Form } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useBlockDates from "src/libs/useBlockDates";
import useMutation from "src/libs/useMutation";
import { EmailResponse } from "src/pages/api/nodemailer";
import { FormArrivalMassage } from "src/types";

export default function useArrivalMassageForm() {
  const router = useRouter();
  const { t } = useTranslation("booking");
  const [form] = Form.useForm<FormArrivalMassage>();
  const { disabledDate, isLoading } = useBlockDates("firstday");
  const [createBooking, { loading, data, error }] = useMutation<EmailResponse>(
    "/api/CreateFirstdayMassage",
  );

  const onFinish = (values: FormArrivalMassage) => {
    const phone = `${values.snsType}: ${values.snsId}`;
    const pickTime = dayjs(values.pickTime).format("HH:mm A");
    createBooking({ ...values, phone, pickTime });
  };

  const onFinishFailed = (errorInfo: any) => {
    const msg = errorInfo?.errorFields?.[0]?.errors?.[0] ?? t("error.retry");
    message.error(msg);
  };

  useEffect(() => {
    if (data?.ok) router.push("/cart/success");
  }, [data, router]);

  useEffect(() => {
    if (error) message.error(t("error.retry"));
  }, [error, t]);

  return {
    form,
    onFinish,
    onFinishFailed,
    loading: loading || isLoading,
    disabledDate,
  };
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/views/ViewArrivalMassage/useArrivalMassageForm.ts
git commit -m "feat: useArrivalMassageForm 훅 추가 (SNS→phone 변환, pickTime 포맷)"
```

---

## Task 12: ViewArrivalMassage index + 페이지 파일

**Files:**

- Create: `src/views/ViewArrivalMassage/index.tsx`
- Create: `src/pages/booking/arrival-massage.tsx`

- [ ] **Step 1: ViewArrivalMassage/index.tsx 생성**

```tsx
import { Form, Spin } from "antd";
import { useTranslation } from "next-i18next";
import { SpinWrapper } from "@components/ModalSpin/style";
import { StyledButton, StyledForm } from "@styles/styledComponents";
import AirportSection from "./AirportSection";
import ContactSection from "./ContactSection";
import MassageSection from "./MassageSection";
import useArrivalMassageForm from "./useArrivalMassageForm";
import styled from "styled-components";

const ViewArrivalMassage = () => {
  const { t } = useTranslation("booking");
  const { form, onFinish, onFinishFailed, loading, disabledDate } =
    useArrivalMassageForm();

  if (loading && !form.isFieldsTouched()) {
    return (
      <LoadingWrapper>
        <Spin size="large" />
      </LoadingWrapper>
    );
  }

  return (
    <StyledForm
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      requiredMark={false}
      scrollToFirstError
    >
      <Form.Item name="package" hidden initialValue="[1] Airport Pick" />
      <Form.List name="couponList" initialValue={[]}>
        {() => null}
      </Form.List>

      <ContactSection form={form} />
      <AirportSection form={form} disabledDate={disabledDate} />
      <MassageSection form={form} />

      {loading ? (
        <SpinWrapper>
          <Spin />
        </SpinWrapper>
      ) : (
        <StyledButton type="primary" htmlType="submit">
          {t("submit")}
        </StyledButton>
      )}
    </StyledForm>
  );
};

export default ViewArrivalMassage;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
```

- [ ] **Step 2: src/pages/booking/arrival-massage.tsx 생성**

```tsx
import LayoutBooking from "@components/LayoutBooking";
import ViewArrivalMassage from "@views/ViewArrivalMassage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ArrivalMassagePage = () => (
  <LayoutBooking>
    <ViewArrivalMassage />
  </LayoutBooking>
);

export default ArrivalMassagePage;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["booking"])),
  },
});
```

- [ ] **Step 3: 커밋**

```bash
git add src/views/ViewArrivalMassage/index.tsx src/pages/booking/arrival-massage.tsx
git commit -m "feat: ViewArrivalMassage 및 /booking/arrival-massage 페이지 추가"
```

---

## Task 13: 수동 테스트

- [ ] **Step 1: 개발 서버 실행**

```bash
npm run dev
```

- [ ] **Step 2: 한국어(기본) 접속 확인**

브라우저에서 `http://localhost:3000/booking/arrival-massage` 접속.
확인 항목:

- 헤더에 언어 버튼 5개 표시 (한국어 강조)
- 성함, 이메일, SNS 선택, 날짜, 도착시간, 항공편, 픽업/드랍, 마사지 필드 렌더링

- [ ] **Step 3: 언어 전환 확인**

헤더의 EN 클릭 → URL이 `http://localhost:3000/en/booking/arrival-massage`로 변경, 모든 텍스트 영어로 표시.
日本語 클릭 → URL `ja/...`, 텍스트 일본어.
简体 / 繁體 클릭 → 각각 한자 간체/번체 표시.

- [ ] **Step 4: TimePicker UX 확인**

도착 시간 필드 클릭 → 드롭다운 대신 스크롤 휠 피커 표시. 10분 단위 선택 가능.

- [ ] **Step 5: SNS 연락처 동작 확인**

SNS 선택 → 아이디 입력창 placeholder가 선택한 SNS에 맞게 변경됨.

- [ ] **Step 6: 기존 페이지 이상 없음 확인**

`http://localhost:3000/firstday/firstday-massage-direct` 접속, 기존대로 동작하는지 확인.

- [ ] **Step 7: 빌드 확인**

```bash
npm run build
```

Expected: 에러 없이 빌드 성공.
