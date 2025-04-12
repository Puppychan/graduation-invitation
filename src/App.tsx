import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { ThemeContext } from "./context/theme-context";
import { darkTheme, lightTheme } from "./utils/color";
import Home from "./pages/Home";

const THEME_KEY = "preferred-theme";

function App() {
  const [isDark, setIsDark] = useState(false);
  // Load from localStorage on mount
  useEffect(() => {
    const html = document.documentElement;
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "dark") {
      setIsDark(true);
      html.classList.add("dark");
    } else if (stored === "light") {
      setIsDark(false);
      html.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
      html.classList.toggle("dark", prefersDark);
      localStorage.setItem(THEME_KEY, prefersDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? false : true;
    setIsDark(newTheme);
    const html = document.documentElement;
    html.classList.toggle("dark", newTheme);
    localStorage.setItem(THEME_KEY, newTheme ? "dark" : "light");
  };

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Home />
    </ThemeContext.Provider>
  );
}

export default App;
