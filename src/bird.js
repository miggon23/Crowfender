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
  constructor(scene, x, y, birdsGroup, level, route, rooms, sprite, multiplier) {
    super(scene, x, y, sprite);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    birdsGroup.add(this);
    this.birdSprite = sprite;
    this.setDepth(2);
    this.multiplier = multiplier;
    this.setAnims();

    if(this.birdSprite === 'bird1') this.play('bird_fly1')
    else if(this.birdSprite === 'bird2') this.play('bird_fly2')
    else this.play('bird_fly3')
    
    if(this.multiplier === 'easy') this.delayToMove = Phaser.Math.Between(2000, 5000);
    else if(this.multiplier === 'medium') this.delayToMove = Phaser.Math.Between(1000, 3000);
    else this.delayToMove = 800;
    

    this.level = level;
    //Velocidad de movimiento
    this.speed = 300;  
    this.timer = 0;
    
    this.stopMovementTimer = 0;
    this.delayToStopMovement = 500;
    this.route = route;
    this.rooms = rooms;
    this.hitSound = this.scene.sound.add("birdHit");
    this.deadSound = this.scene.sound.add("birdDeath");
    //Añadimos la vida
    this.delayToChangeRoom;
    if(this.birdSprite === ' bird1'){
      this.health = 1;
      this.delayToChangeRoom = Phaser.Math.Between(5000, 8000);
    }
    else if(this.birdSprite === ' bird2'){
      this.health = 3;
      this.delayToChangeRoom = Phaser.Math.Between(7000, 10000);
    }
    else{
      this.health = 2;
      this.delayToChangeRoom = Phaser.Math.Between(3000, 5000);
    }
   

    this.changeRoomTimer = 0;

    //Sonidos de los pájaros al llegar al centro
    this.center1 = this.scene.sound.add("bird1Center");
    this.center2 = this.scene.sound.add("bird2Center");
    this.center3 = this.scene.sound.add("bird3Center");
    this.birdFly1 = this.scene.sound.add("bird1Fly");
    this.birdFly2 = this.scene.sound.add("bird2Fly");
    this.birdFly3 = this.scene.sound.add("bird3Fly");

    // En lugar de guardar la habitación actual, guardo el orden de la habitación actual
    // Habitación de spawn = 0, la siguiente = 1... 
    this.actualOrderRoom = 0;

    
    //Añadimos un pájaro al contador del spawn
    this.rooms[route[0]].addBirdInSpawn();
    
  }
  setAnims() {
    this.scene.anims.create({
      key: 'bird_idle1',
      frames: this.anims.generateFrameNumbers('bird1', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1 // Animación en bucle
    });
    this.scene.anims.create({
      key: 'bird_idle2',
      frames: this.anims.generateFrameNumbers('bird2', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1 // Animación en bucle
    });
    this.scene.anims.create({
      key: 'bird_idle3',
      frames: this.anims.generateFrameNumbers('bird3', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1 // Animación en bucle
    });

    this.scene.anims.create({
      key: 'bird_jump1',
      frames: this.anims.generateFrameNumbers('bird1', { start: 2, end: 3 }),
      frameRate: 10,
      yoyo: true,
      repeat: -1 // Animación en bucle
    });
    this.scene.anims.create({
      key: 'bird_jump2',
      frames: this.anims.generateFrameNumbers('bird2', { start: 2, end: 3 }),
      frameRate: 10,
      yoyo: true,
      repeat: -1 // Animación en bucle
    });
    this.scene.anims.create({
      key: 'bird_jump3',
      frames: this.anims.generateFrameNumbers('bird3', { start: 2, end: 3 }),
      frameRate: 10,
      yoyo: true,
      repeat: -1 // Animación en bucle
    });

    this.scene.anims.create({
      key: 'bird_fly1',
      frames: this.anims.generateFrameNumbers('bird1', { start: 4, end: 7 }),
      frameRate: 10,
      yoyo: true,
      repeat: -1 // Animación en bucle
    });
    this.scene.anims.create({
      key: 'bird_fly2',
      frames: this.anims.generateFrameNumbers('bird2', { start: 4, end: 7 }),
      frameRate: 10,
      yoyo: true,
      repeat: -1 // Animación en bucle
    });
    this.scene.anims.create({
      key: 'bird_fly3',
      frames: this.anims.generateFrameNumbers('bird3', { start: 4, end: 7 }),
      frameRate: 10,
      yoyo: true,
      repeat: -1
    });
  }

  /**
   * Selecciona una de las 4 direcciones posibles de movimiento (no se mueve diagonalmente) 
   * y le añade un valor fijo de desplazamiento definido en la clase
   */
  moveBird(){
    //Hay una pequeña probabilidad de que no salte en este turno
    
    if(this.actualOrderRoom !== 0){
      let dir = Phaser.Math.Between(0, 4);  
      if (dir === 0){
        this.body.setVelocityY(this.speed);     
      }
      else if (dir === 1){
        this.body.setVelocityY(-this.speed);
      }
      else if (dir === 2){
        this.body.setVelocityX(this.speed);
        this.flipX = false;
      }
      else if (dir === 3){
        this.body.setVelocityX(-this.speed);
        this.flipX = true;
      }

      if(dir !==4){
        if(this.birdSprite === 'bird1'){
          this.play('bird_jump1')        }
        else if(this.birdSprite === 'bird2'){
          this.play('bird_jump2'); 
        }
        else{
          this.play('bird_jump3')
        }
        
      }
    }  
  }

  /**
  * Método que avisa al pájaro para cambiar de sala, consultando antes si es es viable este cambio
  */
  goToNextRoom()
  {
    this.cancelMovement()
    if (this.iCanAdvance())
    {
      this.advanceRoom();
    }
  }

  //Comprueba que puede pasar a la siguiente sala. Si está en la sala del spawn 
  //comprobará el blockeable. En cualquier otro caso, comprobará simplemente que no haya llegado
  //al final de su ruta
  iCanAdvance(){
    if(this.actualOrderRoom === 0)
    {
      //return !this.rooms[this.route[0]].spawnBlocked(); 
      if(!this.rooms[this.route[0]].spawnBlocked()){
        
        return true;
      }
      else{
        return false;
      }
    }
    else
      return (this.actualOrderRoom !== this.route.length - 1);   
  }

  //Cambia a la habitación i de su ruta tomando las coordenadas del la sala y calculando donde debería estar el suelo
  changeRoom(i){
    let topLeft = this.rooms[this.route[i]].birdZone.getTopLeft();
    let botRight = this.rooms[this.route[i]].birdZone.getBottomRight();
    // let offsetX = this.width / 2;
    // let offsetY = this.height / 2;
    
    let newX = Phaser.Math.Between(topLeft.x, botRight.x);
    let newY = Phaser.Math.Between(botRight.y, botRight.y);
    
   
    if(this.birdSprite === 'bird1'){
      this.play('bird_fly1')
    }
    else if(this.birdSprite === 'bird2'){
      this.play('bird_fly2')
    }
    else{
      this.play('bird_fly3')
    }

    if(newX >= this.x) this.flipX = false;
    else  this.flipX = true;
    this.body.enable = false;
    this.scene.tweens.add({
      targets:  this ,
      alpha: 0,
      duration: 600,
      ease: 'Sine.easeOutExpo',
      repeat: 0,
      yoyo: true,
      hold: 800,
    });

    this.tween = this.scene.tweens.add({
      targets:  this ,
       x: newX,
       y: newY,
      duration: 2000,
      ease: 'Sine.easeInOutExpo',
      repeat: 0,
    })
    this.tween.on('complete', this.listener, this);
  }

  listener() {
    this.body.enable = true;
  }

  //Envía al pájaro a la siguiente sala marcada por su lista de rutas. Comprueba si está
  // en la sala central, en ese caso, no avanza. La sala central es siempre la última del array de rutas
  advanceRoom(){
    if(this.actualOrderRoom === 0){ //Si sale del spawn, lo restamos del spawn para que no rebase el limite de pajaros del spawn
      if(this.birdSprite === 'bird1'){
        this.birdFly1.play();
      }
      else if(this.birdSprite === 'bird2'){
        this.birdFly2.play();
      }
      else{
        this.birdFly3.play();
      }
     
      this.rooms[this.route[0]].subBirdInSpawn();
    }

    //Hemos comprobado en el if que el actualOrderRoom no ha llegado a la última sala, 
    // podemos confiar en que no se saldrá del tamaño del array de rutas
    this.actualOrderRoom++;
    this.changeRoom(this.actualOrderRoom);
    if(this.actualOrderRoom === this.route.length - 1) //Llega al centro
    {
      if(this.birdSprite === 'bird1'){
        this.center1.play();
      }
      else if(this.birdSprite === 'bird2'){
        this.center2.play();
      }
      else{
        this.center3.play();
      }
      this.level.addBirdInMiddle();
    }
  }

  //Clase para eliminar al pájaro, bien por la electricidad o porque le hayan dado el último golpe
  die(){
    this.level.subBird(); //Restamos un pájaro del contador y añadimos un punto
    this.destroy();
  }


  //Envía al pájaro en la sala anterior a la que está, siempre y cuando no se encuentra en el spawn o 
  // sea su último golpe para acabar con su vida. Se llama cuando el jugador golpea a un pájaro con la escoba
  hitBird(){
    this.health--;
    this.changeRoomTimer = 0;
    if(this.actualOrderRoom === this.route.length - 1)
    {
      this.level.substractBirdFromMiddle();
    }
    
    if(this.health === 0){
      this.deadSound.play();
      this.die();
    }
    else if(this.actualOrderRoom > 0)
    {
      this.hitSound.play();
      this.actualOrderRoom--;
      this.changeRoom(this.actualOrderRoom);
    }
  }

  /**
   * Frena alpájaro si se está moviendo (No lo detiene del cambio de sala)
   */
  cancelMovement(){
    this.body.setVelocity(0, 0);
    if(this.actualOrderRoom !== 0){
      if(this.birdSprite === 'bird1'){
        this.play('bird_idle1')
        }
        else if(this.birdSprite === 'bird2'){
          this.play('bird_idle2')
        }
        else{
          this.play('bird_idle3')
        }
    }
    else{
      if(this.birdSprite === 'bird1'){
      this.play('bird_fly1')
      }
      else if(this.birdSprite === 'bird2'){
        this.play('bird_fly2')
      }
      else{
        this.play('bird_fly3')
      }
    }
  }

  /**
   * Métodos preUpdate de Phaser. En este caso se encarga del movimiento del pajaro y de su eliminación por electricidad.
   * @override
   */
    preUpdate(t,dt) {
    super.preUpdate(t,dt);
    this.timer += dt;
    this.stopMovementTimer += dt;
    this.changeRoomTimer += dt;
    if (this.timer >= this.delayToMove)
    {
      this.moveBird();
      this.timer -= this.delayToMove;
      //Generamos otro aleatorio para el siguiente movimiento
      if(this.multiplier === 'easy') this.delayToMove = Phaser.Math.Between(2000, 5000);
      else if(this.multiplier === 'medium') this.delayToMove = Phaser.Math.Between(1000, 3000);
      else this.delayToMove = 800;
      this.stopMovementTimer = 0;
    }
    else if (this.stopMovementTimer >= this.delayToStopMovement){
      this.cancelMovement();
      this.stopMovementTimer = 0;
    }
    
    if(this.changeRoomTimer >= this.delayToChangeRoom)
    {
      this.goToNextRoom();
      this.changeRoomTimer = 0;
    }

  }  
}
