import BirdZone from './birdzone.js';
/**
 * Clase que representa las zonas de spawn de cada sala
 */
export default class SpawnZone extends Phaser.GameObjects.Sprite {
  

  /**
   * Constructor de las zonas de spawn para los pájaros
   * @param {Phaser.Scene} scene Escena a la que pertenece el spawn
   * @param {struct} spawnZoneInfo Info para construir la spawnZone
   * @param {array} spawnArray array de spawns
   * @param {string} sprite string con el nombre del sprite de la spawnzone
   * @param {blockable} blockable Blockable asociado al spawn
   */
  constructor(scene, spawnZoneInfo, spawnArray, spawnsGroup, blockable) {

    super(scene, spawnZoneInfo.x, spawnZoneInfo.y, spawnZoneInfo.sprite);
    this.x = spawnZoneInfo.x;
    this.y = spawnZoneInfo.y;
    this.halfWidth = spawnZoneInfo.scaleX / 2;
    this.halfHeight = spawnZoneInfo.scaleY / 2;
    this.displayWidth = spawnZoneInfo.scaleX;
    this.displayHeight= spawnZoneInfo.scaleY;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    spawnsGroup.add(this);
    spawnArray.push(this);
    //Limite de pájaros que pueden estar a la vez en un spawn
    this.spawnLimit = spawnZoneInfo.limitOfBirds;
    this.birdsInSpawn = 0;

    this.body.enable = false;
    this.blockable = blockable;
    //Zona a la que se mueven los pajaros al pasar de habitacion o al spawnear
    this.birdZone = new BirdZone(scene, spawnZoneInfo.x, spawnZoneInfo.y, spawnZoneInfo.scaleX * 0.7 , spawnZoneInfo.scaleY * 0.6);
    
    //this.visible = false;
  }
  
  activateElectricity(){ 
    this.visible=false
    this.body.enable= true;
    this.scene.time.addEvent( {
      delay: 300, 
      callback: this.desactivateElectricity,
      callbackScope: this,
      loop: false
    });
  }

  desactivateElectricity(){
    this.visible=true;
    this.body.enable= false;
  }

  //Devuelve un booleano que indica si el spawn está tapiado (bloqueado)
  spawnBlocked(){
    return this.blockable.isBlocked();
  }

  //Añade un pájaro al contador del spawn
  addBirdInSpawn()
  {
    this.birdsInSpawn++;
    console.log("Pajaro añadido en este spawn " + this.birdsInSpawn);
  }

  //Resta un pájaro al contador del spawn
  subBirdInSpawn()
  {
    this.birdsInSpawn--;
    console.log("Un pájaro salió del spawn");
  }

  //Devuelve true si en el spawn no caben más pájaros
  spawnFull()
  {
    return this.birdsInSpawn === this.spawnLimit;
  }
}
