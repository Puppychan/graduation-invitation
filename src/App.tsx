import { useMemo, useState } from "react";
import "./App.css";
import { ThemeContext } from "./context/theme-context";
import { darkTheme, lightTheme } from "./utils/color";
import Home from "./pages/Home";

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Home />
    </ThemeContext.Provider>
  );
}

export default App;
