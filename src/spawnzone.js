
/**
 * Clase que representa las zonas de spawn de cada sala
 */
export default class SpawnZone extends Phaser.GameObjects.Sprite {
  

  /**
   * Constructor de las zonas de spawn para los pájaros
   * @param {Phaser.Scene} scene Escena a la que pertenece el spawn
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   * @param {number} scaleX display en el eje x
   * @param {number} scaleY display en el eje y
   * @param {array} spawnArray array de spawns
   * @param {string} sprite string con el nombre del sprite de la spawnzone
   */
  constructor(scene, x, y, scaleX, scaleY, spawnArray, spawnsGroup, sprite) {

    super(scene, x, y, sprite);
    this.x = x;
    this.y = y;
    this.halfWidth = scaleX / 2;
    this.halfHeight = scaleY / 2;
    this.displayWidth = scaleX;
    this.displayHeight= scaleY;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    spawnsGroup.add(this);
    spawnArray.push(this);

    this.body.enable = false;

    //this.visible = false;
  }
  
  activateElectricity(){ 
    this.visible=false
      this.body.enable= true;
      this.scene.time.addEvent( {
        delay: 300, 
        callback: this.deactivateElectricity,
        callbackScope: this,
        loop: false
      });
    }
  deactivateElectricity(){
    this.visible=true;
    this.body.enable= false;
  }

}
