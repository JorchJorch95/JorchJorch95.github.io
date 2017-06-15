var scene, camera, renderer, mesh,PER1,PER2,PER3,PER4,PER5;
var meshFloor, ambientLight, light;

var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
var raycaster1,raycaster2,raycaster3,raycaster4,raycaster5,raycaster6;	



//texturas
var m1 = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/brick_bump.jpg');
var m2 = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/brick_diffuse.jpg');
var m3 = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/brick_roughness.jpg');
var canasta = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/canasta.jpg');
var metal = new THREE.ImageUtils.loadTexture('https://JorchJorch95.github.io/metal2.jpg');




var enemies = [ 
           [1, 2, 3, 4, 1, 0, 0, 0, 0, 1, 2, 4, 1, 0, 0, 2, 3, 0, 2, 1,], 
           [4, 2, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 3, 1, 4, 0, 2, 1, 4,], 
           [2, 4, 1, 1, 1, 0, 1, 1, 0, 1, 2, 1, 3, 4, 1, 2, 0, 1, 3, 2,], 
           [3, 3, 2, 0, 1, 1, 0, 0, 0, 1, 0, 2, 0, 2, 1, 0, 2, 3, 4, 1,], 
           [3, 2, 1, 0, 1, 0, 0, 1, 0, 1, 2, 4, 1, 1, 1, 0, 1, 1, 0, 1,], 
           [2, 1, 4, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 2, 1, 3, 4,], 
           [1, 2, 3, 1, 0, 0, 0, 1, 0, 1, 0, 2, 3, 0, 1, 2, 3, 0, 1, 0,], 
           [2, 4, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 2, 0, 4, 2, 3, 1, 1,], 
           [4, 2, 2, 0, 0, 0, 1, 0, 0, 1, 2, 3, 4, 3, 2, 1, 2, 3, 2, 1,], 
           [4, 3, 1, 0, 0, 0, 4, 3, 2, 1, 1, 2, 3, 1, 0, 0, 0, 1, 0, 1,]           ];


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

this.step=0;
this.step2=0;
this.colision=0;
this.colision2=0;
this.radius=r;
this.sensor = new THREE.Raycaster(this.position, new THREE.Vector3(1,0,0));
this.position.x = x;
this.position.y = y;
this.position.z = z;
this.visible = true;



var variable = new THREE.Mesh(new THREE.SphereGeometry(r), new THREE.MeshStandardMaterial({color:0xff00ff}));
variable.castShadow = true;
this.add(variable);


}



Pelota.prototype = new Agent();

//entorno.children para detectar solo al cubito
Pelota.prototype.sense = function(environment){
this.sensor.set(this.position, new THREE.Vector3(1,0,0));
var obstaculo1 = this.sensor.intersectObjects(environment.children,true);

this.sensor.set(this.position, new THREE.Vector3(-1,0,0));
var obstaculo2 = this.sensor.intersectObjects(environment.children,true);


this.sensor.set(this.position, new THREE.Vector3(0,0,-1));
var obstaculo3 = this.sensor.intersectObjects(environment.children,true);


if ((obstaculo1.length>0 && (obstaculo1[0].distance<= this.radius)) || (obstaculo2.length > 0 && (obstaculo2[0].distance <= this.radius)) || (obstaculo3.length > 0 && (obstaculo3[0].distance <= this.radius)) )
{this.colision = 1;}
else
{this.colision = 0;}
};





Pelota.prototype.act = function(environment){
if (this.colision === 1)
this.step = -this.step;
this.position.x += this.step;
this.position.Y += this.step;


};






