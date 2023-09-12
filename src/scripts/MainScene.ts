// import * as PIXI from "pixi.js";
import { Graphics } from "pixi.js";
import { Scene } from "./Scene";
import { CreateBoard } from "./CreateBoard";
import { Globals, boardConfig, boardConfigVar, moneyInfo } from "./Globals";
import { Background } from './Background';
import { UiContainer } from './UIContainer';
import { log } from "console";
import { assignPlayerBet, getPlayerCredit, getwinBalance } from "./ApiPasser";

export class MainScene extends Scene {
  	
	board !: CreateBoard;
	UiContainer !: UiContainer;
	
	constructor() {
	
		super();
	
		
		this.UiContainer = new UiContainer();
		this.board = new CreateBoard();
		
		this.mainContainer.addChild(this.board,this.UiContainer);
	}


	

	resize(): void {
		super.resize();
	
	}

	update(dt: number): void // throw new Error('Method not implemented.');
	{     

		this.board.update(dt);
	
	}

	recievedMessage(msgType: string, msgParams: any): void  // throw new Error('Method not implemented.');
	{

		if(msgType == "startSpin")
		this.board.startSpin();

		if(msgType == "CanSpinNow")
		{
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

		// console.log(getPlayerCredit())

		

	}
	
}
