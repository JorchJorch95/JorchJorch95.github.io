var textura = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/crate.gif');



var TECLA = { AVPAG:false, REPAG:false, ARRIBA:false, ABAJO:false, IZQUIERDA:false, DERECHA:false, F:false, K:false,I:false,L:false,J:false, Q:false,A:false,W:false,S:false,E:false,D:false,Z:false,X:false,T1:false,T2:false,T3:false,T4:false };
			var escena;
			var camara;
			var render;
			var cubo;
			var Lata;
			var cuboTextura;
			var ultimoTiempo;
			var star;
			var esfera;

			var filtroActivo=0;

			var log;

//function degToRad(degrees) {
//				return degrees * Math.PI / 180;
//			}




var zoomx=0;
var zoomy=0;
var zoomz=50;

var rotarz=0;


var tcubo = 20;




// M A P A 

var map = [ // 1  2  3  4  5  6  7  8  9
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 0
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 1
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 2
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 3
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 4
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 5
           [1, 0, 0, 0, 0, 0, 0, 1, 0, 1,], // 6
           [1, 0, 0, 0, 0, 1, 0, 0, 1, 1,], // 7
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 8
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 9
           ], mapW = map.length, mapH = map[0].length;







function iniciarEscena(){
				//Render
				render = new THREE.WebGLRenderer();

				

				var canvasWidth = 800;
				var canvasHeight = 800;
				render.setSize(canvasWidth, canvasHeight);
				render.shadowMap.enabled = true;
				render.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap


				document.getElementById("canvas").appendChild(render.domElement);

				//Escena
				escena = new THREE.Scene();




//LUZ
//Create a DirectionalLight and turn on shadows for the light
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 100, 300 );
//default; light shining from top
spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 2000;
spotLight.shadow.mapSize.height = 2000;

spotLight.shadow.camera.near = 0.1;
spotLight.shadow.camera.far = 5000;
spotLight.shadow.camera.fov = 75;

escena.add( spotLight );









var wallg = new THREE.CubeGeometry(tcubo,tcubo,tcubo);
var wallmat = new THREE.MeshStandardMaterial( {map: textura});

 

for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			
if ((map[i][j]) === 1) {
				
				var wall = new THREE.Mesh(wallg,wallmat);
				wall.castShadow = true;
				wall.receiveShadow = true;
				wall.position.x = i*tcubo;
				wall.position.y = j*tcubo;
				wall.position.z = 5;
				escena.add(wall);
				
			}
			
		}
	}











var axisHelper = new THREE.AxisHelper( 5 );
escena.add( axisHelper );
axisHelper.position.set(-5,-5,5);













				
				//Cubo
				
				var cuboMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
				
				var cuboGeometria = new THREE.CubeGeometry(2.5, 2.5, 2.5);

				cubo = new THREE.Mesh(cuboGeometria, cuboMaterial);
				cubo.castShadow = true;
				cubo.position.set(40, 40, 10);

				cubo.velocidadX = 0;
				cubo.velocidadY = 0;

				escena.add(cubo);





//  L A T A

var LataForma = new THREE.CylinderGeometry(5, 5, 10);

var TapaForma = new THREE.CylinderGeometry(4,5,2);

var Tapa2Forma = new THREE.CylinderGeometry(5,4,2);

var PieForma = new THREE.CylinderGeometry(1,1,5);

var Pie2Forma = new THREE.CylinderGeometry(1,1,5);

TapaForma.translate(0,6,0);

Tapa2Forma.translate(0,-6,0);

PieForma.translate(-2,-7,0);

Pie2Forma.translate(2,-7,0);


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

Lata = new THREE.Mesh(LataFForma, material);

Lata.castShadow = true;

Lata.visible = false;



escena.add(Lata);

var LataBB = new THREE.BoxHelper( Lata, 0xffff00 );
escena.add(LataBB);

Lata.boundingBox = LataBB;
Lata.position.set(cubo.position.x,cubo.position.y,cubo.position.z+10);
Lata.visible = true;
LataBB.position.set(5,5,10);
LataBB.visible = false;
Lata.rotateX(Math.PI/2);
LataBB.rotateX(Math.PI/2);










//ESFERA				
var esferaMaterial = new THREE.MeshStandardMaterial( { color: 0xff00ff } );
				
var esferaGeometria = new THREE.SphereGeometry(2, 32, 32);

esfera = new THREE.Mesh(esferaGeometria, esferaMaterial);
esfera.castShadow = true;
esfera.position.set(-10, -5,5);

escena.add(esfera);

esfera.visible = false;







// E S T R E L L A
var figura = new THREE.Shape();
var sstar = 4;

