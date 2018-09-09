class Planeta {
  constructor(textureUrl, nLuna, position, scale, bumpUrl, normalUrl) {
    this.textureUrl = textureUrl;
    this.nLuna = nLuna;
    this.position = position;
    this.scale = scale;
    this.bumpUrl = bumpUrl;
    this.normalUrl = normalUrl;
    this.moons = new Array();

    if (this.scale == null)
        this.scale = 1;

    // Object containing planet and moons
    this.earth = new THREE.Object3D;

    let texture = new THREE.TextureLoader().load(this.textureUrl);

    let material = null;

    if (this.bumpUrl != null) {
        var bump = new THREE.TextureLoader().load(this.bumpUrl);
        material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump, bumpScale: 0.06 });
    } else {
        if (this.normalUrl != null) {
            var normal = new THREE.TextureLoader().load(this.normalUrl);
            material = new THREE.MeshPhongMaterial({ map: texture, normalMap: normal });
        } else
            material = new THREE.MeshPhongMaterial({ map: texture });
    }

    // Create the sphere geometry
    let geometry = new THREE.SphereGeometry(this.scale, 20, 20);
    
    // And put the geometry and material together into a mesh
    let planet = new THREE.Mesh(geometry, material);

    // Add the sphere mesh to our group
    this.earth.add( planet );

    /*

    // Create the cone geometry
    geometry = new THREE.SphereGeometry(0.2, 20, 20)

    // Add a different texture to the moon
    textureUrl = "../images/moon_1024.jpg";
    texture = new THREE.TextureLoader().load(textureUrl);
    material = new THREE.MeshPhongMaterial({ map: texture });

    // And put the geometry and material together into a mesh
    moon = new THREE.Mesh(geometry, material);

    // Move the cone up and out from the sphere
    moon.position.set(1, 1, -.667);*/

    //moon = new Luna(1, 1, -.667);
    //console.log(moon);
        
    // Add the cone mesh to our group
    for (var n = 0; n < this.nLuna; n++)  {
        var vec3 = new THREE.Vector3( 1, 1, -.667 );
        moon = new Luna(vec3, scale);
        this.moons.push(moon);
        //console.log(moon);
        this.earth.add(moon.getObject());
    }

    this.earth.position.set(this.position.x, this.position.y, this.position.z);
  }

  getObject() {
    //console.log(this.earth);
    return this.earth;
  }

  rotateAndTranslate(basePosition, angle, days, angleTras) {
    let obj = this.earth;
    obj.rotation.y += angle / 2;

    let velocity = 365 / (days * 10);

    // Algo así
    
    obj.position.x = Math.cos(angleTras * velocity * Math.PI / 180) * basePosition;
    obj.position.z = Math.sin(angleTras * velocity * Math.PI / 180) * basePosition ;

    //console.log(obj.position.x + " " + obj.position.z + " ", angleTras);
    //console.log(angleTras);
    //console.log(obj.position.x);
    this.rotateMoons(angle);
    }


    rotateMoons(angle) {
        //console.log(this.moons.length);
        for (var i = 0; i < this.moons.length; i++) {
            this.moons[i].getObject().rotation.z += angle;
            this.moons[i].getObject().rotation.y += angle / 4;

            console.log(this.moons[i].getObject().rotation.z);
        }
    }

  // ...
}

class Luna {
    constructor(pos, scale){
        this.pos = pos;
        this.scale = scale;
        let geometry = new THREE.SphereGeometry(0.2 * scale, 20, 20);
        let textureUrl = "../images/moon_1024.jpg";
        let texture = new THREE.TextureLoader().load(textureUrl);
        let material = new THREE.MeshPhongMaterial({ map: texture });

        // And put the geometry and material together into a mesh
        this.moon = new THREE.Mesh(geometry, material);

        // Move the cone up and out from the sphere
        //console.log(pos);
        this.moon.position.set(this.pos.x * this.scale, this.pos.y * this.scale, this.pos.z * this.scale);

    }

    getObject(){
        return this.moon;
    }
}

var renderer = null, 
scene = null, 
camera = null,
solarSystem = null,
earth = null,
planet = null,
moon = null, tierra = null, sun = null, venus = null, mercurio = null, marte = null;

