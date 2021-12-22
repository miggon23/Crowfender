
/**
 * Escena de fin de juego, cuando el jugador perde
 * Si se pulsa cualquier tecla, se vuelve a iniciar el juego.
 */
 export default class Victory extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'victory' });
  }

  /**
   * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
   * @override
   */
  create() {
    this.winImage = this.add.image(0, 0, 'menu_ganar').setInteractive();
    this.winImage.setOrigin(0, 0)
    this.add.text(500, 250, 'You survived the night!\nYou win, click anywhere to play again.')
        .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
        .setAlign('center');  // Centramos el texto dentro del cuadro de texto
        
    this.winImage.on('pointerup', function (event) { 
      this.scene.start('menu');
    }, this);
  }

}