//PERSONAJES YC
function P1(ps, x=0, y=0,z=0,giro,m){
Agent.call(this,x,y);

this.step=0;
this.step2=0.1;
this.colision=0;
this.colision2=0;
this.giro=giro;

this.sensor = new THREE.Raycaster(this.position, new THREE.Vector3(1,0,0));
this.position.x = x;
this.position.y = y;
this.position.z = z;
this.visible = true;
this.ps=ps;




var figur = new THREE.Shape();

figur.moveTo(10/ps, 30/ps);
figur.lineTo(10/ps, 50/ps);    //1
figur.lineTo(20/ps, 60/ps);    //2
figur.lineTo(20/ps, 70/ps);    //3
figur.lineTo(30/ps, 80/ps);    //4
figur.lineTo(40/ps, 80/ps);    //5
figur.lineTo(50/ps, 70/ps);    //6
figur.lineTo(50/ps, 60/ps);    //7
figur.lineTo(60/ps, 50/ps);    //8
figur.lineTo(60/ps, 30/ps);    //9
figur.lineTo(55/ps, 40/ps);    //10
figur.lineTo(45/ps, 20/ps);    //11
figur.lineTo(42.22/ps, 20/ps);    //12
figur.lineTo(42.22/ps, 10/ps);    //13
figur.lineTo(37.78/ps, 10/ps);    //14
figur.lineTo(37.78/ps, 20/ps);    //15
figur.lineTo(32.22/ps, 20/ps);    //16
figur.lineTo(32.22/ps, 10/ps);    //17
figur.lineTo(27.78/ps, 10/ps);    //18
figur.lineTo(27.78/ps, 20/ps);    //19
figur.lineTo(25/ps, 20/ps);    //20
figur.lineTo(15/ps, 40/ps);    //21
figur.lineTo(10/ps,30/ps);

var form = new THREE.ExtrudeGeometry( figur,{amount: 0.1} );


var material = new THREE.MeshStandardMaterial(m);
var mall = new THREE.Mesh( form, material );
//mall.rotateY( Math.PI*5/6);
mall.castShadow =true;
this.add(mall);


}


P1.prototype = new Agent();




P1.prototype.act = function(environment){

if (this.giro === 1){
this.rotation.z += 0.01;}

if (this.giro === 2){
this.rotation.z -= 0.01;}

if (this.giro === 0){
this.rotation.z = this.rotation.z;}
};




function Guerrero(ps, x=0, y=0,z=0,giro,m){
Agent.call(this,x,y);

this.step=0;
this.step2=0.1;
this.colision=0;
this.colision2=0;
this.giro=giro;

this.sensor = new THREE.Raycaster(this.position, new THREE.Vector3(1,0,0));
this.position.x = x;
this.position.y = y;
this.position.z = z;
this.visible = true;
this.ps=ps;

//GUERRERO
//CUERPO GUERRERO
var figura = new THREE.Shape();

figura.moveTo(10/ps, 47/ps);    //1
figura.lineTo(15/ps, 45/ps);    //2
figura.lineTo(25/ps, 95/ps);    //3
figura.lineTo(25/ps, 70/ps);    //4
figura.lineTo(30/ps, 70/ps);    //5
figura.lineTo(30/ps, -10/ps);    //6
figura.lineTo(35/ps, -10/ps);    //7
figura.lineTo(35/ps, 70/ps);    //8
figura.lineTo(45/ps, 70/ps);    //9
figura.lineTo(45/ps, -10/ps);    //10
figura.lineTo(50/ps, -10/ps);    //11
figura.lineTo(50/ps, 70/ps);    //12
figura.lineTo(55/ps, 70/ps);    //13
figura.lineTo(55/ps, 95/ps);    //14
figura.lineTo(65/ps, 45/ps);    //15
figura.lineTo(70/ps, 47/ps);    //16
figura.lineTo(55/ps, 110/ps);    //17
figura.lineTo(45/ps, 110/ps);    //18
figura.lineTo(45/ps, 111/ps);    //19
figura.lineTo(50/ps, 111/ps);    //20
figura.lineTo(50/ps, 118/ps);    //21
figura.lineTo(43/ps, 118/ps);    //22
figura.lineTo(43/ps, 122/ps);    //23
figura.lineTo(50/ps, 122/ps);    //24
figura.lineTo(50/ps, 130/ps);    //25
figura.lineTo(30/ps, 130/ps);    //26
figura.lineTo(30/ps, 122/ps);    //27
figura.lineTo(37/ps, 122/ps);    //28
figura.lineTo(37/ps, 118/ps);    //29
figura.lineTo(30/ps, 118/ps);    //30
figura.lineTo(30/ps, 111/ps);    //31
figura.lineTo(35/ps, 111/ps);    //32
figura.lineTo(35/ps, 110/ps);    //33
figura.lineTo(25/ps, 110/ps);    //34


var forma = new THREE.ExtrudeGeometry( figura,{amount: 1} );


var material = new THREE.MeshStandardMaterial(m);
var malla = new THREE.Mesh( forma, material );
//malla.rotateY( Math.PI/6);
malla.castShadow =true;
this.add(malla);
}




