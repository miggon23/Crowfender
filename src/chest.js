
/**
 * Clase para el cofre, del que conseguiremos madera
 */
export default class Chest extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del cofre
   * @param {Phaser.Scene} scene Escena a la que pertenece el cofre
   * @param {Player} player Jugador del juego
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   * @param {number} scaleX display en el eje x
   * @param {number} scaleY display en el eje y
   */
  constructor(scene, player, x, y, scaleX, scaleY) {
    super(scene, x, y, 'chest');
    this.scene.add.existing(this);
    this.displayWidth = scaleX;
    this.displayHeight= scaleY;
    this.scene.physics.add.existing(this, true);
    this.visible =  false;
    this.k = this.scene.input.keyboard.addKey('K');
    this.scene.physics.add.overlap(this, player, (o1, o2) => {
        if(Phaser.Input.Keyboard.JustDown(this.k)){
            player.pickWood();
        }
    });
  }
}
