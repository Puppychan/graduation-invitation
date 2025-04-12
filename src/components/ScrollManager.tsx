import { CameraControls } from "@react-three/drei";
import { useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import WelcomeSection from "../sections/WelcomeSection";
import SubtitleSection from "../sections/SubtitleSection";
import SchoolSection from "../sections/SchoolSection";
import InvitationSection from "../sections/InvitationSection";
import debounce from "lodash/debounce";

interface SceneProps {
  setCurrentSection: (section: number) => void;
  currentSection: number;
  isClickedNavButton: -1 | 0 | 1;
  setIsClickedNavButton: (value: -1 | 0 | 1) => void;
  sectionPositions: THREE.Vector3[];
  sectionOffsets: THREE.Vector3[];
}

export function CustomCameraControls({
  setCurrentSection,
  currentSection,
  isClickedNavButton,
  setIsClickedNavButton,
  sectionPositions,
  sectionOffsets,
}: SceneProps) {
  const controlsRef = useRef<CameraControls | null>(null);
  const zPosition = useRef(sectionOffsets[0].z);
  const isTransitioning = useRef(false);
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

      if (transitionTimeoutRef.current)
        clearTimeout(transitionTimeoutRef.current);
      // Set a timeout to complete the transition after animation finishes
      transitionTimeoutRef.current = setTimeout(() => {
        zPosition.current = cameraPos.z;
        isTransitioning.current = false;
        setCurrentSection(sectionIndex);
        setIsClickedNavButton(0); // Reset button click state
        console.log("Animation complete, now at section:", sectionIndex);
      }, 1000); // Animation duration - increased for smoother transitions
    },
    [sectionOffsets, sectionPositions, setCurrentSection, setIsClickedNavButton]
  );

  // Debounced transition function using lodash
  const debouncedNavigateToSection = useMemo(
    () =>
      debounce(navigateToSection, 1000, {
        leading: true,
        trailing: false,
      }),
    [navigateToSection]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isTransitioning.current) return;

      if (
        event.key === "ArrowRight" &&
        currentSection < sectionPositions.length - 1
      ) {
        debouncedNavigateToSection(currentSection + 1);
      } else if (event.key === "ArrowLeft" && currentSection > 0) {
        debouncedNavigateToSection(currentSection - 1);
      }
    },
    [currentSection, debouncedNavigateToSection, sectionPositions.length]
  );

  // Clean up timeouts on unmount
  useEffect(() => {
    // Add keyboard event listeners
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      // Clear timeouts
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [handleKeyDown]);
  // Clean up timeouts on unmount
  // Handle navigation button trigger
  useEffect(() => {
    if (isClickedNavButton === 0) return;

    const nextIndex =
      isClickedNavButton === 1
        ? Math.min(sectionPositions.length - 1, currentSection + 1)
        : Math.max(0, currentSection - 1);

    debouncedNavigateToSection(nextIndex);
  }, [
    isClickedNavButton,
    currentSection,
    sectionPositions.length,
    debouncedNavigateToSection,
  ]);

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      // onChange={onMove}
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

export default function Scene({
  setCurrentSection,
  currentSection,
  isClickedNavButton,
  setIsClickedNavButton,
  sectionPositions,
  sectionOffsets,
}: SceneProps) {
  // console.log("Rendering Scene", sectionOffsets[0], sectionOffsets[0].z, sectionOffsets[0].z + sectionOffsets[0].z);
  return (
    <>
      <CustomCameraControls
        setCurrentSection={setCurrentSection}
        currentSection={currentSection}
        isClickedNavButton={isClickedNavButton}
        setIsClickedNavButton={setIsClickedNavButton}
        sectionOffsets={sectionOffsets}
        sectionPositions={sectionPositions}
      />

      {/* Welcome Section (visible from far) */}
      <WelcomeSection
        position={sectionPositions[0].toArray() as [number, number, number]}
      />

      {/* Subtitle Section (visible when zooming in) */}
      <SubtitleSection
        position={sectionPositions[1].toArray() as [number, number, number]}
      />

      {/* Graduation Invitation (visible when zooming in more) */}
      <SchoolSection
        position={sectionPositions[2].toArray() as [number, number, number]}
      />

      <InvitationSection
        position={sectionPositions[3].toArray() as [number, number, number]}
      />
    </>
  );
}
