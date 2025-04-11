import { Physics } from "@react-three/cannon";
import { Sparkles } from "@react-three/drei";
import SchoolCard from "../components/SchoolCard";
import { RMITConfetti } from "../components/RMITConfetti";
import { Tree } from "../components/3d-models/Tree";
import { Sakura } from "../components/3d-models/Sakura";
import { Grass } from "../components/3d-models/Grass";
import RMITCampus from "../components/RMITCampus";
import { RMIT3DText } from "../components/RMIT3DText";

interface SchoolSectionProps {
  position: [number, number, number];
}

export default function SchoolSection({ position }: SchoolSectionProps) {
  return (
    <group position={position}>
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
      <RMIT3DText position={[0, 2.2, 0]} text="RMIT" fontSize={1.5} />

      <RMIT3DText
        position={[0, -3, 0]}
        color="#ffc1e3"
        emissiveColor="#2e2e87"
        text="Saigon South Campus"
        fontSize={0.5}
      />

      {/* Physics for the graduate hats and other elements */}
      <Physics gravity={[0, -0.5, 0]}>
        <RMITConfetti count={150} />

        {/* RMIT Campus model in the background */}
        <RMITCampus position={[0, 0, -3]} scale={0.8} />
        <Tree position={[-9, -6, -3]} scale={0.1} />
        <Tree position={[-7, -6, -8]} scale={[0.1, 0.15, 0.1]} />
        <Sakura position={[7, -6, -3]} scale={0.5} />
      </Physics>
      <Grass position={[5, -7, -10]} scale={[25, 7, 14]} />

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
