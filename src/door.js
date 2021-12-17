
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
  constructor(scene, player, camera, currentRoom, nextRoom, position, roomArray){
    super(scene);
    this.zone;

    //Variables tamaño de las salas
    this.setSizeVariables();
    //Variables desplazamiento de la sala
    this.setDisplacementVariables();
    //Variables para el movimiento del jugador
    this.setMovementVariables();
    //Variables para el movimiento de la camara
    this.setCameraVariables();

    //Dependiendo de la donde se ubique la sala, derecha, izquierda, arriba o abajo utiliza la posicion de la sala para crearse
    if(position === "right"){
      this.zone = this.scene.add.zone(roomArray[currentRoom].getTopRight().x - this.displacementXForSideRooms, roomArray[currentRoom].getTopRight().y + this.displacementYForSideRooms, this.witdhForSideRooms, this.heightForSideRooms).setOrigin(0);
    }
    else if(position === "left"){
      this.zone = this.scene.add.zone(roomArray[currentRoom].getTopLeft().x + this.displacementXForSideRooms, roomArray[currentRoom].getTopLeft().y + this.displacementYForSideRooms, this.witdhForSideRooms, this.heightForSideRooms).setOrigin(0);
    }
    else if(position ==="up"){
      this.zone = this.scene.add.zone(roomArray[currentRoom].getTopCenter().x + this.displacementXForUpRooms, roomArray[currentRoom].getTopCenter().y + this.displacementYForUpRooms, this.witdhForUpDownRooms, this.heightForUpDownRooms).setOrigin(0);
    }
    else{
      this.zone = this.scene.add.zone(roomArray[currentRoom].getBottomCenter().x + this.displacementXForDownRooms, roomArray[currentRoom].getBottomCenter().y + this.displacementYForDownRooms, this.witdhForUpDownRooms, this.heightForUpDownRooms).setOrigin(0);
    }
   
    scene.physics.world.enable(this.zone);

    scene.physics.add.overlap(player, this.zone, (o1, o2) => {
      player.changeRoomNumber(nextRoom);
      if(position === "right"){
        player.changePlayerPosition(roomArray[nextRoom].getBottomLeft().x + this.horizontalMovementForSideRooms,roomArray[nextRoom].getBottomLeft().y - this.verticalMovementForSideRooms );
        //Si es la habitacion siguiente la central el scroll será cero porque es donde se crea la cámara, en cambio en el resto hay que ajustarla un poco
        if(nextRoom === 0){
          camera.setScroll(this.cameraScrollXForCentralRoomFromRightRoom, this.cameraScrollYForSideRooms);
        }
        else{
          camera.setScroll(this.cameraScrollXForSideRooms, this.cameraScrollYForSideRooms);
        }
      }
      else if(position === "left"){
        player.changePlayerPosition(roomArray[nextRoom].getBottomRight().x - this.horizontalMovementForSideRooms,roomArray[nextRoom].getBottomRight().y - this.verticalMovementForSideRooms );       
        //Si es la habitacion siguiente la central el scroll será 220 porque es donde se crea la cámara, en cambio en el resto hay que ajustarla un poco
        if(nextRoom === 0){
          camera.setScroll(this.cameraScrollXForCentralRoomFromLeftRoom, this.cameraScrollYForSideRooms);
        }
        else{
          camera.setScroll(-this.cameraScrollXForSideRooms, this.cameraScrollYForSideRooms);
        }
      }
      else if(position ==="up"){
        player.changePlayerPosition(roomArray[nextRoom].getBottomCenter().x + this.horizontalMovementForUpDownRooms,roomArray[nextRoom].getBottomCenter().y - this.verticalMovementForUpRooms);
        camera.setScroll(this.cameraScrollXForUpDownRooms, this.cameraScrollYForUpRooms);
      }
      else{
        player.changePlayerPosition(roomArray[nextRoom].getTopCenter().x + this.horizontalMovementForUpDownRooms,roomArray[nextRoom].getTopCenter().y + this.verticalMovementForDownRooms) ;
        camera.setScroll(this.cameraScrollXForUpDownRooms, this.cameraScrollYForDownRooms);
      }
    }); 
  }


  setCameraVariables() {
    this.cameraScrollXForCentralRoomFromRightRoom = -220;
    this.cameraScrollXForCentralRoomFromLeftRoom = 220;
    this.cameraScrollXForSideRooms = 790;
    this.cameraScrollYForSideRooms = 0;
    this.cameraScrollXForUpDownRooms = 0;
    this.cameraScrollYForUpRooms = -390;
    this.cameraScrollYForDownRooms = -200;
  }

  setMovementVariables() {
    this.horizontalMovementForSideRooms = 170;
    this.horizontalMovementForUpDownRooms = 200;
    this.verticalMovementForSideRooms = 185;
    this.verticalMovementForUpRooms = 200;
    this.verticalMovementForDownRooms = 220;
  }

  setDisplacementVariables() {
    this.displacementXForSideRooms = 87;
    this.displacementXForUpRooms = 140;
    this.displacementXForDownRooms = 180;
    this.displacementYForSideRooms = 225;
    this.displacementYForUpRooms = 200;
    this.displacementYForDownRooms = -20;
  }

  setSizeVariables() {
    this.witdhForSideRooms = 25;
    this.heightForSideRooms = 400;
    this.witdhForUpDownRooms = 175;
    this.heightForUpDownRooms = 40;
  }
}
