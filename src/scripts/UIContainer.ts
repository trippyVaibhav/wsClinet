import { Container, Sprite, Resource } from 'pixi.js';
import { Globals, boardConfigVar, moneyInfo, randomRange } from './Globals';
import { TextLabel } from "./TextLabel";
import { log } from 'console';
import { Easing, Tween } from "@tweenjs/tween.js";
import { assignPlayerBet, getPlayerCredit } from './ApiPasser';

export class UiContainer extends Container
{
    textBG : Sprite;
    spin : Sprite;
    
    balanceText : TextLabel;
    wonAmountText: TextLabel;

    betText: TextLabel;
    lineBetL !: Sprite;
    lineBetR !: Sprite;

    maxLinesButtonL !: Sprite;
    maxLinesButtonR !: Sprite;
    
    constructor()
    {
        super();

        this.textBG= new Sprite(Globals.resources.Bottom.texture);
        this.textBG.anchor.set(0.5);
        this.textBG.scale.set(0.18,0.2);
        this.textBG.position.x = this.textBG.width/2;
        this.textBG.alpha = 0.4;

        this.lineBetText();
        this.payLineText();
        this.wonAmountText = new TextLabel(0, 0, 0.5, `Won  :  ${moneyInfo.score}`, 200, 0xFFC0CB );
        this.wonAmountText.position.x = -this.wonAmountText.width/2;
        this.wonAmountText.position.y = 0;

        this.textBG.addChild(this.wonAmountText);
        this.addChild(this.textBG);

        this.spin = new Sprite(Globals.resources.Sprint.texture);
        this.spin.anchor.set(0.5);
        this.spin.scale.set(0.2);
        this.spin.position.x = this.textBG.position.x - this.spin.width/4;
        this.addChild(this.spin);
        this.spin.interactive = true;
        this.spin.buttonMode = true;
        
        this.spin.on("pointerdown",()=>
        {
           this.callSpin();
        })

        getPlayerCredit();
        this.balanceText = new TextLabel(0, 0, 0.5, `Balance  :  ${moneyInfo.Balance}`, 150, 0xFFC0CB );
        this.balanceText.position.x = this.textBG.width*1.5;
        this.textBG.addChild(this.balanceText); 
        
        moneyInfo.Bet = (moneyInfo.maxLines+1)*moneyInfo.lineBet;
        this.betText = new TextLabel(0, 0, 0.5, `Bet  :  ${moneyInfo.Bet}`, 150, 0xFFC0CB );
        this.betText.position.x = this.textBG.width*0.5;
        this.textBG.addChild(this.betText);   
    }

