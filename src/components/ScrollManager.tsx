import { Physics } from "@react-three/cannon";
import {
  CameraControls,
  Cloud,
  Clouds,
  OrbitControls,
  PerspectiveCamera,
  Sparkles,
  Text,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import GumText from "./3d-shapes/GumText";
import CherryBlossomPetals from "./3d-shapes/CherryBlossomPetal";
import CandyCluster from "./3d-shapes/Candy";
import CottonCandy from "./3d-shapes/CottonCandy";
import GraduationCard from "./GraduationCard";
import WelcomeSection from "../sections/WelcomeSection";
import SubtitleSection from "../sections/SubtitleSection";
import SchoolCard from "./SchoolCard";
import SchoolSection from "../sections/SchoolSection";

interface CameraControlsProps {
  setCurrentSection: (section: number) => void;
  currentSection: number;
}
export function CustomCameraControls({
  setCurrentSection,
  currentSection,
}: CameraControlsProps) {
  const controlsRef = useRef<CameraControls | null>(null);
  const { camera } = useThree();
  const zPosition = useRef(sectionOffsets[0].z);
  const isTransitioning = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Navigate to a specific section with animation
  const navigateToSection = useCallback(
    (sectionIndex: number) => {
      if (!controlsRef.current || isTransitioning.current) return;

      console.log("Navigating to section", sectionIndex);
      isTransitioning.current = true;

      const targetPosition = sectionPositions[sectionIndex];

      // Clear any existing transition timeout
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }

      const offset = sectionOffsets[sectionIndex];
      const cameraPos = targetPosition.clone().add(offset);

      controlsRef.current.setLookAt(
        cameraPos.x,
        cameraPos.y,
        cameraPos.z,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true // animate
      );

      // Set a timeout to complete the transition after animation finishes
      transitionTimeoutRef.current = setTimeout(() => {
        zPosition.current = cameraPos.z;
        isTransitioning.current = false;
        setCurrentSection(sectionIndex);
        console.log("Animation complete, now at section:", sectionIndex);
      }, 1000); // Animation duration - increased for smoother transitions
    },
    [setCurrentSection]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isTransitioning.current) return;

      if (
        event.key === "ArrowRight" &&
        currentSection < sectionPositions.length - 1
      ) {
        navigateToSection(currentSection + 1);
      } else if (event.key === "ArrowLeft" && currentSection > 0) {
        navigateToSection(currentSection - 1);
      }
    },
    [currentSection, navigateToSection]
  );

  // Handle camera movement
  const onMove = () => {
    if (!controlsRef.current || isTransitioning.current) return;

    // Debounce: clear existing timer and set new one
    if (debounceRef.current) return;

    debounceRef.current = setTimeout(() => {
      // Skip if a transition is happening
      if (isTransitioning.current) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
          debounceRef.current = null;
        }
        return;
      }

      const currentZ = camera.position.z;
      const zDifference = currentZ - zPosition.current;

      // Only trigger section change if there's significant movement
      if (Math.abs(zDifference) > 3) {
        const movingForward = zDifference < 0; // moving toward smaller Z values

        if (movingForward && currentSection < sectionPositions.length - 1) {
          navigateToSection(currentSection + 1);
        } else if (!movingForward && currentSection > 0) {
          navigateToSection(currentSection - 1);
        }

        // Update reference position
        zPosition.current = currentZ;
      }

      // Clear debounce ref
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    }, 300); // Reduced debounce time for more responsive feel
  };

  // Clean up timeouts on unmount
  useEffect(() => {
    // Add keyboard event listeners
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      // Clear timeouts
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [handleKeyDown]);

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      onChange={onMove}
      enabled={!isTransitioning.current}
      maxDistance={150}
      minDistance={5}
      maxPolarAngle={Math.PI / 1.5}
      minPolarAngle={Math.PI / 8}
      // Add rotation constraints for each section
      maxAzimuthAngle={Math.PI / 2} // Limit horizontal rotation
      minAzimuthAngle={-Math.PI / 2}
      // dampingFactor={0.1} // Smoother camera movement
      // draggingDampingFactor={0.1}
    />
  );
}
// Define section positions
const sectionPositions = [
  new THREE.Vector3(0, 0, 90),
  new THREE.Vector3(60, 0, 60),
  new THREE.Vector3(120, 0, 30),
  new THREE.Vector3(180, 0, 0),
];

// Camera offsets for better viewing angles
const sectionOffsets = [
  new THREE.Vector3(0, 20, 40), // Section 0 (closest to viewer)
  new THREE.Vector3(0, 22, 45), // Section 1
  new THREE.Vector3(0, 24, 50), // Section 2
  new THREE.Vector3(0, 26, 55), // Section 3 (farthest away)
];
interface SceneProps {
  setCurrentSection: (section: number) => void;
  currentSection: number;
}

export default function Scene({
  setCurrentSection,
  currentSection,
}: SceneProps) {
  return (
    <>
      <CustomCameraControls
        setCurrentSection={setCurrentSection}
        currentSection={currentSection}
      />
      {/* <PerspectiveCamera makeDefault position={[0, 0, 10]} /> */}

      {/* Welcome Section (visible from far) */}
      <WelcomeSection
        position={sectionPositions[2].toArray() as [number, number, number]}
      />
      <SubtitleSection
        position={sectionPositions[1].toArray() as [number, number, number]}
      />

      {/* Graduation Invitation (visible when zooming in more) */}
      <SchoolSection
        position={sectionPositions[0].toArray() as [number, number, number]}
      />

      {/* Secret Section (only visible when zoomed in deep) */}
      <GraduationCard
        position={sectionPositions[3].toArray() as [number, number, number]}
      />
    </>
  );
}

// Confetti particles for the secret section
function ConfettiParticles() {
  const particles = useRef<
    Array<{
      position: THREE.Vector3;
      rotation: THREE.Euler;
      scale: number;
      velocity: THREE.Vector3;
      rotationSpeed: THREE.Vector3;
      color: string;
    }>
  >([]);
  const group = useRef<THREE.Group>(null);

  // Create confetti particles on first render
  useEffect(() => {
    // Create 50 confetti particles
    for (let i = 0; i < 50; i++) {
      particles.current.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        scale: Math.random() * 0.3 + 0.1,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        rotationSpeed: new THREE.Vector3(
          Math.random() * 0.04,
          Math.random() * 0.04,
          Math.random() * 0.04
        ),
        color: [
          "#ff6347",
          "#4169e1",
          "#32cd32",
          "#ffd700",
          "#9932cc",
          "#ff69b4",
          "#00ced1",
          "#ff7f50",
        ][Math.floor(Math.random() * 8)],
      });
    }
  }, []);

  // Animate confetti
  useFrame(() => {
    particles.current.forEach((particle, i) => {
      if (group.current && group.current.children[i]) {
        const mesh = group.current.children[i];

        // Update position
        mesh.position.add(particle.velocity);

        // Update rotation
        mesh.rotation.x += particle.rotationSpeed.x;
        mesh.rotation.y += particle.rotationSpeed.y;
        mesh.rotation.z += particle.rotationSpeed.z;

        // Reset if too far away
        if (mesh.position.length() > 10) {
          mesh.position.set(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
          );
        }
      }
    });
  });

  return (
    <group ref={group}>
      {particles.current.map((particle, i) => (
        <mesh
          key={i}
          position={particle.position}
          rotation={particle.rotation}
          scale={particle.scale}
        >
          <boxGeometry args={[1, 0.1, 1]} />
          <meshStandardMaterial color={particle.color} />
        </mesh>
      ))}
    </group>
  );
}
