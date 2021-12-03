/**
 * Clase para el botón para o bien iniciar el juego o bien tocar las opciones
 */
 export default class Button extends Phaser.GameObjects.Text {
  
     constructor(scene, x, y, text, style) {
         super(scene, x, y, text, style);

         this.setInteractive({ useHandCursor: true })
             .on('pointerover', () => this.enterButtonHoverState())
             .on('pointerout', () => this.enterButtonRestState())
             .on('pointerdown', () => this.enterButtonActiveState())
             .on('pointerup', () => this.enterButtonHoverState());
     }

     enterButtonHoverState() {
         this.setStyle({ fill: '#ff0' });
     }

     enterButtonRestState() {
         this.setStyle({ fill: '#0f0' });
     }

     enterButtonActiveState() {
         this.setStyle({ fill: '#0ff' });
     }
 }