var angleTras = 0;

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
    /*earth.rotation.y -= angle / 2;
    planet.rotation.y += angle;

    // Rotate the cone about its X axis (tumble forward)
    moon.rotation.z += angle;*/
    // Días que dura el año
    //sun.rotation.y += angle / 2;
    //rotateAndTranslate(mercurio, 2, angle, 88);
    mercurio.rotateAndTranslate(2, angle, 88, angleTras);
    venus.rotateAndTranslate(4, angle, 225, angleTras);
    tierra.rotateAndTranslate(6, angle, 365, angleTras);
    marte.rotateAndTranslate(8, angle, 687, angleTras);
    //rotateAndTranslate(venus, 4, angle, 225);
    //rotateAndTranslate(tierra, 6, angle, 365);
    //rotateAndTranslate(marte, 8, angle, 687);

    angleTras++;
}

function rotateAndTranslate(obj, basePosition, angle, days) {
    obj.rotation.y += angle / 2;

    let velocity = 365 / (days * 10);

    // Algo así
    
    obj.position.x = Math.cos(angleTras * velocity * Math.PI / 180) * basePosition;
    obj.position.z = Math.sin(angleTras * velocity * Math.PI / 180) * basePosition ;

    //console.log(obj.position.x + " " + obj.position.z + " ", angleTras);
    angleTras++;

}

function run() {
    requestAnimationFrame(function() { run(); });
    
        // Render the scene
        renderer.render( scene, camera );

        // Spin the cube for next frame
        //planeta.animate();
        animate();
}

function createOrbit(radius)  {
    let segments = 64;
    material = new THREE.LineBasicMaterial( { color: new THREE.Color("rgb(255, 255, 0)") } ),
    geometry = new THREE.CircleGeometry( radius, segments );

    // Remove center vertex
    geometry.vertices.shift();

    // Non closed circle with one open segment:
    //solarSystem.add( new THREE.Line( geometry, material ) );

    // To get a closed circle use LineLoop instead (see also @jackrugile his comment):
    let orbit = new THREE.LineLoop( geometry, material);
    orbit.rotation.x = Math.PI / 2;

    return orbit;
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
    //var light = new THREE.PointLight( 0xffffff, 5, 0);
    var light = new THREE.DirectionalLight( 0xffffff, 1.5);

    // Position the light out from the scene, pointing at the origin
    //light.position.set(0, 0, 0);
    light.target.position.set(0,-2,0);
    solarSystem.add(light);

    var textureUrl = "../images/earth_atmos_2048.jpg";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: "../images/moon_bump.jpg", bumpScale: 0.06 });

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

    /*

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
    earth.add( moon );*/
    
    // Now add the group to our scene
    sun = new Planeta("../images/sunmap.jpg", 0, new THREE.Vector3());

    // Mercury: 38% Earth size
    mercurio = new Planeta("../images/mercurymap.jpg", 0, new THREE.Vector3(2, 0, 0), 0.5 * 0.38, "../images/mercurybump.jpg");

    // 95% Earth size
    venus =  new Planeta("../images/venusmap.jpg", 0, new THREE.Vector3(4, 0, 0), 0.5 * 0.95, "../images/venusbump.jpg");
    
    tierra = new Planeta("../images/earth_atmos_2048.jpg", 1, new THREE.Vector3(6, 0, 0), 0.5);

    // Mars: 55% Earth size
    marte = new Planeta("../images/marsmap.jpg", 0, new THREE.Vector3(8, 0, 0), 0.5 * 0.55, null, "../images/marsnormal.jpg");

    //sun.add(light);

    solarSystem.add(sun.getObject());
    solarSystem.add(mercurio.getObject());
    solarSystem.add(createOrbit(mercurio.position.x));

    solarSystem.add(venus.getObject());
    solarSystem.add(createOrbit(venus.position.x));

    solarSystem.add(tierra.getObject());
    solarSystem.add(createOrbit(tierra.position.x));

    solarSystem.add(marte.getObject());
    solarSystem.add(createOrbit(marte.position.x));

    scene.add( solarSystem );
} 