import { Graphics, Sprite } from "pixi.js";
import { boardConfigVar } from "./Globals";

export class Slots extends Sprite {

    _yIndex : number = 0;
    _xIndex : number = 0;
    currentSlotSymbol : string  = "-1";

    slot !: Sprite;
    constructor(position:{x: number, y: number},xIndex : number , yIndex : number)
    {
        super();

        this.slot = new Sprite();
       this.slot.anchor.set(0.5);
        
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