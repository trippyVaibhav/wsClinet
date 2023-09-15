// import * as PIXI from "pixi.js";
import { Graphics } from "pixi.js";
import { Scene } from "./Scene";
import { CreateBoard } from "./CreateBoard";
import { Globals, boardConfig, boardConfigVar, moneyInfo } from "./Globals";
import { Background } from './Background';
import { UiContainer } from './UIContainer';
import { log } from "console";
import { assignPlayerBet, getPlayerCredit, getwinBalance } from "./ApiPasser";
import { config, maxScaleFactor, minScaleFactor } from './appConfig';
import { Howl } from "howler";

export class MainScene extends Scene {
  	
	board !: CreateBoard;
	UiContainer !: UiContainer;
	bgMusic!: Howl;
	
	constructor() {
	
		super();
		
		this.bgMusic = Globals.soundResources.bgMusic;
		console.log(this.bgMusic);
		
		this.bgMusic.play();
		this.bgMusic.loop(true);
		this.bgMusic.volume(0.5);

		
		this.board = new CreateBoard();
		this.addChildToFullScene(this.board.board);
	

		this.board.board.scale.set(1.5*minScaleFactor());

		
		this.UiContainer = new UiContainer();
		this.board.board.addChild(this.UiContainer)
		this.UiContainer.textBG.position.y = this.board.slotArr[0][boardConfigVar.Matrix.y].slot.position.y + this.board.slotArr[0][boardConfigVar.Matrix.y].slot.height*3.5;
        this.UiContainer.spin.position.y =  this.UiContainer.textBG.position.y +  this.UiContainer.textBG.height;
		

        this.board.board.position.x = window.innerWidth/2 - this.board.slotArr[0][boardConfigVar.Matrix.y].slot.width*2.5*minScaleFactor()- 200*minScaleFactor();

        // this.board.board.position.y = window.innerHeight/2 - this.board.slotArr[0][boardConfigVar.Matrix.y].slot.height*2.2;
        this.board.board.position.y = 0;


		// this.UiContainer.textBG.position.x = this.board.board.position.x + this.UiContainer.textBG.width/2;
		// this.board.board.position.y = window.innerHeight;

	}

	resize(): void {
		super.resize();
		this.board.board.scale.set(1.5*minScaleFactor());	
console.log(config.leftX,config.rightX);
	this.board.board.position.x = window.innerWidth/2 - this.board.slotArr[0][boardConfigVar.Matrix.y].slot.width*2.5*minScaleFactor() - 200*minScaleFactor();

        // this.board.board.position.x = config.leftX + ((config.rightX - config.leftX)/2 - this.board.slotArr[0][boardConfigVar.Matrix.y].slot.width*2.5)
		// this.board.board.position.y = window.innerHeight/2 - this.board.slotArr[0][boardConfigVar.Matrix.y].slot.height*2.2;

		// this.board.board.position.x = window.innerWidth/4;
		// this.UiContainer.textBG.position.x = this.board.board.position.x + this.UiContainer.textBG.width/2;
		// this.board.board.position.y = window.innerHeight;

	}

	update(dt: number): void // throw new Error('Method not implemented.');
	{     

		this.board.update(dt);
	
	}

	recievedMessage(msgType: string, msgParams: any): void  // throw new Error('Method not implemented.');
	{

		if(msgType == "startSpin")
		{
			this.board.startSpin();

			this.UiContainer.maxLinesButtonL.interactive = false;
			this.UiContainer.maxLinesButtonR.interactive = false;

			this.UiContainer.lineBetL.interactive = false;
			this.UiContainer.lineBetR.interactive = false;
			this.board.makelinesInvisible();

			const spinMusic = Globals.soundResources.onSpin;
			spinMusic.play();
			spinMusic.volume(0.5);
		}

		if(msgType == "CanSpinNow")
		{
			this.UiContainer.maxLinesButtonL.interactive = true;
			this.UiContainer.maxLinesButtonR.interactive = true;

			this.UiContainer.lineBetL.interactive = true;
			this.UiContainer.lineBetR.interactive = true;

			this.UiContainer.spin.interactive = true;
			this.UiContainer.spin.alpha = 1;
			getPlayerCredit();
		}
		if(msgType == "updateBalance")
		this.UiContainer.updateBalance(msgParams);

		if(msgType == "WonAmount")
		{
			this.UiContainer.updateWinningAmount();
		}

		if(msgType == "StartCheck")
		{
			setTimeout(()=>{this.board.checkSlot();},2000);
		}

		if(msgType == "linesActive")
		this.board.makelinesVisibleOnChange();

		// console.log(getPlayerCredit())

		

	}
	
}
