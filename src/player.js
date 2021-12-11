import Broom from './broom.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Container {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   * @param {bool} sentido false = izquierda, true = derecha
   */
  constructor(scene, x, y) {
    let spriteShown = scene.add.sprite(15, -64, 'player');
    super(scene, x, y, spriteShown);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);


    // this.scene.anims.create({
    //   key: 'player_idle',
    //   frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
    //   frameRate: 10, // Velocidad de la animación
    //   repeat: -1   // Animación en bucle
    // });

    // this.scene.anims.create({
    //   key: 'player_attack',
    //   frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
    //   frameRate: 10, // Velocidad de la animación
    //   repeat: -1   // Animación en bucle
    // });

    // Queremos que el jugador no se salga de los límites del mundo
    //this.body.setCollideWorldBounds();
    this.horizontalSpeed = 300;
    this.verticalSpeed = 300;
    this.diagonalSpeed = 212.13;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    this.w = this.scene.input.keyboard.addKey('W');
    this.a = this.scene.input.keyboard.addKey('A');
    this.s = this.scene.input.keyboard.addKey('S');
    this.d = this.scene.input.keyboard.addKey('D');
    this.wood = false;
    this.hittingState = false;
    this.scrolling = false;
    this.room = 0;
  }

    /**
     * El jugador ha pulsado k en la zona de teletransporte hacia el sótano,
     * por lo que se le desplazará en y abajo.
     * */

  /**
   * Al interactuar con el cofre, el jugador recoge madera, mientras que al interactuar
   * con la chimenea, la ventana o la puerta, el jugador gasta la madera. En ambos casos
   * se actualiza en pantalla si lleva madera encima o no
   */
  whatRoomIs(){
    return this.room;
  }

  changeRoomNumber(roomNumber){
    this.room = roomNumber;
  }

  changePlayerPosition(x, y){
    this.x = x;
    this.y = y;
  }

  pickWood(){
    this.wood = true;
  }

  getWood(){
    if(this.wood){
      this.wood = false;
      return true;
    }
    else return false;
  }

  switchPlayerHit(){
    this.hittingState = !this.hittingState;
  }

  isScrolling(){
    return this.scrolling;
  }

  switchPlayerScrollToTrue(){
    this.scrolling = true;
  }

  switchPlayerScrollToFalse(){
    this.scrolling = false;
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * @override
   */
  preUpdate(t,dt) {
    if (this.w.isDown) {
      this.body.setVelocityY(-this.verticalSpeed);
    }
    else if(this.s.isDown){
      this.body.setVelocityY(this.verticalSpeed);
    }
    else {
      this.body.setVelocityY(0);
    }
    if (this.d.isDown) {
      this.body.setVelocityX(this.horizontalSpeed);
        this.sentido = true;
        this.scaleX = -1;
    }
    else if (this.a.isDown) {
      this.body.setVelocityX(-this.horizontalSpeed);
        this.sentido = false;
        this.scaleX = 1;
    }
    else{
      this.body.setVelocityX(0);
    }

    if(this.body.velocity.x != 0 && this.body.velocity.y != 0){
      if(this.body.velocity.x < 0){
        this.body.setVelocityX(-this.diagonalSpeed);
      }
      else{
        this.body.setVelocityX(this.diagonalSpeed);
      }
      if(this.body.velocity.y < 0){
        this.body.setVelocityY(-this.diagonalSpeed);
      }
      else{
        this.body.setVelocityY(this.diagonalSpeed);
      }     
    }   

    if(this.hittingState){
      this.body.setVelocityY(0);
      this.body.setVelocityX(0);
    }

    this.iterate( (child) => child.preUpdate(t,dt) );
  }
}
