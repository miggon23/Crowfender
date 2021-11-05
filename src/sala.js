
/**
 * Clase que representa las salas laterales que aparecen en el escenario de juego.
 */
export default class Sala extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la sala
   * @param {Phaser.Scene} scene Escena a la que pertenece la sala
   * @param {Player} player Jugador del juego
   * @param {Phaser.GameObjects.Group} baseGroup Grupo en el que se incluirá la sala
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   * @param {number} w Ancho de la zona jugable de la sala
   * @param {number} h Alto de la zona jugable de la sala
   * @param {number} orientation Identifica cual de las salas es, 1, para Oeste, 2 para Norte y 3 para este, la sala 0 sería la sala
   */
  constructor(scene, player, baseGroup, x, y, w, h, orientation) {
    super(scene, x, y, 'platform');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    
  }

}
