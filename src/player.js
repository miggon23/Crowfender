

export default class Player extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el player
   * @param {struct} playerInfo
   */
  constructor(scene, playerInfo) {
    super(scene, playerInfo.x, playerInfo.y, playerInfo.sprite);

    this.setBroom();
    this.setInput();
    this.setAnimations();

    this.setDepth(playerInfo.depth);
    this.displayWidth = playerInfo.scaleX;
    this.displayHeight = playerInfo.scaleY;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    //Añadimos la escoba
    this.scene.add.existing(this.broom);
    this.scene.physics.add.existing(this.broom);
    
    this.setCollider();
    this.setSpeed();
    this.setVariable();
    this.playerAttack = scene.sound.add("playerAttack");
  }
  
  setVariable() {
    this.room = 0;
    this.wood = false;
    this.hittingState = false;
    this.hittingStateBirds = false;
    this.scrolling = false;
    this.playerMoving = false;
  }

  setSpeed() {
    this.horizontalSpeed = 300;
    this.verticalSpeed = 300;
    this.diagonalSpeed = 212.13;
  }

  setCollider() {
    this.posXCollider = 70;
    this.posYCollider = 225;
    this.sizeXCollider = 100;
    this.sizeYCollider = 150;
    this.body.setOffset(this.posXCollider, this.posYCollider);
    this.body.setSize(this.sizeXCollider, this.sizeYCollider, false);
  }

  setAnimations() {
    this.scene.anims.create({
      key: 'player_idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
      frameRate: 4,
      repeat: -1 // Animación en bucle
    });
    this.scene.anims.create({
      key: 'player_idle_wood',
      frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
      frameRate: 4,
      repeat: -1 // Animación en bucle
    });
    this.scene.anims.create({
      key: 'player_hit',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 6 }),
      frameRate: 3,
      repeat: 0 // Animación en bucle
    });
    this.scene.anims.create({
      key: 'player_hit2',
      frames: this.anims.generateFrameNumbers('player', { start: 7, end: 7 }),
      frameRate: 3,
      repeat: 0 // Animación en bucle
    });
    this.scene.anims.create({
      key: 'player_hit_wood',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 8 }),
      frameRate: 3,
      repeat: 0 // Animación en bucle
    });
    this.scene.anims.create({
      key: 'player_hit_wood2',
      frames: this.anims.generateFrameNumbers('player', { start: 9, end: 9 }),
      frameRate: 3,
      repeat: 0 // Animación en bucle
    });
    this.scene.anims.create({
      key: 'player_walk',
      frames: this.anims.generateFrameNumbers('player', { start: 13, end: 17 }),
      frameRate: 8,
      repeat: -1 // Animación en bucle
    });
    this.scene.anims.create({
      key: 'player_walk_wood',
      frames: this.anims.generateFrameNumbers('player', { start: 19, end: 24 }),
      frameRate: 8,
      repeat: -1 // Animación en bucle
    });
    this.play('player_idle');
  }

  setInput() {
    this.w = this.scene.input.keyboard.addKey('W');
    this.a = this.scene.input.keyboard.addKey('A');
    this.s = this.scene.input.keyboard.addKey('S');
    this.d = this.scene.input.keyboard.addKey('D');
    this.j = this.scene.input.keyboard.addKey('J');
  }

  setBroom() {
    this.broom = this.scene.add.sprite(this.x, this.y, 'empty');
    this.broom.visible = false;
    this.broomDisplacementX = 80;
    this.broomDisplacementY = 157;
    this.broom.displayHeight = 50;
    this.broom.displayWidth = 100;
  }

  //Devuelve broom para comprobar las colisiones desde el player
  returnBroom(){
    return this.broom;
  }
  
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

  changeBroomPosition(x, y){
    this.broom.x = x;
    this.broom.y = y;
  }
  pickWood(){
    this.wood = true;
    this.play('player_idle_wood');
  }

  getWood(){
    if(this.wood){
      this.wood = false;
      return true;
    }
    else return false;
  }

  switchPlayerHit(){
    this.hittingState = !this.hittingState;
  }

  // Teletransporta al jugador a las coordenadas indicadas;
  tp(x, y){
    this.x = x;
    this.y = y;
  }

  switchPlayerHitAndReStart(){
    this.hittingState = false;
    this.hittingStateBirds = false;
    this.playerMoving = false;
    if(this.wood){
      this.play('player_idle_wood');
    }
    else{
      this.play('player_idle');
    }
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
    

   hittingMoment(){
     if(this.wood){
      this.play('player_hit_wood2', false);
     }
     else{
      this.play('player_hit2', false);
     }
    this.hittingStateBirds = true;
   } 

  /**
   * Métodos preUpdate de Phaser. En este caso se encarga del movimiento del pajaro y de su eliminación por electricidad.
   * @override
   */
    preUpdate(t,dt) {
    super.preUpdate(t,dt);
    if(!this.flipX){
      this.changeBroomPosition(this.x - this.broomDisplacementX, this.y + this.broomDisplacementY);
    }
    else{
      this.changeBroomPosition(this.x + this.broomDisplacementX, this.y + this.broomDisplacementY);
    }
   
    this.on('animationcomplete-player_hit', this.hittingMoment);
    this.on('animationcomplete-player_hit2', this.switchPlayerHitAndReStart);
    this.on('animationcomplete-player_hit_wood', this.hittingMoment);
    this.on('animationcomplete-player_hit_wood2', this.switchPlayerHitAndReStart);
    //Al golpear el jugador, se cambia de estado a que está golpeando y se realiza la animación;
    if (this.j.isDown) {
      if(!this.hittingState){
        this.switchPlayerHit();
        this.stop();
        this.playerAttack.play();
        if(this.wood){
          this.play('player_hit_wood', false);
        }
        else{
          this.play('player_hit', false);
        }        
      }
    }
    //Solo permitimos que se mueva el jugador si no esta pegando
    if(!this.hittingState){
      //Movimiento vertical del jugador con animaciones
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
      //Movimiento horizontal del jugador con animaciones
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
      //Ajuste de velocidades para normalizar la velocidad en diagonal
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
    //Animación cuando el player está quieto
      if(this.playerMoving && this.body.velocity.x === 0 && this.body.velocity.y === 0){
        this.playerMoving = false;
        if(this.wood){
          this.play('player_idle_wood');
        }
        else{
          this.play('player_idle');
        }   
      }
    }
     //Si está pegando se pone la velocidad a cero para impedir su movimiento
    else{
      this.body.setVelocityY(0);
      this.body.setVelocityX(0);
    }
  }  
}
