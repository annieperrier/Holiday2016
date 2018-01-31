import Knot from '../prefabs/knot';

class Game extends Phaser.State {

	constructor() {
		super();
	}
	
	create() {
		//  We're going to be using physics, so enable the Arcade Physics system
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.world.setBounds(0, 0, 384, 1024);

		//add background image
		this.background = this.game.add.tileSprite(0,0,this.game.world.width, this.game.world.height, 'background');


		this.platforms = this.game.add.group();
		//  We will enable physics for any object that is created in this group
		this.platforms.enableBody = true;

		var a = null;
		for (var i = 3; i < 7; i++)
		{
			a = this.platforms.create(32*i, 32*3, 'ice-platform');
			a.body.immovable = true;
		}
		for (var i = 5; i < 9; i++)
		{
			a = this.platforms.create(32*i, 32*10, 'ice-platform');
			a.body.immovable = true;
		}

		//setup UI
		this.countdownText = this.add.text(this.game.world.centerX, 0, '', {
			font: '20px Verdana', fill: '#666666', align: 'center'
		});
		this.countdownText.anchor.set(0.5,0);

		//setup prefabs
		this.knot = new Knot(this.game, this.game.world.centerX, 16);
		this.game.add.existing(this.knot);

		this.cursors = this.game.input.keyboard.createCursorKeys();

		//setup a timer to end the game
		this.endGameTimer = this.game.time.create();
		this.endGameTimer.add(Phaser.Timer.SECOND * 15, this.endGame,this);
		this.endGameTimer.start();

	}

	update() {
		this.countdownText.setText( (this.endGameTimer.duration/1000).toFixed(1));

		//  Collide the player and the platforms
		var hitPlatforms = this.game.physics.arcade.collide(this.knot, this.platforms);

		//  Reset the players velocity (movement)
		this.knot.body.velocity.x = 0;

		if (this.cursors.left.isDown)
		{
			//  Move to the left
			this.knot.scale.x = -1;
			this.knot.body.velocity.x = -150;
			this.knot.animations.play('left');
		}
		else if (this.cursors.right.isDown)
		{
			//  Move to the right
			this.knot.scale.x = 1;
			this.knot.body.velocity.x = 150;
			this.knot.animations.play('right');
		}
		else
		{
			//  Stand still
			this.knot.animations.stop();
			this.knot.frame = 0;
		}
	}

	endGame() {
		this.game.state.start('gameover');
	}

}

export default Game;
