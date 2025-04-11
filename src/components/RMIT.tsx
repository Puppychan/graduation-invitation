import { useBox } from "@react-three/cannon";
import {
  Center,
  Float,
  Image,
  Text,
  Text3D,
  useTexture,
} from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  DoubleSide,
  Euler,
  FrontSide,
  Group,
  Vector3,
} from "three";
import { GraduationCap } from "./3d-models/GraduationCap";

// RMIT Info Component - Displays information about RMIT
interface RMITInfoProps {
  position: [number, number, number];
}

interface RMIT3DTextProps {
  position: [number, number, number];
  text: string;
  fontSize?: number;
  color?: string;
  emissiveColor?: string;
  emissiveIntensity?: number;
}

function RMIT3DText({
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

export function RMITInfo({ position }: RMITInfoProps) {
  return (
    <group position={position}>
      <Float speed={1} rotationIntensity={0.05} floatIntensity={0.2}>
        {/* <Text
          position={[0, 0, 0.1]}
          fontSize={0.2}
          color="#eeeeee"
          anchorX="center"
          anchorY="middle"
          // font="/assets/fonts/Inter-Regular.woff"
          maxWidth={5}
          textAlign="center"
        >
          Royal Melbourne Institute of Technology
        </Text> */}
        <RMIT3DText position={[0, 4, 0]} text="RMIT" fontSize={1.5} />

        <RMIT3DText position={[0, -1, 0]} color="#ffc1e3" emissiveColor="#2e2e87" text="Saigon South Campus" fontSize={0.5} />
      </Float>
    </group>
  );
}

interface RMITConfettiProps {
  count?: number;
  colors?: string[];
}

export function RMITConfetti({
  count = 100,
  colors = ["#d39afc", "#ffc1e3", "#ffffff", "#2e2e87"],
}: RMITConfettiProps) {
  const groupRef = useRef<Group>(null);

  // Load graduation hat model (adjust path)
  const logoTexture = useTexture("/assets/rmit-logo-short.png");

  const particles = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const type = Math.random(); // 0 - 1
      // 0 - 0.1: hat, 0.1 - 0.66: logo, 0.66 - 1: confetti
      const typeString = type < 0.1 ? "hat" : type < 0.66 ? "logo" : "confetti";
      items.push({
        type: typeString,
        position: new Vector3(
          (Math.random() - 0.5) * 30,
          Math.random() * 20 + 10,
          (Math.random() - 0.5) * 30
        ),
        rotation: new Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        scale:
          typeString == "hat"
            ? Math.random() * 0.1 + 0.01
            : Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.1 + 0.02,
      });
    }
    return items;
  }, [colors, count]);

  useFrame((state) => {
    groupRef.current?.children.forEach((child, i) => {
      const p = particles[i];
      p.position.y -= p.speed;
      if (p.position.y < -10) p.position.y = 20;

      // Slight swaying motion
      p.position.x += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.01;
      p.position.z += Math.cos(state.clock.elapsedTime * 0.5 + i) * 0.01;

      p.rotation.x += 0.01;
      p.rotation.y += 0.01;

      child.position.copy(p.position);
      child.rotation.copy(p.rotation);
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => {
        switch (p.type) {
          case "hat":
            return (
              <GraduationCap
                scale={p.scale}
                position={p.position}
                rotation={p.rotation}
              />
            );
          case "logo":
            return (
              <mesh
                key={i}
                position={p.position}
                rotation={p.rotation}
                scale={p.scale}
              >
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial
                  map={logoTexture}
                  transparent
                  side={DoubleSide}
                />
              </mesh>
            );
          case "confetti":
          default:
            return (
              <mesh
                key={i}
                position={p.position}
                rotation={p.rotation}
                scale={p.scale}
              >
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial color={p.color} side={DoubleSide} />
              </mesh>
            );
        }
      })}
    </group>
  );
}

// RMIT Campus Model
interface RMITCampusProps {
  position: [number, number, number];
  scale?: number;
}

export function RMITCampus({ position, scale = 1 }: RMITCampusProps) {
  const buildingColor = "#d8d8d8";
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
