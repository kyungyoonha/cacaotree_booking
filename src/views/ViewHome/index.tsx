import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { QuestionSelectWithSvg } from "@components/QuestionSelect";
import { ImageWrapper } from "@components/QuestionSelect/styled";
import { SVGFlightArrival, SVGFlightDeparture, SVGVan } from "@components/Svg";
import LayoutQuestion from "@components/LayoutQuestion";
import styled, { keyframes } from "styled-components";

const ViewHome = () => {
  const { t } = useTranslation("booking");
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <PageLoadingWrapper>
        <RingBox>
          <SpinRing $size={72} $delay="0s" />
          <SpinRing $size={52} $delay="0.35s" />
          <CalIcon>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                stroke="#EFB041"
                strokeWidth="2"
              />
              <path d="M3 9h18" stroke="#EFB041" strokeWidth="2" />
              <path
                d="M8 2v4M16 2v4"
                stroke="#EFB041"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M7 13l3 3 5-5"
                stroke="#EFB041"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </CalIcon>
        </RingBox>
        {/* <PageLoadingText>{t("loading.desc")}</PageLoadingText> */}
        <DotsRow>
          <Dot $delay="0s" />
          <Dot $delay="0.2s" />
          <Dot $delay="0.4s" />
        </DotsRow>
      </PageLoadingWrapper>
    );
  }

  if (router.locale !== "ko") {
    const daytimeImages = t("home.daytime.images").split(",").filter(Boolean);
    return (
      <DirectBookWrapper>
        <IntroTitle>{t("home.intro.title")}</IntroTitle>
        <IntroDesc>{t("home.intro.desc")}</IntroDesc>
        <ButtonRow>
          <Link href="/booking/daytime-massage" legacyBehavior>
            <DirectBookButton>{t("home.button")}</DirectBookButton>
          </Link>
        </ButtonRow>
        {daytimeImages.map((src, idx) => (
          <ImageWrapper
            key={idx}
            style={{ position: "relative", width: "100%" }}
          >
            <Image
              className="custom-img"
              alt=""
              src={src}
              layout="fill"
              objectFit="contain"
              sizes="100vw"
            />
          </ImageWrapper>
        ))}
      </DirectBookWrapper>
    );
  }

  const itemList = [
    {
      id: "arrival",
      svg: <SVGFlightArrival />,
      alt: "arrival",
      title: t("home.arrival.title"),
      description: t("home.arrival.description"),
      href: "/booking/arrival-massage",
      imageList: t("home.arrival.images").split(",").filter(Boolean),
    },
    {
      id: "daytime",
      svg: <SVGVan />,
      alt: "daytime",
      title: t("home.daytime.title"),
      description: t("home.daytime.description"),
      href: "/booking/daytime-massage",
      imageList: t("home.daytime.images").split(",").filter(Boolean),
    },
    {
      id: "departure",
      svg: <SVGFlightDeparture />,
      alt: "departure",
      title: t("home.departure.title"),
      description: t("home.departure.description"),
      href: "/booking/departure-massage",
      imageList: t("home.departure.images").split(",").filter(Boolean),
    },
  ];

  return (
    <LayoutQuestion>
      <QuestionSelectWithSvg
        key={router.locale}
        buttonName={t("home.button")}
        itemList={itemList}
        title={t("home.title")}
      />
    </LayoutQuestion>
  );
};

export default ViewHome;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-7px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.12); }
`;

const PageLoadingWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background: #fff;
  z-index: 100;
`;

const RingBox = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinRing = styled.div<{ $size: number; $delay: string }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #efb041;
  animation: ${spin} 1.2s linear infinite;
  animation-delay: ${({ $delay }) => $delay};
  opacity: ${({ $size }) => ($size >= 72 ? 1 : 0.5)};
`;

const CalIcon = styled.div`
  position: relative;
  z-index: 1;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const PageLoadingText = styled.p`
  font-size: 15px;
  color: #888;
  margin: 0;
`;

const DotsRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.span<{ $delay: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #efb041;
  display: inline-block;
  animation: ${bounce} 1s ease infinite;
  animation-delay: ${({ $delay }) => $delay};
`;

const DirectBookWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 60px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 20px 60px;
    min-width: 354px;
  }
`;

const IntroTitle = styled.h1`
  font-family: "Noto Serif KR", serif;
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0 0 12px;
  text-align: center;
`;

const IntroDesc = styled.p`
  font-size: 15px;
  color: #777;
  text-align: center;
  margin: 0;
  line-height: 1.6;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0 24px;
`;

const DirectBookButton = styled.a`
  display: inline-block;
  padding: 16px 48px;
  background: #efb041;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border-radius: 14px;
  cursor: pointer;
  text-decoration: none;
  letter-spacing: 0.02em;
  box-shadow: 0 4px 16px rgba(239, 176, 65, 0.3);
  transition:
    background 0.15s,
    transform 0.1s;

  &:hover {
    background: #d99e32;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
