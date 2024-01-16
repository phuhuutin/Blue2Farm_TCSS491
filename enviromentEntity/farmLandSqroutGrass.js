class FarmLandSqroutGrass{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.x = x;
        this.y = y;
        this.height = 32;
        this.width = 32;
       // this.game.land = this;
        // spritesheet
       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
    }; 

    update(){

    };
    draw(ctx) {
 
     //   ctx.fillStyle = "#367f63";
      //  ctx.fillRect(0- this.game.camera.x, - this.game.camera.y, 2000, 200);
    }

}