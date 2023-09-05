import { Graphics } from "pixi.js";
import { boardConfigVar } from './Globals';
import { log } from "console";

export class Lines extends Graphics{
 
    lineG !: Graphics;
    linePos !: {x : number,y : number}[] ;
    moveLine !: Graphics;
    colorCode : number = 0x000000;


    // false Side = LEFT  AND True Side = Right
    constructor(color: string, Side:boolean, payLineNo : number, yPosition : number )
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

        if(Side == true )
        {
            this.lineG.position.x = boardConfigVar.boardBoxWidth*boardConfigVar.Matrix.x + this.lineG.width/2;
        }
       
        // button.lineTo(boardConfigVar.boardBoxWidth, 60);
        // this.addChild(button)
        // button.moveTo(boardConfigVar.boardBoxWidth, 60);
        // button.lineTo(boardConfigVar.boardBoxWidth*2, 60);
        // button.moveTo(boardConfigVar.boardBoxWidth*2, 60);
        // button.lineTo(boardConfigVar.boardBoxWidth*4, 60);
        // button.moveTo(boardConfigVar.boardBoxWidth*3, 60);
        // button.lineTo(boardConfigVar.boardBoxWidth*5, 60);
       
        // const button = new Graphics;
        
        // button.beginFill(parseInt(color), 1);
        // button.drawRoundedRect(0,-5,-500,10,1);
        // button.endFill();

        // button.beginFill(parseInt(color), 1);
        // button.drawRoundedRect(-500,-5,-500,10,1);
        // button.endFill();


        // this.lineG.addChild(button)

    }

    makeLines(line :{x:number, y:number}[])
    {
        const button = new Graphics;
        button.lineStyle(11, this.colorCode, 1)
       for(let i = 0 ; i < line.length ; i++)
       {
        // boardConfigVar.boardPosY
            console.log((65 - line[i].y));
            
            button.lineTo(line[i].x,line[i].y);
            button.moveTo(line[i].x,line[i].y);
       }
        this.addChild(button);
    }
   
}
//   // button.beginFill(parseInt(color), 1);
//             // button.drawRoundedRect(0,-5,-500,10,1);
//             // button.endFill();

//             button.beginFill(this.colorCode, 1);
//             button.drawRoundedRect(0,-5,-500,10,1);
//             button.endFill();

//             let x = new Graphics;
//             x.beginFill(0x00000,1)
//             x.drawCircle(line[i].x,line[i].y,10);
//             x.endFill();
//             this.addChild(x);