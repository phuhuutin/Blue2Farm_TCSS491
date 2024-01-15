class FarmLandHouse{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.x = x;
        this.y = y;
        this.height = 135;
        this.width = 135;
       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
    }; 

    update(){

    };
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 447, 154, 192, 
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.width,
            this.height);
    }

}