import { Environment, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useState } from "react";
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
    {/* <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-indigo-900 to-blue-950"> */}
      <Canvas dpr={[1, 2]}>
        <Stars 
          radius={300} // Radius of the inner sphere (default=100)
          depth={60} // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={10} // Scale factor of the stars (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots
          speed={1} // Rotation speed
          />
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} intensity={1} />

        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <hemisphereLight intensity={0.2} color="#eaeaea" groundColor="blue" />
        {/* <OrbitControls /> */}

        {/* <ScrollManager onSectionChange={setCurrentSection} section={currentSection} /> */}
        <Scene
          setCurrentSection={setCurrentSection}
          currentSection={currentSection}
        />
        {/* <Experience /> */}

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
