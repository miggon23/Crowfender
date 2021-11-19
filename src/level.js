
import Player from './player.js';
import Bird from './bird.js';
import Chest from './chest.js';
import Electricity from './electricity.js';
import Broom from './broom.js';
import Blockable from './blockable.js';
import Wall from './wall.js';
import Room from './room.js';
import SalaCentral from './salacentral.js';
import SpawnZone from './spawnzone.js';
import Basement from './basement.js';

/**
 * Escena principal del juego.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level' });
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() { 
    
    //Array de zonas de spawn
    this.spawnzones = [];
    
    //Array de habitaciones
    this.rooms = [];

    this.zones = [];
    
    //Creación de habitaciones
    this.spawnRooms();
    this.spawnWalls();
    
    this.spawns = this.add.group(); 

    this.spawnZones();
    
    //Juntamos los arrays para pasarle al pájaros las posibles zonas por donde puede moverse
    this.birdZones = this.spawnzones.concat(this.rooms);
    console.log(this.birdZones);

    //Máximo de pájaros peritido
    this.maxBirds = 15;
    //Número de pájaros en el nivel
    this.nBirds = 0;
    //Número de pájaros en la sala del medio
    this.nBirdsInMiddle = 0;
    //Máximo de pájaros del juego
    this.maxBirdsInMiddle = 5;

    //temporizador para spawnear pájaros
    this.timer = 0;
    this.spawnTime = Phaser.Math.Between(2000, 4000);
    this.newRand;
    this.birds = this.add.group(); 
    this.player = new Player(this, 500, 300);
    let broom = new Broom(this);
    this.player.add(broom);
    this.chest = new Chest(this, this.player, 250, 1032);
    var camera = this.cameras.main;
    this.basement = new Basement(this, this.player, 500, 485, true, camera);
    this.basement = new Basement(this, this.player, 500, 1100, false, camera);
    this.electricityAvailable = true;

    this.zone1; this.zone2; this.zone3; this.zone4;

    //Creación de muros, zonas de spawn, interruptores y bloqueables
    this.spawnElectricitySwitches();
    this.spawnBlockables();

    
    camera.x = 0;
    camera.y = 0;

    //camera.setZoom(0.35);
    //camera.setZoom(1.50);
   

    camera.startFollow(this.player);
    camera.setDeadzone(800, 400);
    //Colision de la escoba con los pájaros
    this.physics.add.overlap(broom, this.birds, (o1, o2) => {
      o2.hitBird();  
    });
    

    //Colision de los spawns con los pájaros (para la electricidad)
    this.physics.add.overlap(this.spawns, this.birds, (o1, o2) => {
      o2.die();     
    });

  this.physics.add.overlap(this.player, this.zones, (o1, o2) => {
    if(o2.name === 'middle' && this.player.whatRoomIs() === 1){
      this.player.changeRoomNumber(0);
      this.player.changePlayerPosition(this.player.x - 150, this.player.y);
      camera.scrollX = -800;
    } 
    else if(o2.name === 'middle' && this.player.whatRoomIs() === 2){
      this.player.changeRoomNumber(0);
      this.player.changePlayerPosition(this.player.x + 150, this.player.y);
      camera.scrollX = +800;
    } 
    else if(o2.name === 'middle' && this.player.whatRoomIs() === 3){
      this.player.changeRoomNumber(0);
      this.player.changePlayerPosition(this.player.x , this.player.y + 150);
      camera.scrollY = +400;
    } 
    else if(o2.name === 'east' && this.player.whatRoomIs() !== 1){
      camera.scrollX = +800;
      camera.scrollY = -100;
      this.player.changeRoomNumber(1);
      this.player.changePlayerPosition(this.player.x + 150, this.player.y);
    } 
    else if(o2.name === 'west' && this.player.whatRoomIs() !== 2){
      camera.scrollX = -800;
      camera.scrollY = -100;
      this.player.changeRoomNumber(2);
      this.player.changePlayerPosition(this.player.x - 150, this.player.y);
    } 
    else if(o2.name === 'upper' && this.player.whatRoomIs() !== 3){
      this.player.changeRoomNumber(3);
      camera.scrollX = -700;
      camera.scrollY = -450;
      //camera.setDeadzone(500, 300);
      this.player.changePlayerPosition(this.player.x, this.player.y - 150);
    } 
  });

    

    this.physics.add.collider(this.player, this.walls)
    this.physics.add.collider(this.birds, this.walls)
    
  }

  //Resta un pájaro del contador y suma un punto
  subBird(){
    this.nBirds--;
    this.player.point();
  }

  //Método que crea los muros que delimitan las habitaciones
  spawnWalls(){
    this.walls = this.add.group();
    // Paredes fondo
    //new Wall(this, 1000, 170, 2100, 340, this.walls);
    new Wall(this, 500, 770, 3100, 340, this.walls);
    new Wall(this, 500, 1370, 1000, 340, this.walls);
    new Wall(this, 500, -430, 1000, 340, this.walls);
    //Sala chimenea
    new Wall(this, -550, 320, 1000, 140, this.walls);
    // Paredes laterales
    new Wall(this, -1090, 450, 120, 1200, this.walls);
    new Wall(this, -40, 1200, 90, 1000, this.walls);
    new Wall(this, -40, -40, 90, 1000, this.walls);
    new Wall(this, 1040, 1200, 90, 1000, this.walls);
    new Wall(this, 1040, -40, 90, 1000, this.walls);
    new Wall(this, 2090, 450, 90, 1200, this.walls);
    // Cofre
    new Wall(this, 250, 970, 64, 64, this.walls);
    // Chimenea 
    new Wall(this, -780, 360, 170, 128, this.walls);

  }

  //Método que crea las zonas bloqueables por el jugador
  spawnBlockables(){
    this.window = new Blockable(this, this.player, 2030, 295, 'tabla_ventana');
    this.door = new Blockable(this, this.player, 98, -280, 'tabla_puerta');
    this.fireplace = new Blockable(this, this.player, -780, 400, 'tabla_chimenea');
  }

  //Método que crea las zonas de spawn de los pájaros
  spawnZones(){
    this.spawn_fireplace = new SpawnZone(this, -570, 100, 1000, 200, this.spawnzones, this.spawns, 'spawn_chimenea');
    this.spawn_window = new SpawnZone(this, 2360, 300, 400, 600, this.spawnzones, this.spawns, 'spawn_ventana');
    this.spawn_door =new SpawnZone(this, -290, -300, 400, 600, this.spawnzones, this.spawns, 'spawn_puerta');
   }

  //Método que crea los interruptores de electricidad
  spawnElectricitySwitches(){
    this.electricity_fireplace = new Electricity(this, this.player, -200, 400, this.spawn_fireplace);
    this.electricity_door = new Electricity(this, this.player, 200, -240, this.spawn_door);
    this.electricity_window = new Electricity(this, this.player, 1800, 300, this.spawn_window);
  }
    isElectricityAvailable(){
    return this.electricityAvailable;
  }

  //Se ha activado la electricidad: la ponemos en enfriamiento
  putElectricityOnCooldown(){
    this.electricityAvailable = false;
    this.time.addEvent( {
      delay: 30000, 
      callback: this.electricityNowAvailable,
      callbackScope: this,
      loop: false
    });
  }

  //Ponemos disponible de nuevo la electricidad
  electricityNowAvailable(){
    this.electricityAvailable = true;
  }

  //Método que crea las habitaciones del juego
  spawnRooms(){
    new Room(this, 500, 300, 1140, 600, this.rooms, 'fondo_central');  //room3 middle
    this.zone1= this.add.zone(0, 0, 990, 900).setOrigin(0).setName('middle');// zone middle
    this.physics.world.enable(this.zone1);
    this.zones.push(this.zone1);
    new Room(this,1620, 300, 1100, 600, this.rooms, 'fondo_ventana');  //room4 east
    this.zone2= this.add.zone(1070, 200, 1100, 600).setOrigin(0).setName('east');// zone east
    this.physics.world.enable(this.zone2);
    this.zones.push(this.zone2);
    new Room(this, -570, 400, 1000, 400, this.rooms, 'fondo_chimenea');//room5 west   
    this.zone3= this.add.zone(-1070, 200, 1000, 400).setOrigin(0).setName('west');// zone west
    this.physics.world.enable(this.zone3);
    this.zones.push(this.zone3);
    new Room(this, 490, -300, 1160, 600, this.rooms, 'fondo_puerta');  //room6 upper
    this.zone4= this.add.zone(0, -600, 960, 550).setOrigin(0).setName('upper'); // zone upper
    this.physics.world.enable(this.zone4);
    this.zones.push(this.zone4);
    new Room(this, 500, 900, 1140, 600, this.rooms, 'fondo_central');  //room7 basement
    // doesn't need basement zone cause we had the button of the basement
  }
  


  /**
   * Método que escoge un spawn de entre los existentes y crea un pájaro en su interior
   */
  spawnBird() { 
    let routes = [[0, 5, 3], [1, 4, 3], [2, 6, 3]];
    let index = Phaser.Math.Between(0, this.spawnzones.length - 1);
    //Guardamos la spawnzone de una variable para acceder más facilmente a sus métodos
    let birdSpawnZone = this.spawnzones[index];
    let topLeft = birdSpawnZone.getTopLeft();
    let botRight = birdSpawnZone.getBottomRight();

    let newX = Phaser.Math.Between(topLeft.x, botRight.x);
    let newY = Phaser.Math.Between(topLeft.y, botRight.y);

    new Bird(this, newX, newY, this.birds, this, routes[index], this.birdZones);    

  }

  addBirdInMiddle(){
    this.nBirdsInMiddle++;
    console.log("Pájaros en medio: " + this.nBirdsInMiddle + "Max: " + this.maxBirdsInMiddle);
  }

  substractBirdFromMiddle(){
    this.nBirdsInMiddle--;
    console.log("Pájaros en medio: " + this.nBirdsInMiddle + "Max: " + this.maxBirdsInMiddle)
  }

  /**
   * La escena se encarga de crear los pájaros cada cierto tiempo, si ha llegado
   * al límite de pájaros de la escena, se resetea el timer a 0 para que no spawnea
   * inmediatamente otro pájaro nada más echar a otro.
   * @param {*} t 
   * @param {*} dt 
   */
  update(t, dt){
    this.timer += dt;
    
    if(this.timer > this.spawnTime)
    {
      if(this.nBirds < this.maxBirds){
        this.nBirds++;
        this.spawnBird(this.spawnTime);
        this.timer -= this.spawnTime;
        this.spawnTime = Phaser.Math.Between(1400, 4000);
      }
      else{
        this.timer = 0;
      }
      
    }
    this.input.on('gameobjectdown', function (pointer, gameObject) {

      console.log(gameObject.name);

  });


    //Si el número de pájaros en el centro alcanza el máximo, pierdes y se muestra tu puntuación
    if (this.nBirdsInMiddle >= this.maxBirdsInMiddle){
      this.scene.start('end');
    }

  }

}