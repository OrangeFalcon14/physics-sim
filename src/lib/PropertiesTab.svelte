<main>
  <div class="panel right-panel">
    <div class="panel-header">
      <div class="panel-title">
        <h2>Properties</h2>
      </div>
    </div>

    <div class="selected-object">
      <div class="object-info">
        <div class="object-icon ball-icon">
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
          <h3>Red Ball</h3>
          <p>Rigid Body</p>
        </div>
      </div>
    </div>

    <div class="properties-content">
      <div class="property-section">
        <h3>
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
      </div>

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
            <input type="number" value="1.5" step="0.1" class="number-input" />
          </div>
        </div>

        <div class="form-group">
          <label>Radius (m)</label>
          <div class="slider-group">
            <input type="number" value="0.5" step="0.1" class="number-input" />
          </div>
        </div>

        <div class="form-group">
          <label>Friction</label>
          <div class="slider-group">
            <input type="number" value="0.3" step="0.05" class="number-input" />
          </div>
        </div>

        <div class="form-group">
          <label>Restitution</label>
          <div class="slider-group">
            <input type="number" value="0.8" step="0.05" class="number-input" />
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
          <input type="number" value="2.5" step="0.1" />
        </div>

        <div class="form-group">
          <label>Position Y (m)</label>
          <input type="number" value="1.2" step="0.1" />
        </div>

        <div class="form-group">
          <label>Velocity X (m/s)</label>
          <div class="slider-group">
            <input type="number" value="0" step="0.1" class="number-input" />
          </div>
        </div>

        <div class="form-group">
          <label>Velocity Y (m/s)</label>
          <div class="slider-group">
            <input type="number" value="0" step="0.1" class="number-input" />
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
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            ></path>
          </svg>
          Appearance
        </h3>

        <div class="form-group">
          <label>Color</label>
          <div class="color-group">
            <input type="color" value="#EF4444" class="color-input" />
          </div>
        </div>

        <div class="form-group">
          <label>Opacity</label>
          <div class="slider-group">
            <input type="number" value="1.0" step="0.1" class="number-input" />
          </div>
        </div>
      </div>
    </div>

    <div class="panel-footer">
      <button class="btn primary">Apply Changes</button>
      <button class="btn secondary">Reset</button>
    </div>
  </div>
</main>

<style>
  main {
    height: 100vh;
    width: 20vw;
    flex-grow: 1;
  }
</style>
