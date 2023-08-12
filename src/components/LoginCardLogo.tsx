"use client";
import { useContext } from "react";
import { ThemeContext } from "@/src/theme/ThemeContext";
import Image from "next/image";

export const LoginCardLogo = () => {
  const { darkTheme } = useContext(ThemeContext);
  const logo = darkTheme ? "/vercel-white.svg" : "/vercel.svg";
  return (
    <Image
      className={"mx-auto text-red-500"}
      src={logo}
      alt={"vercel logo"}
      width={150}
      height={150}
    />
  );
};
