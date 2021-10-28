/**
 * Clase para instanciar la escoba y hacerla desaparecer al golpear
 * @extends Phaser.GameObjects.Sprite
 */
 export default class Broom extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de Broom
     * @param {Sceme} scene Escena en la que aparece la escoba
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y) {
      super(scene, x-30, y+50, 'broom');
      this.scene.physics.add.existing(this);
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t, dt) {
      super.preUpdate(t,dt);
    }
  }
  