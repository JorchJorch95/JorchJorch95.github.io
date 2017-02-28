var cap = new THREE.CircleGeometry( 5, 32 );
//var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
var material = new THREE.MeshNormalMaterial();
var circle = new THREE.Mesh( cap, material );



//var forma = new THREE.ExtrudeGeometry( circle,{amount: 10} );

//var malla = new THREE.Mesh( forma, material );
//malla.rotateY( Math.PI/4 );
var escena = new THREE.Scene();
escena.add(circle);

var camara = new THREE.PerspectiveCamera();
camara.position.z = 10;

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize( window.innerHeight*.95,
                      window.innerHeight*.95 );
document.body.appendChild( renderizador.domElement );
renderizador.render( escena, camara );