    async callSpin()
    {
        assignPlayerBet();
        this.spin.interactive = false;
        const tween = new Tween(this.spin.scale)
        .to({ x : 0.23, y: 0.23 }, 100) .easing(Easing.Back.InOut)  .yoyo(true) .repeat(1) .onComplete(()=>{}) .start();
        this.spin.alpha = 0.5;

        moneyInfo.score = 0;
        const progress = await  this.updateWinningAmount();
        let newBalance = moneyInfo.Balance - moneyInfo.lineBet;
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

    updateBetText()
    {
        moneyInfo.Bet = (moneyInfo.maxLines+1)*moneyInfo.lineBet;
        this.betText.updateLabelText( `Bet  :  ${moneyInfo.Bet}`);
    }


    lineBetText()
    {
        let betIndex = boardConfigVar.lineBet.length-1;
        moneyInfo.lineBet = boardConfigVar.lineBet[betIndex];
        const lineBetText = new TextLabel(0, 0, 0.5,boardConfigVar.lineBet[betIndex].toString(), 100, 0xFFC0CB );
        lineBetText.position.x = -this.textBG.width*1.5;
        this.textBG.addChild(lineBetText);

        this.lineBetL = new Sprite(Globals.resources.arrL.texture);
        this.lineBetL.anchor.set(0.5);        
        this.lineBetL.scale.set(0.5); 
        this.lineBetL.position.x = -200; 
        
        this.lineBetR = new Sprite(Globals.resources.arrR.texture);
        this.lineBetR.anchor.set(0.5);        
        this.lineBetR.scale.set(0.5); 
        this.lineBetR.position.x = 200; 
        this.lineBetR.interactive = this.lineBetL.interactive = true;
            
        this.lineBetL.buttonMode   = true;
        this.lineBetR.buttonMode = true;   
         
        this.lineBetL.on("pointerdown",()=>
        {
           if(betIndex == 0 && this.lineBetL.interactive )
           {
                this.lineBetL.interactive = false; 
           }
           if(betIndex ==  0 && !this.lineBetL.interactive)
           {
              return;
           }
            if(!this.lineBetR.interactive)
            this.lineBetR.interactive = true;

            betIndex--;
            lineBetText.updateLabelText(boardConfigVar.lineBet[betIndex].toString());
            moneyInfo.lineBet = boardConfigVar.lineBet[betIndex];
            this.updateBetText();
            // console.log("betIndex : " +betIndex);
            // console.log("btnL : " +betButtonL.interactive);
            // console.log("btnR : " +betButtonR.interactive);
        })

        this.lineBetR.on("pointerdown",()=>
        {
            if(betIndex ==  boardConfigVar.lineBet.length-1 && this.lineBetR.interactive)
            {
                this.lineBetR.interactive = false;
            }
            if(betIndex ==  boardConfigVar.lineBet.length-1 && !this.lineBetR.interactive)
            {
               return;
            }
            if(!this.lineBetL.interactive )
            this.lineBetL.interactive = true;
       
            betIndex++;
            lineBetText.updateLabelText(boardConfigVar.lineBet[betIndex].toString());
            moneyInfo.lineBet = boardConfigVar.lineBet[betIndex];
            this.updateBetText();

            // console.log("betIndex : " +betIndex);
            // console.log("btnL : " +betButtonL.interactive);
            // console.log("btnR : " +betButtonR.interactive);
        })

        const betTextLable = new TextLabel(0, 0, 0.5,"LineBet", 100, 0xFFC0CB );
        betTextLable.position.y =  this.lineBetL.height;
        lineBetText.addChild(this.lineBetL,this.lineBetR,betTextLable);
    }

    payLineText()
    {
        let lineIndex = boardConfigVar.lineNo.length-1;
        moneyInfo.maxLines = lineIndex;
        const lineBetText = new TextLabel(0, 0, 0.5, boardConfigVar.lineNo[lineIndex].toString(), 100, 0xFFC0CB );
        lineBetText.position.x = -this.textBG.width*2.4;
        this.textBG.addChild(lineBetText);

        this.maxLinesButtonL = new Sprite(Globals.resources.arrL.texture);
        this.maxLinesButtonL.anchor.set(0.5);        
        this.maxLinesButtonL.scale.set(0.5); 
        this.maxLinesButtonL.position.x = -200; 
        
        this.maxLinesButtonR = new Sprite(Globals.resources.arrR.texture);
        this.maxLinesButtonR.anchor.set(0.5);        
        this.maxLinesButtonR.scale.set(0.5); 
        this.maxLinesButtonR.position.x = 200; 
        this.maxLinesButtonL.interactive =true;
        this.maxLinesButtonR.interactive = true;
        this.maxLinesButtonR.buttonMode   = true;
        this.maxLinesButtonL.buttonMode = true;

       this.maxLinesButtonL.on("pointerdown",()=>
        {
           if(lineIndex == 0 && this.maxLinesButtonL.interactive )
           {
                this.maxLinesButtonL.interactive = false; 
           }
           if(lineIndex ==  0 && !this.maxLinesButtonL.interactive)
           {
              return;
           }
            if(!this.maxLinesButtonR.interactive)
            this.maxLinesButtonR.interactive = true;
            lineIndex--;
            lineBetText.updateLabelText( boardConfigVar.lineNo[lineIndex].toString());
            moneyInfo.maxLines = lineIndex;
           
            this.updateBetText();
            // console.log("betIndex : " +lineIndex);
            // console.log("btnL : " +betButtonL.interactive);
            // console.log("btnR : " +betButtonR.interactive);
            Globals.emitter?.Call("linesActive");
        })

        this.maxLinesButtonR.on("pointerdown",()=>
        {
            if(lineIndex ==   boardConfigVar.lineNo.length-1 && this.maxLinesButtonR.interactive)
            {
                this.maxLinesButtonR.interactive = false;
            }
            if(lineIndex ==   boardConfigVar.lineNo.length-1 && !this.maxLinesButtonR.interactive)
            {
               return;
            }
            if(!this.maxLinesButtonL.interactive )
            this.maxLinesButtonL.interactive = true;
       
            lineIndex++;
            lineBetText.updateLabelText( boardConfigVar.lineNo[lineIndex].toString());
            moneyInfo.maxLines = lineIndex;

            // console.log("betIndex : " +lineIndex);
            // console.log("btnL : " +betButtonL.interactive);
            // console.log("btnR : " +betButtonR.interactive);
            Globals.emitter?.Call("linesActive");
            this.updateBetText();
        })

        const betTextLable = new TextLabel(0, 0, 0.5,"Lines Active", 100, 0xFFC0CB );
        betTextLable.position.y =  this.maxLinesButtonR.height;
        lineBetText.addChild(this.maxLinesButtonL,this.maxLinesButtonR,betTextLable);
    }
}