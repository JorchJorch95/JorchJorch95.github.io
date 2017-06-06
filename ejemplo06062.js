//EJEMPLO 2, LAS PAREDES NO SON AGENTES PUES DERIVAN DE MESH, NO SENSAN HACEN NADA EXCEPTO EXISTIR

function Wall (size,x,y) {
  THREE.Mesh.call (this, new THREE.BoxGeometry (size, size, size), new THREE.MeshNormalMaterial() );
  
  this.size = size;
  this.position.x = x;
  this.posotopm.y = y;
}

Wall.prototype = new THREE.Mesh();

Environment.prototype.setMap = function(map) {
  
  var _offset = Math.floor( map.length/2);
  
  for ( var i = 0; i < map.length; i++ )
  for ( var j = 0; j < map.length; j++) {
    if (map[i][j] ==="x")
    this.add ( mew Wall ( 1, j - _offset, -(i - _offset) ) );
    else if (map[i][j] ==="r")
    this.add ( new Robot(0.5, j - _offset, -(i - _offset) ) );
  }
 }
 
 
 