figura.moveTo(0, -3/sstar);
figura.lineTo(2/sstar, -6/sstar);
figura.lineTo(1/sstar, -1/sstar);
figura.lineTo(6/sstar, 1/sstar);
figura.lineTo(1/sstar, 1/sstar);
figura.lineTo(0, 6/sstar);
figura.lineTo(-1/sstar, 1/sstar);
figura.lineTo(-6/sstar, 1/sstar);
figura.lineTo(-1/sstar, -1/sstar);
figura.lineTo(-3/sstar, -6/sstar);
figura.lineTo(0, -3/sstar);

var starg = new THREE.ExtrudeGeometry( figura,{amount:1} );

var materialstar = new THREE.MeshNormalMaterial();
star = new THREE.Mesh( starg, materialstar );
star.rotateY( Math.PI/12 );
star.castShadow = true;
escena.add(star);
star.visible = false;














//PISO
	var pisog = new THREE.BoxBufferGeometry(200,200,1);
	var materialpiso = new THREE.MeshStandardMaterial( {color: 0xffffff} );
	var P = new THREE.Mesh( pisog, materialpiso );
	escena.add( P );
	P.position.z=0;
	P.position.x=100;
	P.position.y=100;
	P.receiveShadow = true;



//Camara
				camara = new THREE.PerspectiveCamera(90, canvasWidth / canvasHeight, 0.1, 10000);
				camara.position.set(0,-900,100);
				//camara.rotate.x=Math.PI/6;
				camara.lookAt(new THREE.Vector3(0,0,0) );
				escena.add(camara);
				
}



function updateRenderWorld(){
//camara.position.x= Math.sin(cubo.rotation.x);
camara.position.x=cubo.position.x;
camara.position.y=cubo.position.y-14;
camara.position.z=cubo.position.z+6;


Lata.position.x=cubo.position.x;
Lata.position.y=cubo.position.y;
Lata.position.z=cubo.position.z+2;

//cubo.position.set(camara.position.x,camara.position.y,camara.position.z);

star.position.x=cubo.position.x;
star.position.y=cubo.position.y;
star.position.z=cubo.position.z;
esfera.position.x=cubo.position.x;
esfera.position.y=cubo.position.y;
esfera.position.z=cubo.position.z;
}


function renderEscena(){
				updateRenderWorld();
				render.render(escena, camara);
}


			function animarEscena(){
				var delta=(Date.now()-ultimoTiempo)/1000;
    			if (delta>0)
    			{	
				var velcubo = 30;
    				if (TECLA.ARRIBA) cubo.velocidadX-=2*delta;
    				if (TECLA.ABAJO) cubo.velocidadX+=2*delta;
    				if (TECLA.IZQUIERDA) cubo.velocidadY-=2*delta;
    				if (TECLA.DERECHA) cubo.velocidadY+=2*delta;
				if (TECLA.K) cubo.position.y-=1;
				if (TECLA.I) cubo.position.y+=1;

				//if(TECLA.L) { // w
				//camara.rotation.y += 0.1;
				//}
				//if(TECLA.J){ // s
				//camara.rotation.y -= 0.1;
				//}
				if (TECLA.L) cubo.position.x+=1;
				if (TECLA.J) cubo.position.x-=1;

    				if (TECLA.REPAG) cubo.position.z-=velcubo*delta;
    				if (TECLA.AVPAG) cubo.position.z+=velcubo*delta;
				if (TECLA.T){
				cubo.rotation.x=0;
				cubo.rotation.y=0;
				cubo.velocidadX=0;
				cubo.velocidadY=0;
				}//PARO GENERAL


				//MOVER CÁMARA
				if (TECLA.Q)	zoomx+=2*delta;
				if (TECLA.A)	zoomx-=2*delta;
				if (TECLA.W)	zoomy+=2*delta;
				if (TECLA.S)	zoomy-=2*delta;
				if (TECLA.E)	zoomz+=2*delta;
				if (TECLA.D)	zoomz-=2*delta;


				//ROTAR CUBO Y CÁMARA    				
				if(TECLA.Z)	cubo.rotation.z += 2*delta;
				if(TECLA.X)	cubo.rotation.z -= 2*delta;



    				cubo.rotation.x += cubo.velocidadX * delta;
            		cubo.rotation.y += cubo.velocidadY * delta;


				
				//CAMBIAR PERSONAJES
				if (TECLA.T1)	 {Lata.visible = true; cubo.visible = false; esfera.visible = false; star.visible = false;} 
				if (TECLA.T2)	 {Lata.visible = false; cubo.visible = true; esfera.visible = false; star.visible = false;} 

				if (TECLA.T3)	 {Lata.visible = false; cubo.visible = false; esfera.visible = true; star.visible = false;} 

				if (TECLA.T4)	 {Lata.visible = false; cubo.visible = false; esfera.visible = false; star.visible = true;} 
				
			
    				renderEscena();
 			}





// R E S T R I C C I O N E S
for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			
if ((map[i][j]) === 1) {
				

				if ( (cubo.position.x === i*tcubo - 12) && (cubo.position.y < j*tcubo+11 && cubo.position.y > j*tcubo-11) ) {cubo.position.x = i*tcubo - 13}
				if ( (cubo.position.x === i*tcubo + 12) && (cubo.position.y < j*tcubo+11 && cubo.position.y > j*tcubo-11) ) {cubo.position.x = i*tcubo + 13}


				if ( (cubo.position.y === j*tcubo - 12) && (cubo.position.x < i*tcubo+11 && cubo.position.x > i*tcubo-11) ) {cubo.position.y = j*tcubo - 13}
				if ( (cubo.position.y === j*tcubo + 12) && (cubo.position.x < i*tcubo+11 && cubo.position.x > i*tcubo-11) ) {cubo.position.y = j*tcubo + 13}

				
				
			}
			
		}
	}






    			ultimoTiempo=Date.now();
				requestAnimationFrame(animarEscena);
}



