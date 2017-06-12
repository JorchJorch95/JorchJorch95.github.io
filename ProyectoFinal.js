
var textura1 = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/brick_bump.jpg');
var textura2 = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/brick_diffuse.jpg');
var textura3 = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/brick_roughness.jpg');
var textura4 = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/roughness_map.jpg');
var textura5 = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/transition3.png');
var logoupiita = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/logo_upiita.png');
var coca = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/cocacola.png');
var textura6 = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/UV_Grid_Sm.jpg');
var pepsi = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/pepsi.jpg');
var dr = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/Dr_Pepper_modern.svg.png');
var bola8 = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/bola8.jpg');
var cubito = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/mariobloque1.jpg');
var jarritos = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/jarritos.png');






var entorno, camara, renderer;
var step,step2,step3;
var esffinal,esffinal2;
var raycasterff1,raycasterff2,raycasterff3,raycasterff4,raycasterff5,raycasterff6;	
var meshFloor,luzambiente, luz;
var keyboard = {};
var player = { height:0.5, speed:1, turnSpeed:Math.PI*0.02 };
var alturacubo=100;



var map = [ // 1  2  3  4  5  6  7  8  9
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 0
           [1, 0, 0, 0, 0, 0, 1, 0, 0, 0,], // 1
           [1, 0, 1, 1, 1, 0, 1, 1, 0, 1,], // 2
           [1, 0, 0, 0, 1, 1, 0, 0, 0, 1,], // 3
           [1, 0, 1, 0, 1, 0, 0, 1, 0, 1,], // 4
           [1, 1, 0, 0, 1, 1, 0, 1, 0, 1,], // 5
           [1, 0, 0, 1, 0, 0, 0, 1, 0, 1,], // 6
           [1, 0, 1, 0, 0, 1, 1, 0, 0, 1,], // 7
           [1, 0, 0, 0, 0, 0, 1, 0, 0, 1,], // 8
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 9
           ];







// M  A P A  2

var map2 = [ // 1  2  3  4  5  6  7  8  9 
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 0
           [1, 0, 0, 0, 1, 0, 1, 0, 0, 1,], // 1
           [1, 0, 1, 0, 0, 0, 1, 1, 0, 1,], // 2
           [1, 0, 0, 1, 0, 1, 0, 0, 0, 1,], // 3
           [1, 1, 1, 0, 0, 0, 0, 1, 1, 1,], // 4
           [1, 0, 0, 0, 0, 1, 0, 1, 0, 0,], // 5
           [1, 0, 0, 1, 0, 0, 0, 1, 0, 1,], // 6
           [1, 0, 1, 0, 1, 1, 0, 0, 0, 1,], // 7
           [1, 0, 0, 0, 1, 0, 1, 0, 0, 1,], // 8
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 9
           ];


// M  A P A  3

var map3 = [ // 1  2  3  4  5  6  7  8  9 
           [1, 1, 1, 1, 1, 0, 1, 1, 1, 1,], // 0
           [1, 0, 0, 0, 1, 0, 0, 0, 0, 1,], // 1
           [1, 0, 1, 0, 1, 0, 1, 1, 0, 1,], // 2
           [1, 0, 0, 0, 0, 1, 0, 0, 0, 1,], // 3
           [1, 1, 1, 0, 0, 0, 0, 1, 0, 1,], // 4
           [1, 0, 0, 0, 0, 1, 0, 1, 0, 1,], // 5
           [1, 0, 0, 1, 0, 0, 0, 1, 0, 1,], // 6
           [1, 0, 1, 0, 0, 0, 0, 0, 0, 1,], // 7
           [1, 0, 0, 0, 1, 0, 1, 0, 0, 1,], // 8
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 9
           ];


var tcubo = 20;
var zoomx=0;
var zoomy=0;
var zoomz=40;


var offset2 = 250; 
var offset3 = offset2 + 250;





function Agent(x=0, y=0, z=0){
THREE.Object3D.call(this);
this.position.x = x;
this.position.y = y;
this.position.z= z;
}

Agent.prototype = new THREE.Object3D();

Agent.prototype.sense = function(environment) {};
Agent.prototype.plan = function(environment) {};
Agent.prototype.act = function(environment) {};

function Environment(){
THREE.Scene.call(this);
}



Environment.prototype = new THREE.Scene();


