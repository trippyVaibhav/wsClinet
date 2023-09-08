import { Graphics } from "pixi.js";
import { boardConfigVar } from './Globals';
import { log } from "console";
import { Button } from "./Button";

export class Lines extends Graphics{
 
    lineG !: Graphics;
    linePos !: {x : number,y : number}[] ;
    moveLine !: Graphics;
    colorCode : number = 0x000000;
    side : boolean = false;

    


    // false Side = LEFT  AND True Side = Right
    constructor(color: string, Side:boolean, payLineNo : number, yPosition : number,lineLocaitons :{x:number, y:number}[] )
    {
        super();
        
        this.colorCode = parseInt(color);
        this.lineG = new Graphics;
        this.lineG.beginFill(this.colorCode, 1);
        this.lineG.lineStyle(2, 0xFEEB77, 1);
        this.lineG.drawCircle(0,0,20);
        this.lineG.endFill();
        this.addChild(this.lineG);
        this.lineG.position.y = yPosition;
        this.side = Side;
        this.lineG.zIndex = 1;

        if( this.side == true )
        {
            this.lineG.position.x = boardConfigVar.boardBoxWidth*boardConfigVar.Matrix.x + this.lineG.width/2;
        }
        this.makeLines(lineLocaitons);
    }


    makeLines(line :{x:number, y:number}[])
    {
        const button = new Graphics;
        button.lineStyle(10, this.colorCode, 1);
        button.zIndex = 0;
       for(let i = 0 ; i < line.length ; i++)
       {
        // console.log( "LinePos: " +  (line[i].y  + boardConfigVar.boardBoxHeight/2));
        // console.log( "GraphicPos: " + Math.abs(this.lineG.position.y ));
        // console.log( "rightPos: " +  ((line[i].y  + boardConfigVar.boardBoxHeight/2) - (this.lineG.position.y ) ));
        // console.log( this.lineG.position.y - (line[i].y + boardConfigVar.boardBoxHeight/2));
       if(!this.side)
       {
           const rightPos = (line[i].y  + boardConfigVar.boardBoxHeight/2) - (this.lineG.position.y);
           
           button.lineTo(line[i].x  + boardConfigVar.boardBoxWidth/2+1.5 + 10,rightPos +1.5 );
           button.moveTo(line[i].x + boardConfigVar.boardBoxWidth/2 + 10 , rightPos);
        }
        else
        {
            console.log(line[i].x);
            
            const rightPos = (line[i].y  + boardConfigVar.boardBoxHeight/2) - (this.lineG.position.y);
            button.lineTo(line[i].x  - boardConfigVar.boardBoxWidth/2+1.5 + 10,rightPos +1.5 );
            button.moveTo(line[i].x - boardConfigVar.boardBoxWidth/2 + 10 , rightPos);
         }
        }
        this.lineG.addChild(button);
    }
   
}