import { Float, RoundedBox, useTexture } from "@react-three/drei";
import { DoubleSide } from "three";


interface SchoolCardProps {
  position: [number, number, number];
}
export default function SchoolCard({ position }: SchoolCardProps) {
  const texture = useTexture("/assets/rmit-logo.svg");
  return (
    <group position={position}>
      {/* Use a Float from drei to add a cute floating motion */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.6}>
        {/* Main jelly card as a rounded box */}
        <RoundedBox
          radius={0.25}
          position={[0, 0, 0]}
          args={[5, 3, 0.01]}
          smoothness={1}
        >
          <meshPhysicalMaterial
            attach="material"
            transparent={true}
            opacity={0.8}
            color="#ffbb90"
            emissive="#d39afc"
            emissiveIntensity={0.1}
            roughness={0.1}
            thickness={0.5}
            side={DoubleSide}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[4, 1.5, 0.1]} />
          <meshStandardMaterial
            map={texture}
            transparent={true}
            opacity={0.8}
            // color={borderColor}
          />
        </mesh>
      </Float>
    </group>
  );
}


