import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useTheme } from "../context/theme-context";
import { generateGraduationMessage } from "../utils/path-handle";

interface Props {
  onComplete: () => void;
}

export default function IntroTypeScreen({ onComplete }: Props) {
  const { theme } = useTheme();
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [displaySecondary, setDisplaySecondary] = useState("");
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const {
    name: fullGreeting,
    message: secondaryText,
    finalMessage: tertiaryText,
  } = useMemo(() => {
    return {
      ...generateGraduationMessage(),
      finalMessage: "Welcome to my graduation invitation (◕‿◕) ",
    };
  }, []);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayText(fullGreeting.substring(0, index + 1));
      index++;
      if (index >= fullGreeting.length) {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [fullGreeting]);

  useEffect(() => {
    if (isTypingComplete) {
      let index = 0;
      const typingInterval = setInterval(() => {
        setDisplaySecondary(secondaryText.substring(0, index + 1));
        index++;
        if (index >= secondaryText.length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            setShowFinalMessage(true);
          }, 500);
          setTimeout(() => {
            onComplete();
          }, 2500);
        }
      }, 25);
      return () => clearInterval(typingInterval);
    }
  }, [isTypingComplete, secondaryText, onComplete]);

  return (
    <div
      className={twMerge(
        "w-screen h-full flex items-center justify-center",
        theme.background
      )}
    >
      <div className="font-serif w-full h-full flex flex-col justify-center items-center text-center px-6 sm:px-12 py-10 ">
        <div className="mb-4">
          <h1 className="text-3xl sm:text-4xl text-left font-bold text-purple-900 dark:text-rose-300 tracking-wide">
            {displayText}
            {displayText.length === fullGreeting.length &&
              !displaySecondary.length && (
                <span className="animate-pulse text-purple-700 dark:text-rose-400">
                  |
                </span>
              )}
          </h1>
        </div>

        {isTypingComplete && (
          <div className="mb-6">
            <p className="text-xl/9 sm:text-2xl/9 text-center lg:text-left text-violet-800 dark:text-violet-200 font-medium">
              {displaySecondary}
              {displaySecondary.length === secondaryText.length ? (
                ""
              ) : (
                <span className="animate-pulse text-violet-900 dark:text-violet-400">
                  |
                </span>
              )}
            </p>
          </div>
        )}

        {showFinalMessage && (
          <div className="animate-fade-in">
            <p className="italic text-lg lg:text-2xl text-purple-800 dark:text-rose-200 font-semibold">
              {tertiaryText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
