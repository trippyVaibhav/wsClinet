import { Container, Sprite, Resource } from 'pixi.js';
import { Globals, boardConfigVar, randomRange } from "./Globals";
import { TextLabel } from "./TextLabel";
import { log } from 'console';
import { Easing, Tween } from "@tweenjs/tween.js";

export class UiContainer extends Container
{
    spin : Sprite;
    constructor()
    {
        super();

        const Bottom = new Sprite(Globals.resources.Bottom.texture);
        Bottom.anchor.set(0.5);
        Bottom.scale.set(0.4);
        // Bottom.position.set(window.innerWidth-Bottom.width,500);
        Bottom.position.x = window.innerWidth/1.6;
        Bottom.position.y = window.innerHeight+Bottom.height;
        Bottom.alpha = 0.4;

        const bottomText = new TextLabel(0, 0, 0.5, `Won  :  ${boardConfigVar.score}`, 200, 0xFFC0CB );
        bottomText.position.x = 0;
        bottomText.position.y = 0;

        Bottom.addChild(bottomText);
        this.addChild(Bottom);

        this.spin = new Sprite(Globals.resources.Sprint.texture);
        this.spin.anchor.set(0.5);
        this.spin.scale.set(0.2);
        this.spin.position.x = 300;
        this.spin.position.y = Bottom.position.y - Bottom.height/1.5;
        this.addChild(this.spin);
        this.spin.interactive = true;

        this.spin.on("pointerdown",()=>
        {
           this.callSpin();
        })

        const betText = new TextLabel(0, 0, 0.5, `Bet  :  ${boardConfigVar.Bet}`, 100, 0xFFC0CB );
        betText.position.x = -Bottom.width;
        betText.position.y = Bottom.height/2 - bottomText.height/2;
        Bottom.addChild(betText);

        const coinText = new TextLabel(0, 0, 0.5, `Bet  :  ${boardConfigVar.Coins}`, 100, 0xFFC0CB );
        coinText.position.x = Bottom.width;
        Bottom.addChild(coinText);  
    }
    callSpin()
    {
        Globals.emitter?.Call("startSpin");
        let time = randomRange(boardConfigVar.seconds)+ 500;
        setTimeout(()=>{boardConfigVar.shouldMove = false; Globals.emitter?.Call("CallCheckSlot")},time);
        setTimeout(()=>{this.spin.interactive = true;},time+500)
        this.spin.interactive = false;
        const tween = new Tween(this.spin.scale)
        .to({ x : 0.23, y: 0.23 }, 100) .easing(Easing.Back.InOut)  .yoyo(true) .repeat(1) .onComplete(()=>{}) .start();

        // setTimeout(()=>{this.callSpin()},10000)
    }
}