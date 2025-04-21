export class Vector2 {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  normalize() {
    let magnitude = this.x / Math.sqrt(this.x ** 2 + this.y ** 2);
    return new Vector2(this.x / magnitude, this.y / magnitude);
  }
  length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  length_squared() {
    return this.x ** 2 + this.y ** 2;
  }
  add(vec2: Vector2) {
    return new Vector2(this.x + vec2.x, this.y + vec2.y);
  }
  subtract(vec2: Vector2) {
    return new Vector2(this.x - vec2.x, this.y - vec2.y);
  }
  dot(vec2: Vector2) {
    return this.x * vec2.x + this.y * vec2.y;
  }
  scale(factor: number) {
    return new Vector2(this.x * factor, this.y * factor);
  }
}
