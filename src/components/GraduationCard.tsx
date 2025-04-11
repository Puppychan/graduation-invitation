import { Text, Float, RoundedBox } from "@react-three/drei";

function CardContent({ type }) {
  if (type == "cover") {
    return (
      <>
        <Text
          position={[0, 0.8, 0.06]}
          fontSize={0.4}
          color="#8c3f71"
          //   font="/api/placeholder/100/100"
          anchorX="center"
          anchorY="middle"
        >
          GRADUATION
        </Text>

        <Text
          position={[0, 0.2, 0.06]}
          fontSize={0.3}
          color="#8c3f71"
          //   font="/api/placeholder/100/100"
          anchorX="center"
          anchorY="middle"
        >
          CELEBRATION
        </Text>

        <Text
          position={[0, -0.5, 0.06]}
          fontSize={0.6}
          color="#8c3f71"
          //   font="/api/placeholder/100/100"
          anchorX="center"
          anchorY="middle"
        >
          2025
        </Text>
      </>
    );
  } else {
    return (
      <group position={[0, 0, 0.05]}>
        <Text
          position={[1.5, 1.4, 0]}
          fontSize={0.3}
          color="#4a6ebf"
          // font="/api/placeholder/100/100"
          anchorX="center"
          anchorY="middle"
        >
          JOIN US
        </Text>

        <Text
          position={[1.5, 0.8, 0]}
          fontSize={0.2}
          color="#4a6ebf"
          // font="/api/placeholder/100/100"
          anchorX="center"
          anchorY="middle"
        >
          DATE: MAY 15, 2025
        </Text>

        <Text
          position={[1.5, 0.4, 0]}
          fontSize={0.2}
          color="#4a6ebf"
          // font="/api/placeholder/100/100"
          anchorX="center"
          anchorY="middle"
        >
          TIME: 2:00 PM
        </Text>

        <Text
          position={[1.5, 0, 0]}
          fontSize={0.2}
          color="#4a6ebf"
          // font="/api/placeholder/100/100"
          anchorX="center"
          anchorY="middle"
        >
          LOCATION:
        </Text>

        <Text
          position={[1.5, -0.4, 0]}
          fontSize={0.2}
          color="#4a6ebf"
          // font="/api/placeholder/100/100"
          anchorX="center"
          anchorY="middle"
        >
          SWEET UNIVERSITY
        </Text>

        <Text
          position={[1.5, -1, 0]}
          fontSize={0.18}
          color="#4a6ebf"
          // font="/api/placeholder/100/100"
          anchorX="center"
          anchorY="middle"
        >
          RSVP BY APRIL 30
        </Text>
      </group>
    );
  }
}
// Helper function: returns an object with jelly material properties
function createJellyMaterialProps(color: string) {
  return {
    // emissiveColor: color, // Base color
    // color: "#eee4fa1", // Base color
    // emissiveIntensity: 1.5, // Emissive glow
    color,
    transmission: 1, // Full transmission for a glassy, jelly effect
    roughness: 0.05, // Very smooth
    thickness: 2, // How “deep” the material appears
    ior: 1.3, // Index of refraction, similar to glass/jelly
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    reflectivity: 0.3,
    // envMapIntensity: 1.5,
    transparent: true,
    opacity: 0.9,
    // side: FrontSide,
  };
}

interface GraduationCardProps {
  position: [number, number, number];
}
export default function GraduationCard({ position }: GraduationCardProps) {
  //   const coverRef = useRef<Group>(null);
  //   const insideRef = useRef<Mesh>(null);

  //   // Animation for card opening
  //   useFrame(() => {
  //     if (coverRef.current) {
  //       const targetRotation = isOpen ? -Math.PI / 2 : 0;
  //       coverRef.current.rotation.y +=
  //         (targetRotation - coverRef.current.rotation.y) * 0.1;
  //     }
  //   });
  const cardColor = "#d39afc"; // Soft pastel pink for the card
  const borderColor = "#ffc1e3"; // Slightly brighter for the border
  return (
    <group position={position}>
      {/* Use a Float from drei to add a cute floating motion */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.6}>
        {/* Main jelly card as a rounded box */}
        <RoundedBox args={[4, 2, 0.1]} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            attach="material"
            {...createJellyMaterialProps(cardColor)}
          />
        </RoundedBox>
        {/* <RoundedBox
          args={[4.2, 2.2, 0.1]}
          radius={0.25} // how rounded the corners are
          smoothness={5} // increase for smoother geometry
          position={[0, 0, 0]} // center it
        >
          <meshPhysicalMaterial
            attach="material"
            {...createJellyMaterialProps(cardColor)}
          />
        </RoundedBox> */}
        <CardContent type="cover" />
      </Float>
    </group>
  );
}
