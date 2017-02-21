var escena = new THREE.Scene();


var camara = new THREE.PerspectiveCamera();
camara.position.z = 5;


var renderer = new THREE.WebGLRenderer();


renderer.setSize( window.innerHeight*.9, window.innerHeight*.9 );


document.body.appendChild( renderer.domElement );
renderer.render( escena, camara );
