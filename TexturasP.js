WIDTH = window.innerWidth; // Ancho de pantalla
HEIGHT = window.innerHeight; // Alto de pantalla


var textura1 = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/brick_bump.jpg');
var textura2 = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/brick_diffuse.jpg');
var textura3 = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/brick_roughness.jpg');

// Lienzo u objeto encargado del renderizado
var lienzo = new THREE.WebGLRenderer({antialias: true});

// Establecemos las dimensiones del lienzo
lienzo.setSize(
	WIDTH,
	HEIGHT
);

// Añadimos el lienzo a la página
document.body.appendChild(lienzo.domElement);

// Creamos la escena
var escena = new THREE.Scene;


// Creamos un poligono
var geometriaCubo = new THREE.CubeGeometry(
	100, // Dimensiones en eje X
	100, // Dimensiones en eje Y
	100 // Dimensiones en eje Z
);

// Creamos una apariencia (de lila claro)
var aparienciaLila = new THREE.MeshStandardMaterial({map:textura3});

// Generamos el polígino y le aplicamos la apariencia
var cubo = new THREE.Mesh(geometriaCubo, aparienciaLila);

// Añadimos el cubo a la escena
escena.add(cubo);



var mat2 = new THREE.MeshStandardMaterial({map:textura1});
var cubo2 = new THREE.Mesh(geometriaCubo, mat2);
escena.add(cubo2);
cubo2.position.x=200;

var mat3 = new THREE.MeshStandardMaterial({map:textura2});
var cubo3 = new THREE.Mesh(geometriaCubo, mat3);
escena.add(cubo3);
cubo3.position.x=-200;






// Generamos la cámara
var camara = new THREE.PerspectiveCamera(
	45,
	(WIDTH / HEIGHT),
	0.1,
	10000
);

// Situamos la cámara
camara.position.y = 300;
camara.position.z = 400;

// Centramos la vista en el cubo
camara.lookAt(cubo.position);

// Añadimos la cámara a la escena
escena.add(camara);

// Creamos una par de focos de luz
var luz1 = new THREE.PointLight(0xffffff); 
luz1.position.set(
	120, // Posición en eje X
	260, // Posición en eje Y
	100	 // Posición en eje Z
);

var luz2 = new THREE.PointLight(0xffffff); // 
luz2.position.set(
	-100, // Posición en eje X
	100, // Posición en eje Y
	200	 // Posición en eje Z
);

// Añadimos las luces
escena.add(luz1);
escena.add(luz2);

x=0;
function renderizar(){
	// Rotamos el cubo
	cubo.rotation.y += Math.PI * 0.5 / 180;
	cubo.rotation.z += Math.PI * Math.cos(x++ / 50) / 180;



	cubo2.rotation.x=cubo.rotation.y;
	cubo2.rotation.z=cubo.rotation.z;
	

	cubo3.rotation.y = cubo.rotation.z;
	cubo3.rotation.x = cubo.rotation.y;


	// Renderizamos la escena
	lienzo.render(escena, camara);
	// Volvemos a renderizar
	requestAnimationFrame(renderizar);
}

// Empezamos a renderizar
renderizar();
