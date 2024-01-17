class FarmLandHouse {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.x = x;
        this.y = y;
        this.height = 135;
        this.width = 135;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
        this.speed = 0.5;
        this.animations = null;
        this.loadAnimations();
        this.elapsedTime = 0;
    };

    loadAnimations() {
        this.doorAnimations = new Animator(this.spritesheet, 482, 64, 90, 70, 4, 0.25, 0, false, true);
        this.animationschicken = new Animator(this.spritesheet, 260, 898, 30, 30, 3, 0.3, 0, false, true);

    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 447, 154, 192,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.width,
            this.height);

        this.doorAnimations.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 45,
            this.y - this.game.camera.y + 100,
            0.5);

        this.animationschicken.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 20,
            this.y - this.game.camera.y + 65,
            1);
    }

}