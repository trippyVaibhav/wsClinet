import { Graphics } from "pixi.js";
import { Scene } from "./Scene";
import { sendMessage } from ".";


export class MainScene extends Scene {

	constructor() {
		super();

		const spin = new Graphics()
		spin.beginFill(0xFFFFFF)
		spin.drawRoundedRect(0,0,200,100,20)
		spin.endFill();
		this.mainContainer.addChild(spin);
		spin.position.set(window.innerWidth/2,window.innerHeight/2);
		
		spin.interactive = true;
		spin.buttonMode = true;
		
		const Data = {
			CurrentBet : 5,
		}
		spin.on("pointerdown",()=>{sendMessage("Spin",Data)})
	}

	resize(): void {
	super.resize();

	}
	update(dt: number): void { 

	}

	recievedMessage(msgType: string, msgParams: any): void {

	}
}
