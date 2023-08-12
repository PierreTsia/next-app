"use client";
import { useContext } from "react";
import { ThemeContext } from "@/src/theme/ThemeContext";
import Image from "next/image";

export const SwitchThemeButton = () => {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  return (
    <button className="z-10" onClick={() => toggleTheme()}>
      <Image
        className={"cursor-pointer"}
        src={darkTheme ? "/icon-sun.svg" : "/icon-moon.svg"}
        alt={darkTheme ? "icon sun" : "icon moon"}
        width={18}
        height={18}
      />
    </button>
  );
};
