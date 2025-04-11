import { Text, Float, RoundedBox, Image, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import { ClampToEdgeWrapping } from "three";

function GraduationText({
  position,
  text,
  fontSize = 0.2,
  color = "#d8e2dc",
  bold = false,
}: {
  position: [number, number, number];
  text: string;
  fontSize?: number;
  bold?: boolean;
  color?: string;
}) {
  return (
    <Text
      position={position}
      fontSize={fontSize}
      font={bold ? "/fonts/CormorantInfant-Bold.ttf" : "/fonts/CormorantInfant-SemiBold.ttf"}
      anchorX="left"
      anchorY="middle"
    >
      {text}
      <meshStandardMaterial
        color={color}
        // emissive={emissive}
        // emissiveIntensity={0.5}
      />
    </Text>
  );
}

interface GraduationCardProps {
  position: [number, number, number];
}
export default function GraduationCard({ position }: GraduationCardProps) {
  const texture = useTexture("/textures/tranquil.jpg");
  useEffect(() => {
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = ClampToEdgeWrapping;
    texture.repeat.set(1, 1); // No tiling
    texture.center.set(0.5, 0.5); // Center anchor
    texture.rotation = 0; // No rotation
  }, [texture]);
  return (
    <group position={position} scale={2.5}>
      {/* Use a Float from drei to add a cute floating motion */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.6}>
        {/* Main jelly card as a rounded box */}
        <RoundedBox radius={0.2} args={[5.5, 2.7, 0.1]} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            attach="material"
            color={"#ffffff"}
            emissive={"#ff99cc"}
            emissiveIntensity={0.5}
            envMapIntensity={2}
            // color={
            map={texture}
            transmission={1} // Full transmission for a glassy, jelly effect
            roughness={0.05} // Very smooth
            thickness={2} // How “deep” the material appears
            ior={1.3} // Index of refraction, similar to glass/jelly
            clearcoat={1}
            clearcoatRoughness={0.05}
            reflectivity={0.3}
            transparent={true}
            opacity={0.9}
          />
        </RoundedBox>

        <mesh position={[-1.5, 0, 0.1]}>
          <Image url="/assets/koala.jpg" scale={[1.5, 1.5]} />
        </mesh>
        <group position={[-0.5, -0.4, 0.1]}>
          <GraduationText
            position={[0, 1.3, 0]}
            fontSize={0.3}
            bold={true}
            text="TRAN MAI NHUNG"
          />

          <GraduationText
            color="#c0c5c2"
            position={[0, 1, 0]}
            fontSize={0.15}
            text="Date"
          />
          <GraduationText
            position={[0, 0.8, 0]}
            fontSize={0.2}
            bold={true}
            text="SESSION 1 APRIL 14, 2025"
          />

          <GraduationText
            color="#c0c5c2"
            position={[0, 0.4, 0]}
            fontSize={0.15}
            text="Time"
          />
          <GraduationText
            position={[0, 0.2, 0]}
            fontSize={0.2}
            bold={true}
            text="AFTER 11 AM"
          />

          <GraduationText
            position={[0, -0.2, 0]}
            fontSize={0.15}
            color = "#c0c5c2"
            text="LOCATION"
          />

          <GraduationText
            position={[0, -0.4, 0]}
            fontSize={0.2}
            bold={true}
            text="RMIT UNIVERSITY"
          />
          <GraduationText
            position={[0, -0.65, 0]}
            fontSize={0.2}
            bold={true}
            text="SGS CAMPUS"
          />
        </group>
      </Float>
    </group>
  );
}
