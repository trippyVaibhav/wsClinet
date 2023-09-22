export const LoaderConfig = {
    backGround : require("../sprites/Gamesprite/BG.png"),
    Bottom : require("../sprites/Bottom.png"),
    Sprint : require("../sprites/Gamesprite/PlayButton.png"),
    Char0 :  require("../sprites/Gamesprite/Char1.png"),
    Char1 :  require("../sprites/Gamesprite/Char2.png"),
    Char2 :  require("../sprites/Gamesprite/Char3.png"),
    Char3 :  require("../sprites/Gamesprite/Char4.png"),
    Char4 :  require("../sprites/Gamesprite/Char5.png"),
    Char5 :  require("../sprites/Gamesprite/Char6.png"),
    arrL : require("../sprites/Gamesprite/LeftButton.png"),
    arrR : require("../sprites/Gamesprite/RightButton.png"),
    frame : require("../sprites/Gamesprite/Frame.png"),
    whiteBG : require("../sprites/whiteBG.png"),
    frame1 :require("../sprites/Gamesprite/Vector-1.png"),
    frame2 :require("../sprites/Gamesprite/Vector-2.png"),
    frame3 :require("../sprites/Gamesprite/Vector-3.png"),
    frame4 :require("../sprites/Gamesprite/Vector-4.png"),
    frameP1 :require("../sprites/Gamesprite/VectorP1.png"),
    frameP2 :require("../sprites/Gamesprite/VectorP2.png"),
    frameP3 :require("../sprites/Gamesprite/VectorP3.png"),
    frameP4 :require("../sprites/Gamesprite/VectorP4.png"),


    

};

export const staticData = {
    // logoURL: "https://cccdn.b-cdn.net/1584464368856.png",
    logoURL: require("/static/logo.png").default,

};

export const fontData = ["FredokaOne","Inter"];



export const LoaderSoundConfig: any = {
bgMusic : require("../sounds/BgMusic.mp3"),
onSpin : require("../sounds/onStartCoin.mp3"),
onWin : require("../sounds/winMusic.mp3"),
};

export const preloaderConfig = {
    // startLogo: require("../sprites/Logo.png")
}