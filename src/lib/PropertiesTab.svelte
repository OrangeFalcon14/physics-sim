<script lang="ts">
  import { inputs, settings } from "../state.svelte";
  import {
    BlockBody,
    Body,
    FloorBody,
    SpringBody,
    WallBody,
  } from "./physicsEngine";
  let body = $state();
  $effect(() => {
    for (let i = 0; i < settings.physicsEngine.bodies.length; i++) {
      if (settings.physicsEngine.bodies[i].id == inputs.selectedObj) {
        body = settings.physicsEngine.bodies[i];
        console.log(body);
      }
    }
    if (body instanceof Body) {
      pos_x = body.position.x.toFixed(2);
      pos_y = body.position.y.toFixed(2);
      vel_x = body.velocity.x.toFixed(2);
      vel_y = body.velocity.y.toFixed(2);
    }
  });
  let pos_x = $state();
  let pos_y = $state();
  let vel_x = $state();
  let vel_y = $state();
</script>

<main>
  <div class="panel right-panel">
    <div class="panel-header">
      <div class="panel-title">
        <h2>Properties</h2>
      </div>
    </div>

    {#if inputs.selectedObj != -1 && typeof body !== "undefined" && body instanceof Body}
      <div class="selected-object">
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
      </div>

      <div class="properties-content">
        <div class="property-section">
          <!-- <h3>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
            Basic Properties
          </h3>

          <div class="form-group">
            <label>Name</label>
            <input type="text" value="Red Ball" readonly />
          </div>

          <div class="form-group">
            <label>Body Type</label>
            <select>
              <option selected>Dynamic (Rigid Body)</option>
              <option>Kinematic Body</option>
              <option>Static Body</option>
            </select>
          </div>

          <div class="form-group checkbox-group">
            <input type="checkbox" id="visible" checked />
            <label for="visible">Visible in simulation</label>
          </div>
        </div> -->

          {#if body instanceof BlockBody}
            <div class="property-section">
              <h3>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path
                    d="M16 8v5a3 3 0 0 0 6 0v-5a10 10 0 1 0-20 0v5a3 3 0 0 0 6 0v-5h4z"
                  ></path>
                </svg>
                Physical Properties
              </h3>

              <div class="form-group">
                <label>Mass (kg)</label>
                <div class="slider-group">
                  <input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    class="number-input"
                    bind:value={settings.physicsEngine.bodies[
                      inputs.selectedObj
                    ].mass}
                  />
                </div>
              </div>

              <div class="form-group">
                <label>Radius (m)</label>
                <div class="slider-group">
                  <input
                    type="number"
                    bind:value={settings.physicsEngine.bodies[
                      inputs.selectedObj
                    ].radius}
                    step="1"
                    min="1"
                    max="100"
                    class="number-input"
                  />
                </div>
              </div>
            </div>
            <div class="property-section">
              <h3>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="5,9 9,5 15,11 20,6"></polyline>
                  <polyline points="21,21 21,11 11,21"></polyline>
                </svg>
                Position & Velocity
              </h3>

              <div class="form-group">
                <label>Position X (m)</label>
                <input type="number" bind:value={body.position.x} step="1" />
              </div>

              <div class="form-group">
                <label>Position Y (m)</label>
                <input type="number" bind:value={body.position.y} step="1" />
              </div>

              <div class="form-group">
                <label>Velocity X (m/s)</label>
                <div class="slider-group">
                  <input
                    type="number"
                    bind:value={body.velocity.x}
                    step="1"
                    class="number-input"
                  />
                </div>
              </div>

              <div class="form-group">
                <label>Velocity Y (m/s)</label>
                <div class="slider-group">
                  <input
                    type="number"
                    bind:value={body.velocity.y}
                    step="1"
                    class="number-input"
                  />
                </div>
              </div>
            </div>
          {:else if body instanceof SpringBody}
            <div class="property-section">
              <h3>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path
                    d="M16 8v5a3 3 0 0 0 6 0v-5a10 10 0 1 0-20 0v5a3 3 0 0 0 6 0v-5h4z"
                  ></path>
                </svg>
                Physical Properties
              </h3>

              <div class="form-group">
                <label>Mass (kg)</label>
                <div class="slider-group">
                  <input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    class="number-input"
                    bind:value={settings.physicsEngine.bodies[
                      inputs.selectedObj
                    ].body.mass}
                  />
                </div>
              </div>

              <div class="form-group">
                <label>Radius (m)</label>
                <div class="slider-group">
                  <input
                    type="number"
                    bind:value={settings.physicsEngine.bodies[
                      inputs.selectedObj
                    ].body.radius}
                    step="1"
                    min="1"
                    max="100"
                    class="number-input"
                  />
                </div>
              </div>

              <div class="form-group">
                <label>Spring Constant (m)</label>
                <div class="slider-group">
                  <input
                    type="number"
                    bind:value={settings.physicsEngine.bodies[
                      inputs.selectedObj
                    ].spring_constant}
                    step="1"
                    min="1"
                    max="100"
                    class="number-input"
                  />
                </div>
              </div>
            </div>
            <div class="property-section">
              <h3>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="5,9 9,5 15,11 20,6"></polyline>
                  <polyline points="21,21 21,11 11,21"></polyline>
                </svg>
                Position & Velocity
              </h3>

              <div class="form-group">
                <label>Block Position X (m)</label>
                <input
                  type="number"
                  bind:value={body.body.position.x}
                  step="1"
                />
              </div>

              <div class="form-group">
                <label>Block Position Y (m)</label>
                <input
                  type="number"
                  bind:value={body.body.position.y}
                  step="1"
                />
              </div>

              <div class="form-group">
                <label>Mean Position X (m)</label>
                <input type="number" bind:value={body.position.x} step="1" />
              </div>

              <div class="form-group">
                <label>Mean Position Y (m)</label>
                <input type="number" bind:value={body.position.y} step="1" />
              </div>

              <div class="form-group">
                <label>Velocity X (m/s)</label>
                <div class="slider-group">
                  <input
                    type="number"
                    bind:value={body.body.velocity.x}
                    step="1"
                    class="number-input"
                  />
                </div>
              </div>

              <div class="form-group">
                <label>Velocity Y (m/s)</label>
                <div class="slider-group">
                  <input
                    type="number"
                    bind:value={body.body.velocity.y}
                    step="1"
                    class="number-input"
                  />
                </div>
              </div>
            </div>
          {:else if body instanceof WallBody}
            <div class="property-section">
              <h3>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path
                    d="M16 8v5a3 3 0 0 0 6 0v-5a10 10 0 1 0-20 0v5a3 3 0 0 0 6 0v-5h4z"
                  ></path>
                </svg>
                Physical Properties
              </h3>

              <div class="form-group">
                <label>Top Left X</label>
                <input type="number" bind:value={body.position.x} step="1" />
              </div>

              <div class="form-group">
                <label>Top Left Y</label>
                <input type="number" bind:value={body.position.y} step="1" />
              </div>
              <div class="form-group">
                <label>Width</label>
                <input type="number" bind:value={body.size.x} step="1" />
              </div>

              <div class="form-group">
                <label>Height</label>
                <input type="number" bind:value={body.size.y} step="1" />
              </div>
            </div>
          {:else}
            <div></div>
          {/if}
          <div class="property-section">
            <h3>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              Appearance
            </h3>

            <div class="form-group">
              <label>Color</label>
              <div class="color-group">
                <input
                  type="color"
                  bind:value={body.color}
                  class="color-input"
                />
              </div>
            </div>

            <!-- <div class="form-group">
              <label>Opacity</label>
              <div class="slider-group">
                <input
                  type="number"
                  value="1.0"
                  step="0.1"
                  class="number-input"
                />
              </div>
            </div> -->
          </div>
        </div>
      </div>
    {:else}
      <!-- <p >No object selected</p> -->
    {/if}
  </div>
</main>

<style>
  main {
    height: 100vh;
    width: 20vw;
    flex-grow: 1;
  }
</style>
