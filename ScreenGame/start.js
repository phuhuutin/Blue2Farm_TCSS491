class Start {
    constructor(game, x, y) {
        this.game = game;
        this.startBB = new BoundingBox(550, 250, 300, 50);
        this.aboutBB = new BoundingBox(550, 350, 300, 50);
        this.creditBB = new BoundingBox(550, 450, 300, 50);

        this.clickOnStart = false;
        this.clickOnAbout = false;
        this.clickOnCredit = false;
    }

    update() {
        if (this.game.click) {
            const mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);

            if (mouseBB.collide(this.startBB)) {
                this.clickOnStart = true;
                console.log("MOUSE CLICK ON START");
            } else if (mouseBB.collide(this.aboutBB)) {
                this.clickOnAbout = true;
                console.log("MOUSE CLICK ON ABOUT");
            } else if (mouseBB.collide(this.creditBB)) {
                this.clickOnCredit = true;
                console.log("MOUSE CLICK ON CREDIT");
            }

            // Reset click
            this.game.click = null;
        }
    }

    draw(ctx) {
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(350, 250, 300, 50);
            ctx.strokeRect(350, 350, 300, 50);
            ctx.strokeRect(350, 450, 300, 50);
        }

    
        ctx.font = '25px "Press Start 2P"'
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, 1500, 1500);

        ctx.fillStyle = 'white';
        ctx.fillRect(548, 248, 304, 54);
        ctx.fillRect(548, 348, 304, 54);
        ctx.fillRect(548, 448, 304, 54);

      

        ctx.fillStyle = "green";
        ctx.fillRect(550, 250, 300, 50);
        ctx.fillStyle = 'white';
        ctx.fillText("Start", 650, 390 * 0.75);

        ctx.fillStyle = "green";
        ctx.fillRect(550, 350, 300, 50);
        ctx.fillStyle = 'white';
        ctx.fillText("About", 650, 525 * 0.75);

        ctx.fillStyle = "green";
        ctx.fillRect(550, 450, 300, 50);
        ctx.fillStyle = 'white';
        ctx.fillText("Credit", 650, 660 * 0.75);

        

    }
}


class About {
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
        ctx.fillText("Anything about the Game", 50, 390 * 0.75);

        ctx.fillText("Skills for the game", 50, 490 * 0.75);

        ctx.fillText("Key to use the skills", 50, 590 * 0.75);

        ctx.fillText("......", 50, 690 * 0.75);

     

        ctx.fillText("Back", 470, 950 * 0.75);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(470, 680, 100, 40);
           
            
        }
    }
}

class Credit {
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
        ctx.fillText("This game is created By:", 250, 390 * 0.75);

        ctx.fillText("Tin, Thinh, Lixin ", 340, 490 * 0.75);

        ctx.fillText("Back", 470, 950 * 0.75);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(470, 680, 100, 40);
           
            
        }
    }
}
