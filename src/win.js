/**
 * Escena de fin de juego. Cuando se han recogido todas las estrellas, se presenta un
 * texto que indica que el juego se ha acabado.
 * Si se pulsa cualquier tecla, se vuelve a iniciar el juego.
 */
export default class Win extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'win' });
  }

  /**
   * Creación de la escena. Muestra en pantalla que el jugador ha ganado, y la información necesaria
   * @override
   */
  create() {
    this.add.text(500, 250, '¡Pero qué bien hecho, eliminaste a todos los pájaros!')
        .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
        .setAlign('center');  // Centramos el texto dentro del cuadro de texto

    // Añadimos el listener para cuando se haya pulsado una tecla. Es probable que no
    // lleguemos a ver el mensaje porque veníamos con una tecla pulsada del juego (al 
    // ir moviendo al jugador). Se puede mejorar añadiendo un temporizador que 
    // añada este listener pasado un segundo
    this.input.keyboard.on('keydown', function (event) { 
      this.scene.start('menu');
    }, this);
  }

}