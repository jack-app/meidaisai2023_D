import { points, people, setPoints } from "../main.js";

export class ResultScene extends Phaser.Scene {
    constructor() {
        super({ key: "ResultScene" });
    }

    init() {
        // Can be defined on your own Scenes.
        // This method is called by the Scene Manager when the scene starts, before preload() and create().
    }

    preload() {
        // Can be defined on your own Scenes. Use it to load assets.
        // This method is called by the Scene Manager, after init() and before create(), only if the Scene has a LoaderPlugin.
        // After this method completes, if the LoaderPlugin's queue isn't empty, the LoaderPlugin will start automatically
        this.load.image("background", "./images/background.png"); //背景

        this.load.image("diamond", "./images/diamond.png"); //線の端
    }

    create() {
        // Can be defined on your own Scenes. Use it to create your game objects.
        // This method is called by the Scene Manager when the scene starts, after init() and preload().
        // If the LoaderPlugin started after preload(), then this method is called only after loading is complete.
        let people_text = people.slice();
        for (let i = 0; i < 2; i++) {
            if (people_text[i] > 0) {
                people_text[i] = +people_text[i].toString() + "億人";
            } else {
                people_text[i] = "0人";
            }
        }

        let backimage = this.add.image(450, 250, "background"); //x,y,背景
        backimage.scaleX = backimage.scaleX * 1.15;
        backimage.scaleY = backimage.scaleY * 1.15;

        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 90).fillRect(125, 50, 650, 400); //fillRect(x, y, width, height) //黒背景

        this.add.text(150, 70, "RESULT", {
            fontSize: 40,
            fontFamily: "impact",
        });
        if (points[0] > 0) {
            this.add.text(160, 160, "Round winner : Player 1", {
                fontSize: 60,
                fontFamily: "fantasy",
            });
            if (people[0] >= 80) {
                this.add.text(160, 160, "Game Finished.", {
                    fontSize: 60,
                    fontFamily: "fantasy",
                });
                this.add.text(160, 160, "Player 1 is True Gambler.", {
                    fontSize: 50,
                    fontFamily: "fantasy",
                });
            }
        } else if (points[1] > 0) {
            if (people[1] >= 80) {
                this.add.text(160, 120, "Game Finished.", {
                    fontSize: 60,
                    fontFamily: "fantasy",
                });
                this.add.text(160, 180, "Player 2 is True Gambler", {
                    fontSize: 50,
                    fontFamily: "fantasy",
                });
            } else {
                this.add.text(160, 160, "Round winner : Player 2", {
                    fontSize: 60,
                    fontFamily: "fantasy",
                });
            }
        } else {
            this.add.text(160, 160, "DRAW", {
                fontSize: 70,
                fontFamily: "fantasy",
            });
        }

        this.add.text(200, 300, "score", {
            fontSize: 40,
            fontFamily: "cursive",
        });
        //this.add.text(200, 350, "people", {
            //fontSize: 30,
            //fontFamily: "cursive",
        //});
        this.add.text(350, 300, points[0].toString() + "文", {
            fontSize: 50,
            fontFamily: "serif",
        });
        //this.add.text(350, 350, people_text[0], {
            //fontSize: 30,
            //fontFamily: "serif",
        //});
        this.add.text(600, 300, points[1].toString() + "文", {
            fontSize: 50,
            fontFamily: "serif",
        });
        //this.add.text(600, 350, people_text[1], {
            //fontSize: 30,
            //fontFamily: "serif",
        //});
        //this.add.text(500, 350, "対", { fontSize: 30, fontFamily: "Arial" });
        this.add.text(500, 310, "対", { fontSize: 30, fontFamily: "Arial" });

        this.add.line(50, 40, 1000, 200, 400, 200, 0xffff00); //line (x,y,x1,y1,x2,y2,color,)
        this.add.image(150, 240, "diamond"); //端ひだり
        this.add.image(750, 240, "diamond"); //端みぎ
        this.add.line(195, 110, 130, 10, 10, 10, 0xffffff); //resultの下の線
        console.log(people);
        if (Math.min(people[0], people[1]) == 0) {
            const change = this.add
                .text(660, 70, "New Game", {
                    fontSize: 30,
                    fontFamily: "serif",
                })
                .setOrigin(0.5)
                .setInteractive();

            change.on(
                "pointerdown",
                function (pointer) {
                    setPoints([1, 0]);
                    this.scene.start("StartScene");
                },
                this
            );
        } else {
            const change = this.add
                .text(680, 70, "Next Round", {
                    fontSize: 30,
                    fontFamily: "serif",
                })
                .setOrigin(0.5)
                .setInteractive();

            change.on(
                "pointerdown",
                function (pointer) {
                    this.scene.start("PlayScene");
                },
                this
            );
        }
    }

    update() {
        // https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html#update
    }
}
