

/**
 * Clase para la electricidad para espantar a los pájaros de los spawns.
 * Genera un panel de electricidad asociado a un Spawn.
 */
 export default class Electricity extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de la electricidad
     * @param {Phaser.Scene} scene Escena a la que pertenece el cofre
     * @param {Player} player Jugador del juego
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     * @param {Spawn} spawn Spawn al que afecta esta electricidad
     */
    
    constructor(scene, player, x, y, spawn) {
      super(scene, x, y, 'electricidad_verde');
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
      this.switchReady = this.scene.sound.add("electricitySwitch");
      this.switchNotReady = this.scene.sound.add("electricitySwitchNotCharged");
      this.electricityZap = this.scene.sound.add("electricityZap");
      this.k = this.scene.input.keyboard.addKey('K');
      
      this.scene.physics.add.overlap(this, player, (o1, o2) => {
        if(Phaser.Input.Keyboard.JustDown(this.k)){
          if(this.scene.isElectricityAvailable()){
            this.electricityZap.play();
            this.switchReady.play();
            spawn.activateElectricity();
            this.scene.putElectricityOnCooldown();
          }
          else if(!this.scene.isElectricityAvailable())
          {
            this.switchNotReady.play();
          } 
      }

      });
      
    } 
      preUpdate(t,dt) {
        super.preUpdate(t, dt);

        if(this.scene.isElectricityAvailable()){
          this.setTexture('electricidad_verde');
        }
        else{
          this.setTexture('electricidad_rojo');
        }
    }
}

  
  