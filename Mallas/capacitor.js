var cap = new THREE.Shape();

cap.moveTo(10, 10);
cap.lineTo(10, 40);
cap.lineTo(40, 40);
cap.lineTo(10, 10);

var forma = new THREE.ExtrudeGeometry( cap,{amount: 10} );
var material = new THREE.MeshNormalMaterial();
var malla = new THREE.Mesh( forma, material );
malla.rotateY( Math.PI/4 );
var escena = new THREE.Scene();
escena.add(malla);

var camara = new THREE.PerspectiveCamera();
camara.position.z = 500;

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize( window.innerHeight*.95,
                      window.innerHeight*.95 );
document.body.appendChild( renderizador.domElement );
renderizador.render( escena, camara );
