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
  count: number;
  constructor() {
    this.bodies = [];
    this.count = 0;
  }
  update(delta: number) {
    this.bodies.forEach((body1) => {
      this.bodies.forEach((body2) => {
        if (
          body1 instanceof SpringBody &&
          body2 instanceof SpringBody &&
          body1 !== body2
        ) {
          this.resolveCollision(body1.body, body2.body);
          console.log("Hello");
        } else if (body1 instanceof SpringBody) {
          this.resolveCollision(body1.body, body2);
        } else if (body2 instanceof SpringBody) {
          this.resolveCollision(body1, body2.body);
        }
        if (body1 !== body2) this.resolveCollision(body1, body2);
      });
      if (body1 instanceof BlockBody) body1.update(delta);
      else if (body1 instanceof SpringBody) body1.update(delta);
      else if (body1 instanceof Cannon) body1.update(delta, this);
    });
  }
  resolveCollision(body1: Body, body2: Body) {
    // if (body1 instanceof BlockBody && body2 instanceof BlockBody) {
    //   // let distBetweenCenters = body1.position.subtract(body2.position).length();
    //   // if (distBetweenCenters < body1.radius + body2.radius) {
    //   //   // body1.force = normal.scale(
    //   //   //   distBetweenCenters - (body1.radius + body2.radius)
    //   //   // );
    //   //   // body2.force = new Vector2(-body1.force.x, -body1.force.y);
    //   //   // body1.position = body1.position.subtract(
    //   //   //   normal.scale(-distBetweenCenters / 2)
    //   //   // );
    //   //   // body2.position = body2.position.subtract(
    //   //   //   normal.scale(distBetweenCenters / 2)
    //   //   // );
    //   //   let normal = body1.position.subtract(body2.position).normalize();
    //   //   const overlap = body1.radius + body2.radius - distBetweenCenters;
    //   //   const epsilon = 0.001;
    //   //   if (overlap > epsilon) {
    //   //     // resolve overlap
    //   //     body1.position = body1.position.subtract(normal.scale(overlap / 2));
    //   //     body2.position = body2.position.add(normal.scale(overlap / 2));
    //   //   }
    //   let delta = body1.position.subtract(body2.position);
    //   let dist = delta.length();
    //   let minDist = body1.radius + body2.radius;

    //   if (dist < minDist) {
    //     let normal = delta.normalize();
    //     let overlap = minDist - dist;
    //     let epsilon = 0.1;

    //     if (dist === 0) {
    //       const angle = Math.random() * Math.PI * 2;
    //       normal = new Vector2(Math.cos(angle), Math.sin(angle));
    //     }

    //     if (overlap > 1) overlap = 1;

    //     // Position correction (what you already have)
    //     if (overlap > epsilon) {
    //       // body1.position = body1.position.add(normal.scale(overlap / 2));
    //       // body2.position = body2.position.subtract(normal.scale(overlap / 2));
    //     }

    //     console.log(overlap);

    //     let relativeVelocity = body1.velocity.subtract(body2.velocity);
    //     let velAlongNormal = relativeVelocity.dot(normal);

    //     // Only resolve if they are moving toward each other
    //     if (velAlongNormal < 0 && false) {
    //       // Coefficient of restitution (1 = perfectly elastic, 0 = inelastic)
    //       let restitution = 1.0;

    //       // Calculate impulse scalar
    //       let impulseMagnitude = -(1 + restitution) * velAlongNormal;
    //       impulseMagnitude /= 1 / body1.mass + 1 / body2.mass;

    //       // Apply impulse
    //       let impulse = normal.scale(impulseMagnitude);
    //       body1.velocity = body1.velocity.add(impulse.scale(1 / body1.mass));
    //       body2.velocity = body2.velocity.subtract(
    //         impulse.scale(1 / body2.mass)
    //       );
    //     }
    //   }
    // }
    if (body1 instanceof BlockBody && body2 instanceof BlockBody) {
      let overlap = body2.position.subtract(body1.position);
      if (overlap.length() < body1.radius + body2.radius) {
        let normal = overlap.normalize();

        let relative_velocity_along_normal = normal.scale(
          body2.velocity.subtract(body1.velocity).dot(normal)
        );

        if (body2.velocity.subtract(body1.velocity).dot(normal) > 0) return;

        let impulse = relative_velocity_along_normal.scale(
          -(1 + settings.coeffecientOfRestitution) /
            (1 / body1.mass + 1 / body2.mass)
        );

        body1.velocity = body1.velocity.subtract(impulse.scale(1 / body1.mass));
        body2.velocity = body2.velocity.add(impulse.scale(1 / body2.mass));

        // let perp_velocity = body2.velocity.subtract(
        //   normal.scale(body2.velocity.dot(normal))
        // );

        // let parallel_velocity = body2.velocity
        //   .normalize()
        //   .scale(body2.velocity.dot(normal));

        // // body2.velocity = body2.velocity
        // //   .subtract(perp_velocity.scale(2))
        // //   .scale(settings.coeffecientOfRestitution);

        // body2.velocity = body2.velocity
        //   .subtract(parallel_velocity.scale(2))
        //   .scale(settings.coeffecientOfRestitution);

        // normal = normal.scale(-1);
        // perp_velocity = body1.velocity.subtract(
        //   normal.scale(normal.dot(body1.velocity))
        // );

        // normal = normal.scale(-1);
        // // perp_velocity = body1.velocity.subtract(
        // //   normal.scale(normal.dot(body1.velocity))
        // // );
        // parallel_velocity = body1.velocity
        //   .normalize()
        //   .scale(body1.velocity.dot(normal));

        // // body1.velocity = body1.velocity
        // //   .subtract(perp_velocity.scale(2))
        // // .scale(settings.coeffecientOfRestitution);
        // body1.velocity = body1.velocity
        //   .subtract(parallel_velocity.scale(2))
        //   .scale(settings.coeffecientOfRestitution);
      }
    } else if (body1 instanceof FloorBody && body2 instanceof BlockBody) {
      let overlap =
        Math.tan(body1.angle) * body2.position.x -
        body2.position.y +
        body1.position.y;
      if (overlap < body2.radius) {
        let normal = body1.getNormal();
        let perp_velocity = body2.velocity.subtract(
          normal.scale(normal.dot(body2.velocity))
        );
        body2.velocity = body2.velocity
          .subtract(perp_velocity.scale(2))
          .scale(settings.coeffecientOfRestitution);
        body2.applyForce(
          body1
            .getNormal()
            .scale(
              body2.mass * settings.gravity.length() * Math.cos(body1.angle)
            )
        );
      }
    } else if (
      body1 instanceof BlockBody &&
      body2 instanceof WallBody &&
      !(body2 instanceof Cannon)
    ) {
      if (
        body1.position.x + body1.radius > body2.position.x &&
        body1.position.x - body1.radius < body2.position.x + body2.size.x &&
        body1.position.y + body1.radius > body2.position.y &&
        body1.position.y - body1.radius < body2.position.y + body2.size.y
      ) {
        const fromLeft = Math.abs(
          body1.position.x + body1.radius - body2.position.x
        );
        const fromRight = Math.abs(
          body2.position.x + body2.size.x - (body1.position.x - body1.radius)
        );
        const fromTop = Math.abs(
          body1.position.y + body1.radius - body2.position.y
        );
        const fromBottom = Math.abs(
          body2.position.y + body2.size.y - (body1.position.y - body1.radius)
        );

        const minOverlap = Math.min(fromLeft, fromRight, fromTop, fromBottom);

        if (minOverlap === fromLeft) {
          body1.position.x = body2.position.x - body1.radius;
          body1.velocity.x *= -1;
        } else if (minOverlap === fromRight) {
          body1.position.x = body2.position.x + body2.size.x + body1.radius;
          body1.velocity.x *= -1;
        } else if (minOverlap === fromTop) {
          body1.position.y = body2.position.y - body1.radius;
          body1.velocity.y *= -1;
        } else {
          body1.position.y = body2.position.y + body2.size.y + body1.radius;
          body1.velocity.y *= -1;
        }
      }
    }
  }
  addBody(body: Body) {
    body.id = this.count;
    this.bodies.push(body);
    settings.physicsEngine = settings.physicsEngine;
    this.count++;
  }
  deleteBody(id: number) {
    let newbodies: Array<Body> = [];
    for (const body of this.bodies) {
      if (body.id != id) newbodies.push(body);
    }
    this.bodies = newbodies;
  }
}

