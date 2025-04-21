import { settings } from "../state.svelte";
import { Vector2 } from "../utils/vectors";

export enum BodyTypes {
  Block,
  Cannon,
  Cannonball,
  Wall,
  Spring,
  String,
}

export class PhysicsEngine {
  bodies: Array<Body>;
  constructor() {
    this.bodies = [];
  }
  update(delta: number) {
    this.bodies.forEach((body) => {
      body.update(delta);
    });
  }
  addBody(body: Body) {
    this.bodies.push(body);
  }
}

export class Body {
  position: Vector2;
  velocity: Vector2;
  force: Vector2;
  mass: number;
  type: BodyTypes;
  size: Vector2;
  constructor(
    mass: number,
    pos: Vector2,
    size: Vector2,
    type: BodyTypes = BodyTypes.Block,
    velocity: Vector2 = new Vector2(0, 0)
  ) {
    this.type = type;
    this.mass = mass;
    this.position = pos;
    this.velocity = velocity;
    this.force = new Vector2(0, 0);
    this.size = size;
  }
  update(delta: number) {
    this.force = this.force.add(settings.gravity.scale(this.mass));

    this.velocity = this.velocity.add(this.force.scale(delta / this.mass));
    this.position = this.position.add(this.velocity.scale(delta));

    this.force = new Vector2(0, 0);
  }
}