Environment.prototype.sense = function() {
for ( var i = 0; i<this.children.length; i++ ){
if (this.children[i].sense !== undefined)
this.children[i].sense(this);
 }
}

Environment.prototype.plan = function(){
for (var i = 0; i < this.children.length; i++ ){
if (this.children[i].plan !== undefined)
this.children[i].plan(this);
 }
}

Environment.prototype.act = function(){
for (var i = 0; i < this.children.length; i++){
if (this.children[i].act !== undefined)
this.children[i].act(this);
 }
}






function Pelota(r, x=0, y=0,z=0){
Agent.call(this,x,y);
this.add(new THREE.Mesh(new THREE.SphereGeometry(r), new THREE.MeshStandardMaterial({color:0xff00ff})));
this.step=0.1;
this.step2=0;
this.colision=0;
this.colision2=0;
this.radius=r;
this.sensor = new THREE.Raycaster(this.position, new THREE.Vector3(1,0,0));
this.position.x = x;
this.position.y = y;
this.position.z = z;
this.visible = true;
this.receiveShadow=true;
this.castShadow=true;
}

Pelota.prototype = new Agent();

//entorno.children para detectar solo al cubito
Pelota.prototype.sense = function(environment){
this.sensor.set(this.position, new THREE.Vector3(1,0,0));
var obstaculo1 = this.sensor.intersectObjects(entorno.children);

this.sensor.set(this.position, new THREE.Vector3(-1,0,0));
var obstaculo2 = this.sensor.intersectObjects(entorno.children);

//detecta todo
this.sensor.set(this.position, new THREE.Vector3(1,0,0));
var obstaculo3 = this.sensor.intersectObjects(environment.children,true);

this.sensor.set(this.position, new THREE.Vector3(-1,0,0));
var obstaculo4 = this.sensor.intersectObjects(environment.children,true);

if ((obstaculo3.length>0 && (obstaculo3[0].distance<= this.radius)) || (obstaculo4.length > 0 && (obstaculo4[0].distance <= this.radius)))
this.colision = 1;
else
this.colision = 0;








if ((obstaculo1.length>0 && (obstaculo1[0].distance<= this.radius)) || (obstaculo2.length > 0 && (obstaculo2[0].distance <= this.radius)))
this.colision2 = 2;
else
this.colision2 = 0;
};


Pelota.prototype.act = function(environment){
if (this.colision === 1)
this.step = -this.step;
this.position.x += this.step;
this.position.Y += this.step;

if (this.colision2 === 2){
this.step2 = 1;
this.position.z += this.step2;
this.visible = false;}





};






function Piso(sizex,sizey,sizez, x=0, y=0,z=0,c){
THREE.Object3D.call(this,x,y);

this.add(new THREE.Mesh(new THREE.BoxGeometry(sizex,sizey,sizez), new THREE.MeshStandardMaterial(c)));
this.sizex = sizex;
this.sizey = sizey;
this.sizez = sizez;
this.c=c;
this.position.x = x;
this.position.y = y;
this.position.z = z;
this.receiveShadow = true;
}

Piso.prototype = new THREE.Object3D();












function Pared(sizex,sizey,sizez, x=0, y=0,z=0,c){
THREE.Object3D.call(this,x,y);

this.add(new THREE.Mesh(new THREE.BoxGeometry(sizex,sizey,sizez), new THREE.MeshStandardMaterial(c)));
this.sizex = sizex;
this.sizey = sizey;
this.sizez = sizez;
this.c=c;
this.position.x = x;
this.position.y = y;
this.position.z = z;
this.castShadow = true;
this.receiveShadow = true;
}

Pared.prototype = new THREE.Object3D();





