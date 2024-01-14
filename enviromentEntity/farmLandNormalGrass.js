class FarmLandNormalGrass{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.x = 0;
        this.y = 0;
        // spritesheet
       // this.spritesheet = ASSET_MANAGER.getAsset("./sprites/grassbase.png");
    }; 

    update(){

    };
    draw(ctx) {
   
     
        ctx.fillStyle = "#367f63";
        ctx.fillRect(0- this.game.camera.x, - this.game.camera.y, 2000, 2500);
     
    }

}
 