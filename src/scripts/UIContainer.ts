import { Container, Sprite } from "pixi.js";
import { Globals, boardConfigVar } from "./Globals";
import { TextLabel } from "./TextLabel";
import { log } from 'console';
import { Easing, Tween } from "@tweenjs/tween.js";

export class UiContainer extends Container
{
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

        const spin = new Sprite(Globals.resources.Sprint.texture);
        spin.anchor.set(0.5);
        spin.scale.set(0.2);
        spin.position.x = 300;
        spin.position.y = Bottom.position.y - Bottom.height/1.5;
        this.addChild(spin);
        spin.interactive = true;

        spin.on("pointerdown",()=>
        {
            spin.interactive = false;
            const tween = new Tween(spin.scale)
            .to({ x : 0.23, y: 0.23 }, 100)
            .easing(Easing.Back.InOut)
            .yoyo(true)
            .repeat(1)
            .onComplete(()=>{spin.interactive = true;})
            .start();
            
        })

        const betText = new TextLabel(0, 0, 0.5, `Bet  :  ${boardConfigVar.Bet}`, 100, 0xFFC0CB );
        betText.position.x = -Bottom.width;
        betText.position.y = Bottom.height/2 - bottomText.height/2;
        Bottom.addChild(betText);

        const coinText = new TextLabel(0, 0, 0.5, `Bet  :  ${boardConfigVar.Coins}`, 100, 0xFFC0CB );
        coinText.position.x = Bottom.width;
        Bottom.addChild(coinText);  
    }
}