Guerrero.prototype = new Agent();


Guerrero.prototype.act = function(environment){

if (this.giro === 1){
this.rotation.z += 0.01;}

if (this.giro === 2){
this.rotation.z -= 0.01;}

if (this.giro === 0){
this.rotation.z = this.rotation.z;}
};




















//CISNE
function Cisne(ps, x=0, y=0,z=0,giro,m){
Agent.call(this,x,y);
this.giro = giro;
this.step=0;
this.step2=0.0;
this.colision=0;
this.colision2=0;
this.ps=ps;
this.sensor = new THREE.Raycaster(this.position, new THREE.Vector3(1,0,0));
this.position.x = x;
this.position.y = y;
this.position.z = z;
this.visible = true;





var forma = new THREE.Geometry();

forma.vertices.push( new THREE.Vector3( 1,  0,  1 ) ); // Vértice 0
forma.vertices.push( new THREE.Vector3( 1,  0, -1 ) ); // Vértice 1
forma.vertices.push( new THREE.Vector3(-1,  0, -1 ) ); // Vértice 2
forma.vertices.push( new THREE.Vector3(-1,  0,  1 ) ); // Vértice 3
forma.vertices.push( new THREE.Vector3( 0,  10,  0 ) ); // Vértice 4
forma.vertices.push( new THREE.Vector3( 0,  -10,  0 ) ); // Vértice 5
forma.vertices.push( new THREE.Vector3( 5,  0,  0) ); // Vértice 6
forma.vertices.push( new THREE.Vector3( -5,  0,  0 ) ); // Vértice 7
forma.vertices.push( new THREE.Vector3( 0, 10, -5) ); // Cara 5

forma.faces.push( new THREE.Face3( 3, 2, 1 ) ); // Cara 0
forma.faces.push( new THREE.Face3( 3, 1, 0 ) ); // Cara 1
forma.faces.push( new THREE.Face3( 3, 0, 4 ) ); // Cara 2
forma.faces.push( new THREE.Face3( 0, 1, 4 ) ); // Cara 3
forma.faces.push( new THREE.Face3( 1, 2, 4 ) ); // Cara 4
forma.faces.push( new THREE.Face3( 2, 3, 4 ) ); // Cara 5
forma.faces.push( new THREE.Face3( 2, 3, 4 ) ); // Cara 5
forma.faces.push( new THREE.Face3( 3, 0, 5 ) ); // Cara 5
forma.faces.push( new THREE.Face3( 0, 1, 5 ) ); // Cara 5
forma.faces.push( new THREE.Face3( 1, 2, 5 ) ); // Cara 5
forma.faces.push( new THREE.Face3( 2, 3, 5 ) ); // Cara 5
forma.faces.push( new THREE.Face3( 0, 6, 5 ) ); // Cara 5
forma.faces.push( new THREE.Face3( 1, 6, 5 ) ); // Cara 5
forma.faces.push( new THREE.Face3( 0, 1, 5 ) ); // Cara 5
forma.faces.push( new THREE.Face3( 3, 7, 5 ) ); // Cara 5
forma.faces.push( new THREE.Face3( 2, 7, 5 ) ); // Cara 5
forma.faces.push( new THREE.Face3( 3, 2, 7 ) ); // Cara 5

forma.computeBoundingSphere();

forma.computeFaceNormals();

var material = new THREE.MeshStandardMaterial(m);

var cisni = new THREE.Mesh( forma, material );
cisni.rotateX(Math.PI/6);
cisni.castShadow = true;
this.add(cisni);


}



Cisne.prototype = new Agent();


