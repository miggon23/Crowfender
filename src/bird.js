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
   */
  constructor(scene, x, y, birdsGroup) {
    super(scene, x, y, 'bird');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    birdsGroup.add(this);
    this.body.setCollideWorldBounds();

    //Velocidad de movimiento
    this.sJump = 300;
    this.delayToMove = Phaser.Math.Between(2000, 5000);
    this.timer = 0;
    this.stopMovementTimer = 0;
    this.delayToStopMovement = 500;

  }

  /**
   * Selecciona una de las 4 direcciones posibles de movimiento (no se mueve diagonalmente) 
   * y le añade un valor fijo de desplazamiento definido en la clase
   */
  moveBird(){
    console.log("Mueve al pájaro");
    //Hay una pequeña probabilidad de que no salte en este turno
    let dir = Phaser.Math.Between(0, 4);
    if (dir === 0){
      this.body.setVelocityY(this.sJump);
    }
    else if (dir === 1){
      this.body.setVelocityY(-this.sJump);
    }
    else if (dir === 2){
      this.body.setVelocityX(this.sJump);
    }
    else if (dir === 3){
      this.body.setVelocityX(-this.sJump);
    }

    // this.scene.time.addEvent( {
    //   delay: 500, 
    //   callback: this.cancelMovement,
    //   callbackScope: this,
    //   loop: false
    // });
    

  }


  cancelMovement(){
    this.body.setVelocity(0, 0);
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del pajaro.
   * @override
   */
   preUpdate(t,dt) {
    super.preUpdate(t,dt);
    this.timer += dt;
    this.stopMovementTimer += dt;
    if (this.timer >= this.delayToMove)
    {
      this.moveBird();
      this.timer -= this.delayToMove;
      this.delayToStopMovement = Phaser.Math.Between(2000, 5000);
      this.stopMovementTimer = 0;
    }
    else if (this.stopMovementTimer >= this.delayToStopMovement){
      this.cancelMovement();
      this.stopMovementTimer = 0;
    }
    
    
  }
   
}
