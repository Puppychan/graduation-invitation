import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { ThemeContext } from "./context/theme-context";
import { darkTheme, lightTheme } from "./utils/color";
import Home from "./screens/Home";
import IntroTypeScreen from "./screens/IntroTypeScreen";
import useViewportHeight from "./utils/useViewportHeight";
import StarryBackground from "./components/StarryBackground";

const THEME_KEY = "preferred-theme";

function App() {
  useViewportHeight();
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
        <div className="h-screen">
          <StarryBackground />
          <IntroTypeScreen onComplete={handleWelcomeComplete} />
        </div>
      ) : (
        <Home />
      )}
    </ThemeContext.Provider>
  );
}

export default App;