Cisne.prototype.act = function(environment){

if (this.giro === 1){
this.rotation.z += 0.01;}

if (this.giro === 2){
this.rotation.z -= 0.01;}

if (this.giro === 0){
this.rotation.z = this.rotation.z;}



};









function Estrella(ps, x=0, y=0,z=0,giro,m){
Agent.call(this,x,y);
this.giro = giro;
this.step=0;
this.step2=0.0;
this.colision=0;
this.colision2=0;
this.ps=ps;
this.sensor = new THREE.Raycaster(this.position, new THREE.Vector3(1,0,0));
this.position.x = x;
this.position.y = y;
this.position.z = z;
this.visible = true;


//ESTRELLA
var figura = new THREE.Shape();

figura.moveTo(20/ps, 20/ps);
figura.lineTo(20/ps, 10/ps);
figura.lineTo(30/ps, 15/ps);
figura.lineTo(40/ps, 10/ps);
figura.lineTo(40/ps, 20/ps);
figura.lineTo(50/ps, 25/ps);
figura.lineTo(40/ps, 30/ps);
figura.lineTo(40/ps, 40/ps);
figura.lineTo(30/ps, 35/ps);
figura.lineTo(20/ps, 40/ps);
figura.lineTo(20/ps, 30/ps);
figura.lineTo(10/ps, 25/ps);

var forma = new THREE.ExtrudeGeometry( figura,{amount: 1} );


var material = new THREE.MeshStandardMaterial(m);
var malla = new THREE.Mesh( forma, material );
//malla.rotateY( Math.PI/6);

malla.castShadow = true;
this.add(malla);


}




Estrella.prototype = new Agent();


Estrella.prototype.act = function(environment){

if (this.giro === 1){
this.rotation.z += 0.01;}

if (this.giro === 2){
this.rotation.z -= 0.01;}

if (this.giro === 0){
this.rotation.z = this.rotation.z;}
};









function Warrior(ps, x=0, y=0,z=0,giro,m){
Agent.call(this,x,y);

this.step=0;
this.step2=0.0;
this.colision=0;
this.colision2=0;
this.ps=ps;
this.giro=giro;
this.sensor = new THREE.Raycaster(this.position, new THREE.Vector3(1,0,0));
this.position.x = x;
this.position.y = y;
this.position.z = z;
this.visible = true;


//WARRIOR
//CUERPO GUERRERO
var figura = new THREE.Shape();

figura.moveTo(10/ps, 40/ps);    //1
figura.lineTo(15/ps, 40/ps);    //2
figura.lineTo(15/ps, 60/ps);    //3
figura.lineTo(20/ps, 67/ps);    //4
figura.lineTo(32/ps, 40/ps);    //5
figura.lineTo(32/ps, 38/ps);    //6
figura.lineTo(25/ps, 10/ps);    //7
figura.lineTo(27/ps, 10/ps);    //8
figura.lineTo(20/ps, 6/ps);    //9
figura.lineTo(35/ps, 6/ps);    //10
figura.lineTo(35/ps, 10/ps);    //11
figura.lineTo(37/ps, 10/ps);    //12
figura.lineTo(40/ps, 30/ps);    //13
figura.lineTo(43/ps, 10/ps);    //14
figura.lineTo(45/ps, 10/ps);    //15
figura.lineTo(45/ps, 6/ps);    //16
figura.lineTo(60/ps, 6/ps);    //17
figura.lineTo(53/ps, 10/ps);    //18
figura.lineTo(55/ps, 10/ps);    //19
figura.lineTo(48/ps, 38/ps);    //20
figura.lineTo(48/ps, 40/ps);    //21
figura.lineTo(60/ps, 67/ps);    //22
figura.lineTo(78/ps, 67/ps);    //23
figura.lineTo(82/ps, 75/ps);    //24
figura.lineTo(82/ps, 83/ps);    //25
figura.lineTo(85/ps, 83/ps);    //26
figura.lineTo(85/ps, 84/ps);    //27
figura.lineTo(84/ps, 84/ps);    //28
figura.lineTo(86/ps, 110/ps);    //29
figura.lineTo(81.5/ps, 120/ps);    //30
figura.lineTo(77/ps, 110/ps);    //31
figura.lineTo(79/ps, 84/ps);    //32
figura.lineTo(78/ps, 84/ps);    //33
figura.lineTo(78/ps, 83/ps);    //34
figura.lineTo(80/ps, 83/ps);    //35
figura.lineTo(80/ps, 80/ps);    //36
figura.lineTo(75/ps, 72/ps);    //37
figura.lineTo(60/ps, 72/ps);    //38
figura.lineTo(55/ps, 79/ps);    //39
figura.lineTo(45/ps, 79/ps);    //40
figura.lineTo(45/ps, 81/ps);    //41
figura.lineTo(50/ps, 81/ps);    //42
figura.lineTo(50/ps, 100/ps);    //43
figura.lineTo(30/ps, 100/ps);    //44
figura.lineTo(30/ps, 81/ps);    //45
figura.lineTo(35/ps, 81/ps);    //46
figura.lineTo(35/ps, 79/ps);    //47
figura.lineTo(25/ps, 79/ps);    //48
figura.lineTo(10/ps, 67/ps);    //49

var forma = new THREE.ExtrudeGeometry( figura,{amount: 1} );


var material = new THREE.MeshStandardMaterial(m);
var malla = new THREE.Mesh( forma, material );
malla.castShadow = true;
this.add(malla);


}



