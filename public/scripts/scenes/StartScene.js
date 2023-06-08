export class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: "StartScene" });
    }

    init() {
        // Can be defined on your own Scenes.
        // This method is called by the Scene Manager when the scene starts, before preload() and create().
    }

    preload() {
        // Can be defined on your own Scenes. Use it to load assets.
        // This method is called by the Scene Manager, after init() and before create(), only if the Scene has a LoaderPlugin.
        // After this method completes, if the LoaderPlugin's queue isn't empty, the LoaderPlugin will start automatically

        this.load.image("backimage", "/public/images/background.png");
        this.load.image("title", "/public/images/title4.jpg");
    }

    create() {
        // Can be defined on your own Scenes. Use it to create your game objects.
        // This method is called by the Scene Manager when the scene starts, after init() and preload().
        // If the LoaderPlugin started after preload(), then this method is called only after loading is complete.

        let backimage = this.add.image(450, 250, "backimage");
        backimage.scaleX = backimage.scaleX * 1.15;
        backimage.scaleY = backimage.scaleY * 1.15;

        let title = this.add.image(455, 250, "title");
        title.scaleX = backimage.scaleX * 0.65;
        title.scaleY = backimage.scaleY * 0.65;

        const sceneName = this.add
            .text(150, 70, "")
            .setFontSize(30)
            .setFontFamily("Arial")
            .setOrigin(0.5)
            .setInteractive();

        const change = this.add
            .text(660, 370, "▸GAME START")
            .setFontSize(30)
            .setFontFamily("Verdana")
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

    update() {
        // https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html#update
    }
}
