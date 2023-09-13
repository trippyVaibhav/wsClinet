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
    textBG : Sprite;
    constructor()
    {
        super();

        this.textBG= new Sprite(Globals.resources.Bottom.texture);
        this.textBG.anchor.set(0.5);
        this.textBG.scale.set(0.4);
    // Bottom.position.set(window.innerWidth-Bottom.width,500);
    this.textBG.position.x = this.textBG.width/2;

    if(window.innerHeight> window.innerWidth)
    this.textBG.position.y = window.innerHeight*2;
    else
    this.textBG.position.y = window.innerHeight + this.textBG.height;


    this.textBG.alpha = 0.4;

        this.wonAmountText = new TextLabel(0, 0, 0.5, `Won  :  ${moneyInfo.score}`, 200, 0xFFC0CB );
        this.wonAmountText.position.x = 0;
        this.wonAmountText.position.y = 0;

        this.textBG.addChild(this.wonAmountText);
        this.addChild(this.textBG);

        this.spin = new Sprite(Globals.resources.Sprint.texture);
        this.spin.anchor.set(0.5);
        this.spin.scale.set(0.2);
        this.spin.position.x = 300;
        this.spin.position.y = this.textBG.position.y - this.textBG.height/1.5;
        this.addChild(this.spin);
        this.spin.interactive = true;

        this.spin.on("pointerdown",()=>
        {
           this.callSpin();
        })

        const betText = new TextLabel(0, 0, 0.5, `Bet  :  ${moneyInfo.Bet}`, 100, 0xFFC0CB );
        betText.position.x = -this.textBG.width*0.8;
        this.textBG.addChild(betText);

        getPlayerCredit();
        this.balanceText = new TextLabel(0, 0, 0.5, `Balance  :  ${moneyInfo.Balance}`, 100, 0xFFC0CB );
        this.balanceText.position.x = this.textBG.width*0.8;
        this.textBG.addChild(this.balanceText);  
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

    resize()
    {
        if(window.innerHeight> window.innerWidth)
        this.textBG.position.y = window.innerHeight*2;
        else
        this.textBG.position.y = window.innerHeight + this.textBG.height;
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