<script lang="ts">
  import { onMount } from "svelte";
  import { Renderer } from "./renderer.svelte";
  import {
    BlockBody,
    Body,
    Cannon,
    FloorBody,
    PhysicsEngine,
  } from "./physicsEngine";
  import { InputHandler } from "./inputHandler";
  import { Vector2 } from "../utils/vectors";
  import { settings } from "../state.svelte";

  export let renderer: Renderer;
  export let physicsEngine: PhysicsEngine;
  export let inputHandler: InputHandler;

  onMount(() => {
    let canvas = <HTMLCanvasElement>document.querySelector("#render-canvas");

    physicsEngine = new PhysicsEngine();
    settings.physicsEngine = physicsEngine;

    inputHandler = new InputHandler(canvas, physicsEngine);
    inputHandler.listen();

    renderer = new Renderer(canvas, physicsEngine);
    renderer.start();

    setTimeout(() => {
      canvas.width = <number>canvas.parentElement?.clientWidth;
      canvas.height = <number>canvas.parentElement?.clientHeight;
    }, 100);
    setTimeout(() => {
      canvas.width = <number>canvas.parentElement?.clientWidth;
      canvas.height = <number>canvas.parentElement?.clientHeight;
    }, 101);
    setTimeout(() => {
      canvas.width = <number>canvas.parentElement?.clientWidth;
      canvas.height = <number>canvas.parentElement?.clientHeight;
    }, 102);
    setTimeout(() => {
      canvas.width = <number>canvas.parentElement?.clientWidth;
      canvas.height = <number>canvas.parentElement?.clientHeight;
    }, 103);
    setTimeout(() => {
      canvas.width = <number>canvas.parentElement?.clientWidth;
      canvas.height = <number>canvas.parentElement?.clientHeight;
    }, 104);
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
    //   new Cannon(
    //     0,
    //     new Vector2(100, canvas.height - 300 - 100),
    //     new Vector2(70, 100),
    //     400,
    //     {
    //       mass: 10,
    //       radius: 5,
    //       velocity: new Vector2(1 / 2, -Math.sqrt(3) / 2).scale(100),
    //     }
    //   )
    // );

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
