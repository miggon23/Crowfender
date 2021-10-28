import Star from './star.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.score = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.horizontalSpeed = 300;
    this.verticalSpeed = 300;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.w = this.scene.input.keyboard.addKey('W');
    this.a = this.scene.input.keyboard.addKey('A');
    this.s = this.scene.input.keyboard.addKey('S');
    this.d = this.scene.input.keyboard.addKey('D');
    this.updateScore();
    //Valor para normalizar el vector velocidad calculado a mano dependiendo de verticalSpeed y horizontalSpeed
    this.velocidad2 = 212.13203435596425732025330863145;
  }

  /**
   * El jugador ha recogido una estrella por lo que este método añade un punto y
   * actualiza la UI con la puntuación actual.
   */
  point() {
    this.score++;
    this.updateScore();
  }
  
  /**
   * Actualiza la UI con la puntuación actual
   */
  updateScore() {
    this.label.text = 'Puntuación: ' + this.score;
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    if (this.cursors.up.isDown || this.w.isDown) {
      this.body.setVelocityY(-this.verticalSpeed);
    }
    else if(this.cursors.down.isDown || this.s.isDown){
      this.body.setVelocityY(this.verticalSpeed);
    }
    else {
      this.body.setVelocityY(0);
    }
    if (this.cursors.right.isDown || this.d.isDown) {
      this.body.setVelocityX(this.horizontalSpeed);
    }
    else if (this.cursors.left.isDown || this.a.isDown) {
      this.body.setVelocityX(-this.horizontalSpeed);
    }
    else{
      this.body.setVelocityX(0);
    }
    
    if(this.body.velocity.x != 0 && this.body.velocity.y != 0){
      if(this.body.velocity.x < 0){
        this.body.setVelocityX(-this.velocidad2);
      }
      else{
        this.body.setVelocityX(this.velocidad2);
      }
      if(this.body.velocity.y < 0){
        this.body.setVelocityY(-this.velocidad2);
      }
      else{
        this.body.setVelocityY(this.velocidad2);
      }     
    }
  }
  
}
