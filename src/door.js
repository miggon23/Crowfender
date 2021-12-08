
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
  constructor(scene, player, camera, currentRoom, nextRoom, roomArray) {
    super(scene);

    this.zone;
    this.horizontalMovement = 180;
    this.verticalMovement = 80;
    //Dependiendo de la sala actual y la siguiente se crea en una sala diferente
    if(currentRoom === 0)
    {
      if(nextRoom === 1){
        this.zone = this.scene.add.zone(roomArray[currentRoom].getTopRight().x - 60, roomArray[currentRoom].getTopRight().y + 225, 25, 400).setOrigin(0);
      }
      else if(nextRoom === 2){
        this.zone = this.scene.add.zone(roomArray[currentRoom].getTopLeft().x + 50, roomArray[currentRoom].getTopLeft().y + 225, 25, 400).setOrigin(0);
      }
      else if(nextRoom === 3){
        this.zone = this.scene.add.zone(roomArray[currentRoom].getTopCenter().x + 140, roomArray[currentRoom].getTopCenter().y + 250, 175, 40).setOrigin(0);
      }
    }
    if(currentRoom === 1){
      this.zone = this.scene.add.zone(roomArray[currentRoom].getTopLeft().x, roomArray[currentRoom].getTopLeft().y + 225, 25, 400).setOrigin(0);
    }
    if(currentRoom === 2){
      this.zone = this.scene.add.zone(roomArray[currentRoom].getTopRight().x - 25, roomArray[currentRoom].getTopRight().y , 25, 400).setOrigin(0);
    }
    if(currentRoom === 3){
      this.verticalMovement = 300;
      this.zone = this.scene.add.zone(roomArray[currentRoom].getTopCenter().x + 180, roomArray[currentRoom].getTopCenter().y + 580, 175, 40).setOrigin(0);
    }
    

    scene.physics.world.enable(this.zone);

    scene.physics.add.overlap(player, this.zone, (o1, o2) => {
      if(currentRoom === 0)
      {
        if(nextRoom === 1){
          player.changePlayerPosition(roomArray[nextRoom].getBottomLeft().x + this.horizontalMovement,roomArray[nextRoom].getBottomLeft().y - this.verticalMovement);
        }
        else if(nextRoom === 2){
          player.changePlayerPosition(roomArray[nextRoom].getBottomRight().x - this.horizontalMovement,roomArray[nextRoom].getBottomRight().y - this.verticalMovement);
        }
        else if(nextRoom === 3){
          player.changePlayerPosition(roomArray[nextRoom].getBottomCenter().x + this.horizontalMovement,roomArray[nextRoom].getBottomCenter().y - this.verticalMovement);
        }
      }
      if(currentRoom === 1){
        player.changePlayerPosition(roomArray[nextRoom].getBottomRight().x - this.horizontalMovement,roomArray[nextRoom].getBottomRight().y - this.verticalMovement);
      }
      if(currentRoom === 2){
        player.changePlayerPosition(roomArray[nextRoom].getBottomLeft().x + this.horizontalMovement,roomArray[nextRoom].getBottomLeft().y - this.verticalMovement);
      }
      if(currentRoom === 3){
        player.changePlayerPosition(roomArray[nextRoom].getBottomCenter().x + this.horizontalMovement,roomArray[nextRoom].getBottomCenter().y - this.verticalMovement)
      }
         
         camera.setDeadzone(600, 600); //925
         camera.scrollX = 0;
         camera.scrollY = 0;
    });
  }
}