function setup(){
 entorno = new Environment();


camara = new THREE.PerspectiveCamera(100, canvasWidth / canvasHeight, 0.1, 10000);
camara.position.set(0,0,100);


// E S F E R A     F I N A L
esffinal=new THREE.Mesh(new THREE.SphereGeometry(5), new THREE.MeshStandardMaterial({map:pepsi}));
entorno.add(esffinal);
esffinal.position.set(20,180,5);



step=0;
 raycasterff1 = new THREE.Raycaster(esffinal.position, new THREE.Vector3(1,0,0));
  raycasterff2 = new THREE.Raycaster(esffinal.position, new THREE.Vector3(-1,0,0));




// E S F E R A     F I N A L   N I V E L   2
esffinal2=new THREE.Mesh(new THREE.SphereGeometry(5), new THREE.MeshStandardMaterial({map:dr}));
entorno.add(esffinal2);
esffinal2.position.set(offset2+100,180,5);



step2=0;
 raycasterff3 = new THREE.Raycaster(esffinal2.position, new THREE.Vector3(0,1,0));
  raycasterff4 = new THREE.Raycaster(esffinal2.position, new THREE.Vector3(0,-1,0));








// E S F E R A     F I N A L   N I V E L   3
esffinal3=new THREE.Mesh(new THREE.SphereGeometry(5), new THREE.MeshStandardMaterial({map:jarritos}));
entorno.add(esffinal3);
esffinal3.position.set(offset3,100,5);



step3=0;
 raycasterff5 = new THREE.Raycaster(esffinal3.position, new THREE.Vector3(1,0,0));
  raycasterff6 = new THREE.Raycaster(esffinal3.position, new THREE.Vector3(-1,0,0));






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



var material = new THREE.MeshStandardMaterial({map:coca});

Lata = new THREE.Mesh(LataFForma, material);

Lata.castShadow = true;

entorno.add(Lata);

Lata.rotateX(Math.PI/2);
Lata.position.set(20,20,10)








	//Cubo
				
				var cuboMaterial = new THREE.MeshStandardMaterial( { map:cubito } );
				
				var cuboGeometria = new THREE.CubeGeometry(2.5, 2.5, 2.5);

				cubo = new THREE.Mesh(cuboGeometria, cuboMaterial);
				cubo.castShadow = true;
				cubo.position.set(20, 20, 5);

				cubo.velocidadX = 0;
				cubo.velocidadY = 0;

				entorno.add(cubo);






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

var materialstar = new THREE.MeshStandardMaterial({color:0xffff00});
star = new THREE.Mesh( starg, materialstar );
star.rotateY( Math.PI/12 );
star.castShadow = true;
entorno.add(star);
star.visible = false;





//ESFERA				
var esferaMaterial = new THREE.MeshStandardMaterial( { map:bola8} );
				
var esferaGeometria = new THREE.SphereGeometry(2, 32, 32);

esfera = new THREE.Mesh(esferaGeometria, esferaMaterial);
esfera.castShadow = true;
esfera.position.set(-10, -5,5);

entorno.add(esfera);

esfera.visible = false;


















//AGREGAR PELOTA COMO AGENTE
entorno.add( new Pelota(5,30,20,5));
entorno.add( new Pelota(5,60,40,5));



 
// M A P A   N I V E L   1



for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			
if ((map[i][j]) === 1) {
			
				entorno.add( new Pared(tcubo,tcubo,alturacubo,i*20,j*20,0,{map:textura1}) );
				
				
			}
			
		}
	}


//PISO 1

	var pisog = new THREE.BoxBufferGeometry(200,200,1);
	var materialpiso = new THREE.MeshStandardMaterial( {map:textura4} );
	var P = new THREE.Mesh( pisog, materialpiso );
	entorno.add( P );
	P.position.z=0;
	P.position.x=100-10;
	P.position.y=100-10;
	P.receiveShadow = true;


// M A P A   N I V E L   2
for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			
if ((map2[i][j]) === 1) {
				entorno.add( new Pared(tcubo,tcubo,alturacubo,offset2+i*20,j*20,0,{map:textura2}) );
				
				Pared.castShadow = true;
				Pared.receiveShadow = true;
				
			}
			
		}
	}


//PISO 2
	var piso2g = new THREE.BoxBufferGeometry(200,200,1);
	var materialpiso2 = new THREE.MeshStandardMaterial( {map:textura5} );
	var P2 = new THREE.Mesh( piso2g, materialpiso2 );
	entorno.add( P2 );
	P2.position.z=0;
	P2.position.x=offset2+100-10;
	P2.position.y=100-10;
	P2.receiveShadow = true;





// D I B U J A R    M A P A  3 
for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			
if ((map3[i][j]) === 1) {
				
				entorno.add( new Pared(tcubo,tcubo,alturacubo,offset3+i*20,j*20,0,{map:textura3}) );
				
			}
			
		}
	}










//PISO 3
	var piso3g = new THREE.BoxBufferGeometry(200,200,1);
	var materialpiso3 = new THREE.MeshStandardMaterial( {map:textura6} );
	var P3 = new THREE.Mesh( piso3g, materialpiso3 );
	entorno.add( P3 );
	P3.position.z=0;
	P3.position.x=offset3+100-10;
	P3.position.y=100-10;
	P3.receiveShadow = true;






