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
        className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-gray-700"
        aria-label="Previous section"
      >
        ← Previous
      </button>
      <div className="text-white">
        {currentSection + 1} / {totalSections}
      </div>
      <button
        onClick={onNext}
        disabled={currentSection === totalSections - 1}
        className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-gray-700"
        aria-label="Next section"
      >
        Next →
      </button>
    </div>
  );
}
