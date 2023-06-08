import { StartScene } from "./scenes/StartScene.js";
import { PlayScene } from "./scenes/PlayScene.js";
import { ResultScene } from "./scenes/ResultScene.js";

export const CARDS = [
    100, 120, 130, 131, 210, 220, 230, 231, 300, 320, 330, 331, 410, 420, 430,
    431, 510, 520, 530, 531, 610, 620, 630, 631, 710, 720, 730, 731, 800, 810,
    830, 831, 910, 920, 930, 931, 1010, 1020, 1030, 1031, 1100, 1110, 1120,
    1130, 1200, 1230, 1231, 1232,
];

const config = {
    parent: "mainFrame",
    type: Phaser.AUTO,
    height: 500,
    width: 900,
    scene: [StartScene, PlayScene, ResultScene],
};

class Game extends Phaser.Game {
    constructor(config) {
        super(config);
    }
}

window.addEventListener("load", () => {
    const game = new Game(config);
});
