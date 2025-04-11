import { Physics } from "@react-three/cannon";
import GumText from "../components/3d-shapes/GumText";
import CherryBlossomPetals from "../components/3d-shapes/CherryBlossomPetal";
import CandyCluster from "../components/3d-shapes/Candy";
import CottonCandy from "../components/3d-shapes/CottonCandy";
import { Sparkles } from "@react-three/drei";

// Welcome Section
export default function WelcomeSection({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, position[2]]}
        angle={0.15}
        penumbra={1}
        intensity={1}
      />

      <Physics gravity={[0, -0.2, 0]}>
        {/* Main 3D Text */}
        <GumText position={[0, 2, 0]} size={2.5} text="APRIL 2025" />
        {/* <GumText position={[0, -2, 0]} text="DREAMS" /> */}

        {/* Cherry blossom petals */}
        <CherryBlossomPetals count={50} />

        {/* Candy elements */}
        <CandyCluster count={20} />

        {/* Cotton candy clouds */}
        {/* Left Side */}
        <CottonCandy position={[-10, -2, -3]} color="#ffccff" scale={2.5} />
        {/* Right Side */}
        <CottonCandy position={[10, -2, -3]} color="#ffccff" scale={2.5} />
        {/* Bottom */}
        <CottonCandy position={[0, -7, -10]} scale={1.5} color="#ffccff" />
        <CottonCandy position={[5, -7, -5]} scale={1.5} color="#ffccff" />
        <CottonCandy position={[0, -7, -10]} scale={1.5} color="#ffccff" />
        {/* Top */}
        <CottonCandy position={[-5, 5, -5]} color="#ffccee" scale={1.5} />
        <CottonCandy position={[5, 6, -3]} color="#ffaadd" scale={1.2} />
        <CottonCandy position={[0, 8, -6]} color="#ffbbee" scale={2} />
      </Physics>

      {/* Sparkles for magical effect */}
      <Sparkles count={100} scale={20} size={10} speed={0.3} color="#ffffff" />
    </group>
  );
}
