// import * as PIXI from "pixi.js";
import { Graphics } from "pixi.js";
import { Scene } from "./Scene";
import { CreateBoard } from "./CreateBoard";
import { Globals, boardConfig, boardConfigVar } from "./Globals";
import { Background } from './Background';
import { UiContainer } from './UIContainer';

export class MainScene extends Scene {
  	
	board !: CreateBoard;
	UiContainer !: UiContainer;
	
	constructor() {
	
		super();
	
		this.board = new CreateBoard();
		this.UiContainer = new UiContainer();

		this.mainContainer.addChild(this.board,this.UiContainer);

        
	}


	

	resize(): void {
		super.resize();
	
	}

	update(dt: number): void {
		// throw new Error('Method not implemented.');

		
	}
	recievedMessage(msgType: string, msgParams: any): void {
		// throw new Error('Method not implemented.');

	
		
	}
	
}
