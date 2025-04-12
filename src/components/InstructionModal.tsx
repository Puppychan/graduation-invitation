import { useEffect } from "react";
import { FaMousePointer, FaArrowsAltH, FaSearchPlus, FaSearchMinus } from "react-icons/fa";
import { MdSwipe, MdClose } from "react-icons/md";

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstructionModal({ isOpen, onClose }: InstructionModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex-center bg-black/70 backdrop-blur-sm px-0.5 md:px-4">
      <div className="relative 
      bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-800 dark:to-slate-950 
      text-gray-800 dark:text-gray-100 rounded-2xl shadow-2xl w-full max-w-lg md:max-w-xl 
      px-4 py-9 md:p-8 overflow-y-auto md:h-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors duration-200"
          aria-label="Close"
        >
          <MdClose className="display-icon" />
        </button>

        {/* Header */}
        <h2 className="text-2xl lg:text-3xl font-bold mb-1 
        bg-clip-text-transparent bg-grad-to-r-purple-pink">
          🧭 How to Navigate
        </h2>
        <h2 className="text-base lg:text-lg font-light italic mb-6 
        bg-clip-text-transparent bg-grad-to-tl-purple-pink">
          You should use laptop or desktop for the best experience!
        </h2>

        {/* Instructions */}
        <div className="space-y-6 text-base">
          <div className="instruction-row">
            <div className="instruction-icon-container bg-blue-100 dark:bg-blue-900/30">
              <FaMousePointer className="text-xl text-blue-600 dark:text-blue-400" />
            </div>
            <span className="font-medium"><strong>Click and drag</strong> to rotate the scene and view different angles.</span>
          </div>
          
          <div className="instruction-row">
            <div className="instruction-icon-container bg-green-100 dark:bg-green-900/30">
              <FaArrowsAltH className="text-xl text-green-600 dark:text-green-400" />
            </div>
            <span className="font-medium"><strong>Right click + drag</strong> (or two-finger drag) to pan around.</span>
          </div>
          
          <div className="instruction-row">
            <div className="instruction-icon-container bg-pink-100 dark:bg-pink-900/30">
              <div className="flex gap-1">
                <FaSearchPlus className="text-xl text-pink-600 dark:text-pink-400" />
                <FaSearchMinus className="text-xl text-pink-600 dark:text-pink-400" />
              </div>
            </div>
            <span className="font-medium">Click and drag to zoom in and out and explore sections.</span>
          </div>
          
          <div className="instruction-row">
            <div className="instruction-icon-container bg-purple-100 dark:bg-purple-900/30">
              <MdSwipe className="text-xl text-purple-600 dark:text-purple-400" />
            </div>
            <span className="font-medium">Use arrow keys to switch sections.</span>
          </div>
        </div>

        {/* Dismiss button */}
        <button
          onClick={onClose}
          className="mt-8 w-full px-5 py-2 lg:py-3 cursor-pointer
          bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 
          text-white 
          font-medium rounded-xl shadow-lg 
          transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}