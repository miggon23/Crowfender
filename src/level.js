
import Player from './player.js';
import Bird from './bird.js';
import Chest from './chest.js';
import Electricity from './electricity.js';
import Broom from './broom.js';
import Blockable from './blockable.js';
import Wall from './wall.js';
import Room from './room.js';
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

    //Array donde se guardan las zonas de spawn junto con las habitaciones
    this.zones = [];
    
    //Creación de habitaciones y elementos del juego
    this.spawnRooms();
    this.spawnWalls();
    this.player = new Player(this, 500, 400);
    this.spawnZonesForTP();
    
    this.spawns = this.add.group(); 

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
    let broom = new Broom(this);
    this.player.add(broom);
    this.chest = new Chest(this, this.player, 740, 1000, 250, 200);
    var camera = this.cameras.main;
    this.basement = new Basement(this, this.player, 230, 435, 160, 100, true, camera);
    this.basement = new Basement(this, this.player, 270, 1000, 100, 100, false, camera);
    this.electricityAvailable = true;

    this.zone1; this.zone2; this.zone3; this.zone4; this.zone5; this.zone6; this.zone7; this.zone8; this.zone9; this.zone10;

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
    

    //camera.setZoom(0.30);
    //camera.setZoom(1.50);
   

    camera.startFollow(this.player);
    camera.setDeadzone(925, 600);
    camera.scrollY = 0;
    //Colision de la escoba con los pájaros
    this.physics.add.overlap(broom, this.birds, (o1, o2) => {
      o2.hitBird();  
    });
    

    //Colision de los spawns con los pájaros (para la electricidad)
    this.physics.add.overlap(this.spawns, this.birds, (o1, o2) => {
      this.deadSound.play();
      o2.die();     
    });

  this.physics.add.overlap(this.player, this.zones, (o1, o2) => {
    //Transporta al jugador y a la cámara desde la sala central hasta la sala derecha
    if(o2.name === 'middleToEast' && this.player.whatRoomIs() === 0){
      this.player.changeRoomNumber(1);
      this.player.changePlayerPosition(this.player.x + 150, this.player.y);
      camera.scrollX = +900;
      this.playerChangeRoomSound.play();
    } 
    //Transporta al jugador y a la cámara desde la sala central hasta la sala izquierda
    else if(o2.name === 'middleToWest' && this.player.whatRoomIs() === 0){
      this.player.changeRoomNumber(2);
      this.player.changePlayerPosition(this.player.x - 150, this.player.y);
      camera.scrollX = -900;
      this.playerChangeRoomSound.play();
    } 
    //Transporta al jugador y a la cámara desde la sala central hasta la sala superior
    else if(o2.name === 'middleToUpper' && this.player.whatRoomIs() === 0){
      this.player.changeRoomNumber(3);
      this.player.changePlayerPosition(this.player.x, this.player.y -400);
      camera.setDeadzone(925, 600);
       camera.scrollY = -600;
       camera.scrollX = 0;   
       this.playerChangeRoomSound.play();
    } 
    //Transporta al jugador y a la cámara desde la sala derecha hasta la central
    else if(o2.name === 'eastToMiddle' && this.player.whatRoomIs() === 1){
      this.player.changeRoomNumber(0);
      this.player.changePlayerPosition(this.player.x - 150, this.player.y);
      camera.setDeadzone(925, 600);
      camera.scrollX = +0;
      camera.scrollY = +0;
      this.playerChangeRoomSound.play();
    } 
    //Transporta al jugador y a la cámara desde la sala izquierda hasta la central
    else if(o2.name === 'westToMiddle' && this.player.whatRoomIs() === 2){
      this.player.changeRoomNumber(0);
      this.player.changePlayerPosition(this.player.x + 150, this.player.y);
      camera.setDeadzone(925, 600);
      camera.scrollX = +0;
      camera.scrollY = 0;
      this.playerChangeRoomSound.play();
    } 
    //Transporta al jugador y a la cámara desde la sala superior hasta la central
    else if(o2.name === 'upperToMiddle' && this.player.whatRoomIs() === 3){
      this.player.changeRoomNumber(0);
      this.player.changePlayerPosition(this.player.x, this.player.y + 400);
      camera.setDeadzone(925, 600);
      camera.scrollX = 10;
      camera.scrollY = 0;
      this.playerChangeRoomSound.play();
    } 
    //Activa el scroll en la sala derecha
    else if(o2.name === 'scrollEastOn' && !this.player.isScrolling()){
      camera.setDeadzone(100, 600);
      camera.scrollY = + 0;
      this.player.switchPlayerScrollToTrue();
    } 
    //Desactiva el scroll en la sala derecha
    else if(o2.name === 'scrollEastOff' && this.player.isScrolling()){
      camera.setDeadzone(925, 600);
      camera.scrollY = 0;
      camera.scrollX = +1090;
      this.player.switchPlayerScrollToFalse();
    } 
    else if(o2.name === 'scrollUpperOn' && !this.player.isScrolling()){
      camera.setDeadzone(100, 600);
      camera.scrollX = 0;
      camera.scrollY = -600;
      this.player.switchPlayerScrollToTrue();
    } 
    //Desactiva el scroll en la sala derecha
    else if(o2.name === 'scrollUpperOff' && this.player.isScrolling()){
      camera.setDeadzone(925, 600);
      camera.scrollY = -600;
      camera.scrollX = -45;
      this.player.switchPlayerScrollToFalse();
    } 
  });

    

    this.physics.add.collider(this.player, this.walls)
    this.physics.add.collider(this.birds, this.birdWalls)
    
  }

  //Resta un pájaro del contador
  subBird(){
    this.nBirds--;
  }

  //Método que crea los muros que delimitan las habitaciones
  spawnWalls(){
    this.walls = this.add.group();
    //Paredes fondo
    new Wall(this, 1000, 120, 2100, 270, this.walls);
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

    new Wall(this, 205, 275, 900, 90, this.walls);
    new Wall(this, 1515, 275, 1400, 90, this.walls);


    new Wall(this, 2090, 450, 90, 1200, this.walls);
    // Cofre
    new Wall(this, 740, 1000, 175, 100, this.walls);
    // Chimenea 
    new Wall(this, -780, 360, 170, 128, this.walls);


    this.birdWalls = this.add.group();
    new Wall(this, 500, -410, 1000, 430, this.birdWalls);
    new Wall(this, 1000, 190, 2100, 430, this.birdWalls);
    new Wall(this, 500, 790, 3200, 430, this.birdWalls);
    new Wall(this, 500, 1390, 1000, 430, this.birdWalls);
    new Wall(this, -600, 440, 1000, 100, this.birdWalls);
    
    new Wall(this, -1090, 450, 120, 1200, this.birdWalls);
    new Wall(this, -40, 200, 90, 2000, this.birdWalls);
    new Wall(this, 1040, 200, 90, 2000, this.birdWalls);
    new Wall(this, 2060, 450, 120, 1200, this.birdWalls);
  }

  //Método que crea las zonas bloqueables por el jugador
  spawnBlockables(){
    this.window = new Blockable(this, this.player, 2030, 295, 'tabla_ventana');
    this.door = new Blockable(this, this.player, 98, -280, 'tabla_puerta');
    this.fireplace = new Blockable(this, this.player, -780, 400, 'tabla_chimenea');
  }

  //Método que crea las zonas de spawn de los pájaros
  spawnZones(){
    this.spawn_fireplace = new SpawnZone(this, -570, 100, 1000, 200, this.spawnzones, this.spawns, 'spawn_chimenea', this.fireplace);
    this.spawn_window = new SpawnZone(this, 2360, 300, 400, 600, this.spawnzones, this.spawns, 'spawn_ventana', this.window);
    this.spawn_door =new SpawnZone(this, -290, -300, 400, 600, this.spawnzones, this.spawns, 'spawn_puerta', this.door);
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

  //Método que crea las habitaciones del juego
  spawnRooms(){
    new Room(this, 500, 300, 1140, 600, this.rooms, 'fondo_central');  //room3 middle
    new Room(this,1620, 300, 1100, 600, this.rooms, 'fondo_ventana');  //room4 east  
    new Room(this, -570, 400, 1000, 400, this.rooms, 'fondo_chimenea');//room5 west   
    new Room(this, 490, -300, 1160, 600, this.rooms, 'fondo_puerta');  //room6 upper
    new Room(this, 500, 900, 1140, 600, this.rooms, 'fondo_sotano');  //room7 basement   
  }

  spawnZonesForTP(){
    this.zone1= this.add.zone(1010, 300, 20, 300).setOrigin(0).setName('middleToEast');// zone middleToEast
    this.physics.world.enable(this.zone1);
    this.zones.push(this.zone1);
    this.zone2= this.add.zone(-100, 300, 100, 300).setOrigin(0).setName('middleToWest');// zone middleToWest
    this.physics.world.enable(this.zone2);
    this.zones.push(this.zone2);
    this.zone3= this.add.zone(655, 200, 160, 100).setOrigin(0).setName('middleToUpper');// zone middleToUpper
    this.physics.world.enable(this.zone3);
    this.zones.push(this.zone3);
    this.zone4= this.add.zone(1050, 300, 20, 300).setOrigin(0).setName('eastToMiddle'); // zone eastToMiddle
    this.physics.world.enable(this.zone4);
    this.zones.push(this.zone4);
    this.zone5= this.add.zone(-80, 300, 50, 300).setOrigin(0).setName('westToMiddle'); // zone westToMiddle
    this.physics.world.enable(this.zone5);
    this.zones.push(this.zone5);
    this.zone6= this.add.zone(655, -25, 160, 100).setOrigin(0).setName('upperToMiddle'); // zone upperToMiddle
    this.physics.world.enable(this.zone6);
    this.zones.push(this.zone6);
    this.zone7= this.add.zone(1635, 0, 10, 600).setOrigin(0).setName('scrollEastOn'); // zone scroll eastRoomOn
    this.physics.world.enable(this.zone7);
    this.zones.push(this.zone7);
    this.zone8= this.add.zone(1530, 0, 10, 600).setOrigin(0).setName('scrollEastOff'); // zone scroll eastRoomOff
    this.physics.world.enable(this.zone8);
    this.zones.push(this.zone8);
    this.zone9= this.add.zone(455, -325, 25, 300).setOrigin(0).setName('scrollUpperOn'); // zone scroll upperRoomOn
    this.physics.world.enable(this.zone9);
    this.zones.push(this.zone9);
    this.zone10= this.add.zone(555, -325, 25, 300).setOrigin(0).setName('scrollUpperOff'); // zone scroll upperRoomOff
    this.physics.world.enable(this.zone10);
    this.zones.push(this.zone10);
  }
  


  /**
   * Método que escoge un spawn de entre los existentes y crea un pájaro en su interior
   */
  spawnBird() { 
    let routes = [[0, 5, 3], [1, 4, 3], [2, 6, 3]];
    let index = Phaser.Math.Between(0, this.spawnzones.length - 1);
    //Guardamos la spawnzone de una variable para acceder más facilmente a sus métodos
    let birdSpawnZone = this.spawnzones[index];
    if(!birdSpawnZone.spawnFull())   //Si no está lleno el spawn añadimos un pájaro
    {
      let topLeft = birdSpawnZone.getTopLeft();
      let botRight = birdSpawnZone.getBottomRight();
  
      let newX = Phaser.Math.Between(topLeft.x, botRight.x);
      let newY = Phaser.Math.Between(topLeft.y, botRight.y);
  
      new Bird(this, newX, newY, this.birds, this, routes[index], this.birdZones); 
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
 

    //Sonidos del reloj, tic por hora para cualquier timer que pongamos
    if(this.victoryTimer > this.winTime / 6 && this.victoryTimer < (this.winTime / 6) + 20)   this.clockSound1.play();
    else if(this.victoryTimer > this.winTime / 3 && this.victoryTimer < (this.winTime / 3) + 20) this.clockSound2.play();
    else if(this.victoryTimer > this.winTime / 2 && this.victoryTimer < (this.winTime / 2) + 20) this.clockSound3.play();
    else if(this.victoryTimer > this.winTime / 1.5 && this.victoryTimer < (this.winTime / 1.5) + 20) this.clockSound4.play();
    else if(this.victoryTimer > this.winTime / 1.2 && this.victoryTimer < (this.winTime / 1.2) + 20) this.clockSound5.play();
    else if(this.victoryTimer > this.winTime && this.victoryTimer < this.winTime  + 20) this.clockSound6.play();
    

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
      if(this.nBirds == 0) //Y además no quedan pájaros en la escena
      {
        this.winSound.play();
        this.gameMusic.stop();
        this.scene.start('win');
      }
    }


    this.input.on('gameobjectdown', function (pointer, gameObject) {

     

      console.log(gameObject.name);
      

  });
    //Si el número de pájaros en el centro alcanza el máximo, pierdes y se muestra tu puntuación
    if (this.nBirdsInMiddle >= this.maxBirdsInMiddle && this.player.whatRoomIs() === 0){
      this.gameMusic.stop();
      this.loseSound.play();
      this.scene.start('end');
    }

  }

}