Warrior.prototype = new Agent();


Warrior.prototype.act = function(environment){

if (this.giro === 1){
this.rotation.z += 0.01;}

if (this.giro === 2){
this.rotation.z -= 0.01;}

if (this.giro === 0){
this.rotation.z = this.rotation.z;}
};
















//JUGADOR

function Jugador(size, x=0, y=0,z=0,m){
Agent.call(this,x,y);

this.step=0;
this.step2=0.0;
this.colision=0;
this.colision2=0;
this.size=size;
this.sensor = new THREE.Raycaster(this.position, new THREE.Vector3(1,0,0));
this.position.x = x;
this.position.y = y;
this.position.z = z;
this.visible = true;



var vari = new THREE.Mesh(new THREE.BoxGeometry(size,size,size), new THREE.MeshStandardMaterial(m));
vari.castShadow = true;
this.add(vari);


}



Jugador.prototype = new Agent();


Jugador.prototype.sense = function(environment){
this.sensor.set(this.position, new THREE.Vector3(1,0,0));
var o1 = this.sensor.intersectObjects(environment.children,true);

this.sensor.set(this.position, new THREE.Vector3(-1,0,0));
var o2 = this.sensor.intersectObjects(environment.children,true);


this.sensor.set(this.position, new THREE.Vector3(0,1,0));
var o3 = this.sensor.intersectObjects(environment.children,true);

this.sensor.set(this.position, new THREE.Vector3(0,-1,0));
var o4 = this.sensor.intersectObjects(environment.children,true);


this.sensor.set(this.position, new THREE.Vector3(0,0,1));
var o5 = this.sensor.intersectObjects(environment.children,true);

this.sensor.set(this.position, new THREE.Vector3(0,0,-1));
var o6 = this.sensor.intersectObjects(environment.children,true);




if ((o1.length>0 && (o1[0].distance<= this.size)) || (o2.length > 0 && (o2[0].distance <= this.size)) || (o3.length > 0 && (o3[0].distance <= this.size)) || (o4.length > 0 && (o4[0].distance <= this.size))    || (o5.length > 0 && (o5[0].distance <= this.size)) || (o6.length > 0 && (o6[0].distance <= this.size))   )
{this.colision = 1;}
else
{this.colision = 0;}
};





Jugador.prototype.act = function(environment){
if (this.colision === 1)

{this.step2 = 0;
this.position.y += this.step;
alert('PERDISTE')
}

this.position.z += this.step2;


};














