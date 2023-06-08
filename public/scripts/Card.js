
// 並び変える対象のカード
export default class Card extends Phaser.GameObjects.Container {
	constructor(scene, number, place) {
	  super(scene, 0, 0);
	  this.setPosition(0, 0);
	  this.index=-1
	  this.number=number;
	 
	  this.image=scene.add
      .image(
        0,
        0,
        number.toString()
      )
	  this.image.setDisplaySize(40, 70);
	  this.setSize(40,70);
	  this.add(this.image);

	  this.setInteractive();
	}
}