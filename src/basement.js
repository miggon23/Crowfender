/**
 * Spot del mapa donde el jugador interact�a
 * para poder acceder al s�tano
 */
export default class Basement extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del las puertas especiales que llevan al sótano
     * @param {Phaser.Scene} scene Escena a la que pertenece el sótano
     * @param {Player} player Jugador del juego
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     * @param {number} scaleX display en el eje x
     * @param {number} scaleY display en el eje y
     * @param {boolean} i Arriba / abajo
     * @param {string} sprite Sprite de la puerta del sótano
     * @param {Basement} otherBasement Puerta a la que está conetada esta puerta
     */
    constructor(scene, player, x, y, scaleX, scaleY, i, camera, sprite, otherBasement) {
        super(scene, x, y, sprite, i);
        this.scene.add.existing(this);
        //Escala la imagen
        this.displayWidth = scaleX;
        this.displayHeight= scaleY;

        //Se añaden físicas que no sea visible y guardamos la k para que sea interactuable
        this.scene.physics.add.existing(this, true);
        this.k = this.scene.input.keyboard.addKey('K');

        // Unimos el segundo Basement al primero, el primero cuando llegue a este punto no recibirá Basement,
        // Por lo que será undefined
        this.otherBasement = otherBasement;
        if(this.otherBasement !== undefined){
            this.otherBasement.otherBasement = this;
        }

        this.offsetToTeleportY = -150;
        
        this.ladderSound = this.scene.sound.add("ladderSound");
        //Al pulsar la k pasa de arriba abajo o viceversa, encaja la cámara y hace un ruido
        this.scene.physics.add.overlap(this, player, (o1, o2) => {
            if (Phaser.Input.Keyboard.JustDown(this.k)) {
                this.ladderSound.play();
                let newPosition = this.otherBasement.getBottomCenter();
                this.cameraXScroll = 0;
                this.cameraYScrollForGoingDown = 260;
                this.cameraYScrollForGoingUp = 270;
                player.tp(newPosition.x, newPosition.y + this.offsetToTeleportY);
                if (i){
                    camera.setScroll(this.cameraXScroll,this.cameraYScrollForGoingDown);
                } 
                else{
                    camera.setScroll(this.cameraXScroll, this.cameraYScrollForGoingUp);                   
                } 
            }
        });
    }
}