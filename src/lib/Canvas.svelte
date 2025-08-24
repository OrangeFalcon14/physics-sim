<script lang="ts">
  import { onMount } from "svelte";
  import { Renderer } from "./renderer.svelte";
  import { BlockBody, Body, FloorBody, PhysicsEngine } from "./physicsEngine";
  import { InputHandler } from "./inputHandler";
  import { Vector2 } from "../utils/vectors";

  let renderer: Renderer,
    physicsEngine: PhysicsEngine,
    inputHandler: InputHandler;

  onMount(() => {
    let canvas = <HTMLCanvasElement>document.querySelector("#render-canvas");

    physicsEngine = new PhysicsEngine();

    inputHandler = new InputHandler(canvas, physicsEngine);
    inputHandler.listen();

    renderer = new Renderer(canvas, physicsEngine);
    renderer.start();

    // physicsEngine.addBody(
    //   new FloorBody(0, new Vector2(0, canvas.height - 400), Math.PI / 4)
    // );
    // physicsEngine.addBody(
    //   new FloorBody(0, new Vector2(0, canvas.height + 400), -Math.PI / 4)
    // );
    physicsEngine.addBody(
      new FloorBody(0, new Vector2(0, canvas.height - 300), 0)
    );

    // physicsEngine.addBody(
    //   new FloorBody(0, new Vector2(0, canvas.height - 400), Math.PI / 20)
    // );
  });
</script>

<div class="canvas-container">
  <!-- <div class="debug-container">
    <input
      type="checkbox"
      name="debug"
      id="debug"
      on:change={() => {
        renderer.debug = !renderer.debug;
        renderer.start();
      }}
    />
    <label for="debug">Debug</label>
  </div> -->
  <canvas id="render-canvas"> </canvas>
</div>

<style>
  .canvas-container {
    width: 100%;
    height: 100%;
    background: hsl(var(--hue), 0%, 20%);
  }
  #render-canvas {
    background: hsl(var(--hue), 0%, 20%);
  }
  .debug-container {
    position: fixed;
    color: white;
    margin: 0.5em 0 0 0.5em;
  }
</style>
