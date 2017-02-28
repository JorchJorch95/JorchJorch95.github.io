var papas = new THREE.Geometry();
papas.vertices.push( new THREE.Vector3( 1,  1,0 ) ); // Vértice 0
papas.vertices.push( new THREE.Vector3( 5,1,0 ) ); // Vértice 1
papas.vertices.push( new THREE.Vector3(5,5,0 ) ); // Vértice 2
papas.vertices.push( new THREE.Vector3(1,5,0 ) ); // Vértice 3
papas.vertices.push( new THREE.Vector3( 5,1,10 ) ); // Vértice 4
papas.vertices.push( new THREE.Vector3( 5,5,10 ) ); // Vértice 5
papas.vertices.push( new THREE.Vector3(  1,5,10) ); // Vértice 6
papas.vertices.push( new THREE.Vector3( 1,1,10 ) ); // Vértice 7


papas.faces.push( new THREE.Face3( 3, 1, 0 ) ); // Cara 0
papas.faces.push( new THREE.Face3( 3, 2, 1 ) ); // Cara 1
papas.faces.push( new THREE.Face3( 4, 1, 2 ) ); // Cara 2
papas.faces.push( new THREE.Face3( 4, 2, 5 ) ); // Cara 3
papas.faces.push( new THREE.Face3( 3, 6, 2 ) ); // Cara 4
papas.faces.push( new THREE.Face3( 6, 5, 2 ) ); // Cara 5
papas.faces.push( new THREE.Face3( 7,6,3 ) ); // Cara 6
papas.faces.push( new THREE.Face3(  7,3,0) ); // Cara 7
papas.faces.push( new THREE.Face3(  7,0,1) ); // Cara 8
papas.faces.push( new THREE.Face3(  7,1,4) ); // Cara 9
papas.faces.push( new THREE.Face3(  6,7,4) ); // Cara 10
papas.faces.push( new THREE.Face3( 6,4,5 ) ); // Cara 11



papas.computeBoundingSphere();
papas.computeFaceNormals();

var material = new THREE.MeshNormalMaterial();
var malla = new THREE.Mesh( papas, material );
malla.rotateX(Math.PI/4);
var escena = new THREE.Scene();
escena.add( malla );

var camara = new THREE.PerspectiveCamera();
camara.position.z = 40;

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize( window.innerHeight*.95, 
                      window.innerHeight*.95 );
document.body.appendChild( renderizador.domElement );
renderizador.render( escena, camara );
