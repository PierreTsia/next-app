"use client";

import { useContext } from "react";
import { ThemeContext } from "@/src/theme/ThemeContext";

export const BackgroundImage = () => {
  const { darkTheme } = useContext(ThemeContext);
  const bg = darkTheme ? "/bg-desktop-dark.jpg" : "/bg-desktop-light.jpg";

  return (
    <div
      className="w-full h-[300px] z-1 absolute top-0 left-0 bg-yellow-200 bg-center bg-cover"
      style={{
        backgroundImage: `url('${bg}')`,
      }}
    />
  );
};
