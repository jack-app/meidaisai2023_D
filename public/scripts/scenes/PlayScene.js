import { Judgeyaku } from "../common.js";
import Card from "../Card.js";
import { CARDS } from "../main.js";

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: "PlayScene" });
    }

    init() {
        // Can be defined on your own Scenes.
        // This method is called by the Scene Manager when the scene starts, before preload() and create().
        // console.log(Judgeyaku([100,300,800])); //{yakus:[{num:1,name:'三光'}],mon:5}
        // console.log(Judgeyaku([100]));    //{yakus:[],mon:0}
        // console.log(Judgeyaku([120,220,320,420,520,620,720,920,1020,1120]));
        // console.log(Judgeyaku([120,220,320,420]));
        // console.log(Judgeyaku([120,220,320,420,520]));
        // console.log(Judgeyaku([120,220,320,420,520,620]));
        // console.log(Judgeyaku([220,320,420,520,620,920,1020]));
        //console.log(Judgeyaku([100,300,800])); //{yakus:[{num:1,name:'三光'}],mon:5}
        //console.log(Judgeyaku([100,]));        //{yakus:[],mon:0}
    }

    preload() {
        // Can be defined on your own Scenes. Use it to load assets.
        // This method is called by the Scene Manager, after init() and before create(), only if the Scene has a LoaderPlugin.
        // After this method completes, if the LoaderPlugin's queue isn't empty, the LoaderPlugin will start automatically
        this.load.image("backimage", "/public/images/background.png");
        this.load.image("field", "/public/images/field.jpg");
        // 花札の画像を読み込む
        for (let i = 0; i < CARDS.length; i++) {
            this.load.image(
                CARDS[i].toString(),
                "./images/" + CARDS[i].toString() + ".jpeg"
            );
        }
    }

    create() {
        // Can be defined on your own Scenes. Use it to create your game objects.
        // This method is called by the Scene Manager when the scene starts, after init() and preload().
        // If the LoaderPlugin started after preload(), then this method is called only after loading is complete.

        //札

        this.field_cards = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ];
        this.player_cards = [];
        this.selected = -1;
        this.player_got_cards = [[], [], [], []];
        this.enemy_cards = [];
        this.enemy_cards_back = []; //札の裏側のオブジェクトを入れる
        this.enemy_got_cards = [[], [], [], []];
        this.deck = [];
        this.deck_list = CARDS;
        this.shuffle = true;
        this.select_time = false;
        this.deck_card = null;

        let backimage = this.add.image(450, 250, "backimage");
        backimage.scaleX = backimage.scaleX * 1.15;
        backimage.scaleY = backimage.scaleY * 1.15;

        //場の四角
        let field1 = this.add.graphics();
        field1.fillStyle(0x3a3a3a);
        field1.fillRect(200, 125, 500, 250); // (x, y, width, height)

        let field2 = this.add.graphics();
        field2.fillStyle(0xffffff);
        field2.fillRect(205, 130, 490, 240);

        let field3 = this.add.image(450, 250, "field");
        field3.setInteractive();

        field3.on(
            "pointerdown",
            function () {
                if (this.selected != -1) {
                    let pos = 15;
                    let selected_month = Math.floor(this.selected / 100);
                    for (let i = 0; i < this.field_cards.length; i++) {
                        if (this.field_cards[i].length == 0) {
                            pos = Math.min(pos, i);
                        } else {
                            let month = Math.floor(
                                this.field_cards[i][0].number / 100
                            );
                            if (month == selected_month) {
                                return;
                            }
                        }
                    }
                    this.player_cards.forEach((player_card, k) => {
                        if (player_card.number == this.selected) {
                            if (pos % 2 == 0) {
                                player_card.setPosition(
                                    100 * Math.floor(pos / 2) + 250,
                                    this.sys.canvas.height * 0.4
                                );
                            } else {
                                player_card.setPosition(
                                    100 * Math.floor(pos / 2) + 250,
                                    this.sys.canvas.height * 0.6
                                );
                            }
                            this.field_cards[pos].push(player_card);
                            this.#fieldCardsInit(player_card, pos);
                            this.player_cards.splice(k, 1);
                        }
                    });
                    this.selected = -1;
                    this.#advanceTurn();
                }
            },
            this
        );

        //AIplayer 持ち札
        let aifield = this.add.graphics();
        aifield.fillStyle(0x1a1919);
        aifield.fillRect(10, 0, 500, 120); // (x, y, width, height)

        //player 持ち札
        let playerfield = this.add.graphics();
        playerfield.fillStyle(0x1a1919);
        playerfield.fillRect(390, 380, 500, 120); // (x, y, width, height)

        //AIplayer name
        let ainame1 = this.add.graphics();
        ainame1.fillStyle(0x282828);
        ainame1.fillRect(690, 100, 200, 50); // (x, y, width, height)

        let ainame2 = this.add.graphics();
        ainame2.fillStyle(0xffffff);
        ainame2.fillRect(695, 105, 190, 40); // (x, y, width, height)

        let ainame3 = this.add.graphics();
        ainame3.fillStyle(0x282828);
        ainame3.fillRect(696, 106, 188, 38); // (x, y, width, height)

        //player name
        let playername1 = this.add.graphics();
        playername1.fillStyle(0x282828);
        playername1.fillRect(10, 340, 200, 50); // (x, y, width, height)

        let playername2 = this.add.graphics();
        playername2.fillStyle(0xffffff);
        playername2.fillRect(15, 345, 190, 40);

        let playername3 = this.add.graphics();
        playername3.fillStyle(0x282828);
        playername3.fillRect(16, 346, 188, 38);

        //name
        this.add.text(50, 350, "Player").setFontSize(30);

        this.add.text(770, 110, "AI").setFontSize(30);

        //シーン切り替え
        const sceneName = this.add
            .text(150, 70, "PlayScene")
            .setFontSize(30)
            .setFontFamily("Arial")
            .setOrigin(0.5)
            .setInteractive();

        const change = this.add
            .text(150, 130, "Change Scene!")
            .setFontSize(20)
            .setFontFamily("Arial")
            .setOrigin(0.5)
            .setInteractive();

        while (this.shuffle) {
            this.shuffle = false;
            for (let i = this.deck_list.length - 1; i >= 0; i--) {
                let rand = Math.floor(Math.random() * (i + 1));
                // 配列の要素の順番を入れ替える
                let tmpStorage = this.deck_list[i];
                this.deck_list[i] = this.deck_list[rand];
                this.deck_list[rand] = tmpStorage;
            }
            for (let i = 0; i < 3; i++) {
                this.month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (let j = i * 8; j < 8 + i * 8; j++) {
                    this.month[Math.floor(this.deck_list[j] / 100) - 1]++;
                }
                if (Math.max(...this.month) == 4) {
                    this.shuffle = true;
                }
            }
        }
        let field_count = 0;
        let field_pos = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 16; i < 24; i++) {
            let month_num = Math.floor(this.deck_list[i] / 100) - 1;
            if (this.month[month_num] == 3) {
                if (field_pos[month_num] == -1) {
                    this.field_cards[field_count].push(
                        new Card(this, this.deck_list[i], 0)
                    );
                    field_pos[month_num] = field_count;
                    field_count++;
                } else {
                    this.field_cards[field_pos[month_num]].push(
                        new Card(this, this.deck_list[i], 0)
                    );
                }
            } else {
                this.field_cards[field_count].push(
                    new Card(this, this.deck_list[i], 0)
                );
                field_count++;
            }
        }
        for (let i = 0; i < 8; i++) {
            this.player_cards.push(new Card(this, this.deck_list[i], 0));
            this.enemy_cards.push(new Card(this, this.deck_list[8 + i], 0));
        }
        for (let i = 0; i < 24; i++) {
            this.deck.push(new Card(this, this.deck_list[24 + i], 0));
        }

        //場の札を表示
        this.field_cards.forEach((card_list, i) => {
            card_list.forEach((card, j) => {
                if (i % 2 == 0) {
                    card.setPosition(
                        100 * Math.floor(i / 2) + 250 + 10 * j,
                        this.sys.canvas.height * 0.4
                    );
                } else {
                    card.setPosition(
                        100 * Math.floor(i / 2) + 250 + 10 * j,
                        this.sys.canvas.height * 0.6
                    );
                }

                this.#fieldCardsInit(card, i);
            });
        });

        //自分の手札を表示
        this.player_cards.forEach((card, i) => {
            card.setPosition(30 * i + 50, this.sys.canvas.height * 0.9);

            //自分の手札

            card.on(
                "pointerdown",
                function (pointer) {
                    if (!this.select_time) {
                        if (this.selected == card.number) {
                            this.selected = -1;
                        } else {
                            this.selected = card.number;
                        }
                        this.player_cards.forEach((card, i) => {
                            if (this.selected == card.number) {
                                card.setPosition(
                                    30 * i + 50,
                                    this.sys.canvas.height * 0.8
                                );
                            } else {
                                card.setPosition(
                                    30 * i + 50,
                                    this.sys.canvas.height * 0.9
                                );
                            }
                        });
                    }
                },
                this
            );

            this.add.existing(card);
        });

        //相手の手札の裏面を表示
        for (let i = 0; i < 8; i++) {
            let back_side = this.add.graphics();
            back_side
                .fillStyle(0x000000, 1)
                .fillRect(
                    this.sys.canvas.width - 30 * i - 70,
                    this.sys.canvas.height * 0.1 - 35,
                    40,
                    70
                );
            this.enemy_cards_back.push(back_side);
            this.add.existing(back_side);
        }

        change.on(
            "pointerdown",
            function (pointer) {
                this.scene.start("ResultScene");
            },
            this
        );
    }

    update() {
        // https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html#update
    }

    //自分が手に入れた札を表示
    #toPlayerGotCard(card) {
        let card_type = Math.floor((card.number % 100) / 10);
        card.setPosition(
            100 * card_type +
                10 * this.player_got_cards[card_type].length +
                500,
            this.sys.canvas.height * 0.9
        );
        this.player_got_cards[card_type].push(card);
        this.add.existing(card);
    }

    //相手が手に入れた札を表示
    #toEnemyGotCard(card) {
        let card_type = Math.floor((card.number % 100) / 10);
        card.setPosition(
            this.sys.canvas.width -
                100 * card_type -
                10 * this.enemy_got_cards[card_type].length -
                500,
            this.sys.canvas.height * 0.1
        );
        this.enemy_got_cards[card_type].push(card);
        this.add.existing(card);
    }

    #fieldCardsInit(card, i) {
        card.on(
            "pointerdown",
            function (pointer) {
                if (!this.select_time) {
                    if (this.selected != -1) {
                        if (
                            Math.floor(card.number / 100) ==
                            Math.floor(this.selected / 100)
                        ) {
                            this.player_cards.forEach((player_card, k) => {
                                if (player_card.number == this.selected) {
                                    this.#toPlayerGotCard(player_card);
                                    this.player_cards.splice(k, 1);
                                }
                            });

                            this.field_cards[i].forEach((field_card, k) => {
                                this.#toPlayerGotCard(field_card);
                            });

                            this.field_cards[i] = [];
                            this.selected = -1;
                            this.#advanceTurn();
                        }
                    }
                } else {
                    if (this.deck_card != null) {
                        if (
                            Math.floor(card.number / 100) ==
                            Math.floor(this.deck_card.number / 100)
                        ) {
                            this.#toPlayerGotCard(this.deck_card);
                            this.field_cards[i].forEach((field_card, k) => {
                                this.#toPlayerGotCard(field_card);
                            });
                            this.deck_card = null;
                            this.field_cards[i] = [];
                            this.#enemyAction();
                        }
                    }
                }
            },
            this
        );

        this.add.existing(card);
    }
    //ターンを進める関数
    #advanceTurn() {
        this.select_time = true;
        let picked_card = this.deck.pop();
        picked_card.setPosition(150, this.sys.canvas.height * 0.5);
        this.add.existing(picked_card);
        this.deck_card = picked_card;
        let fit_index = [];
        let pos = 15;
        this.field_cards.forEach((card_list, i) => {
            if (card_list.length != 0) {
                if (
                    Math.floor(card_list[0].number / 100) ==
                    Math.floor(this.deck_card.number / 100)
                ) {
                    fit_index.push(i);
                }
            } else {
                pos = Math.min(pos, i);
            }
        });
        if (fit_index.length == 0) {
            if (pos % 2 == 0) {
                picked_card.setPosition(
                    100 * Math.floor(pos / 2) + 250,
                    this.sys.canvas.height * 0.4
                );
            } else {
                picked_card.setPosition(
                    100 * Math.floor(pos / 2) + 250,
                    this.sys.canvas.height * 0.6
                );
            }
            this.#fieldCardsInit(picked_card, pos);
            this.field_cards[pos].push(picked_card);
            this.deck_card = null;
            this.#enemyAction();
        } else if (fit_index.length == 1) {
            this.#toPlayerGotCard(picked_card);
            this.field_cards[fit_index[0]].forEach((field_card, k) => {
                this.#toPlayerGotCard(field_card);
            });
            this.field_cards[fit_index[0]] = [];
            this.deck_card = null;
            this.#enemyAction();
        }
    }
    //ターンを進める関数
    #enemyAction() {
        this.select_time = false;
    }
}
