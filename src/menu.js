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

    init()
	{
		this.cursors = this.input.keyboard.createCursorKeys()
	}

    create()
    {

		var camera = this.cameras.main;

        camera.x = 0;
        camera.y = 0;

        this.clickButton = new Button(this, 470, 250, 'JUGAR', { fill: '#0f0' });
        this.add.existing(this.clickButton);
        this.clickButton.on('pointerup', () => {
            this.scene.start('level');
        });

        this.clickButton = new Button(this, 460, 300, 'OPCIONES', { fill: '#0f0' });
        this.add.existing(this.clickButton);

     }

     update() {
     }
}