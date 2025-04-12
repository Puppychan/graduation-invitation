import { IoMdInformationCircleOutline } from "react-icons/io";
import AnimatedThemeToggle from "./AnimatedThemeToggle";
import { useState } from "react";
import InstructionModal from "./InstructionModal";

export default function TopBar() {
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <div
      className="bar-container absolute top-0 left-0
      flex-between-center"
    >
      <button onClick={() => setShowInstructions(true)} className="hover:opacity-70">
        <IoMdInformationCircleOutline className="display-text-color display-icon" />
      </button>

      <AnimatedThemeToggle />
      <InstructionModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </div>
  );
}
