import { Graphics } from "pixi.js";
import { boardConfigVar } from "./Globals";

export class Slots extends Graphics {

    _yIndex : number = 0;
    _xIndex : number = 0;
    currentSlotSymbol : string  = "-1";

    slot !: Graphics;
    constructor(position:{x: number, y: number},xIndex : number , yIndex : number)
    {
        super();

        this.slot = new Graphics;
        this.slot.beginFill(0xffffff);
        this.slot.lineStyle(5,0x00000,0.4);
        this.slot.drawRect(0,0,boardConfigVar.boardBoxWidth,boardConfigVar.boardBoxHeight);
        this.slot.alpha = 0.2;
        
        this.slot.position.x = position.x;
        this.slot.position.y = position.y;

        this._xIndex = xIndex;
        this._yIndex = yIndex;
        this.addChild(this.slot);

    }

    applyCurrentSlot(symbol : string)
    {
      this.currentSlotSymbol = symbol;
    }

    removeCurrentSlot()
    {
        this.currentSlotSymbol = "-1";
    }
}