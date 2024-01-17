class FarmLandGiantHouse {
    constructor(game, x, y, path, houseSpritesheet, windmillSpritesheet) {
        Object.assign(this, { game, x, y, path });
        this.x = x;
        this.y = y;
        this.height = 200;
        this.width = 200;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmHouses.png");
        this.speed = 0.5;
        this.windmillSpritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
        this.chimneySpritesheet = ASSET_MANAGER.getAsset("./sprites/farmHouses.png");
        this.doorSpritesheet = ASSET_MANAGER.getAsset("./sprites/farmAsset.png");

        this.animations = null;
        this.loadAnimations();
        this.elapsedTime = 0;
    };

    loadAnimations() {
        this.windmillAnimation1 = new Animator(this.windmillSpritesheet, 419, 291, 96, 96, 3, 0.3, 0, false, true);
        this.windmillAnimation2 = new Animator(this.windmillSpritesheet, 419, 291, 96, 96, 3, 0.3, 0, false, true);
        this.chimneyAnimation = new Animator(this.chimneySpritesheet, 930, 201, 32, 92, 4, 0.25, 0, false, true);
        this.doorAnimations = new Animator(this.doorSpritesheet, 482, 341, 46, 89, 3, 0.3, 0.3, false, true);

    };

    update() {

    };
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 495, 5, 402, 386,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.width,
            this.height);
        


        this.windmillAnimation1.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 30,
            this.y - this.game.camera.y + 55,
            0.5);

        this.windmillAnimation2.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 127,
            this.y - this.game.camera.y + 55,
            0.5);

        this.chimneyAnimation.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 170,
            this.y - this.game.camera.y + 10,
            0.7);

        this.doorAnimations.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 40,
            this.y - this.game.camera.y + 105,
            0.5);
    }

}