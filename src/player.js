import Level from "./level.js";

export default class Player extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el pájaro
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   * @param {group} sprite Sprite del player
   */
  constructor(scene, x, y,  sprite) {
    super(scene, x, y, sprite);
    this.displayWidth = 170;
    this.displayHeight= 256;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.horizontalSpeed = 300;
    this.verticalSpeed = 300;
    this.diagonalSpeed = 212.13;
    this.w = this.scene.input.keyboard.addKey('W');
    this.a = this.scene.input.keyboard.addKey('A');
    this.s = this.scene.input.keyboard.addKey('S');
    this.d = this.scene.input.keyboard.addKey('D');
    this.j = this.scene.input.keyboard.addKey('J');
    this.wood = false;
    this.hittingState = false;
    this.scrolling = false;
    this.playerMoving = false;
    this.scene.anims.create({
      key: 'player_idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
      frameRate: 10, // Velocidad de la animación
      repeat: -1   // Animación en bucle
    });
    this.scene.anims.create({
      key: 'player_idle_wood',
      frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
      frameRate: 10, // Velocidad de la animación
      repeat: -1   // Animación en bucle
    });
    this.scene.anims.create({
      key: 'player_hit',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 7 }),
      frameRate: 100, // Velocidad de la animación
      repeat: -1   // Animación en bucle
    });
     this.scene.anims.create({
      key: 'player_hit_wood',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 9 }),
      frameRate: 10, // Velocidad de la animación
      repeat: -1   // Animación en bucle
    });
    this.scene.anims.create({
        key: 'player_walk',
        frames: this.anims.generateFrameNumbers('player', { start: 13, end: 18 }),
        frameRate: 10, // Velocidad de la animación
        yoyo: true,
        repeat: -1   // Animación en bucle
      });
      this.scene.anims.create({
        key: 'player_walk_wood',
        frames: this.anims.generateFrameNumbers('player', { start: 19, end: 24 }),
        frameRate: 10, // Velocidad de la animación
        yoyo: true,
        repeat: -1   // Animación en bucle
      });
    this.on('animationcomplete', this.switchPlayerHit);
    this.play('player_idle');
    }
    
      /**
     * El jugador ha pulsado k en la zona de teletransporte hacia el sótano,
     * por lo que se le desplazará en y abajo.
     * */

  /**
   * Al interactuar con el cofre, el jugador recoge madera, mientras que al interactuar
   * con la chimenea, la ventana o la puerta, el jugador gasta la madera. En ambos casos
   * se actualiza en pantalla si lleva madera encima o no
   */
  whatRoomIs(){
    return this.room;
  }

  changeRoomNumber(roomNumber){
    this.room = roomNumber;
  }

  changePlayerPosition(x, y){
    this.x = x;
    this.y = y;
  }

  pickWood(){
    this.wood = true;
  }

  getWood(){
    if(this.wood){
      this.wood = false;
      return true;
    }
    else return false;
  }

  switchPlayerHit(){
    console.log(this.hittingState);
    this.hittingState = !this.hittingState;
  }

  isScrolling(){
    return this.scrolling;
  }

  switchPlayerScrollToTrue(){
    this.scrolling = true;
  }

  switchPlayerScrollToFalse(){
    this.scrolling = false;
  }
    

    

  /**
   * Métodos preUpdate de Phaser. En este caso se encarga del movimiento del pajaro y de su eliminación por electricidad.
   * @override
   */
    preUpdate(t,dt) {
    super.preUpdate(t,dt);
    console.log(this.hittingState);
      if (this.j.isDown) {
        if(!this.hittingState){
          this.switchPlayerHit();
          if(this.wood){
            this.play('player_hit_wood');
          }
          else{
            this.play('player_hit');
          }
          this.switchPlayerHit();
        }
      }
      if (this.w.isDown) {
        if(!this.playerMoving){
          if(this.wood){
            this.play('player_walk_wood');
          }
          else{
            this.play('player_walk');
          }
        }
        this.playerMoving = true;
        this.body.setVelocityY(-this.verticalSpeed);
      }
      else if(this.s.isDown){
        if(!this.playerMoving){
          if(this.wood){
            this.play('player_walk_wood');
          }
          else{
            this.play('player_walk');
          }
        }
        this.playerMoving = true;
        this.body.setVelocityY(this.verticalSpeed);
      }
      else {
        this.body.setVelocityY(0);
      }
      if (this.d.isDown) {
        if(!this.playerMoving){
          if(this.wood){
            this.play('player_walk_wood');
          }
          else{
            this.play('player_walk');
          }
        }
        this.playerMoving = true;
        this.body.setVelocityX(this.horizontalSpeed);
          this.sentido = true;
          this.flipX = true;
        }
      else if (this.a.isDown) {
        if(!this.playerMoving){
          if(this.wood){
            this.play('player_walk_wood');
          }
          else{
            this.play('player_walk');
          }
        }
        this.playerMoving = true;
        this.body.setVelocityX(-this.horizontalSpeed);
          this.sentido = false;
          this.flipX = false;
      }
      else{
        this.body.setVelocityX(0);
      }
  
      if(this.body.velocity.x != 0 && this.body.velocity.y != 0){
        if(this.body.velocity.x < 0){
          this.body.setVelocityX(-this.diagonalSpeed);
        }
        else{
          this.body.setVelocityX(this.diagonalSpeed);
        }
        if(this.body.velocity.y < 0){
          this.body.setVelocityY(-this.diagonalSpeed);
        }
        else{
          this.body.setVelocityY(this.diagonalSpeed);
        }     
      }   

      if(!this.hittingState && this.playerMoving && this.body.velocity.x === 0 && this.body.velocity.y === 0){
        this.playerMoving = false;
        if(this.wood){
          this.play('player_idle_wood');
        }
        else{
          this.play('player_idle');
        }   
      }

  
      if(this.hittingState){
        this.body.setVelocityY(0);
        this.body.setVelocityX(0);
      }
  }  
}
