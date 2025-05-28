import { settings } from "../state.svelte";
import { Vector2 } from "../utils/vectors";

export enum BodyTypes {
  Block,
  Floor,
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
    this.bodies.forEach((body1) => {
      this.bodies.forEach((body2) => {
        if (body1 !== body2) this.resolveCollision(body1, body2);
      });
      if (body1 instanceof BlockBody) body1.update(delta);
    });
  }
  resolveCollision(body1: Body, body2: Body) {
    if (body1 instanceof BlockBody && body2 instanceof BlockBody) {
      // let distBetweenCenters = body1.position.subtract(body2.position).length();
      // if (distBetweenCenters < body1.radius + body2.radius) {
      //   // body1.force = normal.scale(
      //   //   distBetweenCenters - (body1.radius + body2.radius)
      //   // );
      //   // body2.force = new Vector2(-body1.force.x, -body1.force.y);
      //   // body1.position = body1.position.subtract(
      //   //   normal.scale(-distBetweenCenters / 2)
      //   // );
      //   // body2.position = body2.position.subtract(
      //   //   normal.scale(distBetweenCenters / 2)
      //   // );
      //   let normal = body1.position.subtract(body2.position).normalize();
      //   const overlap = body1.radius + body2.radius - distBetweenCenters;
      //   const epsilon = 0.001;
      //   if (overlap > epsilon) {
      //     // resolve overlap
      //     body1.position = body1.position.subtract(normal.scale(overlap / 2));
      //     body2.position = body2.position.add(normal.scale(overlap / 2));
      //   }
      let delta = body1.position.subtract(body2.position);
      let dist = delta.length();
      let minDist = body1.radius + body2.radius;

      if (dist < minDist) {
        let normal = delta.normalize();
        let overlap = minDist - dist;
        let epsilon = 0.1;

        if (dist === 0) {
          const angle = Math.random() * Math.PI * 2;
          normal = new Vector2(Math.cos(angle), Math.sin(angle));
        }

        if (overlap > 1) overlap = 1;

        // Position correction (what you already have)
        if (overlap > epsilon) {
          // body1.position = body1.position.add(normal.scale(overlap / 2));
          // body2.position = body2.position.subtract(normal.scale(overlap / 2));
        }

        console.log(overlap);

        let relativeVelocity = body1.velocity.subtract(body2.velocity);
        let velAlongNormal = relativeVelocity.dot(normal);

        // Only resolve if they are moving toward each other
        if (velAlongNormal < 0 && false) {
          // Coefficient of restitution (1 = perfectly elastic, 0 = inelastic)
          let restitution = 1.0;

          // Calculate impulse scalar
          let impulseMagnitude = -(1 + restitution) * velAlongNormal;
          impulseMagnitude /= 1 / body1.mass + 1 / body2.mass;

          // Apply impulse
          let impulse = normal.scale(impulseMagnitude);
          body1.velocity = body1.velocity.add(impulse.scale(1 / body1.mass));
          body2.velocity = body2.velocity.subtract(
            impulse.scale(1 / body2.mass)
          );
        }
      }
    }
    if (body1 instanceof FloorBody && body2 instanceof BlockBody) {
      // let overlap = body1.position.y - (body2.position.y + body2.radius);
      // if (overlap < 0) {
      //   body2.position.y = body1.position.y - body2.radius;
      // }
    }
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
  constructor(
    mass: number,
    pos: Vector2,
    velocity: Vector2 = new Vector2(0, 0)
  ) {
    this.mass = mass;
    this.position = pos;
    this.velocity = velocity;
    this.force = new Vector2(0, 0);
  }
}

export class BlockBody extends Body {
  radius: number;
  constructor(mass: number, position: Vector2, radius: number) {
    super(mass, position);
    this.radius = radius;
  }
  update(delta: number) {
    this.force = this.force.add(settings.gravity.scale(this.mass));

    this.velocity = this.velocity.add(this.force.scale(delta / this.mass));
    this.position = this.position.add(this.velocity.scale(delta));

    this.force = new Vector2(0, 0);
  }
}

export class FloorBody extends Body {
  angle: number;
  constructor(mass: number, position: Vector2, angle: number) {
    super(mass, position);
    this.angle = angle;
  }
  getNormal() {
    return new Vector2(Math.cos(this.angle), Math.sin(this.angle));
  }
}
