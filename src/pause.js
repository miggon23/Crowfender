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
    // Texto de pausa
    this.pausa = this.add.text(450, 300, 'PAUSED', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    this.retorno = this.add.text(415, 320, 'Press P to continue', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
    this.p = this.input.keyboard.addKey('P');

    // Botón para volver al inicio
    this.menuButton = new Button(this, 0, 0, 25, 150, 'Return to main menu ⮌', { fill: '#fff' });
    this.add.existing(this.menuButton);
    this.menuButton.on('pointerup', () => { // Si se pulsa el botón
      this.scene.stop('pause');
      this.scene.stop('level');
      this.game.sound.stopAll();
      this.scene.start('menu');
    }); // Se borra todo, se paran sonidos y se vuelve al menú

    // Si se pulsa la p de nuevo
    this.p.on('down', function () {
      this.pausa.destroy();
      this.retorno.destroy();
      this.menuButton.destroy();
      this.scene.resume('level');
    }, this); // Se vuelve al juego
  }
}