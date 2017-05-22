


var campoVision=45; //grados


var relacionAspecto=window.innerWidth/window.innerHeight;


var planoCercano=1;


var planoLejano=1000;



var camara= new THREE.PerspectiveCamera(campoVision,
					relacionAspecto,
					planoCercano,
					planoLejano);



camara.position.z=90;
camara.position.x=20;
camara.position.y=10;


 


var LataForma = new THREE.CylinderGeometry(1, 1, 2);
var TapaForma = new THREE.CylinderGeometry(0.8,1,0.4);
var Tapa2Forma = new THREE.CylinderGeometry(1,0.8,0.4);
var PieForma = new THREE.CylinderGeometry(0.2,0.2,1);
var Pie2Forma = new THREE.CylinderGeometry(0.2,0.2,1);

TapaForma.translate(0,3.2,0);
LataForma.translate(0,2,0);
Tapa2Forma.translate(0,0.8,0);
PieForma.translate(-0.4,0.6,0);
Pie2Forma.translate(0.4,0.6,0);


var LataMalla = new THREE.Mesh(LataForma);
var TapaMalla = new THREE.Mesh(TapaForma);
var Tapa2Malla = new THREE.Mesh(Tapa2Forma);
var PieMalla = new THREE.Mesh(PieForma);
var Pie2Malla = new THREE.Mesh(Pie2Forma);

var LataFForma = new THREE.Geometry();
LataFForma.merge(LataMalla.geometry, LataMalla.matrix);
LataFForma.merge(TapaMalla.geometry, TapaMalla.matrix);
LataFForma.merge(Tapa2Malla.geometry, Tapa2Malla.matrix);
LataFForma.merge(PieMalla.geometry, PieMalla.matrix);
LataFForma.merge(Pie2Malla.geometry, Pie2Malla.matrix);

var material = new THREE.MeshNormalMaterial();
var LataMalla = new THREE.Mesh(LataFForma, material);




var escena= new THREE.Scene();

var texloader = new THREE.TextureLoader();
textureLoader.load('https://JorchJorch95.github.io/crate.gif');





var matel = new THREE.MeshBasicMaterial( {map: tex} );

var piso = new THREE.BoxGeometry(7,0.5,7);


for (i=0;i<50;i=i+7)
{
	for(j=0;j<70;j=j+7)
	{
	mesh = new THREE.Mesh(piso,matel);
	mesh.position.x=i;
	mesh.position.z=j;	
	//mesh.rotateX(Math.PI/6);
	escena.add(mesh);
	}
}
escena.add(LataMalla);

	var g = new THREE.SphereGeometry( 1, 5, 5 );
	var g2 = new THREE.SphereGeometry( 1, 5, 5 );
	g2.translate(3,0,0);
	var g3 = new THREE.SphereGeometry( 1, 5, 5 );
	g3.translate(3,0,3);
	var g4 = new THREE.SphereGeometry( 1, 5, 5 );
	g4.translate(0,0,3);
	var t = new THREE.TorusGeometry( 1.5, 0.5, 16, 100 );
	t.translate(1.5,3,-1.5);
	t.rotateX(Math.PI/2);
	var r = new THREE.RingGeometry( 1,2, 10);
	r.translate(1.5,3,4.5);

	var gmalla = new THREE.Mesh(g);
	var g2malla = new THREE.Mesh(g2);
	var g3malla = new THREE.Mesh(g3);
	var g4malla = new THREE.Mesh(g4);
	var torus = new THREE.Mesh( t);
	var ring = new THREE.Mesh(r);
	

	var carro = new THREE.Geometry();
	carro.merge(gmalla.geometry,gmalla.matrix);
	carro.merge(g2malla.geometry,g2malla.matrix);
	carro.merge(g3malla.geometry,g3malla.matrix);
	carro.merge(g4malla.geometry,g4malla.matrix);
	carro.merge(torus.geometry,torus.matrix);
	carro.merge(ring.geometry,ring.matrix);
		
	var material = new THREE.MeshNormalMaterial();
	var carroMalla = new THREE.Mesh(carro,material);

	carroMalla.position.x=5;

	
escena.add( carroMalla );

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderizador.domElement);
renderizador.render(escena, camara);