function init(){

	
	scene = new Environment();
	camera = new THREE.PerspectiveCamera(90, 600/400, 0.1, 1000);
	





	mesh = new Jugador(1,-10,1,-6);
	scene.add(mesh);

	PER1 = new P1(10,-2,2,2,0,{map: m1});
	scene.add(PER1);

	PER2 = new Cisne(1,-25,2,50,0,{map:m2});
	scene.add(PER2);

	guerre = new Guerrero(10,-25,2,25,0,{map:metal});
	scene.add(guerre);
	
	estre = new Estrella(10,-1,2,30,0,{map:canasta});
	scene.add(estre);

	warri =  new Warrior(10,-20,2,10,0,{map:m3});
	scene.add(warri);
	



for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 20; j++) {
			
if ((enemies[i][j]) === 1) {
			scene.add( new Pelota(1,i*-5,0,j*5));
			}
			
if ((enemies[i][j]) === 2) {
			scene.add( new Pelota(1,i*-5,2.5,j*5));
			}

if ((enemies[i][j]) === 3) {
			scene.add( new Pelota(1,i*-5,5,j*5));
			}

if ((enemies[i][j]) === 4) {
			scene.add( new Pelota(1,i*-5,7.5,j*5));
			}
		}
	}










scene.add( new Pelota(1,-5,1,5));











var axisHelper = new THREE.AxisHelper( 5 );
//scene.add(axisHelper);
//axisHelper.position.set(0,1,0);
	
	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(100,100),
		
		new THREE.MeshPhongMaterial({color:0xffffff})
		
	);
	meshFloor.position.y = -2;
	meshFloor.rotation.x -= Math.PI / 2;
	// Floor can have shadows cast onto it
	meshFloor.receiveShadow = true;
	scene.add(meshFloor);
	
	
	// LIGHTS
	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);
	


	var light3 = new THREE.SpotLight(0xffffff);
	light3.position.set(-3,30,20);
	light3.castShadow = true;
	// Will not light anything closer than 0.1 units or further than 25 units
	light3.shadow.camera.near = 0.1;
	light3.shadow.camera.far = 100;
	scene.add(light3);
	
light3.shadow.mapSize.width = 2000;
light3.shadow.mapSize.height = 2000;



	light = new THREE.PointLight(0xffffff, 0.8, 18);
	light.position.set(-3,6,-3);
	light.castShadow = true;
	// Will not light anything closer than 0.1 units or further than 25 units
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 100;
	scene.add(light);
	




	light2 = new THREE.PointLight(0x0000ff);
	light2.position.set(-20,10,50);
	light2.castShadow = true;
	// Will not light anything closer than 0.1 units or further than 25 units
	light2.shadow.camera.near = 0.1;
	light2.shadow.camera.far = 100;
	scene.add(light2);



light3 = new THREE.PointLight(0xff0000);
	light3.position.set(-10,10,80);
	light3.castShadow = true;
	// Will not light anything closer than 0.1 units or further than 25 units
	light3.shadow.camera.near = 0.1;
	light3.shadow.camera.far = 100;
	scene.add(light3);



	
	camera.position.set(mesh.position.x, player.height, mesh.position.z-5);
	camera.lookAt(mesh.position);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(900, 600);
	
	// Enable Shadows in the Renderer
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	
	document.body.appendChild(renderer.domElement);
	
	animate();
}

function animate(){
	requestAnimationFrame(animate);
	

	scene.sense();
	scene.plan();
	scene.act();


	
	
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
	
	if(keyboard[87]){ // W key
		mesh.position.z +=  player.speed;
	}
	if(keyboard[83]){ // S key
		mesh.position.z -= player.speed;
	}
	if(keyboard[65]){ // A key
		mesh.position.x += player.speed;
		
	}
	if(keyboard[68]){ // D key
		mesh.position.x -=  player.speed;
		
	}
	
	if(keyboard[37]){ // left arrow key
		mesh.position.y += player.speed;
	}
	if(keyboard[39]){ // right arrow key
		mesh.position.y -= player.speed;
	}
	



if (mesh.position.x < -50) {mesh.position.x=-49;}
if (mesh.position.x > 0) {mesh.position.x=0;}
if (mesh.position.y > 9) {mesh.position.y=9;}
if (mesh.position.y <0) {mesh.position.y=0;}
if (mesh.position.z > 100){alert('FELICIDADES! HAS TERMINADO EL JUEGO!')}





	camera.position.x = mesh.position.x;
	camera.position.y = mesh.position.y;
	camera.position.z = mesh.position.z-5;
	
	renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;
