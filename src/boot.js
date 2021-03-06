import Data from './data.js';

/**
 * Escena para la precarga de los assets que se usarán en el juego.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor del boot
   */
  constructor() {
    super({ key: 'boot' });
  }
  /**
   * Carga de los assets del juego
   */
  preload() {
    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    this.createProgressBar(width, height);
    // Cargamos las imagenes
    this.load.setPath('assets/sprites/');

    //Cargamos los fondos
    this.load.image(Data.rooms.main.sprite, 'fondo_central.png');
    this.load.image(Data.rooms.west.sprite, 'fondo_chimenea.png');
    this.load.image(Data.rooms.east.sprite, 'fondo_ventana.png');
    this.load.image(Data.rooms.upper.sprite, 'fondo_puerta.png');
    this.load.image(Data.rooms.basement.sprite, 'fondo_sotano.png');
    this.load.image(Data.spawnZone.west.sprite, 'spawn_chimenea.png');
    this.load.image(Data.spawnZone.upper.sprite, 'spawn_puerta.png');
    this.load.image(Data.spawnZone.east.sprite, 'spawn_ventana.png');

   // Cargamos las imágenes del sótano
    this.load.image(Data.basementZones.middle.sprite, 'sotano_trampilla.png');
    this.load.image('sotano_trampilla_k', 'sotano_trampilla_k.png');
    this.load.image(Data.basementZones.down.sprite, 'sotano_escalera.png');
    this.load.image('sotano_escalera_k', 'sotano_escalera_k.png');

    // Cargamos las imágenes de las puertas
    this.load.image('puerta_central', 'central_puerta.png');
    this.load.image('puerta_puerta', 'puerta_puerta.png');

    //Cargamos los bloqueables
    this.load.image(Data.blockable.fireplace.sprite, 'chimenea.png');
    this.load.image(Data.blockable.fireplace.blockedSprite, 'chimenea_tabla.png');
    this.load.image('chimenea_k', 'chimenea_k.png');
    this.load.image(Data.blockable.door.sprite, 'puerta_block.png');
    this.load.image(Data.blockable.door.blockedSprite, 'puerta_block_tabla.png');
    this.load.image('puerta_block_k', 'puerta_block_k.png');
    this.load.image(Data.blockable.window.sprite, 'ventana_block.png');
    this.load.image(Data.blockable.window.blockedSprite, 'ventana_block_tabla.png');
    this.load.image('ventana_block_k', 'ventana_block_k.png');
  
    //Cargamos los pájaros
    this.load.spritesheet('bird1', 'bird1_sprite_sheet.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('bird2', 'bird2_sprite_sheet.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('bird3', 'bird3_sprite_sheet.png', { frameWidth: 64, frameHeight: 64 })
    //Cargamos al player
    this.load.spritesheet('player', 'player_sprite_sheet.png', { frameWidth: 256, frameHeight: 384 })
    
    
    this.load.image('empty', 'empty.png');


    //Cargamos el cofre
    this.load.image('chest', 'cofre.png');
    this.load.image('chest_k', 'cofre_k.png');

    //Se cargan imágenes relacionadas con la electricidad
    this.load.image('electricidad_rojo', 'electricidad_rojo.png');
    this.load.image('electricidad_verde', 'electricidad_verde.png');
    this.load.image('electricidad_verde_k', 'electricidad_verde_k.png');

    //Imégenes para el menú
    this.load.image('fondo_menu', 'fondo_menu.png');
    this.load.image('menu_ganar', 'menu_ganar.png');
    this.load.image('menu_perder', 'menu_perder.png');
    this.load.image('controls_image', 'controls_image.png');
    this.load.image('another_controls_image', 'controls_crowfender.png');
    this.load.image('return_image', 'return_image.png');
    this.load.image('birds_wiki', 'birds_wiki.png');

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
   * menú del juego
   */
  create() {
    this.scene.start('menu');
  }

   /**
    * Método seguido según el tutorial de la api de phaser 3
    * Método que crea la barra de carga y que va actualizando según vayan cargando los archivos
   * @param {integer} width Anchura de la pantalla
   * @param {integer} height Altura de la pantalla
   */
  createProgressBar(width, height) {
    //Barra que sirve de fondo a "loadRect"
    let progressBar = this.add.graphics();
    //Barra que va avanzando según el progreso
    let loadRect = this.add.graphics();
    loadRect.fillStyle(0x0B0B4A, 0.8);
    loadRect.fillRect(width / 2 - 160, height / 2, 320, 50);

    //Texto del loading sitaudo encima del rectángulo de carga
    let loadingText = this.addInterfaceText(width / 2, height / 2 - 30, 'Loading...', 24, '#ffffff');

    //Número de porcentaje de carga situado dentro del rectángulo de carga
    let percentText = this.addInterfaceText(width / 2, height / 2 + 25, '0%', 18, '#ffffff');

    //Información sobre los assets que están siendo cargados situado debajo del rectángulo de carga
    let assetText = this.addInterfaceText(width / 2,height / 2 + 80,'',18,'#ffffff');

    //Nos suscribimos a eventos sobre la carga de archivos
    this.load.on('progress', function (value) {
      progressBar.clear();
      progressBar.fillStyle(0x1A1AA4, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 + 10, 300 * value, 30);
      percentText.setText(parseInt(value * 100) + '%');
    });

    //Escribe el archivo que se esté cargando
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    //Al completar todo destruye todo para dar paso al menú
    this.load.on('complete', function () {
      progressBar.destroy();
      loadRect.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }
  
  /**
   * Crea un texto (s) con un tamaño (size), una posición (x)(y), un color (color) y una alineación
   * @param {number} x Coordenada X
   * @param {number} y Coordenada y
   * @param {string} s Texto a escribir
   * @param {number} size Tamaño del texto
   * @param {color} color Color del texto
   */
  addInterfaceText(x, y, s, size, color) {
    let text = this.add.text(x, y, s, {
      setFont: 'Georgia',
      fontSize: size,
      color: color,
      align: 'center'
    });
    text.setOrigin(.5);

    return text;
  }

}