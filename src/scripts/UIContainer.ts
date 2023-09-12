import { Container, Sprite, Resource } from 'pixi.js';
import { Globals, boardConfigVar, moneyInfo, randomRange } from "./Globals";
import { TextLabel } from "./TextLabel";
import { log } from 'console';
import { Easing, Tween } from "@tweenjs/tween.js";
import { assignPlayerBet, getPlayerCredit } from './ApiPasser';

export class UiContainer extends Container
{
    spin : Sprite;
    balanceText : TextLabel;
    wonAmountText: TextLabel;
    constructor()
    {
        super();

        const Bottom = new Sprite(Globals.resources.Bottom.texture);
        Bottom.anchor.set(0.5);
        Bottom.scale.set(0.4);
        // Bottom.position.set(window.innerWidth-Bottom.width,500);
        Bottom.position.x = 0 + Bottom.width/2;
        Bottom.position.y = window.innerHeight+Bottom.height;
        Bottom.alpha = 0.4;

        this.wonAmountText = new TextLabel(0, 0, 0.5, `Won  :  ${moneyInfo.score}`, 200, 0xFFC0CB );
        this.wonAmountText.position.x = 0;
        this.wonAmountText.position.y = 0;

        Bottom.addChild(this.wonAmountText);
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

        const betText = new TextLabel(0, 0, 0.5, `Bet  :  ${moneyInfo.Bet}`, 100, 0xFFC0CB );
        betText.position.x = -Bottom.width*0.8;
        Bottom.addChild(betText);

        getPlayerCredit();
        this.balanceText = new TextLabel(0, 0, 0.5, `Balance  :  ${moneyInfo.Balance}`, 100, 0xFFC0CB );
        this.balanceText.position.x = Bottom.width*0.8;
        Bottom.addChild(this.balanceText);  
    }
    async callSpin()
    {
        console.log(moneyInfo.Bet);
        
        assignPlayerBet();
        this.spin.interactive = false;
        const tween = new Tween(this.spin.scale)
        .to({ x : 0.23, y: 0.23 }, 100) .easing(Easing.Back.InOut)  .yoyo(true) .repeat(1) .onComplete(()=>{}) .start();
        this.spin.alpha = 0.5;

        moneyInfo.score = 0;
      const progress = await  this.updateWinningAmount();
        let newBalance = moneyInfo.Balance - moneyInfo.Bet;
        Globals.emitter?.Call("updateBalance",newBalance);
    }
    updateBalance(newBalance: number)
    {
        moneyInfo.Balance = newBalance;
        this.balanceText.updateLabelText( `Balance  :  ${moneyInfo.Balance}`);
    }

    updateWinningAmount()
    {
        this.wonAmountText.updateLabelText( `Won  :  ${moneyInfo.score}`);
    }
}