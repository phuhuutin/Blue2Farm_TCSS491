class NextDayCutScene{
    constructor(game) {
    Object.assign(this, { game});
        this.removeFromWorld = false;
        this.elapsed = 0;

    }; 


    update(){
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 3.5) {
            console.log("alo")
            this.removeFromWorld = true;
        };

        if(PARAMS.CANVAS_HEIGHT * 0.15 - (this.elapsed-2) * 100 +100 > PARAMS.CANVAS_HEIGHT * 0.18 )
        this.sunPositionY = PARAMS.CANVAS_HEIGHT * 0.15 - (this.elapsed-2) * 120 +100;


    };
    draw(ctx) {
        

        // ctx.fillStyle = "Black";
        // ctx.fillRect(0,0, 2000, 1000);

        // Draw sky
        ctx.globalAlpha = 0.8;
        const skyGradient = ctx.createRadialGradient(PARAMS.CANVAS_WIDTH / 2, PARAMS.CANVAS_HEIGHT * 0.7, 0, PARAMS.CANVAS_WIDTH / 2, PARAMS.CANVAS_HEIGHT * 0.7, PARAMS.CANVAS_WIDTH);
        skyGradient.addColorStop(0, '#820');
        skyGradient.addColorStop(0.4, '#610');
        skyGradient.addColorStop(0.8, '#400');
        skyGradient.addColorStop(1, '#100');
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT * 0.5);
        // Draw sun
        ctx.globalAlpha = 1;
        const sunGradient = ctx.createLinearGradient(PARAMS.CANVAS_WIDTH * 0.45 - 50, PARAMS.CANVAS_HEIGHT * 0.15 - 50, PARAMS.CANVAS_WIDTH * 0.45 + 50, PARAMS.CANVAS_HEIGHT * 0.15 + 50);
        sunGradient.addColorStop(0, '#ff0');
        sunGradient.addColorStop(1, '#d00');
        ctx.beginPath();
        ctx.arc(PARAMS.CANVAS_WIDTH * 0.45, this.sunPositionY, 50, 0, 2 * Math.PI);
        ctx.fillStyle = sunGradient;
        ctx.fill();

        ctx.font = '12px "Press Start 2P"';
        this.game.ctx.fillStyle = "white";
        this.game.ctx.fillText( "Credit: codepen.io/TheBrutalTooth  ",10 ,PARAMS.CANVAS_HEIGHT * 0.5 + 15);

    // Draw sea
        ctx.globalAlpha = 1;
        const seaGradient = ctx.createRadialGradient(PARAMS.CANVAS_WIDTH / 2, 0, 0, PARAMS.CANVAS_WIDTH / 2, 0, PARAMS.CANVAS_WIDTH);
        seaGradient.addColorStop(0, '#007');
        seaGradient.addColorStop(1, '#004');
        ctx.fillStyle = seaGradient;
        ctx.fillRect(0, PARAMS.CANVAS_HEIGHT * 0.5, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT * 0.5);

    




        let midpointX = PARAMS.CANVAS_WIDTH/2;
        let midpointY = PARAMS.CANVAS_HEIGHT/2;

        ctx.font = '50px "Press Start 2P"';
        ctx.fillStyle = "white";
        ctx.fillText( "Days  "+ PARAMS.DAYCOUNTER, midpointX - midpointX*0.15 ,midpointY- midpointY*0.15);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect( 64*21 - this.game.camera.x,300- this.game.camera.y, 700, 60*10);


        }

    }

}
 