/**
 * Clase que representan los distintos tipos de muro con los que se puede topar un GameObject
 * En principio hay un grupo de muros para el jugador y otro para los pájaros
 */
export default class Wall extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {Phaser.GameObjects.Group} wallsGroup Grupo en el que se incluirá la base creada por la plataforma
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, x, y, scaleX, scaleY, wallsGroup) {
    super(scene, x, y, 'empty');
    
    this.displayWidth = scaleX;
    this.displayHeight= scaleY;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    wallsGroup.add(this);
    
    // Comentar para mostrar los muros
    this.visible = false;
  }

}
