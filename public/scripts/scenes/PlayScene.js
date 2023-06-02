import { Judgeyaku } from "../common.js";

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: "PlayScene" })
    }


    init() {
        // Can be defined on your own Scenes.
        // This method is called by the Scene Manager when the scene starts, before preload() and create().
        console.log(Judgeyaku([100,300,800])); //{yakus:[{num:1,name:'三光'}],mon:5}
        console.log(Judgeyaku([100,]));        //{yakus:[],mon:0}
        
    }


    preload() {
        // Can be defined on your own Scenes. Use it to load assets.
        // This method is called by the Scene Manager, after init() and before create(), only if the Scene has a LoaderPlugin.
        // After this method completes, if the LoaderPlugin's queue isn't empty, the LoaderPlugin will start automatically
        
        this.load.image('backimage','/public/images/background.png')
        
        
    }


    create() {
        // Can be defined on your own Scenes. Use it to create your game objects.
        // This method is called by the Scene Manager when the scene starts, after init() and preload().
        // If the LoaderPlugin started after preload(), then this method is called only after loading is complete.
        
        let backimage = this.add.image(450,250,'backimage')
             backimage.scaleX = backimage.scaleX * 1.15;
             backimage.scaleY = backimage.scaleY * 1.15;
        
        const sceneName = this.add.text(150, 70, 'PlayScene').setFontSize(30).setFontFamily("Arial").setOrigin(0.5).setInteractive();

	    const change = this.add.text(150, 130, 'Change Scene!').setFontSize(20).setFontFamily("Arial").setOrigin(0.5).setInteractive();

        change.on('pointerdown', function (pointer) {
            this.scene.start('ResultScene');
        }, this);

        //場の四角
        var graphics = this.add.graphics();
        graphics.fillStyle(0x3A3A3A); 
        graphics.fillRect(200, 125, 500, 250); // (x, y, width, height)

        //AIplayer 持ち札
        var graphics = this.add.graphics();
        graphics.fillStyle(0x1A1919);
        graphics.fillRect(10, 0, 500, 120); // (x, y, width, height) 

        //player 持ち札
        var graphics = this.add.graphics();
        graphics.fillStyle(0x1A1919);
        graphics.fillRect(390, 380, 500, 120,); // (x, y, width, height)
         
        //AIplayer name
        var graphics = this.add.graphics();
        graphics.fillStyle(0x282828);
        graphics.fillRect(690, 100, 200, 50,); // (x, y, width, height)

        //player name
        var graphics = this.add.graphics();
        graphics.fillStyle(0x282828);
        graphics.fillRect(10, 340, 200, 50,); // (x, y, width, height)

        

        
    }


    update() {
        // https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html#update
    }
}