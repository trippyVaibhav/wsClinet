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

export class MainScene extends Scene {
  	
	board !: CreateBoard;
	UiContainer !: UiContainer;
	
	constructor() {
	
		super();
		
		this.board = new CreateBoard();
		this.mainContainer.addChild(this.board);
		this.board.position.y = config.minTopY+ 200;

		if(window.innerHeight>window.innerWidth)
		this.board.position.x =500*maxScaleFactor();
		else
		this.board.position.x = config.minLeftX + window.innerWidth/4*minScaleFactor();

		this.board.scale.set(1.65* maxScaleFactor());
		
		this.UiContainer = new UiContainer();
		this.board.addChild(this.UiContainer)
		this.UiContainer.textBG.position.y = this.board.slotArr[0][boardConfigVar.Matrix.y].slot.position.y + this.board.slotArr[0][boardConfigVar.Matrix.y].slot.height*3.5;
        this.UiContainer.spin.position.y =  this.UiContainer.textBG.position.y +  this.UiContainer.textBG.height;
		
	}

	resize(): void {
		super.resize();
		
		this.board.scale.set(1.7* maxScaleFactor());
		this.board.position.y = config.minTopY ;
		// this.board.position.x = window.innerWidth/4.2;
		if(window.innerHeight>window.innerWidth)
		this.board.position.x =500*maxScaleFactor();
		else
		this.board.position.x = config.minLeftX + window.innerWidth/4*minScaleFactor();

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
