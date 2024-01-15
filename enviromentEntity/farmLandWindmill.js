class FarmLandWindmill {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path });
        this.x = x;
        this.y = y;
        
        this.speed = 0.5;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");

        this.animations = null;
        this.loadAnimations();
        this.elapsedTime = 0;
    };

    loadAnimations() {
        this.animations = new Animator(this.spritesheet, 419, 291, 96, 96, 3, 0.25, 0, false, true);
    };

    update() {

    };
    draw(ctx) {
        this.animations.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x - (48/2),
            this.y - this.game.camera.y - (46/2) ,
            0.5);
    }

}