
import Player from './player.js';
import Bird from './bird.js';
import Platform from './platform.js';
import Broom from './broom.js';

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
    this.clock = new Phaser.Time.Clock(this);
    this.maxBirds = 10;
    this.nBirds = 0;
    //temporizador para spawnear pájaros
    this.timer = 0;
    this.spawnTime = Phaser.Math.Between(2000, 5000);
    this.newRand;
    this.bases = this.add.group();
    this.birds = this.add.group(); 
    this.y = 30;
    this.player = new Player(this, 200, 300);
    let broom = new Broom(this, 0, 0);
    this.player.add(broom);
    //this.physics.add.collider(broom, this.birds, onCollision);

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
   * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
   */
  starPickt (base) {
    this.player.point();
      if (this.player.score == this.stars) {
        this.scene.start('end');
      }
      else {
        let s = this.bases.children.entries;
        this.spawn(s.filter(o => o !== base));

      }
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
        this.spawnTime = Phaser.Math.Between(2000, 5000);
      }
      else{
        this.timer = 0;
      }
      
    }

  }

}