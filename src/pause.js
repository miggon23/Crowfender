/**
 * Escena de pausa
 * Cuando el jugador vuelve a pulsar la p vuelve al nivel
 */
 export default class PauseScene extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'pause' });
  }

  /**
   * Inicialización
   */
  init(scene){
    this.level = scene;
  }

  /**
   * Creación de la escena. Tan solo contiene el texto de pausa y la condición para volver
   * a la ejecución
   * @override
   */
  create() {

    this.texto = this.add.text(450, 300, 'PAUSA', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    this.p = this.input.keyboard.addKey('P');

    this.p.on('down', function () {
      this.scene.resume('level');
      this.texto.destroy();
    }, this);
  }
}