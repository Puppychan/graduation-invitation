import { Physics } from "@react-three/cannon";
import { Sparkles } from "@react-three/drei";
import SchoolCard from "../components/SchoolCard";
import { RMITCampus, RMITConfetti, RMITInfo } from "../components/RMIT";
import { Tree } from "../components/3d-models/Tree";
import { Sakura } from "../components/3d-models/Sakura";

interface SchoolSectionProps {
  position: [number, number, number];
}

export default function SchoolSection({ position }: SchoolSectionProps) {
  return (
    <group position={position}>
      {/* Add ambient light specific for the RMIT section */}
      <ambientLight intensity={0.3} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.25}
        penumbra={1}
        intensity={1}
        color="#ffffff"
      />

      {/* Main RMIT Card with floating effect */}
      <SchoolCard position={[0, 0, 0]} />

      {/* RMIT Information */}
      <RMITInfo position={[0, -2, 0]} />

      {/* Physics for the graduate hats and other elements */}
      <Physics gravity={[0, -0.5, 0]}>
      <RMITConfetti count={150} />

        {/* RMIT Campus model in the background */}
        <RMITCampus position={[-3, 0, -5]} scale={0.8} />
        <Tree position={[-11, -6, -5]} scale={0.1} />
        <Tree position={[-10, -6, -10]} scale={0.1} />
        <Sakura position={[4, -5, -5]} scale={0.5} />
      </Physics>

      {/* Add confetti to celebrate graduation */}

      {/* Sparkles for magical effect around the RMIT card */}
      <Sparkles
        count={100}
        scale={[8, 6, 1]}
        size={10}
        speed={0.3}
        color="#d956f3"
        position={[0, 0, 0.5]}
      />

      {/* Add custom point lights to highlight the RMIT elements */}
      <pointLight position={[3, 3, 3]} intensity={1} color="#d39afc" />
      <pointLight position={[-3, -3, 3]} intensity={0.8} color="#ffc1e3" />
    </group>
  );
}
