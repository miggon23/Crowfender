import Level from "./level.js";

/**
 * Clase que representa a los pájaros del juego, es decir, los enemigos. Los pájaros cambian de habitación
 * cada cierto tiempo. Y tienen un movimietno aleatorio que les hace desplazarse una posición cada cierto tiempo.
 * Los pájaros se espantan  al recibir un golpe.
 */
export default class Bird extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el pájaro
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   * @param {group} birdsGroup Grupo de pájaros de la escena
   * @param {Level} level Level al que pertenece el pájaro
   * @param {array of numbers} route salas que sigue el pájaro en orden, desde el spawn a la sala central
   * @param {array of Room} rooms array que guarda las habitaciones visitables por el pájaro
   */
  constructor(scene, x, y, birdsGroup, level, route, rooms) {
    super(scene, x, y, 'bird');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    birdsGroup.add(this);
    this.level = level;
    //Velocidad de movimiento
    this.speed = 300;
    this.delayToMove = Phaser.Math.Between(2000, 5000);
    this.timer = 0;
    this.stopMovementTimer = 0;
    this.delayToStopMovement = 500;
    this.delayElectricity = 50;
    this.route = route;
    this.rooms = rooms;
    
    //Añadimos la vida
    this.health = 3;

    // En lugar de guardar la habitación actual, guardo el orden de la habitación actual
    // Habitación de spawn = 0, la siguiente = 1... 
    this.actualOrderRoom = 0;

    // console.log("Bird : x: " + x + " y: " + y);
    // console.log(route); 
    
  }
  /**
   * Selecciona una de las 4 direcciones posibles de movimiento (no se mueve diagonalmente) 
   * y le añade un valor fijo de desplazamiento definido en la clase
   */
  moveBird(){
    //Hay una pequeña probabilidad de que no salte en este turno
    let dir = Phaser.Math.Between(0, 4);
    if (dir === 0){
      this.body.setVelocityY(this.speed);     
    }
    else if (dir === 1){
      this.body.setVelocityY(-this.speed);
    }
    else if (dir === 2){
      this.body.setVelocityX(this.speed);
    }
    else if (dir === 3){
      this.body.setVelocityX(-this.speed);
    }
    else if (dir === 4){
      this.advanceRoom();
    }

    // this.scene.time.addEvent( {
    //   delay: 500, 
    //   callback: this.cancelMovement,
    //   callbackScope: this,
    //   loop: false
    // });
  }

  changeRoom(i){
    let topLeft = this.rooms[this.route[i]].getTopLeft();
    let botRight = this.rooms[this.route[i]].getBottomRight();
    let x = Phaser.Math.Between(topLeft.x, botRight.x);
    let y = Phaser.Math.Between((botRight.y - ((botRight.y - topLeft.y) / 3)), botRight.y);
    this.x = x;
    this.y = y;
  }

  //Envía al pájaro a la siguiente sala marcada por su lista de rutas. Comprueba si está
  // en la sala central, en ese caso, no avanza. La sala central es siempre la última del array de rutas
  advanceRoom(){
    if(this.actualOrderRoom !== this.route.length - 1)
    { //Equivalente a comparar las habitaciones: if(this.rooms[this.route[this.actualOrderRoom]] !== this.rooms[this.route[this.route.length - 1]])

      //Hemos comprobado en el if que el actualOrderRoom no ha llegado a la última sala, 
      // podemos confiar en que no se saldrá del tamaño del array de rutas
      this.actualOrderRoom++;
      this.changeRoom(this.actualOrderRoom);
      if(this.actualOrderRoom === this.route.length - 1)
      {
        this.level.addBirdInMiddle();
      }
    }
  }

   //Clase para eliminar al pájaro, bien por la electricidad o porque le hayan dado el último golpe
   die(){
    console.log("i die");
      this.level.subBird(); //Restamos un pájaro del contador y añadimos un punto
      this.destroy();
  }


  //Envía al pájaro en la sala anterior a la que está, siempre y cuando no se encuentra en el spawn o 
  // sea su último golpe para acabar con su vida. Se llama cuando el jugador golpea a un pájaro con la escoba
  hitBird(){
    this.health--;
    if(this.actualOrderRoom === this.route.length - 1)
    {
      this.level.substractBirdFromMiddle();
    }
    
    if(this.heath === 0){
      this.die();
    }
    else if(this.actualOrderRoom > 0)
    {
      this.actualOrderRoom--;
      this.changeRoom(this.actualOrderRoom);
    }
  }

  //Detiene al pájaro de su movimiento actual
  cancelMovement(){
    this.body.setVelocity(0, 0);
  }

  /**
   * Métodos preUpdate de Phaser. En este caso se encarga del movimiento del pajaro y de su eliminación por electricidad.
   * @override
   */
   preUpdate(t,dt) {
    super.preUpdate(t,dt);
    this.timer += dt;
    this.stopMovementTimer += dt;
    this.electricityTimer += dt;
    if (this.timer >= this.delayToMove)
    {
      this.moveBird();
      this.timer -= this.delayToMove;
      this.stopMovementTimer = Phaser.Math.Between(2000, 5000);
      this.stopMovementTimer = 0;
    }
    else if (this.stopMovementTimer >= this.delayToStopMovement){
      this.cancelMovement();
      this.stopMovementTimer = 0;
    }
  }  
}
