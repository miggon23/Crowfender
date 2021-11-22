/**
 * Spot del mapa donde el jugador interact�a
 * para poder acceder al s�tano
 */
export default class Basement extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del s�tano
     * @param {Phaser.Scene} scene Escena a la que pertenece el s�tano
     * @param {Player} player Jugador del juego
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     * @param {number} scaleX display en el eje x
     * @param {number} scaleY display en el eje y
     * @param {boolean} i Arriba / abajo
     */
    constructor(scene, player, x, y, scaleX, scaleY, i, camera) {
        super(scene, x, y, 'sotano', i);
        this.scene.add.existing(this);
        this.displayWidth = scaleX;
        this.displayHeight= scaleY;
        this.scene.physics.add.existing(this, true);
        this.k = this.scene.input.keyboard.addKey('K');
        this.visible = false;
        this.scene.physics.add.overlap(this, player, (o1, o2) => {
            if (Phaser.Input.Keyboard.JustDown(this.k)) {
                if (i){
                    camera.setDeadzone(925, 600);
                    camera.scrollY = +250;
                    camera.scrollX = +0;
                    player.y += 650;
                } 
                else if (!i){
                    camera.setDeadzone(925, 600);
                    camera.scrollY = +350;
                    camera.scrollX = +0;
                    player.y -= 650;
                } 
            }
        });
    }
}