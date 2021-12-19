import Boot from './boot.js';
import End from './end.js';
import Level from './level.js';
import MenuScene from './menu.js';
import Victory from './victory.js';
import PreScene from './prescene.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    width:  1000,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [PreScene, Boot, MenuScene, Level, End, Victory],
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 0 }, 
            debug: false
        } 
    }
};

new Phaser.Game(config);