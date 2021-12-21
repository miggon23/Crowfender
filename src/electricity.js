import Data from './data.js'

/**
 * Clase para la electricidad para matar a los pájaros en los spawns.
 * Genera un panel de electricidad asociado a un Spawn.
 */
 export default class Electricity extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de la electricidad
     * @param {Phaser.Scene} scene Escena a la que pertenece el cofre
     * @param {Player} player Jugador del juego
     * @param {Struct} elecInfo Información necesaria pra crear el panel de electricidad
     * @param {Spawn} spawn Spawn al que afecta esta electricidad
     */
    constructor(scene, player, elecInfo, spawn) {
      super(scene, elecInfo.x, elecInfo.y, Data.electricity.sprite);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
      this.switchReady = this.scene.sound.add("electricitySwitch");
      this.switchNotReady = this.scene.sound.add("electricitySwitchNotCharged");
      this.electricityZap = this.scene.sound.add("electricityZap");
      this.k = this.scene.input.keyboard.addKey('K');
      this.highlight = false;
      
      this.scene.physics.add.overlap(this, player, (o1, o2) => {
        this.highlight = true;
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
  /**
   * Métodos preUpdate de Phaser. Se encarga de mostrar cuando un elemento es interactuable
   * @override
   */
    preUpdate(t,dt) {
      super.preUpdate(t, dt);

      if(this.highlight && this.scene.isElectricityAvailable()){
        this.setTexture(Data.electricity.spriteK);
      }
      else if(this.scene.isElectricityAvailable()){
        this.setTexture(Data.electricity.sprite);
      }
      else{
        this.setTexture(Data.electricity.cooldownSprite);
      }
      this.highlight = false;
    }
}

  
  