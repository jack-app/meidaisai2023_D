export class ResultScene extends Phaser.Scene {
    constructor() {
        super({ key: "ResultScene" })
    }


    init() {
        // Can be defined on your own Scenes.
        // This method is called by the Scene Manager when the scene starts, before preload() and create().
    }


    preload() {
        // Can be defined on your own Scenes. Use it to load assets.
        // This method is called by the Scene Manager, after init() and before create(), only if the Scene has a LoaderPlugin.
        // After this method completes, if the LoaderPlugin's queue isn't empty, the LoaderPlugin will start automatically
        this.load.image("background", "./images/background.png");
        this.load.image("diamond", "./images/diamond.png");
    }


    create() {
        // Can be defined on your own Scenes. Use it to create your game objects.
        // This method is called by the Scene Manager when the scene starts, after init() and preload().
        // If the LoaderPlugin started after preload(), then this method is called only after loading is complete.
        

        this.add.image(450,250, "background"); //よこ,たて
        
        
        


        let graphics = this.add.graphics();
        
        graphics.fillStyle(0x000000,90).fillRect(125,50,650, 400); //fillRect(x, y, width, height) 


        this.add.text(150 , 70, "RESULT", {fontSize: 40,fontFamily: "impact"});
        this.add.text(160, 160, "VICTORY!!", {fontSize: 70,fontFamily: "fantasy"});
        this.add.text(500, 200, "congratulations", {fontSize: 30,fontFamily: "Arial"});
        this.add.text(200, 300, "score", {fontSize: 30,fontFamily: "cursive"});
        this.add.text(200, 350, "people", {fontSize: 30,fontFamily: "cursive"});
        this.add.text(350, 300, "100000文", {fontSize: 30,fontFamily: "serif"});
        this.add.text(400, 350, "1", {fontSize: 30,fontFamily: "serif"});
        this.add.text(650, 300, "100文", {fontSize: 30,fontFamily: "serif"});
        this.add.text(680, 350, "10", {fontSize: 30,fontFamily: "serif"});
        this.add.text(550, 350, "対", {fontSize: 30,fontFamily: "Arial"});
        this.add.text(550, 300, "対", {fontSize: 30,fontFamily: "Arial"});

        this.add.line(50,40,1000,200,400,200,0xffff00);//line (x,y,x1,y1,x2,y2,color,)
        this.add.image(150,240, "diamond");//端ひだり
        this.add.image(750,240, "diamond");//端みぎ
        this.add.line(195,110,130,10,10,10,0xffffff);//resultの下の線

        //クリックでシーン変更
        const sceneName = this.add.text(100, 20, 'ResultScene').setFontSize(30).setFontFamily("Arial").setOrigin(0.5).setInteractive();

	    const change = this.add.text(700, 70, 'スタートに戻る').setFontSize(20).setFontFamily("Arial").setOrigin(0.5).setInteractive();

        change.on('pointerdown', function (pointer) {
            this.scene.start('StartScene');
        }, this);

        

        
    }


    update() {
        // https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html#update
    }
}