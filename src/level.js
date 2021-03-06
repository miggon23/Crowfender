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
   * @param {data} data Contiene multiplier(dificultad) y timeToWin, el tiempo en minutos para ganar que se guarda en init
   */
  init(data) {
    this.difficulty = data.multiplier;
    this.winTime = data.timeToWin * 1000 * 60;
  }

  /** 
   * Creación de los elementos de la escena principal de juego
   */
  create() { 

    this.f = this.input.keyboard.addKey('F');
    this.p = this.input.keyboard.addKey('P');

      this.f.on('down', function () {

        if (this.scale.isFullscreen)
        {
          this.scale.stopFullscreen();
        }
        else
        {          
          this.scale.startFullscreen();
        }

      }, this);

      this.p.on('down', () => { 
      });

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
    this.doorSprite1 = this.add.sprite(this.mainRoom.x + 230, this.mainRoom.y - 30, 'puerta_central');
    this.player = new Player(this , Data.player , this.birds);
    this.doorSprite2 = this.add.sprite(this.doorSprite1.x , this.doorSprite1.y - 420, 'puerta_puerta').setDepth(12);
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
    if(this.difficulty === "easy") this.maxBirdsInMiddle = 5;
    else this.maxBirdsInMiddle = 4;

    //temporizador para spawnear pájaros
    this.timer = 0;
    if(this.difficulty === "easy") this.spawnTime = Phaser.Math.Between(6000, 10000);
    else if(this.difficulty === "medium") this.spawnTime = Phaser.Math.Between(4000, 7000);
    else this.spawnTime = Phaser.Math.Between(3000, 5000);
    
    //Temporizador para ganar
    this.victoryTimer = 0;

    //Booleano que marca cuando un pájaro se puede spawnear
    this.stopSpawning = false;
    this.gameLost = false;

    this.newRand;
    this.birds = this.add.group(); 
   
    var camera = this.cameras.main;
    this.chest = new Chest(this, this.player, Data.chest, this.walls);
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
    
    // Descomentar para mostrar todas las salas del juego a la vez
    //camera.setZoom(0.3);
   
    this.spawnDoors(camera);

    this.clockSounds();
    this.makeTensionSound(100, this.tension1);

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
  
  /**
   * Crea las puertas con las que el jugador cambia de sala
   * @param {camera} camera La cámara del juego
   */
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

  /**
   * LLamada a los callbacks para los sonidos del reloj
   */
  clockSounds(){
    this.makeclockSound(this.winTime / 6, this.clockSound1);
    this.makeclockSound(this.winTime / 3, this.clockSound2);
    this.makeclockSound(this.winTime / 2, this.clockSound3);
    this.makeclockSound(this.winTime / 1.5, this.clockSound4);
    this.makeclockSound(this.winTime / 1.2, this.clockSound5);
    this.makeclockSound(this.winTime, this.clockSound6);
  }

  /**
   * Callbacks sonidos de tensión
   * @param {number} tiempo Tiempo hasta que se reproduzca el sonido
   * @param {object} sound Sonido que se reproduce
   */
  makeTensionSound(tiempo, sound){
    this.time.addEvent( {
      delay: tiempo, 
      callback: this.playSpecificTensionSound,
      callbackScope: this,
      loop: false,
      args:[sound]
    });
  } 

  /**
   * Suena sonido de tensión y se elige el siguiente
   * @param {object} sound Sonido que se reproduce
   */
  playSpecificTensionSound(sound){ 
    this.randomForTensionSound = Phaser.Math.Between(0, 2);
    if(this.randomForTensionSound === 0) sound = this.tension1;
    else if(this.randomForTensionSound === 1) sound = this.tension2;
    else sound = this.tension3;
    this.makeTensionSound(10000, sound);
    sound.play();
  }
  
  /**
   * Callback sonido de reloj   
   * @param {number} tiempo Tiempo hasta que se reproduzca el sonido
   * @param {object} sound Sonido que se reproduce
   */
  makeclockSound(tiempo, sound){
    this.time.addEvent( {
      delay: tiempo, 
      callback: this.playSpecificClockSound,
      callbackScope: this,
      loop: false,
      args:[sound]
    });
  }

  /**
   * Hace sonar al sonido de reloj
   * @param {object} sound Sonido que se reproduce
   */
  playSpecificClockSound(sound){ 
    sound.play();
  }

  /**
   * Resta un pájaro del contador
   */
  subBird(){
    this.nBirds--;
  }

  /**
   * Método que crea las zonas bloqueables por el jugador
   */
  spawnBlockables(){
    let blocked = (this.difficulty === "easy");

    this.window = new Blockable(this, this.player, Data.blockable.window, blocked);
    this.door = new Blockable(this, this.player, Data.blockable.door, blocked);
    this.fireplace = new Blockable(this, this.player, Data.blockable.fireplace, blocked);
  }

  /**
   * Método que crea las zonas de spawn de los pájaros
   */
  spawnZones(){
    this.spawn_fireplace = new SpawnZone(this, Data.spawnZone.west, this.spawnzones, this.spawns, this.fireplace);
    this.spawn_window = new SpawnZone(this, Data.spawnZone.east, this.spawnzones, this.spawns, this.window);
    this.spawn_door =new SpawnZone(this, Data.spawnZone.upper, this.spawnzones, this.spawns, this.door);
  }

  /**
   * Método que crea los interruptores de electricidad
   */
  spawnElectricitySwitches(){
    this.electricity_fireplace = new Electricity(this, this.player, Data.electricity.west, this.spawn_fireplace);
    this.electricity_door = new Electricity(this, this.player, Data.electricity.upper, this.spawn_door);
    this.electricity_window = new Electricity(this, this.player, Data.electricity.east, this.spawn_window);
  }
  
  /**
   * Devuelve true si la electricidad no está en cooldown
   */
  isElectricityAvailable(){
  return this.electricityAvailable;
  }

  /**
   * Se ha activado la electricidad: la ponemos en enfriamiento
   */  
  putElectricityOnCooldown(){
    this.electricityAvailable = false;
    this.time.addEvent( {
      delay: 20000, 
      callback: this.electricityNowAvailable,
      callbackScope: this,
      loop: false
    });
  }

  /**
   * Ponemos disponible de nuevo la electricidad
   */
  electricityNowAvailable(){
    this.electricityReady.play();
    this.electricityAvailable = true;
  }

  /**
   * Método que crea las habitaciones del juego mainRoom corresponde a la habitación central
   */
  spawnRooms(){
    this.mainRoom = new Room(this, Data.rooms.main, this.rooms, this.walls, this.birdWalls);  //room3 middle
    new Room(this, Data.rooms.east, this.rooms, this.walls, this.birdWalls);  //room4 east  
    new Room(this, Data.rooms.west, this.rooms, this.walls, this.birdWalls);//room5 west   
    this.upperRoom = new Room(this, Data.rooms.upper, this.rooms, this.walls, this.birdWalls);  //room6 upper
    new Room(this, Data.rooms.basement, this.rooms, this.walls, this.birdWalls);  //room7 basement   
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
  
     
      //Dependiendo de la dificultad apareceran distinto tipos de pájaros
      if(this.difficulty === "easy"){
        this.birdSpawned = 0;
      }
      else if(this.difficulty === "medium"){
        this.birdSpawned = Phaser.Math.Between(0, 1);
      }
      else{
        this.birdSpawned = Phaser.Math.Between(0, 2);
      }


      if(this.birdSpawned === 0){
        new Bird(this, newX, newY, this.birds, this, routes[index], this.birdZones, 'bird1', this.difficulty); 
      }
      else if(this.birdSpawned === 1){       
        new Bird(this, newX, newY, this.birds, this, routes[index], this.birdZones, 'bird2', this.difficulty); 
      }
      else{
        new Bird(this, newX, newY, this.birds, this, routes[index], this.birdZones, 'bird3', this.difficulty); 
      }
     
     
    }
    else
      console.log("Spawn lleno");

  }

  /**
   * Cambia de escena a la escena de perder
   */ 
  changeScene(){
    this.scene.start('end');
  }

  /**
   * Añade un pájaro al contador de la sala central
   */
  addBirdInMiddle(){
    this.nBirdsInMiddle++;
    console.log("Pájaros en medio: " + this.nBirdsInMiddle + "Max: " + this.maxBirdsInMiddle);
  }

  /**
   * Quita un pájaro del contador de la sala central
   */
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

    //Spawn de pájaros
    if(this.timer > this.spawnTime)
    {
      if(this.nBirds < this.maxBirds && !this.stopSpawning){
        this.nBirds++;
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
        this.scene.start('victory');
      }
    }
    //Si el número de pájaros en el centro alcanza el máximo, pierdes y se muestra tu puntuación
    if (!this.gameLost && this.nBirdsInMiddle >= this.maxBirdsInMiddle && this.player.whatRoomIs() === 0){
      this.gameMusic.stop();
      this.loseSound.play();
      this.gameLost = true;
      
      this.time.addEvent( {
        delay: 400, 
        callback: this.changeScene,
        callbackScope: this,
        loop: false,
      });
    }
    // Si se pulsa la P, el juego se pausa (llevando al jugador, en consecuencia, a una escena secundaria llamada "pause")
    if (Phaser.Input.Keyboard.JustDown(this.p)){
      this.scene.pause();
      this.scene.launch('pause', this);
    }
  }
}