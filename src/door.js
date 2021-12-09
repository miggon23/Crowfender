
/**
 * Clase que representa las puertas por las que pasa de sala a sala
 */
export default class Door extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de las puertas
   * @param {Phaser.Scene} scene Escena a la que pertenece la puerta
   * @param {number} currentRoom Donde está ubicado el jugador
   * @param {number} nextRoom Donde quiere ir el jugador
   * @param {array} zoneArray Array de spawns
   * @param {array} roomArray Array de rooms
   */
  constructor(scene, player, camera, currentRoom, nextRoom, roomArray) {
    super(scene);
    this.zone;
    this.horizontalMovement = 180;
    this.verticalMovement = 80;
    //Dependiendo de la sala actual y la siguiente se crea en una sala diferente
    if(currentRoom !== nextRoom){
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
    }
    else{
      if(currentRoom === 1){
        this.zone = this.scene.add.zone(roomArray[currentRoom].getTopCenter().x, roomArray[currentRoom].getTopCenter().y + 225, 25, 400).setOrigin(0);
      }
      if(currentRoom === 3){
        this.zone = this.scene.add.zone(roomArray[currentRoom].getTopCenter().x - 100, roomArray[currentRoom].getTopCenter().y + 280, 25, 400).setOrigin(0);
      }
    }
    scene.physics.world.enable(this.zone);

    scene.physics.add.overlap(player, this.zone, (o1, o2) => {
      if(currentRoom !== nextRoom){
        camera.setDeadzone(950, 600); 
        if(currentRoom === 0)
        {
          if(nextRoom === 1){
            player.changePlayerPosition(roomArray[nextRoom].getBottomLeft().x + this.horizontalMovement,roomArray[nextRoom].getBottomLeft().y - this.verticalMovement);
            camera.setScroll(1075, 0);
          }
          else if(nextRoom === 2){
            player.changePlayerPosition(roomArray[nextRoom].getBottomRight().x - this.horizontalMovement,roomArray[nextRoom].getBottomRight().y - this.verticalMovement);
            camera.setScroll(-1075, 0);
          }
          else if(nextRoom === 3){
            player.changePlayerPosition(roomArray[nextRoom].getBottomCenter().x + this.horizontalMovement,roomArray[nextRoom].getBottomCenter().y - this.verticalMovement);
            camera.setScroll(0, -522);
          }
        }
        else{
          if(currentRoom === 1){
            player.changePlayerPosition(roomArray[nextRoom].getBottomRight().x - this.horizontalMovement,roomArray[nextRoom].getBottomRight().y - this.verticalMovement);
            camera.setScroll(0, 0);
          }
          if(currentRoom === 2){
            player.changePlayerPosition(roomArray[nextRoom].getBottomLeft().x + this.horizontalMovement,roomArray[nextRoom].getBottomLeft().y - this.verticalMovement);
            camera.setScroll(0, 0);
          }
          if(currentRoom === 3){
            player.changePlayerPosition(roomArray[nextRoom].getBottomCenter().x + this.horizontalMovement,roomArray[nextRoom].getBottomCenter().y - this.verticalMovement);
            camera.scrollY = -90;
            camera.setScroll(0, -90);
          }
        }
      }
    }); 
  }

  update(){
    //Estoy en verdad no funciona :(
    console.log("funsiona");
    if(scene.physics.collide(player, this.zone)) {
      console.log("Hay colisión");
    }
  }
}
