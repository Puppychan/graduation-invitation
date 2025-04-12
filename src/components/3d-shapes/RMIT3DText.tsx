import { Center, Text3D } from "@react-three/drei";

interface RMIT3DTextProps {
  position: [number, number, number];
  text: string;
  fontSize?: number;
  color?: string;
  emissiveColor?: string;
  emissiveIntensity?: number;
}

export function RMIT3DText({
  position,
  text,
  fontSize = 0.5,
  color = "#961261",
  emissiveColor = "#ffaadd",
  emissiveIntensity = 0.5,
}: RMIT3DTextProps) {
  return (
    <Center position={position}>
      <Text3D
        font="/fonts/gt.json"
        size={fontSize}
        height={0.1}
        curveSegments={32}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={10}
      >
        {text}
        <meshStandardMaterial
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </Text3D>
    </Center>
  );
}
