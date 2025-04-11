import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { MathUtils, Mesh, Vector3 } from "three";
import { candyColors } from "../../utils/color";

interface CandyProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

// Candy component
const Candy = ({
  position = [0, 0, 0],
  scale = 1,
  color = "#ff88bb",
}: CandyProps) => {
  const candyRef = useRef<Mesh>(null);
  const [rotationAxis] = useState(
    new Vector3(
      MathUtils.randFloat(-1, 1),
      MathUtils.randFloat(-1, 1),
      MathUtils.randFloat(-1, 1)
    ).normalize()
  );

  useFrame(() => {
    if (candyRef.current) {
      candyRef.current.rotateOnAxis(rotationAxis, 0.01);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={candyRef} position={position} scale={scale}>
        <torusGeometry args={[0.4, 0.2, 16, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
};

// Generate multiple candies
const CandyCluster = ({ count = 15 }) => {

  const candies = useMemo(() => {
    const candyArray = Array.from({ length: count }, () => ({
      position: [
        MathUtils.randFloat(-8, 8),
        MathUtils.randFloat(-5, 5),
        MathUtils.randFloat(-3, 3),
      ],
      scale: MathUtils.randFloat(0.5, 1.2),
      color: candyColors[Math.floor(Math.random() * candyColors.length)],
    }));
    return candyArray.map((candy, i) => (
      <Candy
        key={i}
        position={candy.position as [number, number, number]}
        scale={candy.scale}
        color={candy.color}
      />
    ));
  }, [count]);

  return <group>{candies}</group>;
};
export default CandyCluster;
