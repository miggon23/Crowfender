import BirdZone from './birdzone.js';
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
   * @param {blockable} blockable Blockable asociado al spawn
   */
  constructor(scene, x, y, scaleX, scaleY, spawnArray, spawnsGroup, sprite, blockable) {

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
    //Limite de pájaros que pueden estar a la vez en un spawn
    this.spawnLimit = 6;
    this.birdsInSpawn = 0;

    this.body.enable = false;
    this.blockable = blockable;
    //Zona a la que se mueven los pajaros al pasar de habitacion o al spawnear
    this.birdZone = new BirdZone(scene, x, y, scaleX * 0.7 , scaleY * 0.6);
    
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
