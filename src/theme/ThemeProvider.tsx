"use client";

import React, { useEffect, useState } from "react";
import { ThemeContext } from "@/src/theme/ThemeContext";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const toggleTheme = () => {
    setDarkTheme((curr) => !curr);
  };

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
