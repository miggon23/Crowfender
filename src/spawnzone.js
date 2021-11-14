
/**
 * Clase que representa las zonas de spawn de cada sala
 */
export default class SpawnZone extends Phaser.GameObjects.Sprite {
  

  constructor(scene, x, y, scaleX, scaleY, spawnArray) {

    super(scene, x, y, 'player');
    this.x = x;
    this.y = y;
    this.halfWidth = scaleX / 2;
    this.halfHeight = scaleY / 2;
    this.displayWidth = scaleX;
    this.displayHeight= scaleY;
    this.scene.add.existing(this);
    spawnArray.push(this);
    this.visible = false;
  }
 
}
