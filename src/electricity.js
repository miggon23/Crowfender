

/**
 * Clase para la electricidad para espantar a los pájaros de los spawns
 */
 export default class Electricity extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de la electricidad
     * @param {Phaser.Scene} scene Escena a la que pertenece el cofre
     * @param {Player} player Jugador del juego
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     */
    
    constructor(scene, player, x, y, spawn) {
      super(scene, x, y, 'electricidad_verde');
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
      this.k = this.scene.input.keyboard.addKey('K');
      this.scene.physics.add.overlap(this, player, (o1, o2) => {
        if(Phaser.Input.Keyboard.JustDown(this.k) && this.scene.isElectricityAvailable()){
          spawn.activateElectricity();
          this.scene.putElectricityOnCooldown();
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

  
  