/**
 * Escena de fin de juego, cuando el jugador perde
 * Si se pulsa cualquier tecla, se vuelve a iniciar el juego.
 */
export default class End extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'end' });
  }

  /**
   * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
   * @override
   */
  create() {
    this.loseImage = this.add.image(0, 0, 'menu_perder').setInteractive();;
    this.loseImage.setOrigin(0, 0)
    this.add.text(500, 250, 'They invaded the house!\nYou lose, click anywhere to play again.')
        .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
        .setAlign('center');  // Centramos el texto dentro del cuadro de texto


    // Añadimos el listener para cuando se haya pulsado una tecla. Es probable que no
    // lleguemos a ver el mensaje porque veníamos con una tecla pulsada del juego (al 
    // ir moviendo al jugador). Se puede mejorar añadiendo un temporizador que 
    // añada este listener pasado un segundo
    this.loseImage.on('pointerup', function (event) { 
      this.scene.start('menu');
    }, this);
  }

}