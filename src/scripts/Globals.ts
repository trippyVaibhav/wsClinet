
import { Howl } from 'howler';
import * as PIXI from 'pixi.js';
import { App } from './App';
import { ScoreFunctions } from './DataHandler';
import { MyEmitter } from './MyEmitter';
import { SceneManager } from './SceneManager';
import { Scene } from './Scene';
import { Lines } from './Lines';

type globalDataType = {
  resources: PIXI.utils.Dict<PIXI.LoaderResource>;
  emitter: MyEmitter | undefined;
  isMobile: boolean;
  // fpsStats : Stats | undefined,
  soundResources: { [key: string]: Howl };

  App: App | undefined,

}

export const Globals: globalDataType = {
  resources: {},
  emitter: undefined,
  get isMobile() {
    //  return true;
    return PIXI.utils.isMobile.any;
  },
  // fpsStats: undefined,
  App: undefined,
  soundResources: {},

};

export const boardConfigVar =  {
  boardBoxWidth : 0,
  boardBoxHeight : 0,
  Matrix : {x : 5, y : 3},
  slotArr : [],
  maxLines : 1,
  boardPosY : 0,
  score : 0,
  Bet : 5,
  Coins : 100, 
  startPos : -815 ,
  restartPos : 650,
  shouldMove : false,
  seconds :5000,
}

export const getLineinfo : any = {
  
  0 : {
    color : "0xFF0000",
    locations : [[0,0],[0,1],[0,2],[0,3],[0,4]],
    xPos : false,
    yPos: 10,
    payScale : 10,
  }, 
  1 : {
    color : "0xFF0000",
    locations : [[1,4],[1,3],[1,2],[1,1],[1,0]],
    xPos : true,
    yPos: 250,
    payScale : 10,
  }, 
}

export const slotCharArr = {
  charArr : [['1',"2","1","3","2","0","2","2","1"],
             ['1',"2","1","2","3","0","1","2","1"],
             ['3',"2","1","3","2","0","2","1","1"],
             ['4',"1","2","1","3","0","1","2","3"],
             ['4',"1","1","1","2","0","1","1","1"],
            ]
} 

export const slotCharInfo = (slotChar : string) => {
  if(slotChar == "0") return 10;
  if(slotChar == "1") return 20;
  if(slotChar == "2") return 30;
  if(slotChar == "3") return 40;
  if(slotChar == "4") return 50;

}

export const boardConfig = () => {
  if(boardConfigVar.Matrix.x == 5 && boardConfigVar.Matrix.y == 3) return [180,150];
  if(boardConfigVar.Matrix.x == 5 && boardConfigVar.Matrix.y == 4) return [300,150];
  if(boardConfigVar.Matrix.x == 3 && boardConfigVar.Matrix.y == 3) return [250,150];
  if(boardConfigVar.Matrix.x == 4 && boardConfigVar.Matrix.y == 3) return [250,150];

  else console.log("This Matrix Not Found"); return [0,0];
}



// export const ChangeBg = () => {
//   if (CurrentGameData.CurrentLevel <= 1) {
//     return 0;
//   }
//   if (CurrentGameData.CurrentLevel > 1 && CurrentGameData.CurrentLevel <= 3) {
//     return 1;
//   }
//   if (CurrentGameData.CurrentLevel == 4) {
//     return 2;
//   }
//   if (CurrentGameData.CurrentLevel == 5) {
//     return 3;
//   }
//   if (CurrentGameData.CurrentLevel == 6) {
//     return 4;
//   }
//   if (CurrentGameData.CurrentLevel == 7) {
//     return 5;
//   }
//   if (CurrentGameData.CurrentLevel == 8) {
//     return 6;
//   }
// }

export function GetAnimationSprites(colorId: number) {

  let animatedSprite: (PIXI.Texture<PIXI.Resource> | undefined)[] = [];
  for (let i = 0; i <= 6; i++) {
    animatedSprite.push(Globals.resources[`CandyExplosion${colorId}${i}`].texture);
  }

  return animatedSprite;
}

export function weightedRand(spec: any) {
  var i, j, table: any = [];
  for (i in spec) {
    // The constant 10 below should be computed based on the
    // weights in the spec for a correct and optimal table size.
    // E.g. the spec {0:0.999, 1:0.001} will break this impl.
    for (j = 0; j < spec[i] * 10; j++) {
      table.push(i);
    }
  }
  return function () {
    return table[Math.floor(Math.random() * table.length)];
  }
}

export function randomRange(max: number): number {
  let rNumber = Math.floor(Math.random() * (max - 2000)) + 2000;
  return rNumber;
}
export function GetColorCode(colorId: any) {
  let colorCode = 0xFFFFFF;

  if (colorId == 1) { colorCode = 0x000000; }

  else if (colorId == 2) { colorCode = 0xea213a; }

  else if (colorId == 3) { colorCode = 0xff7400; }

  else if (colorId == 4) { colorCode = 0x23ff96; }

  else if (colorId == 5) { colorCode = 0x449cf4; }

  else if (colorId == 6) { colorCode = 0x9f78cc; }

  else if (colorId == 7) { colorCode = 0xf5d7ff; }

  else if (colorId == 8) { colorCode = 0x746a8e; }

  else if (colorId == 15) { colorCode = 0xebecf0; }

  else { colorCode = 0xFFFFFF }

  return colorCode;

}
export function getRandomInt( max: number) {

  max = Math.floor(max);
  return Math.floor(Math.random() * (max - 2) + 2); // The maximum is exclusive and the minimum is inclusive
}