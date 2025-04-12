import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useTheme } from "../context/theme-context";

export default function IntroTypeScreen({ onComplete }) {
    const { theme } = useTheme();
    const isDark = document.documentElement.classList.contains("dark");
    const [displayText, setDisplayText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [displaySecondary, setDisplaySecondary] = useState('');
    const [showFinalMessage, setShowFinalMessage] = useState(false);
  
    const getNameFromPath = () => {
      const pathSegments = window.location.pathname.split('/');
      const lastSegment = pathSegments[pathSegments.length - 1];
      return lastSegment && lastSegment !== '' ? lastSegment : 'friend';
    };
  
    const name = getNameFromPath();
    const fullGreeting = `Hello ${name}`;
    const secondaryText = "You're invited to my coming graduation";
    const tertiaryText = "Please enjoy";
  
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
        }, 50);
        return () => clearInterval(typingInterval);
      }
    }, [isTypingComplete, secondaryText, onComplete]);
  
    return (
      <div className={twMerge("w-screen h-screen flex items-center justify-center ", theme.background)}>
        <div className="font-serif w-full h-full flex flex-col justify-center items-center text-center px-6 sm:px-12 py-10 ">
          <div className="mb-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-purple-900 dark:text-rose-300 tracking-wide">
              {displayText}
              {displayText.length === fullGreeting.length && !displaySecondary.length && (
                <span className="animate-pulse text-purple-700 dark:text-rose-400">|</span>
              )}
            </h1>
          </div>
  
          {isTypingComplete && (
            <div className="mb-6">
              <p className="text-2xl sm:text-3xl text-violet-800 dark:text-violet-200 font-medium">
                {displaySecondary}
                {displaySecondary.length === secondaryText.length ? "" : (
                  <span className="animate-pulse text-violet-900 dark:text-violet-400">|</span>
                )}
              </p>
            </div>
          )}
  
          {showFinalMessage && (
            <div className="mt-4 animate-fade-in transition-opacity duration-1000">
              <p className="italic text-2xl text-purple-800  dark:text-rose-200 font-semibold">{tertiaryText}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  