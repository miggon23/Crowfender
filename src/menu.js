import Level from "./level.js";
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
        this.buttonSound = this.sound.add("button");
        this.menuMusic = this.sound.add("menuMusic");
        this.menuMusic.play();
		var camera = this.cameras.main;

        camera.x = 0;
        camera.y = 0;

        this.optionsButton = new Button(this, 460, 300, 'OPCIONES', { fill: '#0f0' });
        this.add.existing(this.optionsButton);

        this.playButton = new Button(this, 470, 250, 'JUGAR', { fill: '#0f0' });
        this.add.existing(this.playButton);
        this.playButton.on('pointerup', () => {
            this.buttonSound.play();
            this.easyButton = new Button(this, 410, 270, 'Facil', { fill: '#0f0' });
            this.add.existing(this.easyButton);
            this.easyButton.on('pointerup', () => {
                this.buttonSound.play();
                this.menuMusic.stop();
                this.scene.start('level', { multiplier: 1 });
            });
            this.normalButton = new Button(this, 470, 270, 'Normal', { fill: '#0f0' });
            this.add.existing(this.normalButton);
            this.normalButton.on('pointerup', () => {
                this.buttonSound.play();
                this.menuMusic.stop();
                this.scene.start('level', { multiplier: 2 });
            });
            this.difficultButton = new Button(this, 540, 270, 'Dificil', { fill: '#0f0' });
            this.add.existing(this.difficultButton);
            this.difficultButton.on('pointerup', () => {
                this.buttonSound.play();
                this.menuMusic.stop();
                this.scene.start('level', { multiplier: 3 });
            });

            // this.scene.start('level');
        });
     }
}