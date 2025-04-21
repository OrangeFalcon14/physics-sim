import { Vector2 } from "../utils/vectors";
import { settings } from "../state.svelte";
import { Body, BodyTypes, PhysicsEngine } from "./physicsEngine";

export class Renderer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  position: Vector2;
  physicsEngine: PhysicsEngine;
  constructor(element: HTMLCanvasElement, physicsEngine: PhysicsEngine) {
    this.canvas = element;
    this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    this.position = new Vector2(0, 0);
    this.physicsEngine = physicsEngine;
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

    setInterval(() => {
      this.renderloop(1 / settings.FPS);
    }, 1 / settings.FPS);
  }

  renderBody(body: Body) {
    if (body.type == BodyTypes.Block) {
      this.context.fillStyle = "#eee";
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
