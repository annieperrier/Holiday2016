class Boot extends Phaser.State {

	constructor() {
		super();
	}

	preload() {
		this.load.image('preloader', 'assets/preloader.gif');
	}

	create() {
		this.game.input.maxPointers = 1;
		this.game.scale.pageAlignHorizontally = true;
		//setup device scaling
		// not working
		if (!this.game.device.desktop) {
			this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.game.scale.minWidth =  this.game.width/2;
			this.game.scale.minHeight = this.game.height/2;
			this.game.scale.maxWidth = this.game.width;
			this.game.scale.maxHeight = this.game.height;
			this.game.scale.forceOrientation(true);
		}

		this.initGlobalVariables();

		this.game.state.start('preloader');
	}

	initGlobalVariables(){
		this.game.global = {
			score: 0
		};
	}

}

export default Boot;
