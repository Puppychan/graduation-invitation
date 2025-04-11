import { Center, Float, Text3D, useMatcapTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Mesh } from "three";
import { useMediaQuery } from "react-responsive";
import { SCREEN_SIZES } from "../../utils/screen-size-constants";

interface GumTextProps {
  position: [number, number, number];
  size?: number;
  text: string;
  rotation?: [number, number, number];
}

export default function GumText({
  position,
  text,
  rotation = [0, 0, 0],
  size = 3,
}: GumTextProps) {
  const [matcapTexture] = useMatcapTexture("CB5E3B_FABC7A_EF965E_F4A46C");
  const ref = useRef<Mesh>(null);

  const isSmall = useMediaQuery({ maxWidth: SCREEN_SIZES.SMALL });
  const isTablet = useMediaQuery({
    minWidth: SCREEN_SIZES.SMALL,
    maxWidth: SCREEN_SIZES.TABLET,
  });

  const responsiveSize = useMemo(() => {
    if (isSmall) {
      return size * 0.7;
    } else if (isTablet) {
      return size * 0.9;
    }
    return size;
  }, [isSmall, isTablet, size]);

  return (
    <Center position={position} rotation={rotation}>
      {/* <Physics gravity={[0, 10, 0]}> */}
      <Float speed={1}>
        <Text3D
          position={[0, 0, -10]}
          ref={ref}
          size={responsiveSize}
          //   size={[-w / 5, -h * 2, 3]}
          font={"/fonts/gt.json"}
          curveSegments={24}
          //   brevelSegments={1}
          bevelEnabled
          bevelSize={0.08}
          bevelThickness={0.03}
          height={1}
          lineHeight={0.9}
          letterSpacing={0.3}
        >
          {text}
          <meshMatcapMaterial color="pink" matcap={matcapTexture} />
        </Text3D>
      </Float>
      {/* </Physics> */}
    </Center>
  );
}
