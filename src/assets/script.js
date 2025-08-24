// // Canvas setup and physics simulation mockup
// class PhysicsSimulator {
//   constructor() {
//     this.canvas = document.getElementById("physicsCanvas");
//     this.ctx = this.canvas.getContext("2d");
//     this.objects = [
//       {
//         id: 1,
//         type: "ball",
//         x: 160,
//         y: 80,
//         radius: 32,
//         color: "#EF4444",
//         selected: true,
//       },
//       {
//         id: 2,
//         type: "block",
//         x: 450,
//         y: 120,
//         width: 80,
//         height: 80,
//         color: "#10B981",
//         selected: false,
//       },
//       {
//         id: 3,
//         type: "ball",
//         x: 80,
//         y: 200,
//         radius: 24,
//         color: "#3B82F6",
//         selected: false,
//       },
//       {
//         id: 4,
//         type: "block",
//         x: 400,
//         y: 300,
//         width: 96,
//         height: 64,
//         color: "#10B981",
//         selected: false,
//         opacity: 0.3,
//       },
//     ];
//     this.showGrid = true;
//     this.init();
//   }

//   init() {
//     this.resizeCanvas();
//     this.render();
//     window.addEventListener("resize", () => this.resizeCanvas());

//     // Add click handler for object selection
//     this.canvas.addEventListener("click", (e) => this.handleCanvasClick(e));
//   }

//   resizeCanvas() {
//     const container = this.canvas.parentElement;
//     this.canvas.width = container.clientWidth;
//     this.canvas.height = container.clientHeight;
//     this.render();
//   }

//   handleCanvasClick(event) {
//     const rect = this.canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     // Check if click is on any object
//     for (let obj of this.objects) {
//       let hit = false;

//       if (obj.type === "ball") {
//         const distance = Math.sqrt((x - obj.x) ** 2 + (y - obj.y) ** 2);
//         hit = distance <= obj.radius;
//       } else if (obj.type === "block") {
//         hit =
//           x >= obj.x - obj.width / 2 &&
//           x <= obj.x + obj.width / 2 &&
//           y >= obj.y - obj.height / 2 &&
//           y <= obj.y + obj.height / 2;
//       }

//       if (hit) {
//         // Update selection
//         this.objects.forEach((o) => (o.selected = false));
//         obj.selected = true;
//         this.updateSelectedObject(obj);
//         this.render();
//         break;
//       }
//     }
//   }

//   updateSelectedObject(obj) {
//     // Update the selected object display in the right panel
//     const selectedObjectDiv = document.querySelector(".selected-object");
//     const objectInfo = selectedObjectDiv.querySelector(".object-info");

//     const iconClass = obj.type === "ball" ? "ball-icon" : "block-icon";
//     const typeName = obj.type === "ball" ? "Ball" : "Block";
//     const objectName =
//       obj.type === "ball"
//         ? obj.color === "#EF4444"
//           ? "Red Ball"
//           : "Blue Ball"
//         : obj.color === "#10B981"
//         ? "Green Block"
//         : "Large Block";

