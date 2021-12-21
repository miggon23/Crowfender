
import Button from "./button.js";

/**
 * Menú principal del juego.
 * @extends Phaser.Scene
 */
 export default class MenuScene extends Phaser.Scene {
    /**
     * Constructor del menú
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     */

     constructor() {
         super({ key: 'menu' });
     
        }
        
   /**
    * Creación del menú 
    */
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

        this.optionsButton = new Button(this, 440, 350, 40, 120, 'CONTROLS', { fill: '#fff' });
        this.add.existing(this.optionsButton);
        this.optionsButton.on('pointerup', () => {
            this.buttonSound.play();
            this.controlsImage = this.add.image(440, 300, 'controls_image').setInteractive();
            this.add.existing(this.controlsImage);

            this.wikiBirds = this.add.image(this.controlsImage.getRightCenter().x + 100, this.controlsImage.getRightCenter().y, 'birds_wiki');
            this.add.existing(this.wikiBirds);

            this.returnImage = this.add.image(this.controlsImage.getBottomLeft().x + 100, this.controlsImage.getBottomLeft().y - 50, 'return_image').setInteractive();
            this.add.existing(this.returnImage);

            this.returnImage.on('pointerup', function (event) { 
                this.controlsImage.destroy();
                this.wikiBirds.destroy();
                this.returnImage.destroy();
            }, this);
        })

        this.playButton = new Button(this, 470, 300, 40, 60,  'Play', { fill: '#fff' });
        this.add.existing(this.playButton);
        this.playButton.on('pointerup', () => {
            this.buttonSound.play();
            this.easyButton = new Button(this, 400, 510, 40, 60,  'Easy', { fill: '#fff' });
            this.add.existing(this.easyButton);
            this.easyButton.on('pointerup', () => {
                this.buttonSound.play()
                this.menuMusic.stop();
                this.scene.start('level', { multiplier: "easy", timeToWin: 2 });
            });
            this.normalButton = new Button(this, 475, 510, 40, 60,  'Medium', { fill: '#fff' });
            this.add.existing(this.normalButton);
            this.normalButton.on('pointerup', () => {
                this.buttonSound.play();
                this.menuMusic.stop();
                this.scene.start('level', { multiplier: "medium", timeToWin: 3 });
            });
            this.difficultButton = new Button(this, 550, 510, 40, 60,  'Hard', { fill: '#fff' });
            this.add.existing(this.difficultButton);
            this.difficultButton.on('pointerup', () => {
                this.buttonSound.play();
                this.menuMusic.stop();
                this.scene.start('level', { multiplier: "hard", timeToWin: 5 });
            });

            // this.scene.start('level');
        });
     }
}