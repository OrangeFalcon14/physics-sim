<script>
  import { inputs, Modes, settings } from "../state.svelte";
  import {
    BlockBody,
    Body,
    FloorBody,
    SpringBody,
    WallBody,
  } from "./physicsEngine";

  let bodies = $state(settings.physicsEngine.bodies);

  setInterval(() => {
    bodies = settings.physicsEngine.bodies;
  }, 100);
</script>

<main>
  <div class="panel left-panel">
    <div class="panel-header">
      <div class="panel-title">
        <div class="icon-box">
          <div class="grid-icon">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
        <h2>Physics Objects</h2>
      </div>
      <div class="badge">5</div>
    </div>

    <div class="search-section">
      <div class="search-box">
        <svg
          class="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input type="text" placeholder="Search objects..." />
      </div>

      <div class="filter-row">
        <select class="filter-select">
          <option>All Types</option>
          <option>Balls</option>
          <option>Blocks</option>
          <option>Springs</option>
        </select>
        <button class="filter-btn">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
          </svg>
        </button>
      </div>
    </div>

    <div class="objects-list">
      {#each bodies as body}
        <div
          class="object-item"
          class:selected={body.id == inputs.selectedObj}
          onclick={() => (inputs.selectedObj = body.id)}
        >
          <div class="object-info">
            <div
              class="object-icon"
              class:ball-icon={body instanceof BlockBody}
              class:block-icon={body instanceof WallBody}
              class:spring-icon={body instanceof SpringBody}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </div>
            <div class="object-details">
              <h3>
                {#if body instanceof BlockBody}
                  Block {body.id}
                {:else if body instanceof WallBody}
                  Wall {body.id}
                {:else if body instanceof SpringBody}
                  Spring {body.id}
                {:else if body instanceof FloorBody}
                  Floor {body.id}
                {/if}
              </h3>
              <p>
                {#if body instanceof BlockBody || body instanceof SpringBody}
                  Dynamic
                {:else if body instanceof WallBody}
                  Static
                {/if} Body
              </p>
            </div>
          </div>
          <div class="object-actions">
            <button
              class="action-btn"
              onclick={() => {
                settings.physicsEngine.deleteBody(body.id);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="3,6 5,6 21,6"></polyline>
                <path
                  d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      {/each}
    </div>

    <div class="panel-footer">
      <div class="type-buttons">
        <button
          class="btn type-btn ball-btn"
          class:active={inputs.mode == Modes.SpawnWall}
          onclick={() => {
            inputs.mode = Modes.SpawnWall;
            inputs.selectedObj = -1;
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          </svg>

          Wall
        </button>
        <button
          class="btn type-btn block-btn"
          class:active={inputs.mode == Modes.SpawnBlock}
          onclick={() => {
            inputs.mode = Modes.SpawnBlock;
            inputs.selectedObj = -1;
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
          </svg>

          Block
        </button>
        <button
          class="btn type-btn spring-btn"
          class:active={inputs.mode == Modes.SpawnSpring}
          onclick={() => {
            inputs.mode = Modes.SpawnSpring;
            inputs.selectedObj = -1;
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
            ></path>
            <path
              d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
            ></path>
          </svg>
          Spring
        </button>
      </div>
    </div>
  </div>
</main>

<style>
  main {
    height: 100vh;
    width: 20%;
    flex-grow: 1;
  }
  .panel {
    height: 100vh;
  }
</style>
