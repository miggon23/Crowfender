
import Player from './player.js';
import Bird from './bird.js';
import Chest from './chest.js';
import Electricity from './electricity.js';
import Broom from './broom.js';
import Blockable from './blockable.js';
import Wall from './wall.js';
import Sala from './sala.js';
import SalaCentral from './salacentral.js';
import SpawnZone from './spawnzone.js';
import Basement from './basement.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
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
    this.add.tileSprite(500, 300, 1140, 600, 'fondo_central');  
    this.add.tileSprite(1620, 300, 1100, 600, 'fondo_ventana');  
    this.add.tileSprite(-570, 400, 1000, 400, 'fondo_chimenea');  
    this.add.tileSprite(500, 900, 1140, 600, 'fondo_central');  
    this.add.tileSprite(490, -300, 1160, 600, 'fondo_puerta');  
    this.add.tileSprite(2360, 300, 400, 600, 'spawn_ventana'); 
    this.add.tileSprite(-570, 100, 1000, 200, 'spawn_chimenea');  
    this.add.tileSprite(-290, -300, 400, 600, 'spawn_puerta');  

    
    this.clock = new Phaser.Time.Clock(this);
    this.maxBirds = 15;
    this.nBirds = 0;
    //temporizador para spawnear pájaros
    this.timer = 0;
    this.spawnTime = Phaser.Math.Between(2000, 4000);
    this.newRand;
    this.birds = this.add.group(); 
    this.player = new Player(this, 200, 500);
    let broom = new Broom(this);
    this.player.add(broom);
    this.chest = new Chest(this, this.player, 250, 1032);
    this.basement = new Basement(this, this.player, 500, 485, true);
    this.basement = new Basement(this, this.player, 500, 1100, false);
    this.Electricity = new Electricity(this, this.player, -200, 400);
    this.window = new Blockable(this, this.player, 1935, 400, 'window');

    //Array de zonas de spawn
    this.spawnzones = [];

    //Creación de muros y zonas de spawn
    this.spawnWalls();
    this.spawnZones();

    var camera = this.cameras.main;
    
    camera.x = 0;
    camera.y = 0;

    camera.setZoom(0.35);

    camera.startFollow(this.player);

    //Colision de la escoba con los pájaros
    this.physics.add.overlap(broom, this.birds, (o1, o2) => {
      //Cambiar este método para espantar al pájaro en vez de matarlo (gestionado por el pájaro)
      o2.destroy();
      //restamos el número de pájaros para que se puedan generar más
      this.subBird();

    });
   
    this.physics.add.collider(this.player, this.walls)
    this.physics.add.collider(this.birds, this.walls)
    
  }

  //Resta un pájaro del contador y suma un punto
  subBird(){
    this.nBirds--;
    this.player.point();
  }

  spawnWalls(){
    this.walls = this.add.group();
    // Paredes fondo
    new Wall(this, 1000, 170, 2100, 340, this.walls);
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

  spawnZones(){
    new SpawnZone(this, -500, 100, 720, 200, this.spawnzones);
    new SpawnZone(this, 2250, 350, 400, 500, this.spawnzones);
    new SpawnZone(this, -250, -250, 400, 500, this.spawnzones);
  }


  /**
   * Método que escoge un spawn de entre los existentes y crea un pájaro en su interior
   */
  spawnBird() { 
    let index = Phaser.Math.Between(0, this.spawnzones.length - 1);
    //Guardamos la spawnzone de una variable para acceder más facilmente a sus métodos
    let birdSpawnZone = this.spawnzones[index];
    let topLeft = birdSpawnZone.getTopLeft();
    let botRight = birdSpawnZone.getBottomRight();

    let newX = Phaser.Math.Between(topLeft.x, botRight.x);
    let newY = Phaser.Math.Between(topLeft.y, botRight.y);

    new Bird(this, newX, newY, this.birds, this);    

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
    //Si el número de pájaros alcanza el máximo, pierdes y se muestra tu puntuación
    if (this.nBirds === this.maxBirds){
      this.scene.start('end');
    }

  }

}