import BirdZone from './birdzone.js';
import Wall from './wall.js';
/**
 * Clase que representa las habitaciones de la casa que aparecen en el escenario de juego.
 */
export default class Room extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de las habitaciones, crea a su vez los muros que delimitan la misma
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
    this.displayWidth = scaleX;
    this.displayHeight = scaleY;
    this.spriteName = sprite;
    this.scene.add.existing(this);
    roomArray.push(this);
    this.birdZone = new BirdZone(scene, x, y + (scaleY / 3), scaleX * 0.6, scaleY * 0.15);

    //Parámetros para la creación de muros del jugador
    this.backgroundWallHeight = 0.37; //Altura del muro del fondo respecto del alto de la habitación
    this.floorHeight = 2; //Alto del suelo
    this.sideWallsWidth = 10; //Ancho de los muros laterales

    //Parámateros para la creación de los muros para los pájaros
    this.backgroundWallHeightB = 0.6; //Altura del muro del fondo respecto del alto de la habitación
    this.floorHeightB = 8; //Alto del suelo
    this.sideWallsWidthB = 140; //Ancho de los muros laterales
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
    //Muro norte (Fondo) Distinguimos si es una sala central, la cual tiene puerta arriba
    this.nortWall;
    if(this.spriteName === 'fondo_central'){
      this.nortWall = new Wall(scene, this.getTopCenter().x, this.getTopCenter().y + (scaleY / 3), scaleX, scaleY * (this.backgroundWallHeigh * 0.5), wallsGroup);
      new Wall(scene, this.getTopCenter().x - (scaleX * 0.15), this.getTopCenter().y + (scaleY / 3), scaleX * 0.55, scaleY * this.backgroundWallHeight, wallsGroup);
      new Wall(scene, this.getTopCenter().x + (scaleX * 0.38), this.getTopCenter().y + (scaleY / 3), scaleX * 0.2, scaleY * this.backgroundWallHeight, wallsGroup);
    }
    else{
      this.nortWall = new Wall(scene, this.getTopCenter().x, this.getTopCenter().y + (scaleY / 3), scaleX, scaleY * this.backgroundWallHeight, wallsGroup);
    }
    //Muro Sur (Suelo)
    this.southWall = new Wall(scene, this.getBottomCenter().x, this.getBottomCenter().y, scaleX, this.floorHeight, wallsGroup)

    //Muro Este
    this.eastWall = new Wall(scene, this.getRightCenter().x, this.getRightCenter().y, this.sideWallsWidth, scaleY, wallsGroup);
    //Support wall
    new Wall(scene, this.getRightCenter().x, this.getRightCenter().y, this.sideWallsWidth * 18, scaleY * 0.38, wallsGroup); 

    //Muro Oeste
    this.westWall = new Wall(scene, this.getLeftCenter().x, this.getLeftCenter().y, this.sideWallsWidth, scaleY, wallsGroup);
    //Support wall
    new Wall(scene, this.getLeftCenter().x, this.getLeftCenter().y, this.sideWallsWidth * 18, scaleY * 0.36, wallsGroup); //Support wall
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
