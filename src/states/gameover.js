class Gameover extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    this.game.world.setBounds(0, 0, 384, 512);
    //add background image
    this.background = this.game.add.tileSprite(0,0,this.game.world.width, this.game.world.height, 'background');

    //add intro text
    this.gameoverText = this.add.text(this.game.world.centerX,this.game.world.centerY, "Score = "+this.game.global.score, {
      font: '42px Verdana', fill: '#666666', align: 'center'
    });
    this.gameoverText.anchor.set(0.5);

    this.input.onDown.add(this.onInputDown, this);

    //prevent accidental click-thru by not allowing state transition for a short time
    this.canContinueToNextState = false;
    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){ this.canContinueToNextState = true; }, this);

    this.saveVarsToLocalStorage();
    this.resetGlobalVariables();
  }

  saveVarsToLocalStorage(){
    var max = localStorage.maxScore || 0; //default value of 0 is it does not exist
    if (this.game.global.score > max){ localStorage.maxScore = this.game.global.score; }
  }

  resetGlobalVariables(){
    this.game.global.score = 0;
  }
  update() {}

  onInputDown () {
    if(this.canContinueToNextState){
      this.game.state.start('menu');
    }
  }

}

export default Gameover;
