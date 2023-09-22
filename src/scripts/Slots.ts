import { Graphics, Sprite } from "pixi.js";
import { Globals, boardConfigVar } from "./Globals";

export class Slots extends Sprite {

    _yIndex : number = 0;
    _xIndex : number = 0;
    currentSlotSymbol : string  = "-1";

    constructor(position:{x: number, y: number},xIndex : number , yIndex : number)
    {
        super(Globals.resources.whiteBG.texture);

        this.anchor.set(0.5);
        this.scale.set(0.5);
        this.alpha = 0;
        this.position.x = position.x;
        this.position.y = position.y;

        this._xIndex = xIndex;
        this._yIndex = yIndex;

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