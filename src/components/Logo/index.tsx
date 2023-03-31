import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  width: number | `${number}`;
  height: number | `${number}`;
  margin?: string | `${string}`;
  href?: string;
}

const Logo = ({ width, height, margin, href = "" }: LogoProps) => {
  return (
    <Link href={href}>
      <Image
        width={width}
        height={height}
        style={{ margin }}
        src="/logo.png"
        alt="main-logo"
      />
    </Link>
  );
};

export default Logo;
