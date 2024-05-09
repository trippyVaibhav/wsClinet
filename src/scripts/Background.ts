import * as PIXI from "pixi.js";
import { Resource } from "pixi.js";
import { config } from "./appConfig";
import { Globals } from "./Globals";

export class Background extends PIXI.TilingSprite {
    constructor(topImage: any, width = config.logicalWidth, height = config.logicalHeight, scaleSize = null) {

        super(topImage);


        this.width = width;
        this.height = height;

        if (scaleSize != null) {
            this.width *= scaleSize;
            this.height *= scaleSize;
        }
    }
}

export class BackgroundGraphic extends PIXI.Graphics {

    defaultProperties: any = undefined;

    constructor(width: number, height: number, color: any) {
        super();
        this.defaultProperties = {
            width: width,
            height: height,
            color: color
        };

        this.createGraphic();
    }

    createGraphic() {
        this.clear();
        this.beginFill(this.defaultProperties.color, 1);
        this.drawRect(0, 0, this.defaultProperties.width, this.defaultProperties.height);
        this.endFill();
    }

    resetBg(width: number | null = null, height: number | null = null, color: number | null = null) {
        if (width != null)
            this.defaultProperties.width = width;

        if (height != null)
            this.defaultProperties.height = height;

        if (color != null)
            this.defaultProperties.color = color;

        this.createGraphic();
    }
}


export class BackgroundSprite extends PIXI.Sprite {


    defaultProperties: any = undefined;


    constructor(texture: PIXI.Texture<Resource> | undefined, width: number, height: number, scaleSize: number | null = null) {
        super(texture);


        // this.defaultProperties = {
        //     width: width,
        //     height: height,
        //     scaleSize: scaleSize
        // };

        this.width =  width;
        this.height = height;

        this.position.x =0;
        this.position.y = 0;
    }
    


    resetBg(width: number | null = null, height: number | null = null) {
        // if (width != null)
        //     this.defaultProperties.width = width;

        // if (height != null)
        //     this.defaultProperties.height = height;

        this.width =  window.innerWidth*50;
        this.height = window.innerHeight*50;

        this.position.x = - window.innerWidth*2;
        this.position.y = - window.innerHeight*2;

    }
}

export class AnimatedBackgroundSprite extends PIXI.AnimatedSprite {
    defaultProperties: any = undefined;


    constructor(texture: PIXI.Texture<Resource>[], width: number, height: number, scaleSize: number | null = null) {
        super(texture);

        this.defaultProperties = {
            width: width,
            height: height,
            scaleSize: scaleSize
        };

        this.width = width;
        this.height = height;

        if (scaleSize != null)
            this.scale.set(scaleSize);


        this.updateBackgroundIndex(0);
    }


    updateBackgroundIndex(index: number) {
        this.gotoAndStop(index);
    }

    resetBg(width: number | null = null, height: number | null = null) {
        if (width != null)
            this.defaultProperties.width = width;

        if (height != null)
            this.defaultProperties.height = height;

        this.width = this.defaultProperties.width;
        this.height = this.defaultProperties.height;
    }
}
