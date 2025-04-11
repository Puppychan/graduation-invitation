import { Float, useTexture } from "@react-three/drei";

interface RMITCampusProps {
  position: [number, number, number];
  scale?: number;
}

export default function RMITCampus({ position, scale = 1 }: RMITCampusProps) {
  const texture = useTexture("/assets/rmit-campus.png");

  return (
    <group position={position} scale={[scale, scale, scale]}>
      <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
        {/* Main Building */}
        <mesh position={[0, 5, -3]}>
          <boxGeometry args={[22, 26, 0.1]} />
          <meshStandardMaterial
            map={texture}
            color="#9b8f8f" // Dark gray tint to reduce brightness
            transparent
            opacity={0.9} // Keep image visible
            roughness={1} // No shine
            metalness={0}
          />
        </mesh>
      </Float>
    </group>
  );
}
