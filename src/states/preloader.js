class Preloader extends Phaser.State {

	constructor() {
		super();
		this.asset = null;
		this.ready = false;
	}

	preload() {
		//setup loading bar
		this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
		this.load.setPreloadSprite(this.asset);

		//Setup loading and its events
		this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
		this.loadResources();
	}

	loadResources() {
		this.game.load.spritesheet('background','assets/background.png', 32, 32);

		this.game.load.image('sweater', 'assets/sweater-title.png');

		this.game.load.spritesheet('knot', 'assets/knot.png', 16, 32);

		this.game.load.spritesheet('ice-platform','assets/ice-platform.png', 32, 32);



		// demo stuff we are still using
		this.game.load.image('text_go', 'assets/text_go.png');
		this.game.load.image('text_ready', 'assets/text_ready.png');
	}

	onLoadComplete() {
		this.game.state.start('menu');
	}
}

export default Preloader;
