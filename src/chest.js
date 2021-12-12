import Wall from './wall.js';
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
  constructor(scene, player, x, y, scaleX, scaleY, wallGroup) {
    super(scene, x, y, 'chest');
    this.scene.add.existing(this);
    this.displayWidth = scaleX;
    this.displayHeight= scaleY;
    this.scene.physics.add.existing(this, true);
    this.woodSound = this.scene.sound.add("woodTake");
    this.k = this.scene.input.keyboard.addKey('K');
    this.solid = new Wall (scene, x, y, scaleX * 0.5, scaleY * 0.3, wallGroup)
    this.scene.physics.add.overlap(this, player, (o1, o2) => {
        if(Phaser.Input.Keyboard.JustDown(this.k)){
          this.woodSound.play();
            player.pickWood();
        }
    });
  }
}
