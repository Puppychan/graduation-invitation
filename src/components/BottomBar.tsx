import {
  ImGithub,
  ImLinkedin,
  ImArrowLeft2,
  ImArrowRight2,
  ImCodepen,
} from "react-icons/im";
import { CgMail } from "react-icons/cg";


interface BottomBarProps {
  onNext: () => void;
  onPrev: () => void;
  currentSection: number;
  totalSections: number;
}

function NavigateButtons({
  onNext,
  onPrev,
  currentSection,
  totalSections,
}: BottomBarProps) {
  return (
    <div className="flex justify-center items-center gap-2 lg:gap-8">
      <button
        onClick={onPrev}
        disabled={currentSection === 0}
        className="nav-button"
        aria-label="Previous section"
      >
        <ImArrowLeft2 />
      </button>
      <div className="hidden sm:block display-text-color drop-shadow-2xl font-semibold text-base lg:text-lg font-serif">
        {currentSection + 1} / {totalSections}
      </div>
      <button
        onClick={onNext}
        disabled={currentSection === totalSections - 1}
        className="nav-button"
        aria-label="Next section"
      >
        <ImArrowRight2 />
      </button>
    </div>
  );
}

// Navigation buttons component
export function BottomBar({
  onNext,
  onPrev,
  currentSection,
  totalSections,
}: BottomBarProps) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 bar-container
    flex justify-between items-center z-10
    bg-pink-100/50 dark:bg-zinc-900/40 lg:bg-transparent lg:dark:bg-transparent"
    >
      <div className="display-text-color flex gap-2 lg:gap-4">
        <a
          href="https://github.com/Puppychan/graduation-invitation"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImCodepen className="display-icon" />
        </a>
        <a href="mailto:nhungmaitran1412@gmail.com">
          <CgMail className="display-icon" />
        </a>
      </div>
      <NavigateButtons
        onNext={onNext}
        onPrev={onPrev}
        currentSection={currentSection}
        totalSections={totalSections}
      />
      <div className="display-text-color flex gap-2 lg:gap-4">
        <a
          href="https://github.com/Puppychan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImGithub className="display-icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/nhungtr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImLinkedin className="display-icon" />
        </a>
      </div>
    </div>
  );
}
