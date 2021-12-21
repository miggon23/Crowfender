
/**
 * Clase que representa las zonas donde el pájaro aparece depués de cambiar de sala
 */
export default class BirdZone extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la birdZone
   * @param {Phaser.Scene} scene Escena a la que pertenece la zona
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   * @param {number} scaleX Ancho de la zona
   * @param {number} scaleY Alto de la zona
   */
  constructor(scene, x, y, scaleX, scaleY) {
    super(scene, x, y, 'empty');
    
    this.displayWidth = scaleX;
    this.displayHeight= scaleY;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);

    // Comentar para mostrar el spawn
    this.visible = false;
  }

}
