import { Container, Sprite, Resource } from 'pixi.js';
import { Globals, boardConfigVar, moneyInfo, randomRange } from './Globals';
import { TextLabel } from "./TextLabel";
import { log } from 'console';
import { Easing, Tween } from "@tweenjs/tween.js";
import { assignPlayerBet, getPlayerCredit } from './ApiPasser';

export class UiContainer extends Container
{
    spin : Sprite;
    
    balanceText : TextLabel;
    wonAmountText: TextLabel;

    betText: TextLabel;
    lineBetL !: Sprite;
    lineBetR !: Sprite;

    maxLinesButtonL !: Sprite;
    maxLinesButtonR !: Sprite;

    wonButton !: Sprite;
    betButton !: Sprite;
    balanceButton !: Sprite;
    paylinesButton !: Sprite;
    lineBetButton !:Sprite;

    
    constructor()
    {
        super();

  

        this.spin = new Sprite(Globals.resources.Sprint.texture);
        this.spin.anchor.set(1,0.5);
        this.spin.scale.set(0.7);
        this.spin.position.y = 250;

        
        this.addChild(this.spin);
        this.spin.interactive = true;
        this.spin.buttonMode = true;
        
        
        this.spin.on("pointerdown",()=>
        {
           this.callSpin();
        })

        getPlayerCredit();
        this.lineBetText();

        this.wonAmountText = new TextLabel(0, 0, 0.5, `Won  :  ${moneyInfo.score}`, 20, 0xF2AE33 );
        this.wonAmountText.position.x = 0;
        this.wonAmountText.position.y = 0;
    
        this.wonButton = new Sprite(Globals.resources.ButtonBg1.texture)
        this.wonButton.anchor.set(0.5);
        this.wonButton.scale.set(0.8);

        this.wonButton.position.y = 250;
        this.addChild(this.wonButton);
        this.wonButton.addChild(this.wonAmountText);

        this.balanceText = new TextLabel(0, 0, 0.5, `Balance  :  ${moneyInfo.Balance}`, 20, 0xF2AE33 );
        this.balanceText.anchor.set(0.5);
      
        this.balanceButton = new Sprite(Globals.resources.ButtonBg1.texture)
        this.balanceButton.anchor.set(0.5);
        this.balanceButton.scale.set(0.8);
        this.balanceButton.position.y = 250;
        this.balanceText.position.x =0;

        this.addChild( this.balanceButton);
        this.balanceButton.addChild(this.balanceText);
        
        moneyInfo.Bet = (moneyInfo.maxLines+1)*moneyInfo.lineBet;
        this.betText = new TextLabel(0, 0, 0.5, `Bet  :  ${moneyInfo.Bet}`, 20, 0xF2AE33 );
        this.betText.position.x = this.betText.width/2;

        this.betButton = new Sprite(Globals.resources.ButtonBg2.texture)
        this.betButton.anchor.set(0.5);
        this.betButton.scale.set(0.8);

        this.betButton.position.x = this.lineBetButton.position.x + this.lineBetButton.width*1.05;
        this.betButton.position.y = 250;
        this.betText.anchor.set(1,0.5);
 

        this.addChild(this.betButton);
        this.betButton.addChild(this.betText); 
        
        if(moneyInfo.Balance - moneyInfo.Bet >= 0)
        {
            this.spin.interactive = true;
            this.spin.alpha = 1;
        }
        if(moneyInfo.Balance - moneyInfo.Bet < 0)
        {
            this.spin.interactive = false;
            this.spin.alpha = 0.5;
        }
        this.payLineText();
        this.wonButton.position.x = this.betButton.position.x + this.betButton.width*1.05;
        this.balanceButton.position.x = this.lineBetButton.position.x - this.lineBetButton.width*1.05;
        this.spin.position.x =  this.wonButton.position.x + this.wonButton.width*1.6;
        this.paylinesButton.position.x =  this.balanceButton.position.x - this.balanceButton.width*1.05;


     
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

    updateBetText()
    {
        moneyInfo.Bet = (moneyInfo.maxLines+1)*moneyInfo.lineBet;
        this.betText.updateLabelText( `Bet  :  ${moneyInfo.Bet}`);
        if(moneyInfo.Balance - moneyInfo.Bet >= 0)
        {
            this.spin.interactive = true;
            this.spin.alpha = 1;
        }
        if(moneyInfo.Balance - moneyInfo.Bet < 0)
        {
            this.spin.interactive = false;
            this.spin.alpha = 0.5;
        }
    }


    lineBetText()
    {
        let betIndex = boardConfigVar.lineBet.length-1;
        moneyInfo.lineBet = boardConfigVar.lineBet[betIndex];
        const lineBetText = new TextLabel(0, 0, 0.5,boardConfigVar.lineBet[betIndex].toString(), 20, 0xF2AE33 );
        
        this.lineBetButton = new Sprite(Globals.resources.ButtonBg.texture)
        this.lineBetButton.anchor.set(0.5);

        this.lineBetButton.position.x = -this.lineBetButton.width/2;
        this.lineBetButton.position.y = 250;
        this.lineBetButton.scale.set(0.8);

        this.addChild( this.lineBetButton);

        this.lineBetButton.addChild(lineBetText);

        this.lineBetL = new Sprite(Globals.resources.arrL.texture);
        this.lineBetL.anchor.set(0.5);        
        
        this.lineBetR = new Sprite(Globals.resources.arrR.texture);
        this.lineBetR.anchor.set(0.5);        
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

        const betTextLable = new TextLabel(0, 0, 0.5,"LineBet", 20, 0xF2AE33 );
        betTextLable.position.x =  - this.lineBetButton.width/2 + betTextLable.width/2;
        lineBetText.position.x = betTextLable.width/2;
        this.lineBetR.position.x = lineBetText.width*1.5; 
        this.lineBetL.position.x = -lineBetText.width*1.5; 

        lineBetText.addChild(this.lineBetL,this.lineBetR)
        this.lineBetButton.addChild(betTextLable);
    }

    payLineText()
    {

        this.paylinesButton = new Sprite(Globals.resources.ButtonBg2.texture)
        this.paylinesButton.anchor.set(0.5);
        this.paylinesButton.scale.set(0.8);
        this.paylinesButton.position.y = 250;

        this.addChild(this.paylinesButton);
        let lineIndex = boardConfigVar.lineNo.length-1;
        moneyInfo.maxLines = lineIndex;
        const lineBetText = new TextLabel(0, 0, 0.5, boardConfigVar.lineNo[lineIndex].toString(), 20, 0xF2AE33 );

        this.maxLinesButtonL = new Sprite(Globals.resources.arrL.texture);
        this.maxLinesButtonL.anchor.set(0.5);        
        this.maxLinesButtonL.scale.set(1); 
        this.maxLinesButtonL.position.x = -lineBetText.width - 10; 
        
        this.maxLinesButtonR = new Sprite(Globals.resources.arrR.texture);
        this.maxLinesButtonR.anchor.set(0.5);        
        this.maxLinesButtonR.position.x = lineBetText.width + 10; 
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

            const betTextLable = new TextLabel(0, 0, 0.5,"Lines Active", 20, 0xF2AE33 );
            betTextLable.anchor.set(0,0.5)
            betTextLable.position.x = -this.paylinesButton.width/2 - 10;

        lineBetText.addChild(this.maxLinesButtonL,this.maxLinesButtonR);
        lineBetText.position.x = betTextLable.width/2 + lineBetText.width/2
        this.paylinesButton.addChild(betTextLable,lineBetText);
    }
}