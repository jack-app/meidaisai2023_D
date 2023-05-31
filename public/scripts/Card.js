
// 並び変える対象のカード
export default class Card extends Phaser.GameObjects.Container {
	constructor(scene, number=1230, place) {
	  super(scene, 0, 0);
	  this.setPosition(0, 0);
	  this.number=number;
	  this.image=scene.add
      .image(
        0,
        0,
        number.toString()
      )
	  this.image.setDisplaySize(40, 70);
	  this.add(this.image);
	}
}