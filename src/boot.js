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
    // Cargamos las imagenes
    this.load.setPath('assets/sprites/');

    // Cargamos los botones
    this.load.image('playbutton', 'playbutton.png')
	  this.load.image('optionsbutton', 'optionsbutton.png')

    //Cargamos los fondos
    this.load.image('fondo_central', 'fondo_central.png');
    this.load.image('fondo_chimenea', 'fondo_chimenea.png');
    this.load.image('fondo_ventana', 'fondo_ventana.png');
    this.load.image('fondo_puerta', 'fondo_puerta.png');
    this.load.image('fondo_sotano', 'fondo_sotano.png');
    this.load.image('spawn_chimenea', 'spawn_chimenea.png');
    this.load.image('spawn_puerta', 'spawn_puerta.png');
    this.load.image('spawn_ventana', 'spawn_ventana.png');
    this.load.image('sotano', 'sotano.png');

    //Cargamos los bloqueables
    this.load.image('tabla_puerta', 'tabla_puerta.png');
    this.load.image('tabla_ventana', 'tabla_ventana.png');
    this.load.image('tabla_chimenea', 'tabla_chimenea.png');
  
    //Cargamos los pájaros
    this.load.image('bird', 'bird.png');

    //Cargamos al player
    this.load.image('player', 'player.png');
    this.load.image('broom', 'escoba.png');
    
    
    this.load.image('empty', 'empty.png');


    //Cargamos el cofre
    this.load.image('chest', 'cofre.png');

    //Se cargan imágenes relacionadas con la electricidad
    this.load.image('electricity', 'electricity.png');
    this.load.image('electricidad_rojo', 'electricidad_rojo.png');
    this.load.image('electricidad_verde', 'electricidad_verde.png');

    //Imagen para el menú
    this.load.image('fondo_menu', 'fondo_menu.png');

    //Carga de audios
    this.load.setPath('assets/audio/');
    
    //Carga de música de menú y de juego
    this.load.audio('gameMusic','music_no_piano.mp3');
    this.load.audio('menuMusic','crowfender_menu_music.mp3');
    
    //Sonidos botones, victoria y derrota
    this.load.audio('button','game_button.wav');
    this.load.audio('lose','game_lose.wav');
    this.load.audio('win','game_win.wav');

    //Sonidos ambiente
    this.load.audio('clockSound1','clock1.wav');
    this.load.audio('clockSound2','clock2.wav');
    this.load.audio('clockSound3','clock3.wav');
    this.load.audio('clockSound4','clock4.wav');
    this.load.audio('clockSound5','clock5.wav');
    this.load.audio('clockSound6','clock6.wav');
    this.load.audio('tension1','tension_1.wav');
    //this.load.audio('tension2','tension_2.wav');
    this.load.audio('tension2','tension_3.wav');
    this.load.audio('tension3','tension_4.wav');

    //Sonidos player
    this.load.audio('playerAttack','player_attack.wav');
    this.load.audio('playerChangeRoom','player_change_room.wav');

    //Sonidos de los pájaros
    this.load.audio('bird1Center','bird_center_1.wav');
    this.load.audio('bird2Center','bird_center_2.wav');
    this.load.audio('bird3Center','bird_center_3.wav');
    this.load.audio('bird1Fly','bird_wings_1.wav');
    this.load.audio('bird2Fly','bird_wings_2.wav');
    this.load.audio('bird3Fly','bird_wings_3.wav');
    this.load.audio('birdDeath','bird_death.wav');
    this.load.audio('birdHit','bird_hit.wav');

    //Sonidos de la puerta, chimenea y ventana
    this.load.audio('fireplaceBlocked','fire_block.wav');
    this.load.audio('fireplaceUnblocked','fire_unblock.wav');
    this.load.audio('otherBlockableBlocked','wood_block.wav');
    this.load.audio('otherBlockableUnblocked','wood_unblock.wav');

    //Sonidos del sotano
    this.load.audio('woodTake','wood_take.wav');
    this.load.audio('ladderSound','player_ladder.wav');

    //Sonidos de la electricidad
    this.load.audio('electricitySwitch','electricity_switch.wav');
    this.load.audio('electricityZap','electricity_zap.wav');
    this.load.audio('electricityReady','electricity_ready.wav');
    this.load.audio('electricitySwitchNotCharged','electricity_switch_not_charged.wav');
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('menu');
  }
}