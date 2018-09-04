var renderer = null, 
scene = null, 
camera = null,
cube = null,
sphereGroup = null,
sphere = null,
cone = null;

var duration = 5000; // ms
var currentTime = Date.now();

var planetGroup, planet_1, planet_2;
var planet_1_orbit;

function animate() 
{
    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;
    var movement = now * 0.001;

    // Rotate the cube about its Y axis
    sphere.rotation.y += angle;

    // Rotate the sphere group about its Y axis
    //sphere.rotation.x += angle;

    // Rotate the cone about its X axis (tumble forward)
    cone.rotation.z += angle;
}

function run() {
    requestAnimationFrame(function() { run(); });
    
        // Render the scene
        renderer.render( scene, camera );

        // Spin the cube for next frame
        animate();
}

function createScene(canvas)
{    
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);
    
    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Set the background color 
    scene.background = new THREE.Color( 0.2, 0.2, 0.2 );
    // scene.background = new THREE.Color( "rgb(100, 100, 100)" );

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.z = 10;
    scene.add(camera);

    // Create a group to hold all the objects
    sphereGroup = new THREE.Object3D;
    
    // Add a directional light to show off the objects
    var light = new THREE.DirectionalLight( 0xffffff, 1.5);
    // var light = new THREE.DirectionalLight( "rgb(255, 255, 100)", 1.5);

    // Position the light out from the scene, pointing at the origin
    light.position.set(-.5, .2, 1);
    light.target.position.set(0,-2,0);
    sphereGroup.add(light);

    var textureUrl = "../images/ash_uvgrid01.jpg";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });

    // Create the sphere geometry
    geometry = new THREE.SphereGeometry(1, 20, 20);
    
    // And put the geometry and material together into a mesh
    sphere = new THREE.Mesh(geometry, material);

    // Tilt the mesh toward the viewer
    sphere.rotation.x = Math.PI / 5;
    sphere.rotation.y = Math.PI / 5;

    // Add the cube mesh to our group
    sphereGroup.add( sphere );

    // Create a group for the sphere

    // Create the cone geometry
    geometry = new THREE.CylinderGeometry(0, .333, .444, 20, 5);

    // And put the geometry and material together into a mesh
    cone = new THREE.Mesh(geometry, material);

    // Move the cone up and out from the sphere
    cone.position.set(1, 1, -.667);
    
    // Now add the group to our scene
    scene.add( sphereGroup );
}