function teclaPulsada(e)
			{
				switch (e.keyCode)
				{
					case 33: //Av página
						TECLA.AVPAG=true;
						break;
					case 34: // Re página
						TECLA.REPAG=true;
						break;
					case 37: // Izquierda
						TECLA.IZQUIERDA=true;
						break;
					case 39: // Derecha
						TECLA.DERECHA=true;
						break;
					case 38: // Arriba
						TECLA.ARRIBA=true;
						break;
					case 40: // Abajo
						TECLA.ABAJO=true;
						break;
					case 75: // K
						TECLA.K=true;
						break;

					case 76: // L
						TECLA.L=true;
						break;

					case 74: // J
						TECLA.J=true;
						break;
					case 85: // L
						TECLA.U=true;
						break;

					case 79: // J
						TECLA.O=true;
						break;


					case 73: // I
						TECLA.I=true;
						break;

					case 84: // T
						TECLA.T=true;
						break;



					case 81: // Q
						TECLA.Q=true;
						break;
					case 65: // A
						TECLA.A=true;
						break;
					case 87: // W
						TECLA.W=true;
						break;
					case 69: // E
						TECLA.E=true;
						break;
					case 83: // S
						TECLA.S=true;
						break;
					case 68: // D
						TECLA.D=true;
						break;

					case 90: // Z
						TECLA.Z=true;
						break;

					case 88: // X
						TECLA.X=true;
						break;



					case 49: //NÚMERO 1
						TECLA.T1=true;
						break;

					case 50: //NÚMERO 2
						TECLA.T2=true;
						break;

					case 51: //NÚMERO 3
						TECLA.T3=true;
						break;

					case 52: //NÚMERO 4
						TECLA.T4=true;
						break;
				}

}


			function teclaSoltada(e)
			{
				switch (e.keyCode)
				{
					case 33: //Av página
						TECLA.AVPAG=false;
						break;
					case 34: // Re página
						TECLA.REPAG=false;
						break;
					case 37: // Izquierda
						TECLA.IZQUIERDA=false;
						break;
					case 39: // Derecha
						TECLA.DERECHA=false;
						break;
					case 38: // Arriba
						TECLA.ARRIBA=false;
						break;
					case 40: // Abajo
						TECLA.ABAJO=false;
						break;
					
					case 75: // K
						TECLA.K=false;
						break;


					case 76: // L
						TECLA.L=false;
						break;

					case 74: // J
						TECLA.J=false;
						break;

					case 73: // I
						TECLA.I=false;
						break;

					case 83: // S
						TECLA.S=false;
						break;
					
					case 84: // T
						TECLA.T=false;
						break;



					case 81: // Q
						TECLA.Q=false;
						break;
					case 65: // A
						TECLA.A=false;
						break;
					case 87: // W
						TECLA.W=false;
						break;
					case 69: // E
						TECLA.E=false;
						break;
					
					case 68: // D
						TECLA.D=false;
						break;
					case 85: // L
						TECLA.U=false;
						break;

					case 79: // J
						TECLA.O=false;
						break;

					
					case 90: // Z
						TECLA.Z=false;
						break;

					case 88: // X
						TECLA.X=false;
						break;

					case 49: //NÚMERO 1
						TECLA.T1=false;
						break;

					case 50: //NÚMERO 2
						TECLA.T2=false;
						break;

					case 51: //NÚMERO 3
						TECLA.T3=false;
						break;

					case 52: //NÚMERO 4
						TECLA.T4=false;
						break;
				
				}
}



			function webGLStart() {
				log = document.getElementById("log");

				iniciarEscena();
				ultimoTiempo=Date.now();

				document.onkeydown=teclaPulsada;
				document.onkeyup=teclaSoltada;
				
				animarEscena();
				
			}	
