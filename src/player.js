import Broom from './broom.js';
import Star from './star.js';
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
    let aspecto = scene.add.sprite(30, 32, 'player');
    super(scene, x, y, aspecto);
    this.score = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.horizontalSpeed = 300;
    this.verticalSpeed = 300;
    this.velocidad2 = 212.13203435596425732025330863145;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.w = this.scene.input.keyboard.addKey('W');
    this.a = this.scene.input.keyboard.addKey('A');
    this.s = this.scene.input.keyboard.addKey('S');
    this.d = this.scene.input.keyboard.addKey('D');
    this.madera = false;
    this.updateScore();
  }

  /**
   * El jugador ha acabado con un pájaro por lo que este método añade un punto y
   * actualiza la UI con la puntuación actual.
   */
  point() {
    this.score++;
    this.updateScore();
  }
  
  /**
   * Al interactuar con el cofre, el jugador recoge madera, mientras que al interactuar
   * con la chimenea, la ventana o la puerta, el jugador gasta la madera. En ambos casos
   * se actualiza en pantalla si lleva madera encima o no
   */
  maderaEnMano(tieneMadera){
    this.madera = tieneMadera;
    this.updateScore();
  }

  /**
   * Actualiza la UI con la puntuación actual y la madera
   */
  updateScore() {
    this.label.text = 'Puntuación: ' + this.score + '\nMadera: ' + this.madera;
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * @override
   */
  preUpdate(t,dt) {
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
      this.sentido = true;
    }
    else if (this.cursors.left.isDown || this.a.isDown) {
      this.body.setVelocityX(-this.horizontalSpeed);
      this.sentido = false;
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


    this.iterate( (child) => child.preUpdate(t,dt) );
  }
}
