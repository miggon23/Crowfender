
/**
 * Clase que representa las salas laterales que aparecen en el escenario de juego.
 */
export default class Room extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de las zonas de spawn para los pájaros
   * @param {Phaser.Scene} scene Escena a la que pertenece la puerta
   * @param {number} currentRoom Coordenada X
   * @param {number} nextRoom Coordenada Y
   * @param {number} scaleX display en el eje x
   * @param {number} scaleY display en el eje y
   * @param {array} zoneArray array de spawns
   * @param {array} roomArray array de rooms
   */
   constructor(scene, currentRoom, nextRoom, scaleX, scaleY, zoneArray, roomArray) {

    super(scene);
    this.zone1 = this.scene.add.zone(roomArray[currentRoom].getTopLeft().x + 50, roomArray[currentRoom].getTopLeft().y + 225, 25, 400).setOrigin(0);// zone middleToWest
    this.zone1 = this.scene.add.zone(roomArray[currentRoom].getTopRight().x - 60, roomArray[currentRoom].getTopRight().y + 225, 25, 400).setOrigin(0);// zone middleToEast

    
    scene.physics.world.enable(this.zone1);
    zoneArray.push(this.zone1);
  }
}
