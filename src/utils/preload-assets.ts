import { FontLoader } from 'three/examples/jsm/Addons.js';
// preload-assets.ts
import { useGLTF, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";

useTexture.preload("/textures/CB5E3B_FABC7A_EF965E_F4A46C.png");
useTexture.preload("/textures/tranquil.jpg");

useTexture.preload("/assets/koala.jpg");
useTexture.preload("/assets/rmit-campus.png");
useTexture.preload("/assets/rmit-logo-short.png");
useTexture.preload("/assets/rmit-logo.svg");

useLoader.preload(FontLoader, "/fonts/gt.json");
// useLoader.preload(FontLoader, "/fonts/CormorantInfant-Bold.ttf");
// useLoader.preload(FontLoader, "/fonts/CormorantInfant-SemiBold.ttf");

useGLTF.preload("/models/graduation_cap_pro.glb");
useGLTF.preload("/models/grass.glb");
useGLTF.preload("/models/koala_from_poly_by_google.glb");
useGLTF.preload("/models/pink_pudding.glb");
useGLTF.preload("/models/sakura.glb");
useGLTF.preload("/models/beech_tree.glb");
useGLTF.preload("/models/wooden_bench.glb");