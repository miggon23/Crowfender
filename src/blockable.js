
/**
 * Clase para los elementos bloqueables: ventana, chimenea y puerta
 */
 export default class Blockable extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del blockable
     * @param {Phaser.Scene} scene Escena a la que pertenece la ventana
     * @param {Player} player Jugador del juego
     * @param {Struct} blockableInfo Info necesaria para construir el blockable
     */
    constructor(scene, player, blockableInfo) {
      super(scene, blockableInfo.x, blockableInfo.y, blockableInfo.sprite);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
      this.blocked = false;
      this.spriteName = blockableInfo.sprite;
      this.blockedSpriteName = blockableInfo.blockedSprite;

      this.addSounds();
      this.k = this.scene.input.keyboard.addKey('K');
      this.scene.physics.add.overlap(this, player, (o1, o2) => {
          if(Phaser.Input.Keyboard.JustDown(this.k) && !this.blocked){
              if(player.getWood()){
                this.block();
              }
              
          }
      });
    }

   addSounds() {
     this.fireplaceSoundBlock = this.scene.sound.add("fireplaceBlocked");
     this.fireplaceSoundUnblock = this.scene.sound.add("fireplaceUnblocked");
     this.otherSoundBlock = this.scene.sound.add("otherBlockableBlocked");
     this.otherSoundUnblock = this.scene.sound.add("otherBlockableUnblocked");
   }

    /**
    *Bloquea la entrada a los pájaros por un tiempo, en este caso 10 segundos
    */
    block(){
      if(this.spriteName == 'chimenea') this.fireplaceSoundBlock.play();
      else this.otherSoundBlock.play();
      this.blocked = true;
      this.setTexture(this.blockedSpriteName);
      this.scene.time.addEvent( {
        delay: 20000, 
        callback: this.unblock,
        callbackScope: this,
        loop: false
      });
    }
    /**
    *Desbloquea la entrada
    */
    unblock(){
      if(this.spriteName == 'chimenea') this.fireplaceSoundUnblock.play();
      else this.otherSoundUnblock.play();
      this.blocked = false;
      this.setTexture(this.spriteName);
    }
    //Devuelve si está bloqueado o no la ventana, puerta u hoguera
    isBlocked(){
      return this.blocked;
    }
  }
  