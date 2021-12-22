import Button from "./button.js";

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

    this.menuButton = new Button(this, 400, 330, 25, 150, 'Volver al menú', { fill: '#fff' });
    this.add.existing(this.menuButton);
    this.menuButton.on('pointerup', () => {
      this.scene.stop('pause');
      this.scene.stop('level');
      this.game.sound.stopAll();
      this.scene.start('menu');
    });

    this.p.on('down', function () {
      this.texto.destroy();
      this.menuButton.destroy();
      this.scene.resume('level');
    }, this);
  }
}