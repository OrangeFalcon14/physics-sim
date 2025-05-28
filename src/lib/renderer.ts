import { Vector2 } from "../utils/vectors";
import { settings } from "../state.svelte";
import {
  BlockBody,
  Body,
  BodyTypes,
  FloorBody,
  PhysicsEngine,
} from "./physicsEngine";

export class Renderer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  position: Vector2;
  physicsEngine: PhysicsEngine;
  debug: boolean;
  constructor(element: HTMLCanvasElement, physicsEngine: PhysicsEngine) {
    this.canvas = element;
    this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    this.position = new Vector2(0, 0);
    this.physicsEngine = physicsEngine;
    this.debug = false;
  }
  start() {
    this.canvas.width = <number>this.canvas.parentElement?.clientWidth;
    this.canvas.height = <number>this.canvas.parentElement?.clientHeight;

    window.addEventListener("resize", () => {
      this.canvas.width = <number>this.canvas.parentElement?.clientWidth;
      this.canvas.height = <number>this.canvas.parentElement?.clientHeight;
    });
    this.canvas.parentElement?.addEventListener("resize", () => {
      this.canvas.width = <number>this.canvas.parentElement?.clientWidth;
      this.canvas.height = <number>this.canvas.parentElement?.clientHeight;
    });

    if (!this.debug) {
      setInterval(() => {
        this.renderloop(1 / settings.FPS);
      }, 1 / settings.FPS);
    } else {
      window.addEventListener("keydown", (event) => {
        if (event.key == "a") this.renderloop(1 / settings.FPS);
      });
    }
  }

  renderBody(body: Body) {
    if (body instanceof BlockBody) {
      this.context.fillStyle = "hsl(240, 30%, 50%)";

      this.context.beginPath();
      this.context.arc(
        body.position.x,
        body.position.y,
        body.radius,
        0,
        2 * Math.PI
      );
      this.context.fill();

      //   this.context.strokeStyle = "hsl(240, 30%, 90%)";
      //   this.context.arc(
      //     body.position.x,
      //     body.position.y,
      //     body.radius + 2,
      //     0,
      //     2 * Math.PI
      //   );
      //   this.context.stroke();
    } else if (body instanceof FloorBody) {
      this.context.fillStyle = "hsl(240, 30%, 30%)";

      this.context.fillRect(
        0,
        body.position.y,
        this.canvas.width,
        this.canvas.height - body.position.y
      );
    }
  }

  renderloop(delta: number) {
    this.context.fillStyle = "hsl(240, 10%, 15%)";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.physicsEngine.update(delta);

    this.physicsEngine.bodies.forEach((body) => {
      this.renderBody(body);
    });
  }
}
