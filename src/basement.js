/**
 * Spot del mapa donde el jugador interactúa
 * para poder acceder al sótano
 */
export default class Basement extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del sótano
     * @param {Phaser.Scene} scene Escena a la que pertenece el sótano
     * @param {Player} player Jugador del juego
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     * @param {boolean} i Arriba / abajo
     */
    constructor(scene, player, x, y, i) {
        super(scene, x, y, 'sotano', i);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.k = this.scene.input.keyboard.addKey('K');
        this.scene.physics.add.overlap(this, player, (o1, o2) => {
            if (Phaser.Input.Keyboard.JustDown(this.k)) {
                if (i) player.y += 650;
                else if (!i) player.y -= 650;
            }
        });
    }
}