import { twMerge } from "tailwind-merge";
import { useTheme } from "../context/theme-context";
import { BsFillMoonStarsFill, BsCloudSunFill } from "react-icons/bs";

export default function AnimatedThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme.name === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={twMerge(
        "absolute top-4 right-4 z-10",
        "w-[80px] h-[42px] rounded-full drop-shadow shadow",
        "cursor-pointer p-0 border-0 outline-none transition-colors duration-300 ease-in-out",
        "focus:outline-none hover:outline-none"
      )}
      style={{
        backgroundColor: theme.secondary,
      }}
    >
      <div
        className={twMerge(
          "absolute top-[3px] w-[36px] h-[36px] rounded-full text-white",
          "flex items-center justify-center transition-all duration-300 ease-in-out"
        )}
        style={{
          left: isDark ? "42px" : "3px",
          backgroundColor: theme.primary,
        }}
      >
        {isDark ? (
          <BsFillMoonStarsFill size={18} />
        ) : (
          <BsCloudSunFill size={18} />
        )}
      </div>
    </button>
  );
}
