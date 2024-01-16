class FarmLandBigHouse{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.x = x;
        this.y = y;
        this.height = 150;
        this.width = 150;
       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmAsset.png");
    }; 

    update(){

    };
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 248, 582, 319, 294, 
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.width,
            this.height);
    }

}