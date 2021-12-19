/**
 * Spot del mapa donde el jugador interactúa
 * para poder acceder al sótano
 */
export default class Basement extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del las puertas especiales que llevan al sótano
     * @param {Phaser.Scene} scene Escena a la que pertenece el sótano
     * @param {Player} player Jugador del juego
     * @param {struct} basementInfo Información necesaria para definir la zona basement
     * @param {Basement} otherBasement Puerta a la que está conetada esta puerta
     */
    constructor(scene, player, camera, basementInfo, otherBasement) {
        super(scene, basementInfo.x, basementInfo.y, basementInfo.sprite, basementInfo.scrollCamera);
        this.scene.add.existing(this);
        //Escala la imagen
        this.displayWidth = basementInfo.scaleX;
        this.displayHeight= basementInfo.scaleY;

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
                this.cameraYScrollForGoingDown = 250;
                this.cameraYScrollForGoingUp = 255;
                player.tp(newPosition.x, newPosition.y + this.offsetToTeleportY);
                if (basementInfo.scrollCamera){
                    camera.setScroll(this.cameraXScroll,this.cameraYScrollForGoingDown);
                } 
                else{
                    camera.setScroll(this.cameraXScroll, this.cameraYScrollForGoingUp);                   
                } 
            }
        });
    }
}