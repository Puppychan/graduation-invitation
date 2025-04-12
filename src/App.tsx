import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { ThemeContext } from "./context/theme-context";
import { darkTheme, lightTheme } from "./utils/color";
import Home from "./pages/Home";
import IntroTypeScreen from "./sections/IntroTypeScreen";
import StarryBackground from "./components/StarryBackground";

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
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {showWelcome ? (
        <>
          <StarryBackground />
          <IntroTypeScreen onComplete={handleWelcomeComplete} />
        </>
      ) : (
        <Home />
      )}
    </ThemeContext.Provider>
  );
}

export default App;
