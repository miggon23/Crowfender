
import Player from './player.js';
import Bird from './bird.js';
import Chest from './chest.js';
import Broom from './broom.js';
import Blockable from './blockable.js';
import Wall from './wall.js';
import Sala from './sala.js';
import SalaCentral from './salacentral.js';

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
    this.add.tileSprite(500, 300, 1000, 600, 'fondo');  
    this.add.tileSprite(1500, 300, 1000, 600, 'fondo');  
    this.add.tileSprite(-500, 300, 1000, 600, 'fondo');  
    this.add.tileSprite(500, 900, 1000, 600, 'fondo');  
    this.add.tileSprite(500, -300, 1000, 600, 'fondo');  

    

    this.clock = new Phaser.Time.Clock(this);
    this.maxBirds = 15;
    this.nBirds = 0;
    //temporizador para spawnear pájaros
    this.timer = 0;
    this.spawnTime = Phaser.Math.Between(2000, 4000);
    this.newRand;
    this.birds = this.add.group(); 
    this.y = 30;
    this.player = new Player(this, 200, 500);
    let broom = new Broom(this);
    this.player.add(broom);
    this.chest = new Chest(this, this.player, 250, 1032);
    this.window = new Blockable(this, this.player, 1935, 400, 'window');
    this.spawnWalls();

    var camera = this.cameras.main;
    
    camera.x = 0;
    camera.y = 0;

    //camera.setZoom(0.2);

    camera.startFollow(this.player);

    //Colision de la escoba con los pájaros
    this.physics.add.overlap(broom, this.birds, (o1, o2) => {
      //Cambiar este método para espantar al pájaro en vez de matarlo (gestionado por el pájaro)
      o2.destroy();
  
      //restamos el número de pájaros para que se puedan generar más
      this.nBirds--;
      this.player.point();

    });

    

    this.physics.add.collider(this.player, this.walls)
    this.physics.add.collider(this.birds, this.walls)
    
  }


  spawnWalls(){
    this.walls = this.add.group();
    // Paredes fondo
    new Wall(this, 500, 170, 3000, 340, this.walls);
    new Wall(this, 500, 770, 3000, 340, this.walls);
    new Wall(this, 500, 1370, 1000, 340, this.walls);
    new Wall(this, 500, -430, 1000, 340, this.walls);
    // // Paredes laterales
    new Wall(this, -1000, 450, 120, 1200, this.walls);
    new Wall(this, 0, 1200, 120, 1000, this.walls);
    new Wall(this, 0, 10, 120, 1000, this.walls);
    new Wall(this, 1000, 1200, 120, 1000, this.walls);
    new Wall(this, 1000, 10, 120, 1000, this.walls);
    new Wall(this, 2000, 450, 120, 1200, this.walls);
    // Cofres 
    new Wall(this, 250, 1000, 64, 64, this.walls);
    // Chimenea 
    new Wall(this, -650, 350, 128, 128, this.walls);
    
  }


  /**
   * Genera un pájaro en el escenario, la coordenada x e y han sido de momento cableadas por código, lo ideal
   * sería consultar el ancho y alto del juego de una forma segura
   */
  spawnBird(delayedSpawn) {
    this.y += 20;
    // this.add.text(0, this.y, 'Pájaro creado, SpawnTime: ' + delayedSpawn)
    //     .setOrigin(0, 0)  // Colocamos el pivote en la esquina superior izquierda
    //     .setAlign('center');  // Centramos el texto dentro del cuadro de texto
    new Bird(this, Phaser.Math.Between(0, 1000), Phaser.Math.Between(0, 600), this.birds);
    
  }

  /**
   * Método que se ejecuta al coger una estrella. Se pasa la base
   * sobre la que estaba la estrella cogida para evitar repeticiones
   *  La base sobre la que estaba la estrella que se ha cogido
   */
  

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