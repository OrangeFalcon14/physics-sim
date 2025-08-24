import { Vector2 } from "../utils/vectors";
import { settings } from "../state.svelte";
import {
  BlockBody,
  Body,
  BodyTypes,
  FloorBody,
  PhysicsEngine,
  SpringBody,
  WallBody,
} from "./physicsEngine";

export class Renderer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  position: Vector2;
  physicsEngine: PhysicsEngine;
  debug: boolean;
  runner: number;
  constructor(element: HTMLCanvasElement, physicsEngine: PhysicsEngine) {
    this.canvas = element;
    this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    this.position = new Vector2(0, 0);
    this.physicsEngine = physicsEngine;
    this.debug = false;
    this.runner = -1;
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

    $effect(() => {
      console.log("state changed");

      if (settings.paused) {
        clearInterval(this.runner);
        this.runner = -1;
      } else {
        this.runner = setInterval(() => {
          this.renderloop(1 / settings.FPS);
        }, 1 / settings.FPS);
      }
    });

    // this.runner = setInterval(() => {
    //   this.renderloop(1 / settings.FPS);
    // }, 1 / settings.FPS);
    // window.addEventListener("keydown", (event) => {
    //   if (event.key == "a") this.renderloop(1 / settings.FPS);
    // });
  }

  renderBody(body: Body) {
    if (body instanceof BlockBody) {
      this.context.fillStyle = "hsl(240, 30%, 50%)";
      this.context.strokeStyle = "hsl(240, 30%, 50%)";

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
      this.context.strokeStyle = "hsl(240, 30%, 30%)";

      if (body.angle == Math.PI / 2) {
        this.context.fillRect(
          body.position.x,
          0,
          this.canvas.width,
          this.canvas.height
        );
      } else if (Math.tan(body.angle) > 0) {
        this.context.beginPath();
        this.context.moveTo(0, body.position.y);
        this.context.lineTo(
          (this.canvas.height - body.position.y) / Math.tan(body.angle),
          this.canvas.height
        );
        this.context.lineTo(0, this.canvas.height);
        this.context.lineTo(0, body.position.y);
        this.context.fill();
      } else if (Math.tan(body.angle) < 0) {
        this.context.beginPath();
        this.context.moveTo(0, body.position.y);
        this.context.lineTo(-body.position.y / Math.tan(body.angle), 0);
        this.context.lineTo(this.canvas.width, this.canvas.height);
        this.context.lineTo(0, this.canvas.height);
        this.context.lineTo(0, body.position.y);
        this.context.fill();
      } else {
        this.context.fillRect(
          0,
          body.position.y,
          this.canvas.width,
          this.canvas.height - body.position.y
        );
      }
    } else if (body instanceof SpringBody) {
      this.context.fillStyle = "hsl(240, 30%, 50%)";
      this.context.strokeStyle = "hsl(240, 30%, 50%)";
      let amplitude = Math.sqrt(
        body.body.position.subtract(body.position).length_squared() +
          (body.body.mass * body.body.velocity.length_squared()) /
            body.spring_constant
      );
      let displacement = body.body.position.subtract(body.position).length();

      // this.context.strokeStyle = `hsl(${
      //   120 - (displacement / amplitude) * 120
      // }, 46.40%, 46.10%)`;
      this.context.moveTo(body.position.x, body.position.y);
      this.context.lineTo(body.body.position.x, body.body.position.y);

      this.context.stroke();

      this.context.fillStyle = "hsl(154, 46.40%, 46.10%)";

      this.context.beginPath();
      this.context.arc(body.position.x, body.position.y, 10, 0, 2 * Math.PI);
      this.context.fill();

      this.context.fillStyle = "hsl(23, 68.80%, 63.50%)";
      this.context.strokeStyle = "hsl(23, 68.80%, 63.50%)";

      this.context.beginPath();
      this.context.arc(
        body.body.position.x,
        body.body.position.y,
        body.body.radius,
        0,
        2 * Math.PI
      );
      this.context.fill();

      this.context.strokeStyle = "";
    } else if (body instanceof WallBody) {
      this.context.fillStyle = "hsl(240, 30%, 50%)";
      this.context.strokeStyle = "hsl(240, 30%, 50%)";
      this.context.fillRect(
        body.position.x,
        body.position.y,
        body.size.x,
        body.size.y
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
