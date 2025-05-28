import { inputs, settings } from "../state.svelte";
import { BlockBody, Body, type PhysicsEngine } from "./physicsEngine";

export class InputHandler {
  canvas: HTMLCanvasElement;
  physicsEngine: PhysicsEngine;
  constructor(element: HTMLCanvasElement, physicsEngine: PhysicsEngine) {
    this.canvas = element;
    this.physicsEngine = physicsEngine;
  }
  listen() {
    this.canvas.addEventListener("mousemove", (event) => {
      let canvasLeft = this.canvas.getBoundingClientRect().left;
      inputs.mouseCoords.x = event.clientX - canvasLeft;
      inputs.mouseCoords.y = event.clientY;
    });
    this.canvas.addEventListener("mousedown", (event) => {
      inputs.mouseDown = true;
    });
    this.canvas.addEventListener("mouseup", (event) => {
      inputs.mouseDown = false;
    });
    this.canvas.addEventListener("click", (event) => {
      this.physicsEngine.addBody(
        new BlockBody(
          settings.defaultMass,
          inputs.mouseCoords,
          settings.defaultSize
        )
      );
    });
  }
}
