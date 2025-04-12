interface NavigationButtonsProps {
  onNext: () => void;
  onPrev: () => void;
  currentSection: number;
  totalSections: number;
}

// Navigation buttons component
export function NavigationButtons({
  onNext,
  onPrev,
  currentSection,
  totalSections,
}: NavigationButtonsProps) {
  return (
    <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-8 z-10">
      <button
        onClick={onPrev}
        disabled={currentSection === 0}
        className="px-4 py-2 bg-[#a688aa] hover:bg-[#937294] dark:bg-[#ffb6c1] dark:hover:bg-[#f794ac]
        text-fuchsia-100 dark:text-slate-700 cursor-pointer 
        rounded-full shadow drop-shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Previous section"
      >
        ← Previous
      </button>
      <div className="text-slate-700 drop-shadow-2xl dark:text-pink-200 font-semibold text-lg font-serif">
        {currentSection + 1} / {totalSections}
      </div>
      <button
        onClick={onNext}
        disabled={currentSection === totalSections - 1}
        className="px-4 py-2 bg-[#a688aa] hover:bg-[#937294] dark:bg-[#ffb6c1] dark:hover:bg-[#f794ac]
        text-fuchsia-100 dark:text-slate-700 cursor-pointer 
        rounded-full shadow drop-shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all "
        aria-label="Next section"
      >
        Next →
      </button>
    </div>
  );
}
