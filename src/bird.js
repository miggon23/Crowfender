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
  

  }



  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del pájaro.
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    
  }
  
}
