import {
  AccumulativeShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  PresentationControls,
  RandomizedLight,
  SoftShadows,
  Sparkles,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useState } from "react";
import GraduationCard from "../components/GraduationCard";
import { Jelly } from "../components/3d-models/Jelly";
import { JellyFish } from "../components/3d-models/JeyllyFish";
import JellyCandy from "../components/3d-shapes/JellyCandy";
import { PinkPudding } from "../components/3d-models/PinkPudding";
import GumText from "../components/3d-shapes/GumText";
import { Experience } from "../components/Experience";
import Scene from "../components/ScrollManager";
// import Scene from "../components/ScrollManager";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);

  // Track which sections have been viewed
  const [sectionsProgress, setSectionsProgress] = useState([
    { name: "Welcome", visited: true },
    { name: "School Logo", visited: false },
    { name: "Invitation", visited: false },
    { name: "Secret Section", visited: false },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  // Jelly candies decorations
  const jellies = [
    {
      position: [-2.5, 1.5, 0.5],
      color: "#ffccff",
      size: 0.3,
      wobbleSpeed: 0.8,
      opacity: 0.55,
    },
    {
      position: [2.5, 1.5, 0.5],
      color: "#ccffcc",
      size: 0.25,
      wobbleSpeed: 5.2,
      opacity: 0.6,
    },
    {
      position: [-2.5, -1.5, 0.5],
      color: "#ffcccc",
      size: 0.35,
      wobbleSpeed: 0.6,
      opacity: 0.5,
    },
    {
      position: [2.5, -1.5, 0.5],
      color: "#ccccff",
      size: 0.3,
      wobbleSpeed: 1.0,
      opacity: 0.3,
    },
    {
      position: [0, 2, 0.5],
      color: "#ffffcc",
      size: 0.28,
      wobbleSpeed: 0.9,
      opacity: 0.5,
    },
    {
      position: [0, -2, 0.5],
      color: "#ccffff",
      size: 0.32,
      wobbleSpeed: 0.7,
      opacity: 0.4,
    },
    {
      position: [-1.5, 1, 10],
      color: "#ff99cc",
      size: 0.4,
      wobbleSpeed: 1.2,
      opacity: 0.6,
    },
    {
      position: [1.5, -1, 20],
      color: "#99ccff",
      size: 0.35,
      wobbleSpeed: 0.5,
      opacity: 0.5,
    },
    {
      position: [-3, 2, 40],
      color: "#cc99ff",
      size: 0.5,
      wobbleSpeed: 0.7,
      opacity: 0.4,
    },
    {
      position: [3, -2, 60],
      color: "#ffcc99",
      size: 0.45,
      wobbleSpeed: 1.0,
      opacity: 0.5,
    },
    {
      position: [0, 0, 80],
      color: "#99ffcc",
      size: 0.5,
      wobbleSpeed: 0.6,
      opacity: 0.55,
    },
    {
      position: [0, 0, 95],
      color: "#ff88bb",
      size: 0.6,
      wobbleSpeed: 0.8,
      opacity: 0.6,
    },
  ];

  // Update progress when section changes
  useEffect(() => {
    if (currentSection >= 0 && currentSection < sectionsProgress.length) {
      setSectionsProgress((prev) =>
        prev.map((section, idx) =>
          idx === currentSection ? { ...section, visited: true } : section
        )
      );
    }
  }, [currentSection]);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-cyan-100 via-indigo-200 to-rose-200">
      <Canvas dpr={[1, 2]}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} intensity={1} />

        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <hemisphereLight intensity={0.2} color="#eaeaea" groundColor="blue" />
        {/* <Sparkles count={1000} scale={[20, 10, 3]}
        size={2}
        speed={0.1} color={"#653147"}  /> */}
        <PerspectiveCamera makeDefault fov={30} position={[0, 0, 95]} />
        {/* <OrbitControls /> */}

        {/* <GraduationCard isOpen={isOpen} setIsOpen={setIsOpen} />
        <JellyFish position={[-3, 1.3, 0.7]} scale={0.005} />
        <GumText position={[0, 0, 15]} text="Welcome" /> */}
        {/* <ScrollManager onSectionChange={setCurrentSection} section={currentSection} /> */}
        {jellies.map((jelly, index) => (
          <JellyCandy
            key={index}
            position={jelly.position as [number, number, number]}
            color={jelly.color}
            size={jelly.size}
            wobbleSpeed={jelly.wobbleSpeed}
            opacity={jelly.opacity}
          />
        ))}
        <JellyFish position={[-3, 1.3, 0.7]} scale={0.005} />
        <Scene
          setCurrentSection={setCurrentSection}
          currentSection={currentSection}
        />
        {/* <Experience /> */}

        {/* <Jelly position={[2.5, -1.5, 0.5]} scale={7} /> */}

        {/* Soft pastel environment */}
        <Environment preset="sunset" />

        {/* Post-processing bloom for the glow */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={1} radius={1} />
        </EffectComposer>
      </Canvas>
      <div className="absolute bottom-4 left-0 right-0 text-center text-purple-800 text-lg">
        Click on the card to open it
      </div>
    </div>
  );
}
