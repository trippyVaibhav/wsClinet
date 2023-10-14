import { Graphics, Sprite } from "pixi.js";
import { boardConfigVar, boardConfig } from './Globals';
import { log } from "console";
import { Button } from "./Button";
import { Easing, Tween } from "@tweenjs/tween.js";

export class Lines extends Graphics{
 
    lineG !: Graphics;
    linePos !: {x : number,y : number}[] ;
    moveLine !: Graphics;
    colorCode : number = 0x000000;
    side : boolean = false;
    blinkTween: any;

    


    // false Side = LEFT  AND True Side = Right
    constructor(color: string, Side:boolean, payLineNo : number, yPosition : number,lineLocaitons :{x:number, y:number}[] ,board : Sprite)
    {
        super();
        
        this.colorCode = parseInt(color);
        this.lineG = new Graphics;
        this.lineG.beginFill(this.colorCode, 1);
        this.lineG.lineStyle(2, 0xFEEB77, 1);
        this.lineG.drawCircle(0,0,15);
        this.lineG.endFill();

        this.addChild(this.lineG);
        this.lineG.position.y = yPosition - board.height/2;
        this.side = Side;
        this.lineG.position.x = -board.width/2;
        this.lineG.zIndex = 1;
        
        if( this.side == true )
        {
            this.lineG.position.x = board.width/2;
        }
        this.makeLines(lineLocaitons,board);
    }


    makeLines(line :{x:number, y:number}[],board : Sprite)
    {
        const button = new Graphics;
        button.lineStyle(10, this.colorCode, 1,0.5);
        button.zIndex = 0;
        let offset = 0;
        for(let i = 0 ; i < line.length ; i++)
        {

        const rightPos = (line[i].y) - this.lineG.position.y;
        if(i == 0)
        {
            offset = rightPos;
        }

        button.lineTo( (line[i].x + 12) - this.lineG.position.x , rightPos-offset);
        button.moveTo( (line[i].x + 12) - this.lineG.position.x , rightPos-offset);
        }
        this.lineG.addChild(button);
    }

    makeitVisible(visible : boolean )
    {
        if(!visible)
        {
            if(this.blinkTween)
            this.blinkTween.stop();
        }
        this.visible = visible;
    }

    blink()
    {
        this.visible = true;
        this.blinkTween = new Tween(this.lineG)
        .to({alpha : 0.01},500)
        .easing(Easing.Elastic.InOut)
        .repeat(1)
        .yoyo(true)
        .start();
    }
   
}