/**
 * Clase para el botón para o bien iniciar el juego o bien tocar las opciones
 */
 export default class Button extends Phaser.GameObjects.Text {
  
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

     enterButtonHoverState() {
         this.setStyle({ fill: '#00f' });
     }

     enterButtonRestState() {
         this.setStyle({ fill: '#fff' });
     }

     enterButtonActiveState() {
         this.setStyle({ fill: '#40f' });
     }
 }