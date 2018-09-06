class Planeta {

	constructor(textureUrl, nLuna) {
		
		
		var texture = new THREE.TextureLoader().load(textureUrl);
    	var material = new THREE.MeshPhongMaterial({ map: texture });

    	// Create the sphere geometry
    	var geometry = new THREE.SphereGeometry(1, 20, 20);
    
    	// And put the geometry and material together into a mesh
    	var planet = new THREE.Mesh(geometry, material);

    	// Create the cone geometry
	    geometry = new THREE.SphereGeometry(0.2, 20, 20)

	    // Add a different texture to the moon
	    textureUrl = "../images/moon_1024.jpg";
	    texture = new THREE.TextureLoader().load(textureUrl);
	    material = new THREE.MeshPhongMaterial({ map: texture });

	    // And put the geometry and material together into a mesh
	    var moon = new THREE.Mesh(geometry, material);

	    // Move the cone up and out from the sphere
	    moon.position.set(1, 1, -.667);

	    planet.add(moon)

	}

	animate() 
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
	    planet.rotation.y += angle;

	    // Rotate the cone about its X axis (tumble forward)
	    moon.rotation.z += angle;
	}
}