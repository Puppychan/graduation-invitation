import { useGLTF, useTexture } from "@react-three/drei";
import { MeshReflectorMaterial } from "@react-three/drei/materials/MeshReflectorMaterial";
import { useEffect } from "react";
import { Color, Mesh, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial } from "three";

export function JellyFish(props) {
  const { nodes, materials } = useGLTF("/models/jelly_fish_spongebob.glb");

  useEffect(() => {
    Object.entries(materials).forEach(([key, material]) => {
      const typedMaterial = material as MeshStandardMaterial;
      typedMaterial.opacity = 0.8;
      typedMaterial.transparent = true;
    });
 
  }, [materials]);

  return (
    <group {...props} dispose={null}>
      <group
        position={[90.645, 292.91, 0]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
      >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[24.457, 79.153, 0.221]}
            rotation={[Math.PI / 2, -Math.PI / 9, 0]}
            scale={[-1, 1, 1]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={(nodes["Jelly_Fish_02_-_Default_0"] as Mesh).geometry}
              material={materials["02_-_Default"]}
            >
              {/* <meshStandardMaterial map={textures.map} attach="material" /> */}
            </mesh>

            <mesh
              castShadow
              receiveShadow
              geometry={(nodes["Jelly_Fish_03_-_Default_0"] as Mesh).geometry}
              material={materials["03_-_Default"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/jelly_fish_spongebob.glb");
