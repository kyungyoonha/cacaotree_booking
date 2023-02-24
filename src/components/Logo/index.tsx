import React from "react";
import Image from "next/image";

interface LogoProps {
  width: number | `${number}`;
  height: number | `${number}`;
  margin?: string | `${string}`;
}

const Logo = ({ width, height, margin }: LogoProps) => {
  return (
    <Image
      width={width}
      height={height}
      style={{ margin }}
      src="/logo.png"
      alt="main-logo"
    />
  );
};

export default Logo;
