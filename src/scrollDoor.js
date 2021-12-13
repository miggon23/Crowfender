
/**
 * Clase que representa las puertas por las que pasa de sala a sala
 */
 export default class ScrollDoor extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de las puertas
     * @param {Phaser.Scene} scene Escena a la que pertenece la puerta
     * @param {number} currentRoom Donde está ubicado el jugador
     * @param {number} nextRoom Donde quiere ir el jugador
     * @param {array} zoneArray Array de spawns
     * @param {array} roomArray Array de rooms
     */
    constructor(scene, player, camera, currentRoom, position, roomArray){
      super(scene);
      this.zone;
      //Variables tamaño de las salas
      this.witdhZones = 50;
      this.heightZones = 600;
      //Variables desplazamiento de la sala
      this.displacementX = 200;
      //Variables deadzone
      this.deadzoneXRightLeft = 100;
      this.deadzoneXCenter = 925;
      this.deadzoneY = 600; 
      //Variables ajuste de la cámara
      this.rightX = 200;
      this.rightY = 0;
      this.leftX = -200;
      this.leftY = -600;
      this.center1X = 1100;
      this.center3X = 100;
      this.center1Y = 0;
      this.center3Y = -600;

      //Dependiendo de la donde se ubique la sala, derecha, izquierda, arriba o abajo utiliza la posicion de la sala para crearse
      if(position === "right"){
        this.zone = this.scene.add.zone(roomArray[currentRoom].getTopCenter().x + this.displacementX, roomArray[currentRoom].getTopCenter().y, this.witdhZones, this.heightZones).setOrigin(0);
      }
      else if(position ==="center"){
        this.zone = this.scene.add.zone(roomArray[currentRoom].getTopCenter().x, roomArray[currentRoom].getTopCenter().y, this.witdhZones, this.heightZones).setOrigin(0);
      } else{
        this.zone = this.scene.add.zone(roomArray[currentRoom].getTopCenter().x - this.displacementX, roomArray[currentRoom].getTopCenter().y, this.witdhZones, this.heightZones).setOrigin(0);
      }
     
      scene.physics.world.enable(this.zone);
  
      scene.physics.add.overlap(player, this.zone, (o1, o2) => {
        console.log(position);
        if(position === "right" && !player.isScrolling()){
          camera.setDeadzone(this.deadzoneXRightLeft, this.deadzoneY); 
          camera.setScroll(this.rightX, this.rightY);
          player.switchPlayerScrollToTrue();
        }
        else if(position === "left" && !player.isScrolling()){
          camera.setDeadzone(this.deadzoneXRightLeft, this.deadzoneY); 
          camera.setScroll(this.leftX, this.leftY);
          player.switchPlayerScrollToTrue();
        }
        else if(position === "center" && player.isScrolling()){
          camera.setDeadzone(this.deadzoneXCenter, this.deadzoneY); 
          if(currentRoom === 1){
            camera.setScroll(this.center1X, this.center1Y);
          }
          else if(currentRoom === 3){
            camera.setScroll(this.center3X, this.center3Y);
          }
          player.switchPlayerScrollToFalse();
        }
      }); 
    }
  }
  