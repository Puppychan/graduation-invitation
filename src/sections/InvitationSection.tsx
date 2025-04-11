import {
  Sparkles,
} from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import GraduationCard from "../components/GraduationCard";
import CherryBlossomPetals from "../components/3d-shapes/CherryBlossomPetal";
import { Sakura } from "../components/3d-models/Sakura";
import { Grass } from "../components/3d-models/Grass";
import { Tree } from "../components/3d-models/Tree";
import { PinkPudding } from "../components/3d-models/PinkPudding";
import { Koala } from "../components/3d-models/Koala";
import { GraduationCap } from "../components/3d-models/GraduationCap";

// Main invitation component
export default function InvitationSection({
  position = [0, 0, 0],
}: {
  position?: [number, number, number];
}) {
  return (
    <group position={position}>
      <GraduationCard position={[0, 0, -2.5]} />
      <Physics gravity={[0, -0.2, 0]}>
        <CherryBlossomPetals count={100} />
      </Physics>
      <Sparkles color="#ff99ec" size={10} scale={50} count={200} speed={0.5} />

      <Sakura position={[-10, -5, -2]} scale={[0.5, 0.7, 0.5]} />
      <Tree position={[-8, -5.3, -6]} scale={[0.1, 0.13, 0.1]} />
      <Tree position={[-9, -5.3, -4]} scale={[0.1, 0.13, 0.1]} />
      <Sakura position={[10, -5, -2]} scale={[0.5, 0.7, 0.5]} />
      <Tree position={[10, -5.3, -6]} scale={[0.1, 0.13, 0.1]} />
      <Tree position={[7, -5.3, -6]} scale={[0.1, 0.1, 0.1]} />

      <Grass position={[6, -5.3, -12]} scale={[35, 5, 24]} />
      <PinkPudding position={[-3.5, -4.5, 2]} scale={0.7} />
      <GraduationCap
        position={[-6.5, -1.5, 0]}
        scale={0.6}
        rotation={[0, -0.9, 0]}
      />
      <Koala position={[-6.5, -5, 0]} scale={0.4} rotation={[0, -0.9, 0]} />
    </group>
  );
}
