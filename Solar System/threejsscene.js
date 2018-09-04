var renderer = null, 
scene = null, 
camera = null,
solarSystem = null,
earth = null,
planet = null,
moon = null;

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
    //cube.rotation.y += angle;

    // Rotate the sphere group about its Y axis
    earth.rotation.y -= angle / 2;
    planet.rotation.y += angle;

    // Rotate the cone about its X axis (tumble forward)
    moon.rotation.z += angle;
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
    solarSystem = new THREE.Object3D;
    
    // Add a directional light to show off the objects
    var light = new THREE.DirectionalLight( 0xffffff, 1.5);
    // var light = new THREE.DirectionalLight( "rgb(255, 255, 100)", 1.5);

    // Position the light out from the scene, pointing at the origin
    light.position.set(-.5, .2, 1);
    light.target.position.set(0,-2,0);
    solarSystem.add(light);

    var textureUrl = "../images/earth_atmos_2048.jpg";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });

    /*
    // Create the cube geometry
    var geometry = new THREE.CubeGeometry(2, 2, 2);

    // And put the geometry and material together into a mesh
    cube = new THREE.Mesh(geometry, material);

    // Tilt the mesh toward the viewer
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;

    // Add the cube mesh to our group
    cubeGroup.add( cube );*/

    // Create a group for the sphere
    earth = new THREE.Object3D;
    solarSystem.add(earth);
    
    // Move the sphere group up and back from the cube
    //earth.position.set(0, 3, -4);

    // Create the sphere geometry
    geometry = new THREE.SphereGeometry(1, 20, 20);
    
    // And put the geometry and material together into a mesh
    planet = new THREE.Mesh(geometry, material);

    // Add the sphere mesh to our group
    earth.add( planet );

    // Create the cone geometry
    geometry = new THREE.SphereGeometry(0.2, 20, 20)

    // Add a different texture to the moon
    textureUrl = "../images/moon_1024.jpg";
    texture = new THREE.TextureLoader().load(textureUrl);
    material = new THREE.MeshPhongMaterial({ map: texture });

    // And put the geometry and material together into a mesh
    moon = new THREE.Mesh(geometry, material);

    // Move the cone up and out from the sphere
    moon.position.set(1, 1, -.667);
        
    // Add the cone mesh to our group
    earth.add( moon );
    
    // Now add the group to our scene
    scene.add( solarSystem );
}