const AnimalType = {
    COW: 'cow',
    EATINGCOW: 'eatingCow',
    CHICKEN: 'chicken',
    SHEEP: 'sheep',

};

class FarmLandAnimal {
    constructor(game, x, y, type) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
        this.speed = 0.5;
        this.animations = null;
        this.elapsedTime = 0;

        switch (type) {
            case AnimalType.COW:
                this.animations = new Animator(this.spritesheet, 256, 1011, 63, 38,
                    3, 0.5, 0, false, true);
                break;
            case AnimalType.CHICKEN:
                this.animations = new Animator(this.spritesheet, 257, 833, 31, 31,
                    3, 0.5, 0, false, true);
                break;
            case AnimalType.EATINGCOW:
                this.animations = new Animator(this.spritesheet, 273, 1185, 63, 64,
                    3, 0.5, 0, false, true);
                break;
            case AnimalType.SHEEP:
                this.animations = new Animator(this.spritesheet, 652, 1058, 60, 58,
                    3, 0.5, 0, false, true);
                break;
            default:
                console.log("unknown animal")
        }
    }

    update() {
        // Add your update logic here if needed
    }

    draw(ctx) {
        // Draw the static image
        this.animations.drawFrame(this.game.clockTick,
                    ctx,
                    this.x - this.game.camera.x,
                    this.y - this.game.camera.y,
                    0.8);
    }
}
