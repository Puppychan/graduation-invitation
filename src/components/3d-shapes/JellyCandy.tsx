import { Float, MeshWobbleMaterial } from "@react-three/drei";

interface JellyCandyProps {
  position: [number, number, number];
  color: string;
  size: number;
  opacity?: number;
  wobbleSpeed?: number;
  wobbleIntensity?: number;
}

export default function JellyCandy({
  position,
  color,
  size,
  opacity = 0.5,
  wobbleSpeed = 1,
  wobbleIntensity = 0.4,
}: JellyCandyProps) {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshWobbleMaterial
          color={color}
          factor={wobbleIntensity}
          speed={wobbleSpeed}
          transparent
          opacity={opacity}
          roughness={0.1}
          //   clearcoat={1}
          //   clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}
