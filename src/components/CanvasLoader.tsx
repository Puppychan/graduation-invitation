import { Html, useProgress } from "@react-three/drei";

export default function CanvasLoader() {
  const { progress, active } = useProgress();

  if (!active || progress === 100) return null;

  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#F1F1F1",
        fontSize: 20,
        fontWeight: 800,
      }}
    >
      <div className="relative w-[200px] h-[30px] overflow-hidden">
        {/* Background text (gray) */}
        <span className="absolute inset-0 text-neutral-500 select-none">
          Loading...
        </span>

        {/* Foreground clipped text with fill */}
        <span
          className="absolute inset-0 text-[#f1f1f1] whitespace-nowrap overflow-hidden"
          style={{
            width: `${progress}%`,
            clipPath: `inset(0 ${100 - progress}% 0 0)`,
            transition: "clip-path 0.2s ease-out, width 0.2s ease-out",
          }}
        >
          Loading...
        </span>
      </div>

      {/* Numeric progress below */}
      <p className="mt-2 text-sm text-[#aaa]">{progress.toFixed(2)}%</p>
    </Html>
  );
}
