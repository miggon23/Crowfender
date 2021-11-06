
/**
 * Clase para los elementos bloqueables: ventana, chimenea y puerta
 */
 export default class Blockable extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del cofre
     * @param {Phaser.Scene} scene Escena a la que pertenece la ventana
     * @param {Player} player Jugador del juego
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     */
    constructor(scene, player, x, y, sprite) {
      super(scene, x, y, sprite);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
      this.bloqued = false;
      this.k = this.scene.input.keyboard.addKey('K');
      this.scene.physics.add.overlap(this, player, (o1, o2) => {
          if(Phaser.Input.Keyboard.JustDown(this.k) && player.madera && !this.bloqued){
              player.maderaEnMano(false);
              this.Bloquear();
          }
      });
    }

    /**
    *Bloquea la entrada a los pájaros por un tiempo, en este caso 10 segundos
    */
    Bloquear(){
      this.bloqued = true;
      this.setTexture('window_bloq');
      this.scene.time.addEvent( {
        delay: 10000, 
        callback: this.Desbloquear,
        callbackScope: this,
        loop: false
      });
    }
    /**
    *Desbloquea la entrada
    */
    Desbloquear(){
      this.bloqued = false;
      this.setTexture('window');
    }
  }
  