import { Euler, Vector3 } from "three";

export interface GeneralGroupProps {
  position: [number, number, number] | Vector3;
  rotation?: [number, number, number] | Euler;
  scale?: number | [number, number, number];
}
