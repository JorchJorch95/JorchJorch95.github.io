function Agent(x=0,y=0){
  THREE.Object3D.call(this);
  this.position.x=x;
  this.position.y=y;
}

Agent.prototype = new THREE.Object3D();

Agent.prototype.sense = function(environment) {};
Agent.prototype.plan = function(environment) {};
Agent.prototype.act = function(environment) {};

//Un agente opera sobre un entorno, el cual está definido por el constructor Environment()

function Environment() {

  THREE.Scene.call(this);
  }
  
  //Para nuestro caso, el prototipo de un entorno es Scene()
  
  Environment.prototype = new THREE.Scene();
  
  //El interfaz entre el entorno y los agentes estará dada por los siguientes métodos
  Environment.prototype.sense = function(){
    for ( var i=0; i < this.children.length; i++ ){
    if (this.children[i].sense !== undefined)
      this.children[i].sense(this);
    }
  }
      
      
  Environment.prototype.plan = function() {
    for (var i=0; i < this.children.length; i++)
    if (this.children[i].plan !== undefined
      this.children[i].plan(this);
    }
}


Environment.prototype.act = function(){
  for (var i=0; i < this.children.length; i++){
  if (this.children[i].act !== undefined)
    this.children[i].act(this);
  }
}


//EJEMPLO 1, P E L O T A

//Constructor de pelota

function Pelota(r,x=0,y=0) {
  Agent.call(this,x,y);
  this.add(new THREE.Mesh( new THREE.SphereGeometry(r), new THREE.MeshNormalMaterial() ) );
  
  this.step= 0.1;
  this.colision = 0;
  this.radius = r;
  this.sensor =  new THREE.Raycaster(this.position, new THREE.Vector3(1,0,0) );
}





//El prototipo de una pelota es un agente

Pelota.prototype = new Agent();


//Se definen los métodos sense() y act() del agente Pelota. Una pelota no planifica, así que no se redefine plan()


Pelota.prototype.sense = function(environment){

  this.sensor.set( this.position, new THREE.Vector3(1,0,0) );
  var obstaculo1 = this.sensor.intersectObjets(environment.children, true);
  
  this.sensor.set( this.position, new THREE.Vector3(-1,0,0) );
  var obstaculo2 = this.sensor.intersectObjects(environment.children, true );
  
    
  if ( (obstaculo.length > 0 && (obstaculo1[0].distance <= this.radius ) ) ||  (obstaculo2.length > 0 && (obstaculo2[0].distance <= this.radius) ) )
    this.colision = 1;
   else
    this.colision= 0;
   }:
   
   
   
   
   Pelota.prototype.act = function(environment) {
      if (this.colision === 1)
        this.step = -this.step;
        this.position.x += this.step;
    }; //Se pone ; cuando es una asignación
    
    
    
    
    
    //Las paredes en las que rebota la pelota no son agentes, por lo tanto pueden ser simplemente del tipo Object3D
    
    
   function Pared(size,x=0,y=0) {
    THREE.Object3D.call(this,x,y);
    
    this add(new THREE.Mesh( new THREE.BoxGeometry(size,size,size), new THREE.MeshNormalMaterial() ) );
    
    this.size = size;
    this.position.x = x;
    this.position.y = y;
   }
   
   
   Pared.prototype = new THREE.Object3D();
   
   //El programa principal queda muy simple
   
   
   function setup(){
    entorno = new Environment();
    camara = new THREE.PerspectiveCamera();
    camara.position.z = 30;
    
    entorno.add( new Pared(1,7,0)  );
    entorno.add( new Pared(1,-7,0) );
    entorno.add( new Pared(1,7,1)  );
    entorno.add( new Pared(1,-7,1) );
    entorno.add( new Pared(1,7,-1) );
    entorno.add( new Pared(1,-7,-1));
    entorno.add( new Pelota(0.5)  );
    entorno.add(camara);
    
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerHeight*.95, window.innerHeight*.95);
    document.body.appendChild ( renderer.domElement );
   }
   
   
   function loop(){
      requestAnimationFrame(loop);
      
      entorno.sense();
      
      enotrno.plan();
      
      entorno.act();
      
      
      renderer.render( entorno,camara);
      }
      
      
      var entorno,camara,renderer;
      
      
      
      setup();
      loop;
   
   
   
   
   
   
   
