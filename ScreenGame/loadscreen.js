class LoadingScreen {
    constructor(game, x, y) {
        this.game = game;
       // this.BB = new BoundingBox(x, y, 1, 1);
    }

    update() {
        this.removeFromWorld = true;    
    }

    draw(ctx) {
        ctx.font = '25px "Press Start 2P"'
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, 1500, 1500);
         ctx.fillStyle = 'White';

        ctx.fillText("Entering Portal...", 540 , 500 * 0.75);
        ctx.fillStyle = "green";
        ctx.fillRect(500, 400, 500, 50);

    }
}

class GameOver {
    constructor(game, x, y) {
        this.game = game;
       // this.BB = new BoundingBox(x, y, 1, 1);
       this.back = false;
       this.exitBB = new BoundingBox(570, 680, 150, 40);
    }

    update() {

        if (this.game.click) {
            const mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);

            if (mouseBB.collide(this.exitBB)) {
                this.back = true;
                console.log("MOUSE CLICK ON BACK");
            } 

            // Reset click
            this.game.click = null;
        }
    }

    draw(ctx) {
      
        ctx.font = '35px "Press Start 2P"'
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, 1500, 1500);
         ctx.fillStyle = 'White';
        ctx.fillText("YOU ARE DEAD!", 430 , 500 * 0.75);

        ctx.fillText("Back", 570, 950 * 0.75);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(570, 680, 150, 40);
           
            
        }
    }
}

class EndGame {
    constructor(game, x, y) {
        this.game = game;
        this.exit = false;
        this.exitBB = new BoundingBox(470, 680, 100, 40);
    }

    update() {
        if (this.game.click) {
            const mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);

            if (mouseBB.collide(this.exitBB)) {
                this.exit = true;
                console.log("MOUSE CLICK ON EXIT");
            } 

            // Reset click
            this.game.click = null;
        }
    }

    draw(ctx) {
     

        ctx.font = '25px "Press Start 2P"'
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, 1500, 1500);

        // ctx.fillStyle = 'white';
        // ctx.fillRect(348, 248, 304, 54);
        // ctx.fillRect(348, 348, 304, 54);
        // ctx.fillRect(348, 448, 304, 54);

      

        // ctx.fillStyle = "green";
        // ctx.fillRect(350, 250, 300, 50);
       ctx.fillStyle = 'white';
        ctx.fillText("Congratulation, you beat the game!", 150, 390 * 0.75);

     
        ctx.fillText("Back", 470, 950 * 0.75);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(470, 680, 100, 40);
           
            
        }
    }
}
