// Basic setup for the scene, camera, and renderer
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit controls for navigation
let controls = new THREE.OrbitControls(camera, renderer.domElement);

// Time slider (representing the 4th dimension)
let timeSlider = document.getElementById('timeSlider');
let timeValue = document.getElementById('timeValue');

// Translation, Rotation, and Scaling sliders
let translateXSlider = document.getElementById('translateXSlider');
let translateXValue = document.getElementById('translateXValue');

let rotateZSlider = document.getElementById('rotateZSlider');
let rotateZValue = document.getElementById('rotateZValue');

let scaleXSlider = document.getElementById('scaleXSlider');
let scaleXValue = document.getElementById('scaleXValue');

// 3D Cube Geometry for Example
let geometry = new THREE.BoxGeometry();
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Function to handle 4D (time-based) transformations
function updateSceneWithTime(time) {
    let scaleFactor = 1 + (time / 100);  // Scaling over time
    cube.scale.set(scaleFactor, scaleFactor, scaleFactor);
}

// Function to update transformation parameters
function updateTransformations() {
    // Translation on X axis
    cube.position.x = translateXSlider.value;
    translateXValue.innerText = translateXSlider.value;

    // Rotation on Z axis
    cube.rotation.z = THREE.MathUtils.degToRad(rotateZSlider.value);
    rotateZValue.innerText = rotateZSlider.value + '°';

    // Scaling on X axis
    cube.scale.x = scaleXSlider.value;
    scaleXValue.innerText = scaleXSlider.value;
}

// Event listeners for the sliders
timeSlider.oninput = function () {
    timeValue.innerText = timeSlider.value;
    updateSceneWithTime(timeSlider.value); // Update object based on time (4D effect)
};

translateXSlider.oninput = updateTransformations;
rotateZSlider.oninput = updateTransformations;
scaleXSlider.oninput = updateTransformations;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Resize event handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Placeholder for VR/AR integration (can extend using WebXR APIs)
if ('xr' in navigator) {
    renderer.xr.enabled = true;
    document.body.appendChild(VRButton.createButton(renderer)); // WebXR VR support
}

