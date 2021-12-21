
/**
 * Clase para los elementos bloqueables: ventana, chimenea y puerta
 */
 export default class Blockable extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del blockable
     * @param {Phaser.Scene} scene Escena a la que pertenece el bloqueable
     * @param {Player} player Jugador del juego
     * @param {Struct} blockableInfo Info necesaria para construir el blockable
     * @param {bool} blocked Bool que indica si está bloqueado o no
     */
    constructor(scene, player, blockableInfo, blocked) {
      super(scene, blockableInfo.x, blockableInfo.y, blockableInfo.sprite);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
      this.addSounds();
      
      this.blocked = false;
      
      this.spriteName = blockableInfo.sprite;
    
      this.highlight = false;
      this.player = player;

      this.k = this.scene.input.keyboard.addKey('K');
      this.scene.physics.add.overlap(this, player, (o1, o2) => {
        this.highlight = true;
          if(Phaser.Input.Keyboard.JustDown(this.k) && !this.blocked){
              if(this.player.hasWood()){
                this.player.getWood();
                this.block();
              }
          }
      });

      if(blocked){
        this.block();
      }

    }
  /**
   * Añade los sonidos
   */
   addSounds() {
     this.fireplaceSoundBlock = this.scene.sound.add("fireplaceBlocked");
     this.fireplaceSoundUnblock = this.scene.sound.add("fireplaceUnblocked");
     this.otherSoundBlock = this.scene.sound.add("otherBlockableBlocked");
     this.otherSoundUnblock = this.scene.sound.add("otherBlockableUnblocked");
   }

    /**
     * Bloquea la entrada a los pájaros por un tiempo, en este caso 10 segundos
     */
    block(){
      if(this.spriteName == 'chimenea') this.fireplaceSoundBlock.play();
      else this.otherSoundBlock.play();
      this.blocked = true;
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
    }
    /**
     * Devuelve si está bloqueado o no la ventana, puerta u hoguera
     */
    isBlocked(){
      return this.blocked;
    }
   
  /**
   * Métodos preUpdate de Phaser. Se encarga de mostrar cuando un elemento es interactuable y cuanto está bloqueado
   * @override
   */
   preUpdate(t,dt) {
    super.preUpdate(t,dt);
    if(this.player.hasWood() && this.highlight && !this.isBlocked()){
      this.setTexture(this.spriteName+"_k");
    }
    else if(this.isBlocked()){
      this.setTexture(this.spriteName+"_tabla");
    }
    else{
      this.setTexture(this.spriteName);
    }
    this.highlight = false;
  }
}