//     objectInfo.innerHTML = `
//             <div class="object-icon ${iconClass}">
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                     ${
//                       obj.type === "ball"
//                         ? '<circle cx="12" cy="12" r="10"></circle>'
//                         : '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>'
//                     }
//                 </svg>
//             </div>
//             <div class="object-details">
//                 <h3>${objectName}</h3>
//                 <p>Rigid Body</p>
//             </div>
//         `;

//     // Update object list selection
//     const objectItems = document.querySelectorAll(".object-item");
//     objectItems.forEach((item) => item.classList.remove("selected"));

//     // Find and select the corresponding object in the list
//     const objectNames = [
//       "Red Ball",
//       "Green Block",
//       "Blue Ball",
//       "Spring #1",
//       "Large Block",
//     ];
//     const index = objectNames.indexOf(objectName);
//     if (index !== -1 && objectItems[index]) {
//       objectItems[index].classList.add("selected");
//     }
//   }

//   drawGrid() {
//     if (!this.showGrid) return;

//     const gridSize = 50;
//     this.ctx.strokeStyle = "#E5E7EB";
//     this.ctx.lineWidth = 1;

//     for (let x = 0; x <= this.canvas.width; x += gridSize) {
//       this.ctx.beginPath();
//       this.ctx.moveTo(x, 0);
//       this.ctx.lineTo(x, this.canvas.height);
//       this.ctx.stroke();
//     }

//     for (let y = 0; y <= this.canvas.height; y += gridSize) {
//       this.ctx.beginPath();
//       this.ctx.moveTo(0, y);
//       this.ctx.lineTo(this.canvas.width, y);
//       this.ctx.stroke();
//     }
//   }

//   drawObject(obj) {
//     this.ctx.save();

//     // Set opacity
//     this.ctx.globalAlpha = obj.opacity || 1;

//     if (obj.type === "ball") {
//       // Draw ball
//       this.ctx.beginPath();
//       this.ctx.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI);
//       this.ctx.fillStyle = obj.color;
//       this.ctx.fill();

//       // Draw outline
//       this.ctx.strokeStyle = obj.selected ? "#1976D2" : "#374151";
//       this.ctx.lineWidth = obj.selected ? 3 : 1;
//       this.ctx.stroke();
//     } else if (obj.type === "block") {
//       // Draw block
//       this.ctx.fillStyle = obj.color;
//       this.ctx.fillRect(
//         obj.x - obj.width / 2,
//         obj.y - obj.height / 2,
//         obj.width,
//         obj.height
//       );

//       // Draw outline
//       this.ctx.strokeStyle = obj.selected ? "#1976D2" : "#374151";
//       this.ctx.lineWidth = obj.selected ? 3 : 1;
//       this.ctx.strokeRect(
//         obj.x - obj.width / 2,
//         obj.y - obj.height / 2,
//         obj.width,
//         obj.height
//       );
//     }

//     this.ctx.restore();
//   }

//   drawSpring() {
//     // Draw a simple spring representation
//     this.ctx.save();
//     this.ctx.strokeStyle = "#8B5CF6";
//     this.ctx.lineWidth = 4;
//     this.ctx.lineCap = "round";

//     const x = 240;
//     const y = 240;
//     const width = 80;
//     const segments = 6;
//     const amplitude = 10;

//     this.ctx.beginPath();
//     this.ctx.moveTo(x, y);

//     for (let i = 0; i <= segments; i++) {
//       const segmentX = x + (i / segments) * width;
//       const segmentY = y + (i % 2 === 0 ? -amplitude : amplitude);
//       this.ctx.lineTo(segmentX, segmentY);
//     }

//     this.ctx.stroke();
//     this.ctx.restore();
//   }

//   render() {
//     // Clear canvas
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

//     // Draw grid
//     this.drawGrid();

//     // Draw objects
//     this.objects.forEach((obj) => this.drawObject(obj));

//     // Draw spring
//     this.drawSpring();
//   }

//   toggleGrid() {
//     this.showGrid = !this.showGrid;
//     this.render();
//   }
// }

// // Initialize the physics simulator when the page loads
// document.addEventListener("DOMContentLoaded", function () {
//   const simulator = new PhysicsSimulator();

//   // Add event listeners for interactive elements
//   setupEventListeners(simulator);
// });

// function setupEventListeners(simulator) {
//   // Object list click handlers
//   const objectItems = document.querySelectorAll(".object-item");
//   objectItems.forEach((item, index) => {
//     item.addEventListener("click", function () {
//       // Remove selected class from all items
//       objectItems.forEach((i) => i.classList.remove("selected"));
//       // Add selected class to clicked item
//       this.classList.add("selected");

//       // Update the selected object in the simulator
//       if (index < simulator.objects.length) {
//         simulator.objects.forEach((obj) => (obj.selected = false));
//         simulator.objects[index].selected = true;
//         simulator.render();
//       }
//     });
//   });

//   // Grid toggle button
//   const gridButton = document.querySelector(".view-controls .icon-btn");
//   if (gridButton) {
//     gridButton.addEventListener("click", function () {
//       this.classList.toggle("active");
//       simulator.toggleGrid();
//     });
//   }

//   // Play/Pause button
//   const playButton = document.querySelector(".btn.success");
//   if (playButton) {
//     let isPlaying = false;
//     playButton.addEventListener("click", function () {
//       isPlaying = !isPlaying;
//       if (isPlaying) {
//         this.innerHTML = `
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                         <rect x="6" y="4" width="4" height="16"></rect>
//                         <rect x="14" y="4" width="4" height="16"></rect>
//                     </svg>
//                     Pause
//                 `;
//         this.classList.remove("success");
//         this.style.background = "#F59E0B";
//       } else {
//         this.innerHTML = `
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                         <polygon points="5,3 19,12 5,21"></polygon>
//                     </svg>
//                     Play
//                 `;
//         this.classList.add("success");
//         this.style.background = "#10B981";
//       }
//     });
//   }

//   // Slider updates
//   const sliders = document.querySelectorAll(".slider");
//   sliders.forEach((slider) => {
//     slider.addEventListener("input", function () {
//       const value = parseFloat(this.value);
//       const span = this.parentElement.querySelector("span");
//       if (span) {
//         if (this.max === "3") {
//           span.textContent = value.toFixed(1) + "x";
//         } else {
//           span.textContent = value.toFixed(1);
//         }
//       }

//       // Update corresponding number input
//       const numberInput = this.parentElement.querySelector(".number-input");
//       if (numberInput) {
//         numberInput.value = value;
//       }
//     });
//   });

//   // Number input updates
//   const numberInputs = document.querySelectorAll(".number-input");
//   numberInputs.forEach((input) => {
//     input.addEventListener("input", function () {
//       const value = parseFloat(this.value);
//       const slider = this.parentElement.querySelector(".slider");
//       if (slider) {
//         slider.value = value;
//       }
//     });
//   });

//   // Color picker updates
//   const colorInput = document.querySelector(".color-input");
//   const colorText = document.querySelector(".color-text");

//   if (colorInput && colorText) {
//     colorInput.addEventListener("input", function () {
//       colorText.value = this.value;
//     });

//     colorText.addEventListener("input", function () {
//       if (this.value.match(/^#[0-9A-F]{6}$/i)) {
//         colorInput.value = this.value;
//       }
//     });
//   }

//   // Tool selection
//   const toolButtons = document.querySelectorAll(".canvas-tools .icon-btn");
//   toolButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       toolButtons.forEach((b) => b.classList.remove("active"));
//       this.classList.add("active");
//     });
//   });

//   // Add object buttons
//   const addObjectButton = document.querySelector(".add-buttons .btn.primary");
//   if (addObjectButton) {
//     addObjectButton.addEventListener("click", function () {
//       console.log("Add object clicked");
//       // In a real implementation, this would add a new object
//     });
//   }

//   // Type-specific add buttons
//   const typeButtons = document.querySelectorAll(".type-btn");
//   typeButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       const type = this.textContent.trim().toLowerCase();
//       console.log(`Add ${type} clicked`);
//       // In a real implementation, this would add a specific object type
//     });
//   });

//   // Apply changes button
//   const applyButton = document.querySelector(".panel-footer .btn.primary");
//   if (applyButton) {
//     applyButton.addEventListener("click", function () {
//       console.log("Apply changes clicked");
//       // In a real implementation, this would apply the property changes
//     });
//   }

//   // Reset button
//   const resetButton = document.querySelector(".panel-footer .btn.secondary");
//   if (resetButton) {
//     resetButton.addEventListener("click", function () {
//       console.log("Reset clicked");
//       // In a real implementation, this would reset the properties
//     });
//   }
// }