export class Body {
  position: Vector2;
  velocity: Vector2;
  force: Vector2;
  mass: number;
  forces: Array<Vector2>;
  id: number;
  constructor(
    mass: number,
    pos: Vector2,
    velocity: Vector2 = new Vector2(0, 0)
  ) {
    this.mass = mass;
    this.position = pos;
    this.velocity = velocity;
    this.force = new Vector2(0, 0);
    this.forces = [];
    this.id = -1;
  }
  applyForce(force: Vector2) {
    this.forces.push(force);
  }
}

export class BlockBody extends Body {
  radius: number;
  constructor(
    mass: number,
    position: Vector2,
    radius: number,
    velocity?: Vector2
  ) {
    super(mass, position);
    this.radius = radius;
    if (velocity != null) this.velocity = velocity;
  }
  update(delta: number) {
    this.applyForce(settings.gravity.scale(this.mass));

    this.forces.forEach((force) => {
      this.force = this.force.add(force);
    });

    this.forces.length = 0;

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

export class SpringBody extends Body {
  spring_constant: number;
  body: BlockBody;
  constructor(
    mass: number,
    mean_position: Vector2,
    spring_constant: number,
    body: BlockBody
  ) {
    super(mass, mean_position);
    this.spring_constant = spring_constant;
    this.body = body;
  }
  update(delta: number) {
    let spring_force = this.body.position
      .subtract(this.position)
      .scale(-1 * this.spring_constant);
    this.body.applyForce(spring_force);
    this.body.update(delta);
  }
}

export class WallBody extends Body {
  size: Vector2;
  constructor(mass: number, position: Vector2, size: Vector2) {
    super(mass, position);
    this.size = size;
  }
}

export class Cannon extends WallBody {
  aliveTime: number;
  cannonBallData: { mass: number; radius: number; velocity: Vector2 };
  shotInterval: number;
  constructor(
    mass: number,
    position: Vector2,
    size: Vector2,
    shotInterval: number,
    cannonBallData: { mass: number; radius: number; velocity: Vector2 }
  ) {
    super(mass, position, size);
    this.aliveTime = 0;
    this.shotInterval = shotInterval;
    this.cannonBallData = cannonBallData;
  }
  update(delta: number, physicsEngine: PhysicsEngine) {
    this.aliveTime += 1;
    if (this.aliveTime % this.shotInterval == 0) {
      console.log(this.position.x);

      this.shootCannonball(physicsEngine);
    }
  }
  shootCannonball(physicsEngine: PhysicsEngine) {
    physicsEngine.addBody(
      new BlockBody(
        this.cannonBallData.mass,
        new Vector2(
          this.position.x + this.size.x / 2,
          this.position.y + this.cannonBallData.radius
        ),
        this.cannonBallData.radius,
        this.cannonBallData.velocity
      )
    );
  }
}
