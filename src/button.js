/**
 * Clase para el botón para o bien iniciar el juego o bien tocar las opciones
 */
 export default class Button extends Phaser.GameObjects.Text {
  
    /**
     * Constructor del botón
     * @param {Phaser.Scene} scene Escena a la que pertenece el botón
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {number} height Altura del botón
     * @param {number} width Ancho del botón
     * @param {string} text Texto del botón
     * @param {object} style Estilo del texto
     */
     constructor(scene, x, y, height, width, text, style) {
         super(scene, x, y, text, style);
         this.displayWidth = width;
         this.displayHeight = height;
         this.setFont = 'Georgia';
         this.setInteractive({ useHandCursor: true })
             .on('pointerover', () => this.enterButtonHoverState())
             .on('pointerout', () => this.enterButtonRestState())
             .on('pointerdown', () => this.enterButtonActiveState())
             .on('pointerup', () => this.enterButtonHoverState());
     }

     /**
      *  Color del botón al poner el cursor sobre este
      */
     enterButtonHoverState() {
         this.setStyle({ fill: '#00f' });
     }
        /**
      *  Color del botón al no interactuar con él
      */
     enterButtonRestState() {
         this.setStyle({ fill: '#fff' });
     }
     /**
      *  Color del botón al pulsarle
      */
     enterButtonActiveState() {
         this.setStyle({ fill: '#40f' });
     }
 }