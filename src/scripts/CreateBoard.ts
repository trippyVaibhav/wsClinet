import { Graphics } from "pixi.js";
import * as PIXI from 'pixi.js';
import { boardConfig as getBoardConfig, boardConfig, boardConfigVar, getLineinfo, Globals } from './Globals';
import { Lines } from "./Lines";
import { Slots } from './Slots';
import { get } from "http";
import { log } from "console";
import { TextLabel } from "./TextLabel";
import { Symbol } from "./Symbol";

export class CreateBoard extends Graphics
{
    board !: Graphics;
    slotArr : Slots[][] = [];

    lines : Lines [] = [];
    

    constructor()
    {
        super();

        let boardConfig = getBoardConfig();
        boardConfigVar.boardBoxWidth = boardConfig[0];
        boardConfigVar.boardBoxHeight = boardConfig[1];
        
        this.board = new PIXI.Graphics;
        this.board.beginFill();
        this.addChild(this.board);

        this.board.position.x = window.innerWidth/2 - boardConfigVar.Matrix.x/2 *boardConfigVar.boardBoxWidth/1.5 ;
        this.board.position.y = window.innerHeight/2 - boardConfigVar.Matrix.y/2 *boardConfigVar.boardBoxHeight/1.5;

        boardConfigVar.boardPosY =  this.board.position.y;


        const symbol = new Symbol(Globals.resources.gSymbol.texture ,0.35)
        symbol.position.x = boardConfigVar.boardBoxWidth/2;
        symbol.position.y = boardConfigVar.boardBoxHeight/2;
    
        this.board.addChild(symbol);

        const mask = new Graphics();
        mask.beginFill(0xffffff);
        mask.drawRect(0, 0,boardConfigVar.boardBoxWidth*boardConfigVar.Matrix.x+10,boardConfigVar.boardBoxHeight*boardConfigVar.Matrix.y+10);
        mask.endFill();
        mask.position.x = this.board.position.x;
        mask.position.y = this.board.position.y;
        this.addChild(mask);
        symbol.mask = mask;

        this.addSlots();
        this.makeLines();
        console.log(symbol.tint);
        
    }

    addSlots()
    { 
        let positionX = 0;
        let positionY = 0;

        for(let i = 0 ; i < boardConfigVar.Matrix.y; i++)
        {
           this.slotArr[i] = [];
            for(let j = 0; j <  boardConfigVar.Matrix.x; j++)
            { 
        
                this.slotArr[i][j] = new Slots({ x: positionX, y : positionY},i,j);
                positionX = this.slotArr[i][j].slot.position.x+ this.slotArr[i][j].width;
             
                if(j ==  boardConfigVar.Matrix.x-1 )
                {
                    positionX = 0;
                    positionY = this.slotArr[i][j].slot.position.y+ this.slotArr[i][j].height;
                }
                this.board.addChild(this.slotArr[i][j].slot);
            }
        }
    }

    makeLines()
    {

        console.log(this.slotArr[0][1].slot.position);
        

        let lineInfo;

        lineInfo = getLineinfo[0];     
        let line = new Lines(lineInfo.color,lineInfo.xPos,0,lineInfo.yPos);
        this.lines.push(line);
        console.log(lineInfo.yPos);
        
   
     
        this.lines[0].makeLines(this.getLineLocation(lineInfo.locations))
      
          
        // lineInfo = getLineinfo[1];     
        // line = new Lines(lineInfo.color,lineInfo.xPos,0,lineInfo.yPos);
        // this.lines.push(line);

        
      
     
        this.lines.forEach(element => {
            this.board.addChild(element);
        });
    }

    getLineLocation (lineInfo : number[][])
    {
        let lineArray = [];
       console.log(this.slotArr[0][0].slot.position.x + boardConfigVar.boardBoxWidth/2);
       
        for(let i = 0; i < lineInfo.length; i++)
        {
            let xIndex = lineInfo[i][0];
            let yIndex = lineInfo[i][1];
            lineArray[i]  = {x : this.slotArr[xIndex][yIndex].slot.position.x, y: this.slotArr[xIndex][yIndex].slot.position.y };
            console.log(lineArray[i].x);
            
        }
        return lineArray;
    }
}