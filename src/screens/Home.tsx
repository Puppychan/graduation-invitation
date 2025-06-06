import {
  Environment,
  PerspectiveCamera,
  Preload,
  Stars,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Scene from "../components/3d-scenes/ScrollManager";
import { BottomBar } from "../components/BottomBar";
import { Vector3 } from "three";
import { useTheme } from "../context/theme-context";
import { twMerge } from "tailwind-merge";
import CanvasLoader from "../components/3d-scenes/CanvasLoader";
import "../utils/preload-assets";
import TopBar from "../components/TopBar";


export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isClickedNavButtons, setIsClickedNavButtons] = useState<-1 | 0 | 1>(0); // -1: Prev, 0: None, 1: Next
  const { theme } = useTheme();

  const { sectionPositions, sectionOffsets } = useMemo(() => {
    // Define section positions
    const sectionPositions = [
      new Vector3(0, 0, 90),
      new Vector3(60, 0, 60),
      new Vector3(120, 0, 30),
      new Vector3(160, 0, 0),
    ];

    // Camera offsets for better viewing angles
    const sectionOffsets = [
      new Vector3(0, 20, 40), // Section 0 (closest to viewer)
      new Vector3(0, -5, 30), // Section 1
      new Vector3(7, -13, 35), // Section 2
      new Vector3(-15, 0, 20), // Section 3 (farthest away)
    ];
    return { sectionPositions, sectionOffsets };
  }, []);

  const onClickPrevSection = useCallback(() => {
    setIsClickedNavButtons(-1);
  }, []);
  const onClickNextSection = useCallback(() => {
    setIsClickedNavButtons(1);
  }, []);

  // Track which sections have been viewed
  const [sectionsProgress, setSectionsProgress] = useState([
    { name: "Welcome", visited: true },
    { name: "Subtitle", visited: false },
    { name: "Invitation", visited: false },
    { name: "Secret Section", visited: false },
  ]);

  // Update progress when section changes
  useEffect(() => {
    if (currentSection >= 0 && currentSection < sectionsProgress.length) {
      setSectionsProgress((prev) =>
        prev.map((section, idx) =>
          idx === currentSection ? { ...section, visited: true } : section
        )
      );
    }
  }, [currentSection, sectionsProgress.length]);

  return (
    <div className={twMerge(`w-screen relative`, theme.background, "h-[80vh] lg:h-screen")}>
      {/* <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-indigo-900 to-blue-950"> */}
      <Canvas dpr={[1, 2]}>
        <Suspense fallback={<CanvasLoader />}>
          <Scene
            setCurrentSection={setCurrentSection}
            currentSection={currentSection}
            isClickedNavButton={isClickedNavButtons}
            setIsClickedNavButton={setIsClickedNavButtons}
            sectionPositions={sectionPositions}
            sectionOffsets={sectionOffsets}
          />
          <Preload all />
        </Suspense>
        <Suspense fallback={null}>
          {theme.name === "dark" && (
            <Stars
              radius={300} // Radius of the inner sphere (default=100)
              depth={60} // Depth of area where stars should fit (default=50)
              count={5000} // Amount of stars (default=5000)
              factor={10} // Scale factor of the stars (default=4)
              saturation={0} // Saturation 0-1 (default=0)
              fade // Faded dots
              speed={1} // Rotation speed
            />
          )}
          <Environment preset="sunset" />
        </Suspense>
        <PerspectiveCamera
          makeDefault
          fov={30}
          position={[0, 0, sectionPositions[0].z + sectionOffsets[0].z]}
        />

        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} intensity={1} />

        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <hemisphereLight intensity={0.2} color="#eaeaea" groundColor="blue" />

        {/* Post-processing bloom for the glow */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={1} radius={1} />
        </EffectComposer>
      </Canvas>
      <BottomBar
        onPrev={onClickPrevSection}
        onNext={onClickNextSection}
        currentSection={currentSection}
        totalSections={sectionsProgress.length}
      />
      <TopBar />
    </div>
  );
}
