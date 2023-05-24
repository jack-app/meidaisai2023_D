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
    }


    create() {
        // Can be defined on your own Scenes. Use it to create your game objects.
        // This method is called by the Scene Manager when the scene starts, after init() and preload().
        // If the LoaderPlugin started after preload(), then this method is called only after loading is complete.
        const sceneName = this.add.text(150, 70, 'ResultScene').setFontSize(30).setFontFamily("Arial").setOrigin(0.5).setInteractive();

	    const change = this.add.text(150, 130, 'Change Scene!').setFontSize(20).setFontFamily("Arial").setOrigin(0.5).setInteractive();

        change.on('pointerdown', function (pointer) {
            this.scene.start('StartScene');
        }, this);

        this.add.image(400,330, "background");
        
        let graphics = this.add.graphics();
        graphics.fillStyle(999999,90).fillRect(80, 130, 650, 400);

        this.add.text(90 , 140, "RESULT", {fontSize: 30,fontFamily: "impact"});
        this.add.text(160, 230, "VICTORY!!", {fontSize: 70,fontFamily: "fantasy"});
        this.add.text(450, 260, "congratulations", {fontSize: 30,fontFamily: "Arial"});
        this.add.text(150, 350, "score", {fontSize: 30,fontFamily: "cursive"});
        this.add.text(150, 400, "people", {fontSize: 30,fontFamily: "cursive"});
        this.add.text(300, 360, "対", {fontSize: 30,fontFamily: "Arial"});
        this.add.text(300, 400, "対", {fontSize: 30,fontFamily: "Arial"});

        this.add.line(0,120,1000,200,400,200,0xff0000);//line

        
    }


    update() {
        // https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html#update
    }
}