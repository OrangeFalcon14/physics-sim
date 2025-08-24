import { Vector2 } from "./utils/vectors";

export const settings = $state({
  FPS: 60,
  gravity: new Vector2(0, 9.8),
  defaultMass: 10,
  defaultSize: 40,
  coeffecientOfRestitution: 1,
  paused: false,
});

export const inputs = $state({
  mouseCoords: new Vector2(0, 0),
  mouseDown: false,
});
