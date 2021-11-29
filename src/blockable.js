
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
      this.blocked = false;
      this.spriteName = sprite;
      this.fireplaceSoundBlock = this.scene.sound.add("fireplaceBlocked");
      this.fireplaceSoundUnblock = this.scene.sound.add("fireplaceUnblocked");
      this.otherSoundBlock = this.scene.sound.add("otherBlockableBlocked");
      this.otherSoundUnblock = this.scene.sound.add("otherBlockableUnblocked");
      this.k = this.scene.input.keyboard.addKey('K');
      this.scene.physics.add.overlap(this, player, (o1, o2) => {
          if(Phaser.Input.Keyboard.JustDown(this.k) && !this.blocked){
              if(player.getWood()){
                this.block();
              }
              
          }
      });
      this.visible = false;
    }

    /**
    *Bloquea la entrada a los pájaros por un tiempo, en este caso 10 segundos
    */
    block(){
      if(this.spriteName == 'tabla_chimenea') this.fireplaceSoundBlock.play();
      else this.otherSoundBlock.play();
      this.blocked = true;
      this.visible = true;
      this.scene.time.addEvent( {
        delay: 10000, 
        callback: this.unblock,
        callbackScope: this,
        loop: false
      });
    }
    /**
    *Desbloquea la entrada
    */
    unblock(){
      if(this.spriteName == 'tabla_chimenea') this.fireplaceSoundUnblock.play();
      else this.otherSoundUnblock.play();
      this.blocked = false;
      this.visible = false;
    }

    isBlocked(){
      return this.blocked;
    }
  }
  