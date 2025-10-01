<script lang="ts">
  import { inputs, Modes, settings } from "../state.svelte";
  import { Vector2 } from "../utils/vectors";
  import Canvas from "./Canvas.svelte";

  let gravity = $state(settings.gravity.y);

  $effect(() => {
    settings.gravity = new Vector2(0, gravity);
  });

  let count = $state(settings.physicsEngine.count);
</script>

<main>
  <div class="panel center-panel">
    <div class="simulation-toolbar">
      <div class="toolbar-left">
        <button
          class="btn success"
          onclick={() => (settings.paused = !settings.paused)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polygon points="5,3 19,12 5,21"></polygon>
          </svg>
          {#if settings.paused}
            Play
          {:else}
            Pause
          {/if}
        </button>
        <button class="btn secondary">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="1,4 1,10 7,10"></polyline>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
          </svg>
          Reset
        </button>
      </div>

      <div class="toolbar-right">
        <!-- <div class="control-group">
                <label>Speed:</label>
                <input type="range" min="0.1" max="3" step="0.1" value="1" class="slider" />
                <span>1.0x</span>
              </div> -->

        <div class="control-group">
          <label>Gravity:</label>
          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            class="slider"
            bind:value={gravity}
          />
          <span>{gravity}</span>
        </div>

        <div class="view-controls">
          <button class="btn icon-btn active">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <path d="M9 9h6v6H9z"></path>
            </svg>
          </button>
          <button class="btn icon-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M22 2L11 13"></path>
              <polygon points="22,2 15,22 11,13 2,9"></polygon>
            </svg>
          </button>
          <button class="btn icon-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M15 3h6v6"></path>
              <path d="M10 14l11-11"></path>
              <path d="M21 3l-7 7"></path>
              <path d="M3 21h6v-6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="simulation-canvas">
      <Canvas />

      <div class="canvas-overlay">
        <div class="canvas-info">
          <span>FPS: 60</span>
          <span>Objects: {count}</span>
          <span>Time: 02:34</span>
        </div>

        <div class="canvas-tools">
          <button
            class="btn icon-btn"
            class:active={inputs.mode == Modes.Select}
            onclick={() => {
              inputs.mode = Modes.Select;
              settings.paused = true;
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
              <path d="M13 13l6 6"></path>
            </svg>
          </button>
          <button class="btn icon-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v7"></path>
              <path d="M14 13v4a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2v-2"></path>
              <path
                d="M14 13a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2z"
              ></path>
            </svg>
          </button>
          <button class="btn icon-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
              <circle cx="11" cy="11" r="3"></circle>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  main {
    height: 100vh;
    flex-grow: 3;
  }
  .panel {
    height: 100vh;
  }
</style>
