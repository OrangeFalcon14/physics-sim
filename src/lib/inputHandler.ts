import { inputs, settings, Modes } from "../state.svelte";
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
      if (inputs.mode == Modes.SpawnBlock) {
        this.physicsEngine.addBody(
          new BlockBody(
            settings.defaultMass,
            new Vector2(inputs.mouseCoords.x, inputs.mouseCoords.y),
            settings.defaultSize
          )
        );
      } else if (inputs.mode == Modes.SpawnWall) {
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
      } else if (inputs.mode == Modes.SpawnSpring) {
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
      } else if (inputs.mode == Modes.Select) {
        for (let i = 0; i < this.physicsEngine.bodies.length; i++) {
          const body = this.physicsEngine.bodies[i];
          if (body instanceof BlockBody) {
            if (
              inputs.mouseCoords.subtract(body.position).length() <= body.radius
            ) {
              inputs.selectedObj = body.id;
            }
          } else if (body instanceof WallBody) {
            if (
              inputs.mouseCoords.x >= body.position.x &&
              inputs.mouseCoords.x <= body.position.x + body.size.x &&
              inputs.mouseCoords.y >= body.position.y &&
              inputs.mouseCoords.y <= body.position.y + body.size.y
            ) {
              inputs.selectedObj = body.id;
            }
          } else if (body instanceof SpringBody) {
            if (
              inputs.mouseCoords.subtract(body.position).length() <= 10 ||
              inputs.mouseCoords.subtract(body.body.position).length() <=
                body.body.radius
            ) {
              inputs.selectedObj = body.id;
            }
          }
        }
      }
    });
    window.addEventListener("keypress", (event) => {
      if (event.key == "a") {
        switch (inputs.mode) {
          case Modes.Select:
            inputs.mode = Modes.SpawnBlock;
            settings.paused = false;
            break;
          case Modes.SpawnBlock:
            inputs.mode = Modes.SpawnSpring;
            break;
          case Modes.SpawnSpring:
            inputs.mode = Modes.SpawnWall;
            break;
          case Modes.SpawnWall:
            inputs.mode = Modes.Select;
            settings.paused = true;
            break;

          default:
            break;
        }
        // } else if (event.key == "1") {
        //   this.physicsEngine.addBody(
        //     new WallBody(0, new Vector2(182, 114), new Vector2(577, 91))
        //   );
        //   this.physicsEngine.addBody(
        //     new WallBody(0, new Vector2(182, 114), new Vector2(91, 464))
        //   );
        //   this.physicsEngine.addBody(
        //     new WallBody(0, new Vector2(182, 578), new Vector2(668, 87))
        //   );
        //   this.physicsEngine.addBody(
        //     new WallBody(0, new Vector2(759, 114), new Vector2(91, 464))
        //   );
        // } else if (event.key == "2") {
        //   this.physicsEngine.addBody(
        //     new BlockBody(
        //       30,
        //       new Vector2(this.canvas.width / 3, this.canvas.height / 3),
        //       40
        //     )
        //   );
        //   this.physicsEngine.addBody(
        //     new SpringBody(
        //       30,
        //       new Vector2((2 * this.canvas.width) / 3, this.canvas.height / 3),
        //       40,
        //       new BlockBody(
        //         30,
        //         new Vector2(
        //           (2 * this.canvas.width) / 3,
        //           this.canvas.height / 3 + 100
        //         ),
        //         40
        //       )
        //     )
        //   );
        // } else if (event.key == "3") {
        //   this.physicsEngine.addBody(
        //     new WallBody(0, new Vector2(182, 114), new Vector2(577, 91))
        //   );
        //   this.physicsEngine.addBody(
        //     new WallBody(0, new Vector2(182, 114), new Vector2(91, 464))
        //   );
        //   this.physicsEngine.addBody(
        //     new WallBody(0, new Vector2(182, 578), new Vector2(668, 87))
        //   );
        //   this.physicsEngine.addBody(
        //     new WallBody(0, new Vector2(759, 114), new Vector2(91, 464))
        //   );
        //   this.physicsEngine.addBody(
        //     new SpringBody(
        //       30,
        //       new Vector2((2 * this.canvas.width) / 3, this.canvas.height / 3),
        //       40,
        //       new BlockBody(
        //         30,
        //         new Vector2(
        //           (2 * this.canvas.width) / 3,
        //           this.canvas.height / 3 + 100
        //         ),
        //         40
        //       )
        //     )
        //   );
        // } else if (event.key == "4") {
        //   this.physicsEngine.addBody(
        //     new WallBody(0, new Vector2(182, 114), new Vector2(577, 91))
        //   );
        //   this.physicsEngine.addBody(
        //     new WallBody(0, new Vector2(182, 114), new Vector2(91, 464))
        //   );
        //   this.physicsEngine.addBody(
        //     new WallBody(0, new Vector2(182, 570), new Vector2(668, 87))
        //   );
        //   this.physicsEngine.addBody(
        //     new WallBody(0, new Vector2(759, 114), new Vector2(91, 464))
        //   );
        //   this.physicsEngine.addBody(
        //     new SpringBody(
        //       30,
        //       new Vector2(190, 401),
        //       40,
        //       new BlockBody(30, new Vector2(190 + 500, 401), 40)
        //     )
        //   );
        //   this.physicsEngine.addBody(
        //     new BlockBody(40, new Vector2(260, 500), 40)
        //   );
        // } else if (event.key == "5") {
        settings.gravity = new Vector2(0, 0);
        this.physicsEngine.addBody(
          new BlockBody(
            30,
            new Vector2(225, this.canvas.height / 3),
            40,
            new Vector2(20, 0)
          )
        );
        this.physicsEngine.addBody(
          new SpringBody(
            30,
            new Vector2(this.canvas.width / 2, this.canvas.height / 3),
            40,
            new BlockBody(
              30,
              new Vector2(this.canvas.width / 2, this.canvas.height / 3 + 100),
              40
            )
          )
        );
        this.physicsEngine.addBody(
          new SpringBody(
            30,
            new Vector2(this.canvas.width / 2 + 80, this.canvas.height / 3),
            40,
            new BlockBody(
              30,
              new Vector2(
                this.canvas.width / 2 + 80,
                this.canvas.height / 3 + 100
              ),
              40
            )
          )
        );
        this.physicsEngine.addBody(
          new SpringBody(
            30,
            new Vector2(this.canvas.width / 2 + 160, this.canvas.height / 3),
            40,
            new BlockBody(
              30,
              new Vector2(
                this.canvas.width / 2 + 160,
                this.canvas.height / 3 + 100
              ),
              40
            )
          )
        );
        this.physicsEngine.addBody(
          new SpringBody(
            30,
            new Vector2(this.canvas.width / 2 + 240, this.canvas.height / 3),
            40,
            new BlockBody(
              30,
              new Vector2(
                this.canvas.width / 2 + 240,
                this.canvas.height / 3 + 100
              ),
              40
            )
          )
        );
      }
    });
  }
}
