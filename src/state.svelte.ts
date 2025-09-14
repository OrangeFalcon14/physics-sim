import { PhysicsEngine } from "./lib/physicsEngine";
import { Vector2 } from "./utils/vectors";

export enum Modes {
  Select,
  SpawnBlock,
  SpawnSpring,
  SpawnWall,
}

export const settings = $state({
  FPS: 60,
  gravity: new Vector2(0, 9.8),
  defaultMass: 10,
  defaultSize: 40,
  coeffecientOfRestitution: 1,
  paused: false,
  physicsEngine: new PhysicsEngine(),
});

export const inputs = $state({
  mouseCoords: new Vector2(0, 0),
  mouseDown: false,
  mode: Modes.SpawnWall, // one of "select", "spawn_ball", "spawn_spring", "spawn_wall"
  selectedObj: -1,
});
