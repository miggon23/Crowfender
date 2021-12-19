import Wall from './wall.js';
/**
 * Clase para el cofre, del que conseguiremos madera
 */
export default class Chest extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del cofre
   * @param {Phaser.Scene} scene Escena a la que pertenece el cofre
   * @param {Player} player Jugador del juego
   * @param {strcut} chestInfo Información necesaria para colocar el cofre
   * @param {Array} wallGroup Muros con los que interactúa el jugador
   */
  constructor(scene, player, chestInfo, wallGroup) {
    super(scene, chestInfo.x, chestInfo.y, 'chest');
    this.scene.add.existing(this);
    this.displayWidth = chestInfo.scaleX;
    this.displayHeight= chestInfo.scaleY;
    this.scene.physics.add.existing(this, true);
    this.woodSound = this.scene.sound.add("woodTake");
    this.k = this.scene.input.keyboard.addKey('K');
    this.solid = new Wall (scene, chestInfo.x, chestInfo.y, chestInfo.scaleX * 0.5, chestInfo.scaleY * 0.3, wallGroup)
    this.scene.physics.add.overlap(this, player, (o1, o2) => {
      if(Phaser.Input.Keyboard.JustDown(this.k)){
        this.woodSound.play();
        player.pickWood();
      }
    });
  }
}
