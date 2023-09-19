import { Sprite, Texture, Text } from 'pixi.js';
import { Globals, boardConfigVar } from './Globals';
import { Easing, Tween } from '@tweenjs/tween.js';

export class Symbol extends Sprite
{
    symbol : string = "-1";
    shouldMove :boolean =  false;

    constructor(scale : number,symbol: string,position :{x: number, y :number})
    {
      let char = `Char${symbol}`;
      super(Globals.resources[char].texture);
      
      this.anchor.set(0.5);
      this.scale.set(scale);  

      this.symbol = symbol;
      this.position.x = position.x;
      this.position.y = position.y;
    }

    tweenToSlot(ypos : number, pos : boolean )
    {
      let newPos  = this.position.y + ypos;
      if(!pos)
      {
        this.shouldMove = false;
        const tween = new Tween(this)
        .to({y : newPos},500)
        .easing(Easing.Back.InOut)
        .start();
      }
      else 
      {
        const tween = new Tween(this)
        .to({y : newPos},500)
        .easing(Easing.Back.In)
        .onComplete(()=>{this.shouldMove = true})
        .start();
      }
    }

}
