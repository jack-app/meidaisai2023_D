import { StartScene } from "./scenes/StartScene.js"
import { PlayScene } from "./scenes/PlayScene.js"
import { ResultScene } from "./scenes/ResultScene.js"



const config = {
    parent: 'mainFrame',
    type: Phaser.AUTO,
    height: 600,
    width: 800,
    scene: [StartScene, PlayScene, ResultScene],

    physics: {
		default: "arcade",
		arcade: {
			debug: true,// デバッグモード
			gravity: {y: 300}// 重力の強さ
		}
	}
}




class Game extends Phaser.Game {
    constructor(config) {
        super(config)
    }
}



window.addEventListener("load", () => {
    const game = new Game(config)
})