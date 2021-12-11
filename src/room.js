import BirdZone from './birdzone.js';
import Wall from './wall.js';
/**
 * Clase que representa las salas laterales que aparecen en el escenario de juego.
 */
export default class Room extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de las zonas de spawn para los pájaros
   * @param {Phaser.Scene} scene Escena a la que pertenece la habitación
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   * @param {number} scaleX display en el eje x
   * @param {number} scaleY display en el eje y
   * @param {array} roomArray array de spawns
   * @param {string} sprite string con el nombre del sprite de la spawnzone
   * @param {group} wallsGroup array con el grupo de muros que colisionan con el jugador
   * @param {group} birdWalls array con el grupo de muros que colisionan con los pájaros
   */
   constructor(scene, x, y, scaleX, scaleY, roomArray, sprite, wallsGroup, birdWalls) {

    super(scene, x, y, sprite);
    this.x = x;
    this.y = y;
    this.halfWidth = scaleX / 2;
    this.halfHeight = scaleY / 2;
    this.displayWidth = scaleX;
    this.displayHeight = scaleY;
    this.scene.add.existing(this);
    roomArray.push(this);
    this.birdZone = new BirdZone(scene, x, y + (scaleY / 3), scaleX * 0.6, scaleY * 0.15);

    //Parámetros para la creación de muros del jugador
    this.backgroundWallHeight = 0.4; //Altura del muro del fondo respecto del alto de la habitación
    this.floorHeight = 2; //Alto del suelo
    this.sideWallsWidth = 10; //Ancho de los muros laterales

    //Parámateros para la creación de los muros para los pájaros
    this.backgroundWallHeightB = 0.6; //Altura del muro del fondo respecto del alto de la habitación
    this.floorHeightB = 8; //Alto del suelo
    this.sideWallsWidthB = 80; //Ancho de los muros laterales
    this.rightOffsetB = 20;
    this.leftOffsetB = 20;  

    this.setRoomWalls(scene, wallsGroup, scaleX, scaleY);
    this.setBirdsWalls(scene, birdWalls, scaleX, scaleY);
  }


  /**
   * Crea los muros que delimitan la habitación tomando como referencia los propios límites de la habitación
   * @param {Phaser.scene} scene Escena a la que pertenecen los elementos de juego
   * @param {group} wallsGroup Grupo de muros que colisionan con el jugador
   * @param {number} scaleX Ancho de la habitación
   * @param {number} scaleY Alto de la habitación
   */
  setRoomWalls(scene, wallsGroup, scaleX, scaleY){
    //Muro norte (Fondo)
    this.nortWall = new Wall(scene, this.getTopCenter().x, this.getTopCenter().y + (scaleY / 3), scaleX, scaleY * this.backgroundWallHeight, wallsGroup);
    //Muro Sur (Suelo)
    this.southWall = new Wall(scene, this.getBottomCenter().x, this.getBottomCenter().y, scaleX, this.floorHeight, wallsGroup)
    //Muro Este
    this.eastWall = new Wall(scene, this.getRightCenter().x, this.getRightCenter().y, this.sideWallsWidth, scaleY, wallsGroup);
    //Muro Oeste
    this.westWall = new Wall(scene, this.getLeftCenter().x, this.getLeftCenter().y, this.sideWallsWidth, scaleY, wallsGroup);
  }

  /**
   * Crea los muros que van a delimitar el movimiento de los pájaros dentro de la sala
   * @param {*} scene Escena a la que pertenecen los elementos del juego
   * @param {*} birdWalls Grupo de muros que colisionan con los pájaros
   * @param {*} scaleX Ancho de la habitación
   * @param {*} scaleY Alto de la habitación
   */
  setBirdsWalls(scene, birdWalls, scaleX, scaleY){
    //Muro norte (Fondo)
    this.nortWall = new Wall(scene, this.getTopCenter().x, this.getTopCenter().y + (scaleY / 3), scaleX, scaleY * this.backgroundWallHeightB, birdWalls);
    //Muro Sur (Suelo)
    this.southWall = new Wall(scene, this.getBottomCenter().x, this.getBottomCenter().y, scaleX, this.floorHeightB, birdWalls)
    //Muro Este
    this.eastWall = new Wall(scene, this.getRightCenter().x - this.rightOffsetB, this.getRightCenter().y, this.sideWallsWidthB, scaleY, birdWalls);
    //Muro Oeste
    this.westWall = new Wall(scene, this.getLeftCenter().x + this.rightOffsetB, this.getLeftCenter().y, this.sideWallsWidthB, scaleY, birdWalls);
  }
}
