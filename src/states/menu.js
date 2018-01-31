class Menu extends Phaser.State {

	constructor() {
		super();
	}
	
	create() {
		this.game.world.setBounds(0, 0, 384, 512);
		//add background image
		this.background = this.game.add.tileSprite(0,0,this.game.world.width, this.game.world.height, 'background');

		this.points = {
		'x': [ 110, 160, 110 ],
		'y': [ 405, 200, 15 ]
		};

		this.bmd = this.add.bitmapData(this.game.width, this.game.height);
		this.bmd.addToWorld();

		// sweater
		this.sweater = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY-50,'sweater');
		this.sweater.anchor.set(0.5,0.5);

		//add some fancy transition effects
		this.ready = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'text_ready');
		this.ready.anchor.set(0.5,0.5);
		this.ready.visible=false;

		this.go = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'text_go');
		this.go.anchor.set(0.5,0.5);
		this.go.visible=false;

		//add intro text
		this.menuText = this.add.text(this.game.world.centerX, this.game.world.centerY+200, 'Start', {
			font: '42px Verdana', fill: '#6666', align: 'center'
		});
		this.menuText.anchor.set(0.5);

		this.input.onDown.add(this.onInputDown, this);
		this.canContinueToNextState = true;
	}

	plot() { 
		this.bmd.clear();

		var x = 1 / this.game.width;

		for (var i = 0; i <= 1; i += x)
		{
			var px = this.math.catmullRomInterpolation(this.points.x, i);
			var py = this.math.catmullRomInterpolation(this.points.y, i);

			this.bmd.rect(px-1, py-1, 3, 3, 'rgba(200, 0, 0, 1)');
		}
	}

	update() {}

	startCountdown() {
		this.ready.visible = true;
		this.go.angle = -15;

		//create some tweens - http://phaser.io/docs/2.6.2/Phaser.Tween.html#to
		const ready_tween = this.game.add.tween(this.ready.scale)
			.to({ x: 1.5, y: 1.5}, 500, Phaser.Easing.Linear.In,false,0,-1,true);

		const go_tween = this.game.add.tween(this.go)
			.to({ angle: 15}, 200, Phaser.Easing.Linear.In,false,0,-1,true);

		//when the 'ready' tween is done, hide it and show 'go'. 
		//perform a shaking/rotating tween on 'go'. When 'go' is done, start the game
		//how many times these tweens should loop
		var go_tween_repeat_num = 3;
		var ready_tween_repeat_num = 3;
		const go_tween_loop = function(){
			go_tween_repeat_num -= 0.5;
			if(go_tween_repeat_num < 1){
				this.go.visible = false;
				this.game.state.start('game');
			}
		};
		const ready_tween_loop = function(){
			ready_tween_repeat_num -= 0.5;
			if(ready_tween_repeat_num < 1){
				this.ready.visible = false;
				this.go.visible = true;

				go_tween.start();
			}
		};
		ready_tween.onLoop.add(ready_tween_loop, this);
		go_tween.onLoop.add(go_tween_loop, this);

		ready_tween.start();
	}

	//create some cool tweens and apply them to 'this.ready' and 'this.go'
	onInputDown () {
		//do not allow tweens to be created multiple times simultaneously
		if (!this.canContinueToNextState)
		{
			return;
		}

		this.canContinueToNextState = false;
		this.menuText.visible = false;

		this.plot();

		const sweater_height_tween = this.game.add.tween(this.sweater)
			.to({ y: -135}, 1500, Phaser.Easing.Linear.Out,true,100,0,false);
		const sweater_angle_tween = this.game.add.tween(this.sweater)
			.to({ angle: 3}, 400, Phaser.Easing.Linear.Out,true,0,3,true);

		this.startCountdown();
	}


}

export default Menu;
