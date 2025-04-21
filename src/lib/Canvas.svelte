<script lang="ts">
  import { onMount } from "svelte";
  import { Renderer } from "./renderer";
  import { PhysicsEngine } from "./physicsEngine";
  import { InputHandler } from "./inputHandler";

  onMount(() => {
    let canvas = <HTMLCanvasElement>document.querySelector("#render-canvas");

    let physicsEngine = new PhysicsEngine();
    let inputHandler = new InputHandler(canvas, physicsEngine);
    inputHandler.listen();
    let renderer = new Renderer(canvas, physicsEngine);
    renderer.start();
  });
</script>

<div class="canvas-container">
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
</style>
