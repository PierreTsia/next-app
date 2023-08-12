import { createContext } from "react";
export interface ThemeContextInterface {
  darkTheme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextInterface>({
  darkTheme: false,
  toggleTheme: () => {},
});
