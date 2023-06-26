// const container = document.getElementById('threejsModel'); //using body instead
const mediaQuery500px = window.matchMedia('(max-width: 500px)');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer();
const ambientLighting = new THREE.AmbientLight(0xD3D3D3, 1.1);

//renderer.setSize(800, 512);
addEventListener("resize", (event) => {
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
});

if (mediaQuery500px.matches) {
    renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.7);
} else {
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
}


document.body.appendChild(renderer.domElement); //append directly to body not a predefined target div


// Load the GLTF loader
var loader = new THREE.GLTFLoader();
scene.add(ambientLighting);
// Load the .glb file
loader.load(
    'boeing.glb', //CHANGED URL TO LOCAL FILE NOT INSIDE A FOLDER
    function(gltf) {
        // Add the loaded object to the scene
        scene.add(gltf.scene);
        // Set the initial rotation of the model
        gltf.scene.rotation.y = Math.PI / 2;
        // Create a function to update the rotation of the model
        function updateRotation() {
            // Increment the rotation by a small amount
            gltf.scene.rotation.y += 0.005;
            requestAnimationFrame(updateRotation);
        }

        // Start the animation loop
        updateRotation();
    },
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(error) {
        console.log('An error happened');
    }
);

// Set up the camera and renderer
camera.position.z = -600;
camera.position.y = 550;
camera.position.x = 10;




//Black background
scene.background = new THREE.Color('#f3f5fa');

// Set up orbit control
var controls = new THREE.OrbitControls(camera, renderer.domElement);
//This disable's zoom on the 3d model
controls.enableZoom = false;


// Render loop
var animate = function() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};
animate();