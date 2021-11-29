/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/sprites/');
    this.load.image('playbutton', 'playbutton.png')
	  this.load.image('optionsbutton', 'optionsbutton.png')
    this.load.image('fondo_central', 'fondo_central.png');
    this.load.image('fondo_chimenea', 'fondo_chimenea.png');
    this.load.image('fondo_ventana', 'fondo_ventana.png');
    this.load.image('fondo_puerta', 'fondo_puerta.png');
    this.load.image('fondo_sotano', 'fondo_sotano.png');
    this.load.image('tabla_puerta', 'tabla_puerta.png');
    this.load.image('tabla_ventana', 'tabla_ventana.png');
    this.load.image('tabla_chimenea', 'tabla_chimenea.png');
    this.load.image('spawn_chimenea', 'spawn_chimenea.png');
    this.load.image('spawn_puerta', 'spawn_puerta.png');
    this.load.image('spawn_ventana', 'spawn_ventana.png');
    this.load.image('bird', 'bird.png');
    this.load.image('player', 'player.png');
    this.load.image('broom', 'escoba.png');
    this.load.image('electricity', 'electricity.png');
    this.load.image('chest', 'cofre.png');
    this.load.image('window', 'ventana.png');
    this.load.image('window_bloq', 'ventana_bloq.png');
    this.load.image('empty', 'empty.png');
    this.load.image('sotano', 'sotano.png');
    this.load.image('electricidad_rojo', 'electricidad_rojo.png');
    this.load.image('electricidad_verde', 'electricidad_verde.png');


    //Carga de audios
    this.load.setPath('assets/audio/');
    this.load.audio('clockSound','clock.wav');
    //Sonidos player
    this.load.audio('playerAttack','player_attack.wav');
    this.load.audio('playerChangeRoom','player_change_room.wav');

    //Sonidos de la puerta, chimenea y ventana
    this.load.audio('fireplaceBlocked','fire_block.wav');
    this.load.audio('fireplaceUnblocked','fire_unblock.wav');
    this.load.audio('otherBlockableBlocked','wood_block.wav');
    this.load.audio('otherBlockableUnblocked','wood_unblock.wav');

    //Sonidos del sotano
    this.load.audio('woodTake','wood_take.wav');
    this.load.audio('ladderSound','player_ladder.wav');
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('menu');
  }
}