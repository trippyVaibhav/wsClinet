import { Sprite, Texture } from "pixi.js"

export class Symbol extends Sprite
{
    symbol : string = "-1";

    constructor(symbolSprite : Texture | undefined,scale : number)
    {
      super(symbolSprite);

      this.anchor.set(0.5);
      this.scale.set(scale);


    }
}