//ANUNCIO UPIITA
	var piso4g = new THREE.BoxBufferGeometry(800,200,1);
	var materialpiso4 = new THREE.MeshStandardMaterial( {map:logoupiita} );
	var P4 = new THREE.Mesh( piso4g, materialpiso4 );
	entorno.add( P4 );
	P4.position.z=200;

	P4.receiveShadow = true;





entorno.add( camara );


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

entorno.add( spotLight );





//L U Z     M A P A 2
var spotLight2 = new THREE.SpotLight( 0xffffff );
spotLight2.position.set( 400, 300, 300 );
//default; light shining from top
spotLight2.castShadow = true;

spotLight2.shadow.mapSize.width = 2000;
spotLight2.shadow.mapSize.height = 2000;

spotLight2.shadow.camera.near = 0.1;
spotLight2.shadow.camera.far = 5000;
spotLight2.shadow.camera.fov = 75;

entorno.add( spotLight2 );











//L U Z     M A P A 3
var spotLight3 = new THREE.SpotLight( 0xffffff );
spotLight3.position.set( offset2+400+100, 200, 500 );
//default; light shining from top
spotLight3.castShadow = true;

spotLight3.shadow.mapSize.width = 2000;
spotLight3.shadow.mapSize.height = 2000;

spotLight3.shadow.camera.near = 0.1;
spotLight3.shadow.camera.far = 5000;
spotLight3.shadow.camera.fov = 75;

entorno.add( spotLight3 );





	

	






	render = new THREE.WebGLRenderer();
	var canvasWidth = 800;
	var canvasHeight = 800;
	render.setSize(canvasWidth, canvasHeight);
	render.shadowMap.enabled = true;
	render.shadowMap.type = THREE.BasicShadowMap;	
	render.shadowMap.type = THREE.PCFSoftShadowMap;
	
	document.body.appendChild(render.domElement);




camara = new THREE.PerspectiveCamera(100, canvasWidth / canvasHeight, 0.1, 10000);
camara.position.set(0,0,100);





animar();
}

