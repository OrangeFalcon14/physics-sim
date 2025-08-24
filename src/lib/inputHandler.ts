import { inputs, settings } from "../state.svelte";
import { Vector2 } from "../utils/vectors";
import {
  BlockBody,
  Body,
  SpringBody,
  WallBody,
  type PhysicsEngine,
} from "./physicsEngine";

export class InputHandler {
  canvas: HTMLCanvasElement;
  physicsEngine: PhysicsEngine;
  selectedPoint: Vector2;
  constructor(element: HTMLCanvasElement, physicsEngine: PhysicsEngine) {
    this.canvas = element;
    this.physicsEngine = physicsEngine;
    this.selectedPoint = new Vector2(10000, 0);
  }
  listen() {
    this.canvas.addEventListener("mousemove", (event) => {
      let canvasLeft = this.canvas.getBoundingClientRect().left;
      let canvasTop = this.canvas.getBoundingClientRect().top;
      inputs.mouseCoords.x = event.clientX - canvasLeft;
      inputs.mouseCoords.y = event.clientY - canvasTop;
    });
    this.canvas.addEventListener("mousedown", (event) => {
      inputs.mouseDown = true;
    });
    this.canvas.addEventListener("mouseup", (event) => {
      inputs.mouseDown = false;
    });
    this.canvas.addEventListener("click", (event) => {
      if (!event.shiftKey && !event.altKey) {
        console.log("clicked");
        this.physicsEngine.addBody(
          new BlockBody(
            settings.defaultMass,
            new Vector2(inputs.mouseCoords.x, inputs.mouseCoords.y),
            settings.defaultSize
          )
        );
      } else if (event.altKey) {
        if (this.selectedPoint.x == 10000) {
          this.selectedPoint = new Vector2(
            inputs.mouseCoords.x,
            inputs.mouseCoords.y
          );
        } else {
          this.physicsEngine.addBody(
            new WallBody(
              0,
              this.selectedPoint,
              inputs.mouseCoords.subtract(this.selectedPoint)
            )
          );

          this.selectedPoint = new Vector2(10000, 0);
        }
      } else {
        if (this.selectedPoint.x == 10000) {
          this.selectedPoint = new Vector2(
            inputs.mouseCoords.x,
            inputs.mouseCoords.y
          );
        } else {
          this.physicsEngine.addBody(
            new SpringBody(
              settings.defaultMass,
              this.selectedPoint,
              10,
              new BlockBody(
                settings.defaultMass,
                new Vector2(inputs.mouseCoords.x, inputs.mouseCoords.y),
                settings.defaultSize
              )
            )
          );

          this.selectedPoint = new Vector2(10000, 0);
        }
      }
    });
  }
}
