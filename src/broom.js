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
    constructor(scene) {
      super(scene, -30, 50, 'broom');
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.visible= false; 
      this.body.enable = false;
      this.j = this.scene.input.keyboard.addKey('J');
    }

    //El jugador se movió a la izquierda, por lo tanto la escoba está a su izquierda
    facingLeft(){
        this.x=-30;      
        this.setFlip(false, false);
    }

    //El jugador se movió a la derecha, por lo tanto la escoba está a su derecha
    facingRight(){
        this.x=90;
        this.setFlip(true, false);
    }

    golpear(){
        this.visible= !this.visible;
        this.body.enable= !this.body.enable;
    }

    esconderEscoba(){
        this.visible= false;
        this.body.enable= false;
    }


    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t, dt) {
      super.preUpdate(t,dt);
      if(this.parentContainer.sentido){
          this.facingRight();
      }
      else{
          this.facingLeft();
      }

      if (Phaser.Input.Keyboard.JustDown(this.j)){
          this.golpear();
      }
    }
  }
  