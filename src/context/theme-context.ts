import { createContext, useContext } from "react";
import { lightTheme } from "../utils/color";

export const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
