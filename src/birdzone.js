
/**
 * Clase que representa las zonas donde el pájaro aparece depués de cambiar de sala
 */
export default class BirdZone extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la zona
   * @param {Player} player Jugador del juego
   * @param {Phaser.GameObjects.Group} zoneGroup Grupo en el que se incluirá la zonaa creada para los pájaros
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, x, y, scaleX, scaleY) {
    super(scene, x, y, 'empty');
    
    this.displayWidth = scaleX;
    this.displayHeight= scaleY;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);

    // Comentar para mostrar los muros
    this.visible = false;
  }

}
