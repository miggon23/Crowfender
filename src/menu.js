
import Button from "./button.js";

/**
 * Escena principal del juego.
 * @extends Phaser.Scene
 */
 export default class MenuScene extends Phaser.Scene {
    /**
     * Constructor de la escena
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     */

     constructor() {
         super({ key: 'menu' });
     }

    create()
    {

        this.f = this.input.keyboard.addKey('F');

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

        this.buttonSound = this.sound.add("button");
        this.menuMusic = this.sound.add("menuMusic");
        this.menuMusic.play();
        this.menuImage = this.add.image(0, 0, 'fondo_menu');
        this.menuImage.setOrigin(0, 0)
		var camera = this.cameras.main;

        camera.x = 0;
        camera.y = 0;

        // this.optionsButton = new Button(this, 460, 300, 'OPCIONES', { fill: '#fff' });
        // this.add.existing(this.optionsButton);

        this.playButton = new Button(this, 470, 470, 40, 60,  'Play', { fill: '#fff' });
        this.add.existing(this.playButton);
        this.playButton.on('pointerup', () => {
            this.buttonSound.play();
            this.easyButton = new Button(this, 400, 510, 40, 60,  'Easy', { fill: '#fff' });
            this.add.existing(this.easyButton);
            this.easyButton.on('pointerup', () => {
                this.buttonSound.play()
                this.menuMusic.stop();
                this.scene.start('level', { multiplier: 1, timeToWin: 2 });
            });
            this.normalButton = new Button(this, 475, 510, 40, 60,  'Medium', { fill: '#fff' });
            this.add.existing(this.normalButton);
            this.normalButton.on('pointerup', () => {
                this.buttonSound.play();
                this.menuMusic.stop();
                this.scene.start('level', { multiplier: 2, timeToWin: 3 });
            });
            this.difficultButton = new Button(this, 550, 510, 40, 60,  'Hard', { fill: '#fff' });
            this.add.existing(this.difficultButton);
            this.difficultButton.on('pointerup', () => {
                this.buttonSound.play();
                this.menuMusic.stop();
                this.scene.start('level', { multiplier: 3, timeToWin: 5 });
            });

            // this.scene.start('level');
        });
     }
}