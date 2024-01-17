const StaticType = {
        ANIMAL_WATER: 'ANIMAL_WATER',
        ANIMAL_Food: 'ANIMAL_Food',

};

class FarmLandStatic {
        constructor(game, x, y, type) {
                Object.assign(this, { game, x, y });
                this.type = type;
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
        }
        update() {
                // Add your update logic here if needed
        }
        draw(ctx) {
                // Draw the static image
                switch (this.type) {
                        case StaticType.ANIMAL_Food:
                                ctx.drawImage(this.spritesheet, 707, 320, 59, 31,
                                        this.x - this.game.camera.x,
                                        this.y - this.game.camera.y,
                                        70, 40);
                                break;
                        case StaticType.ANIMAL_WATER:
                                ctx.drawImage(this.spritesheet, 545, 226, 30, 57,
                                        this.x - this.game.camera.x,
                                        this.y - this.game.camera.y,
                                        30, 50);
                                break;

                }
        }
}