function animar(){
requestAnimationFrame(animar);

entorno.sense();
entorno.plan();
entorno.act();






// R A Y C A S T E R 1

obstaculoff1 = raycasterff1.intersectObject(cubo);
obstaculoff2 = raycasterff2.intersectObject(cubo);
  if ((obstaculoff1.length>0 && (obstaculoff1[0].distance<=1))||(obstaculoff2.length>0 && (obstaculoff2[0].distance<=1)))
  {step=5;}

raycasterff1.set(esffinal.position, new THREE.Vector3(0,1,0));
  raycasterff2.set(esffinal.position, new THREE.Vector3(0,-1,0));







//RAYCASTER NIVEL 2

obstaculoff3 = raycasterff3.intersectObject(cubo);
obstaculoff4 = raycasterff4.intersectObject(cubo);
  if ((obstaculoff3.length>0 && (obstaculoff3[0].distance<=1))||(obstaculoff4.length>0 && (obstaculoff4[0].distance<=1)))
  {step2=5;}

raycasterff3.set(esffinal2.position, new THREE.Vector3(0,1,0));
  raycasterff4.set(esffinal2.position, new THREE.Vector3(0,-1,0));



//RAYCASTER NIVEL 3

obstaculoff5 = raycasterff5.intersectObject(cubo);
obstaculoff6 = raycasterff6.intersectObject(cubo);
  if ((obstaculoff5.length>0 && (obstaculoff5[0].distance<=1))||(obstaculoff6.length>0 && (obstaculoff6[0].distance<=1)))
  {step3=5;}

raycasterff5.set(esffinal3.position, new THREE.Vector3(1,0,0));
  raycasterff6.set(esffinal3.position, new THREE.Vector3(-1,0,0));



camara.position.x=cubo.position.x+zoomx;
camara.position.y=cubo.position.y+zoomy;
camara.position.z=cubo.position.z+zoomz;

Lata.position.x=cubo.position.x;
Lata.position.y=cubo.position.y;
Lata.position.z=cubo.position.z+10;
Lata.rotation.y=cubo.rotation.z;

star.position.x=cubo.position.x;
star.position.y=cubo.position.y;
star.position.z=cubo.position.z;

esfera.position.x=cubo.position.x;
esfera.position.y=cubo.position.y;
esfera.position.z=cubo.position.z;



esffinal.position.y += step;
esffinal2.position.y += step2;
esffinal3.position.z +=step3;
cubo.position.z += step3;


	
if(keyboard[70]){ // f
		
		cubo.position.z -= player.speed;
	}
	if(keyboard[82]){ // r
		
		cubo.position.z += player.speed;
	}
	if(keyboard[65]){ //a 


		cubo.position.x -= player.speed;
		

	}
	if(keyboard[68]){ // derecha     d
		cubo.position.x += player.speed;
		
	}

	if(keyboard[69]){ // e
		cubo.rotation.y -= player.turnSpeed;
	}
	if(keyboard[81]){ // q
		cubo.rotation.y += player.turnSpeed;
	}
	



	if(keyboard[87]){ // w
		cubo.position.y +=player.speed;
	}
	if(keyboard[83]){ // s
		cubo.position.y -=player.speed;
	}


//CAMBIAR PERSONAJES

	if(keyboard[49])// 1
		{Lata.visible = true; cubo.visible = false; esfera.visible = false; star.visible = false;}
	
	if(keyboard[50]) // 2
		{Lata.visible = false; cubo.visible = true; esfera.visible = false; star.visible = false;}
	
	if(keyboard[51]) // 3
		{Lata.visible = false; cubo.visible = false; esfera.visible = true; star.visible = false;}
	
	if(keyboard[52]) // 4
		{Lata.visible = false; cubo.visible = false; esfera.visible = false; star.visible = true;}
	







// R E S T R I C C I O N E S

//N I V E L 1
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


//N I V E L    2
for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			
if ((map2[i][j]) === 1) {
				

				if ( (cubo.position.x === offset2+i*tcubo - 12) && (cubo.position.y < j*tcubo+11 && cubo.position.y > j*tcubo-11) ) {cubo.position.x = offset2+i*tcubo - 13}
				if ( (cubo.position.x === offset2+i*tcubo + 12) && (cubo.position.y < j*tcubo+11 && cubo.position.y > j*tcubo-11) ) {cubo.position.x = offset2+i*tcubo + 13}


				if ( (cubo.position.y === j*tcubo - 12) && (cubo.position.x  < offset2+i*tcubo+11 && cubo.position.x >offset2+ i*tcubo-11) ) {cubo.position.y = j*tcubo - 13}
				if ( (cubo.position.y === j*tcubo + 12) && (cubo.position.x  < offset2+i*tcubo+11 && cubo.position.x >offset2+ i*tcubo-11) ) {cubo.position.y = j*tcubo + 13}

				
				
			}
			
		}
	}


//N I V E L    3
for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			
if ((map3[i][j]) === 1) {
				

				if ( (cubo.position.x === offset3+i*tcubo - 12) && (cubo.position.y < j*tcubo+11 && cubo.position.y > j*tcubo-11) ) {cubo.position.x = offset3+i*tcubo - 13}
				if ( (cubo.position.x === offset3+i*tcubo + 12) && (cubo.position.y < j*tcubo+11 && cubo.position.y > j*tcubo-11) ) {cubo.position.x = offset3+i*tcubo + 13}


				if ( (cubo.position.y === j*tcubo - 12) && (cubo.position.x  < offset3+i*tcubo+11 && cubo.position.x >offset3+ i*tcubo-11) ) {cubo.position.y = j*tcubo - 13}
				if ( (cubo.position.y === j*tcubo + 12) && (cubo.position.x  < offset3+i*tcubo+11 && cubo.position.x >offset3+ i*tcubo-11) ) {cubo.position.y = j*tcubo + 13}

				
				
			}
			
		}
	}






// A P A R I C I O N E S 

//NIVEL 1
	if ( (cubo.position.x > 10) && (cubo.position.x < 30) && (cubo.position.y > 190) && (step > 0) ) {cubo.position.x = 300; cubo.position.y=20;}


//NIVEL 2
	if ( (cubo.position.x > offset2+90) && (cubo.position.x < offset2+90+40) && (cubo.position.y > 190) && (step2 > 0) ) {cubo.position.x = offset3+20; cubo.position.y=20;}








 	
	render.render(entorno,camara);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);


window.onload = setup;





