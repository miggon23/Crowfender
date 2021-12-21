/**
 * Escena de fin de juego, cuando el jugador perde
 * Si se pulsa cualquier tecla, se vuelve a iniciar el juego.
 */
export default class PreScene extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'prescene' });
  }

  /**
   * Carga de los recursos a usar
   */
  preload(){
    this.load.setPath('assets/sprites/');
    this.load.image('play_button', 'play_button.png');
  }

  /**
   * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
   * @override
   */
  create() {
    
    this.playButton = this.add.image(500, 250, 'play_button').setInteractive();
    this.add.existing(this.playButton);

    this.playButton.on('pointerdown', function (event) { 
      this.scale.startFullscreen();
      this.scene.start('boot');
    }, this);
  }

}