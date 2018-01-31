
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Knot extends Phaser.Sprite {

	//initialization code in the constructor
	constructor(game, x, y, frame) {
		super(game, x, y, 'knot', frame);

		//set size
		this.width = 16;
		this.height = 32;

		// need y middle so we can mirror for running left
		this.anchor.setTo(0.5, 0);

		this.game.physics.arcade.enable(this);

		this.body.bounce.y = 0.2;
		this.body.gravity.y = 200;
		this.body.collideWorldBounds = true;

		//  Our two animations, walking left and right.
		this.animations.add('left', [0, 1, 2, 3], 10, true);
		this.animations.add('right', [0, 1, 2, 3], 10, true);

		this.game.camera.follow(this);
	}

	//Code ran on each frame of game
	update() {

	}

}

export default Knot;
