import Player from './player.js';
import Bird from './bird.js';
import Chest from './chest.js';
import Electricity from './electricity.js';
import Blockable from './blockable.js';
import Room from './room.js';
import Door from './door.js';
import scrollDoor from './scrollDoor.js';
import SpawnZone from './spawnzone.js';
import Basement from './basement.js';
import Data from './data.js';

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
   * Inicialización de variables que dependen del nivel de dificultad elegida por el jugador en el menú
   * @param {data} data Contiene multiplier y timeToWin, el tiempo en minutos para ganar que se guarda en init
   */
  init(data) {
    this.multiplier = data.multiplier;
    this.winTime = data.timeToWin * 1000 * 60;
  }

  /* Creación de los elementos de la escena principal de juego
  */
  create() { 
    
    //Array de zonas de spawn
    this.spawnzones = [];
    //Array de habitaciones
    this.rooms = [];
    //Grupo de spawns
    this.spawns = this.add.group();

    this.walls = this.add.group();
    this.birdWalls = this.add.group();

    //Creación de habitaciones y elementos del juego
    this.spawnRooms();
    //Añadimos la imagen de las puertas manualmente
    this.doorSprite1 = this.add.sprite(this.mainRoom.x + 230, this.mainRoom.y - 40, 'puerta_central');
    this.player = new Player(this ,500 ,400 ,'player' , this.birds);
    this.player.setDepth(10);
    this.doorSprite2 = this.add.sprite(this.doorSprite1.x , this.doorSprite1.y - 410, 'puerta_puerta');
    this.spawnBlockables();
    this.spawnZones();
    this.spawnElectricitySwitches();
    
    //Juntamos los arrays para pasarle al pájaros las posibles zonas por donde puede moverse
    this.birdZones = this.spawnzones.concat(this.rooms);
    console.log(this.birdZones);

    //Máximo de pájaros permitido
    this.maxBirds = 15;
    //Número de pájaros en el nivel
    this.nBirds = 0;
    //Número de pájaros en la sala del medio
    this.nBirdsInMiddle = 0;
    //Máximo de pájaros del juego
    this.maxBirdsInMiddle = 5;

    //temporizador para spawnear pájaros
    this.timer = 0;
    this.spawnTime = Phaser.Math.Between(4000, 7000);

    //Temporizador para ganar
    this.victoryTimer = 0;

    //Booleano que marca cuando un pájaro se puede spawnear
    this.stopSpawning = false;

    this.newRand;
    this.birds = this.add.group(); 
   
    var camera = this.cameras.main;
    this.chest = new Chest(this, this.player, 740, 1000, 500, 400, this.walls);
    this.basement1 = new Basement(this, this.player, camera, Data.basementZones.middle);
    this.basement2 = new Basement(this, this.player, camera, Data.basementZones.down, this.basement1);
    this.electricityAvailable = true;

    this.zone7; this.zone8; this.zone9; this.zone10;

    //Sonidos 
    const config = {
      mute: false,
      volume: 0.1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    }; 
    this.randomForTensionSound;
    this.timerForTensionSounds = 10000;

    this.playerChangeRoomSound = this.sound.add("playerChangeRoom");
    this.electricityReady = this.sound.add("electricityReady");
    this.deadSound = this.sound.add("birdDeath");
    this.winSound = this.sound.add("win");
    this.loseSound = this.sound.add("lose");
    this.gameMusic = this.sound.add("gameMusic", config);
    this.clockSound1 = this.sound.add("clockSound1");
    this.clockSound2 = this.sound.add("clockSound2");
    this.clockSound3 = this.sound.add("clockSound3");
    this.clockSound4 = this.sound.add("clockSound4");
    this.clockSound5 = this.sound.add("clockSound5");
    this.clockSound6 = this.sound.add("clockSound6");
    this.tension1 = this.sound.add("tension1");
    this.tension2 = this.sound.add("tension2");
    this.tension3 = this.sound.add("tension3");
    this.gameMusic.play();

    camera.x = 0;
    camera.y = 0;
    
    
    //camera.setZoom(0.60);
    //camera.setZoom(1.50);
   
    this.spawnDoors(camera);

    this.clockSounds();
    this.broom = this.player.returnBroom();
    camera.startFollow(this.player);
    camera.setDeadzone(925, 600); 
    camera.scrollY = 0;
    //Colision de la escoba con los pájaros
    this.physics.add.overlap(this.broom, this.birds, (o1, o2) => {
      if(this.player.hittingStateBirds){
        o2.hitBird();  
      }
    });
    

    //Colision de los spawns con los pájaros (para la electricidad)
    this.physics.add.overlap(this.spawns, this.birds, (o1, o2) => {
      this.deadSound.play();
      o2.die();     
    });

    this.physics.add.collider(this.player, this.walls)
    this.physics.add.collider(this.birds, this.birdWalls)
    
  }

  spawnDoors(camera) {
    new Door(this, this.player, camera, 0, 1, "right", this.rooms);
    new Door(this, this.player, camera, 0, 2, "left", this.rooms);
    new Door(this, this.player, camera, 0, 3, "up", this.rooms);
    new Door(this, this.player, camera, 1, 0, "left", this.rooms);
    new Door(this, this.player, camera, 2, 0, "right", this.rooms);
    new Door(this, this.player, camera, 3, 0, "down", this.rooms);
    new scrollDoor(this, this.player, camera, 1, "right", this.rooms);
    new scrollDoor(this, this.player, camera, 1, "center", this.rooms);
    new scrollDoor(this, this.player, camera, 3, "left", this.rooms);
    new scrollDoor(this, this.player, camera, 3, "center", this.rooms);
  }

  clockSounds(){
    this.makeclockSound(this.winTime / 6, this.clockSound1);
    this.makeclockSound(this.winTime / 3, this.clockSound2);
    this.makeclockSound(this.winTime / 2, this.clockSound3);
    this.makeclockSound(this.winTime / 1.5, this.clockSound4);
    this.makeclockSound(this.winTime / 1.2, this.clockSound5);
    this.makeclockSound(this.winTime, this.clockSound6);
  }

  makeclockSound(tiempo, sound){
    this.time.addEvent( {
      delay: tiempo, 
      callback: this.playSpecificClockSound,
      callbackScope: this,
      loop: false,
      args:[sound]
    });
  }

  playSpecificClockSound(sound){ 
    console.log("Estoy sonando"); 
    sound.play();
  }
  //Resta un pájaro del contador
  subBird(){
    this.nBirds--;
  }

  //Método que crea las zonas bloqueables por el jugador
  spawnBlockables(){
    this.window = new Blockable(this, this.player, 1920, 295, 'ventana_block', 'ventana_block_tabla');
    this.door = new Blockable(this, this.player, 60, -270, 'puerta_block', 'puerta_block_tabla');
    this.fireplace = new Blockable(this, this.player, -780, 440, 'chimenea', 'tabla_chimenea');
  }

  //Método que crea las zonas de spawn de los pájaros
  spawnZones(){
    this.spawn_fireplace = new SpawnZone(this, -500, 100, 1000, 200, this.spawnzones, this.spawns, 'spawn_chimenea', this.fireplace);
    this.spawn_window = new SpawnZone(this, 2200, 300, 400, 600, this.spawnzones, this.spawns, 'spawn_ventana', this.window);
    this.spawn_door =new SpawnZone(this, -200, -300, 400, 600, this.spawnzones, this.spawns, 'spawn_puerta', this.door);
  }

  //Método que crea los interruptores de electricidad
  spawnElectricitySwitches(){
    this.electricity_fireplace = new Electricity(this, this.player, -352, 380, this.spawn_fireplace);
    this.electricity_door = new Electricity(this, this.player, 276, -300, this.spawn_door);
    this.electricity_window = new Electricity(this, this.player, 1800, 304, this.spawn_window);
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
    this.electricityReady.play();
    this.electricityAvailable = true;
  }

   /**
   * Método que crea las habitaciones del juego mainRoom corresponde a la habitación central
   */
  spawnRooms(){
    this.mainRoom = new Room(this, 500, 300, 1000, 600, this.rooms, 'fondo_central', this.walls, this.birdWalls);  //room3 middle
    new Room(this, 1500, 300, 1000, 600, this.rooms, 'fondo_ventana', this.walls, this.birdWalls);  //room4 east  
    new Room(this, -500, 400, 1000, 400, this.rooms, 'fondo_chimenea', this.walls, this.birdWalls);//room5 west   
    this.upperRoom = new Room(this, 490, -300, 1000, 600, this.rooms, 'fondo_puerta', this.walls, this.birdWalls);  //room6 upper
    new Room(this, 500, 900, 1000, 600, this.rooms, 'fondo_sotano', this.walls, this.birdWalls);  //room7 basement   
  }

  /**
   * Método que escoge un spawn de entre los existentes y crea un pájaro en su interior
   */
  spawnBird() { 
    let routes = Data.routes;
    let index = Phaser.Math.Between(0, this.spawnzones.length - 1);
    //Guardamos la spawnzone de una variable para acceder más facilmente a sus métodos
    let birdSpawnZone = this.spawnzones[index];
    if(!birdSpawnZone.spawnFull())   //Si no está lleno el spawn añadimos un pájaro
    {
      let topLeft = birdSpawnZone.birdZone.getTopLeft();
      let botRight = birdSpawnZone.birdZone.getBottomRight();
  
      let newX = Phaser.Math.Between(topLeft.x, botRight.x);
      let newY = Phaser.Math.Between(topLeft.y, botRight.y);
  
     
      this.birdSpawned = Phaser.Math.Between(0, 2);
      if(this.birdSpawned === 0){
        new Bird(this, newX, newY, this.birds, this, routes[index], this.birdZones, 'bird1'); 
      }
      else if(this.birdSpawned === 1){       
        new Bird(this, newX, newY, this.birds, this, routes[index], this.birdZones, 'bird2'); 
      }
      else{
        new Bird(this, newX, newY, this.birds, this, routes[index], this.birdZones, 'bird3'); 
      }
     
     
    }
    else
      console.log("Spawn lleno");

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
   * inmediatamente otro pájaro nada más echar a uno. Vigila si el jugador ha perdido o si ha ganado
   * @param {*} t 
   * @param {*} dt 
   */
  update(t, dt){
    this.timer += dt; 
    this.victoryTimer += dt;
    this.timerForTensionSounds += dt;
    this.randomForTensionSound = Phaser.Math.Between(0, 100);

    if(this.timerForTensionSounds >  10000 && this.randomForTensionSound === 0){
      this.tension1.play();
      this.timerForTensionSounds = 0;
    }
    else if(this.timerForTensionSounds >  10000  && this.randomForTensionSound === 1){
      this.tension2.play();
      this.timerForTensionSounds = 0;
    } 
    else if(this.timerForTensionSounds >  10000 && this.randomForTensionSound === 2){
      this.tension3.play();
      this.timerForTensionSounds = 0;
    } 
 

    

    //Spawn de pájaros
    if(this.timer > this.spawnTime)
    {
      if(this.nBirds < this.maxBirds && !this.stopSpawning){
        this.nBirds += this.multiplier;
        this.spawnBird(this.spawnTime);
        this.timer -= this.spawnTime;
        this.spawnTime = Phaser.Math.Between(4000, 7000);
      }
      else{
        this.timer = 0;
      }
      
    }

    //condición de victoria, si ha pasado el tiempo
    if(this.victoryTimer >= this.winTime)
    {
      this.stopSpawning = true; //Tras ese tiempo, dejan de spawnearse pájaros
      if(this.nBirds === 0) //Y además no quedan pájaros en la escena
      {
        this.winSound.play();
        this.gameMusic.stop();
        this.scene.start('win');
      }
    }
    //Si el número de pájaros en el centro alcanza el máximo, pierdes y se muestra tu puntuación
    if (this.nBirdsInMiddle >= this.maxBirdsInMiddle && this.player.whatRoomIs() === 0){
      this.gameMusic.stop();
      this.loseSound.play();
      
      this.scene.start('end');
    }

  }

}