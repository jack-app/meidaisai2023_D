import { Judgeyaku } from "../common.js";
import Card from "../Card.js";
import { CARDS } from "../main.js";

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: "PlayScene" })
    }


    init() {
        // Can be defined on your own Scenes.
        // This method is called by the Scene Manager when the scene starts, before preload() and create().
        //console.log(Judgeyaku([100,300,800])); //{yakus:[{num:1,name:'三光'}],mon:5}
        //console.log(Judgeyaku([100,]));        //{yakus:[],mon:0}
    }


    preload() {
        // Can be defined on your own Scenes. Use it to load assets.
        // This method is called by the Scene Manager, after init() and before create(), only if the Scene has a LoaderPlugin.
        // After this method completes, if the LoaderPlugin's queue isn't empty, the LoaderPlugin will start automatically
        // 花札の画像を読み込む
        for(let i=0;i<CARDS.length;i++){
            this.load.image(CARDS[i].toString(), "./images/"+CARDS[i].toString()+".jpeg");
        }
    }


    create() {
        // Can be defined on your own Scenes. Use it to create your game objects.
        // This method is called by the Scene Manager when the scene starts, after init() and preload().
        // If the LoaderPlugin started after preload(), then this method is called only after loading is complete.
        const sceneName = this.add.text(150, 70, 'PlayScene').setFontSize(30).setFontFamily("Arial").setOrigin(0.5).setInteractive();

	    const change = this.add.text(150, 130, 'Change Scene!').setFontSize(20).setFontFamily("Arial").setOrigin(0.5).setInteractive();

        this.field_cards=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
        this.player_cards=[];
        this.player_got_cards=[[],[],[],[]];
        this.enemy_cards=[];
        this.enemy_cards_back=[];//札の裏側のオブジェクトを入れる
        this.enemy_got_cards=[[],[],[],[]];
        this.deck=[];
        let deck_list=CARDS;
        for (let i = deck_list.length - 1; i >= 0; i--) {
            let rand = Math.floor(Math.random() * (i + 1))
            // 配列の要素の順番を入れ替える
            let tmpStorage = deck_list[i]
            deck_list[i] = deck_list[rand]
            deck_list[rand] = tmpStorage
        }
        for(let i=0;i<8;i++){
            this.field_cards[i].push(new Card(this,deck_list[i],0));
            this.player_cards.push(new Card(this,deck_list[8+i],0));
            this.enemy_cards.push(new Card(this,deck_list[16+i],0));
        }
        for(let i=0;i<24;i++){
            this.deck.push(new Card(this,deck_list[24+i],0));
        }

        //場の札を表示
        this.field_cards.forEach((card_list, i) => {  
            card_list.forEach((card, j) => { 
                if(i%2==0){
                    card.setPosition(
                        100 * (Math.floor(i/2)) +250+10*j,
                        this.sys.canvas.height * 0.4
                    );
                }else{
                    card.setPosition(
                        100 * (Math.floor(i/2)) +250+10*j,
                        this.sys.canvas.height * 0.6
                    );    
                }
                this.add.existing(card);
            });
        });

        //自分の手札を表示
        this.player_cards.forEach((card, i) => {   
            card.setPosition(
                30 * (i) +50,
                this.sys.canvas.height * 0.9
            );
        this.add.existing(card);
        });

        //相手の手札の裏面を表示
        for(let i=0;i<8;i++){
            let back_side=this.add.graphics();
            back_side.fillStyle(0x000000, 1).fillRect(this.sys.canvas.width-30 * (i) -70,this.sys.canvas.height * 0.1-35, 40,70);
            this.enemy_cards_back.push(back_side);
        this.add.existing(back_side);
        };


        change.on('pointerdown', function (pointer) {
            this.scene.start('ResultScene');
        }, this);
    }


    update() {
        // https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html#update
    }

    //自分が手に入れた札を表示
    #toPlayerGotCard(card){
        let card_type=Math.floor((card.number%100)/10);
        card.setPosition(
            100*(card_type) + 10 * (this.player_got_cards[card_type].length) +500,
            this.sys.canvas.height * 0.9
        );
        this.player_got_cards[card_type].push(card);
        this.add.existing(card);
    }

    //相手が手に入れた札を表示
    #toEnemyGotCard(card){
        let card_type=Math.floor((card.number%100)/10);
        card.setPosition(
            this.sys.canvas.width-100*(card_type) - 10 * (this.enemy_got_cards[card_type].length) -500,
            this.sys.canvas.height * 0.1
        );
        this.enemy_got_cards[card_type].push(card);
        this.add.existing(card);
    }
}