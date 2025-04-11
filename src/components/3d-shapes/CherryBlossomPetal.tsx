import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { MathUtils, Mesh } from "three";

interface CherryBlossomPetalProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

// Cherry Blossom Petal component
export function CherryBlossomPetal({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}: CherryBlossomPetalProps) {
  const petalRef = useRef<Mesh>(null);
  const [rotationSpeed] = useState(() => MathUtils.randFloat(0.1, 0.3));
  const [fallSpeed] = useState(() => MathUtils.randFloat(0.1, 0.4));
  const [drift] = useState(() => MathUtils.randFloat(-0.2, 0.2));

  useFrame(() => {
    if (petalRef.current) {
      petalRef.current.rotation.x += rotationSpeed * 0.01;
      petalRef.current.rotation.y += rotationSpeed * 0.007;
      petalRef.current.position.y -= fallSpeed * 0.01;
      petalRef.current.position.x += drift * 0.01;

      // Reset position when petal falls below scene
      if (petalRef.current.position.y < -10) {
        petalRef.current.position.y = 10;
        petalRef.current.position.x = MathUtils.randFloat(-10, 10);
        petalRef.current.position.z = MathUtils.randFloat(-5, 5);
      }
    }
  });

  return (
    <mesh ref={petalRef} position={position} rotation={rotation} scale={scale}>
      {/* Petal shape */}
      <meshStandardMaterial color="#ffcce6" roughness={0.3} metalness={0.2} />
      <circleGeometry args={[0.3, 5]} />
    </mesh>
  );
}

// Generate multiple petals
export default function CherryBlossomPetals({ count = 30 }) {
  const petals = useMemo(() => {
    const petalsList = Array.from({ length: count }, () => ({
      position: [
        MathUtils.randFloat(-10, 10),
        MathUtils.randFloat(-5, 10),
        MathUtils.randFloat(-5, 5),
      ],
      rotation: [
        MathUtils.randFloat(0, Math.PI * 2),
        MathUtils.randFloat(0, Math.PI * 2),
        MathUtils.randFloat(0, Math.PI * 2),
      ],
      scale: MathUtils.randFloat(0.5, 1.5),
    }));
    return petalsList.map((petal, i) => (
      <CherryBlossomPetal
        key={i}
        position={petal.position as [number, number, number]}
        rotation={petal.rotation as [number, number, number]}
        scale={petal.scale}
      />
    ));
  }, [count]);

  return <group>{petals}</group>;
}
