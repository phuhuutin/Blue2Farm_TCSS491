const Direction = {
    UP: 3,
    DOWN: 0,
    LEFT: 1,
    RIGHT: 2,
};
class MainCharacter{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.x = x;
        this.y = y;
        this.height = 48;
        this.width = 48;
        this.game.character = this;
        this.radius = 30; //attack range
     //   this.speed = 0.5;
     this.speed = 0.5;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/villager1.png");
        //if (luigi) this.spritesheet = ASSET_MANAGER.getAsset("./sprites/villager1.png");

        //healthbar information
        this.healthbar= new HealthBar(this);
        this.hitpoints = 100;
        this.maxhitpoints = 100;

        // MainCharacter's state variables
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 0 = walking, 1 = attacking, 2, idling
        this.directionFace  = Direction.DOWN;

        this.dead = false;

        // fire mario's state variables
        this.canThrow = true;
        this.throwFireballTimeElapsed = 0;
        this.fireballsThrown = 0;

        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;

        this.updateBB();

  
        this.animations = [];
        this.loadAnimations();
        this.elapsedTime = 0;

        //Character Stats
        this.level = 1;

    };

    loadAnimations() {
        for (var i = 0; i < 3; i++) {//State: 0 = walking, 1 = attacking 
            this.animations.push([]);
            for (var j = 0; j < 4; j++) { // 4 Directions
                this.animations[i].push([]);

            }
        }


        this.animations[0][Direction.DOWN] = new Animator(this.spritesheet, 0, 0, 48, 48, 3, 0.15, 0, false, true);

        this.animations[0][Direction.LEFT] = new Animator(this.spritesheet, 0, 48+1, 48, 48, 3, 0.15, 0, false, true);

        this.animations[0][Direction.RIGHT] = new Animator(this.spritesheet, 0, 48*2+1, 48, 48, 3, 0.15, 0, false, true);

        this.animations[0][Direction.UP] = new Animator(this.spritesheet, 0, 48*3+1, 48, 48, 3, 0.15, 0, false, true);


     
        this.animations[1][Direction.DOWN] = new Animator(this.spritesheet, 48*6, 0, 32, 32, 4, 0.1, 0, false, true);
        this.animations[1][Direction.LEFT] = new Animator(this.spritesheet, 48*6, 32, 32, 32, 4, 0.1, 0, false, true);
        this.animations[1][Direction.RIGHT] = new Animator(this.spritesheet, 48*6, 32*2, 32, 32, 4, 0.1, 0, false, true);
        this.animations[1][Direction.UP] = new Animator(this.spritesheet, 48*6, 32*3, 32, 32, 4, 0.1, 0, false, true);

        this.animations[2][Direction.DOWN] = new Animator(this.spritesheet, 48*3, 0, 48, 48, 3, 0.20, 0, false, true);

        this.animations[2][Direction.LEFT] = new Animator(this.spritesheet, 48*3, 48+1, 48, 48, 3, 0.20, 0, false, true);

        this.animations[2][Direction.RIGHT] = new Animator(this.spritesheet, 48*3, 48*2+1, 48, 48, 3, 0.20, 0, false, true);

        this.animations[2][Direction.UP] = new Animator(this.spritesheet, 48*3, 48*3+1, 48, 48, 3, 0.20, 0, false, true);




        
    };
    updateBB() {
        
            this.BB = new BoundingBox(this.x- this.game.camera.x- this.width/2, this.y- this.game.camera.y- this.height/2, this.width, this.height);
        
    };
    // updateLastBB() {
    //     this.lastBB = this.BB;
    // };
    update(){
        this.elapsedTime += this.game.clockTick;

        if (this.game.left && this.game.up  && this.x -  this.width/2 > 0 && this.x +  this.width/2 < 2000 ) {
            // Move diagonally to the top-left
            this.x -= this.speed/ Math.sqrt(2);
            this.y -= this.speed/ Math.sqrt(2);
            this.directionFace = Direction.LEFT;
        } else if (this.game.right && this.game.up&& this.x -  this.width/2 > 0 && this.x +  this.width/2 < 2000 ) {
            // Move diagonally to the top-right
            this.x += this.speed/ Math.sqrt(2);
            this.y -= this.speed/ Math.sqrt(2);
            this.directionFace = Direction.RIGHT;
        } else if (this.game.left && this.game.down&& this.x -  this.width/2 > 0 && this.x +  this.width/2 < 2000) {
            // Move diagonally to the bottom-left
            this.x -= this.speed/ Math.sqrt(2);
            this.y += this.speed/ Math.sqrt(2);
            this.directionFace = Direction.LEFT;
        } else if (this.game.right && this.game.down && this.x -  this.width/2 > 0 && this.x +  this.width/2 < 2000) {
            // Move diagonally to the bottom-right
            this.x += this.speed/ Math.sqrt(2);
            this.y += this.speed/ Math.sqrt(2);
            this.directionFace = Direction.RIGHT;
        } else if (this.game.left && this.x -  this.width/2 > 0 ) {
            this.x -= this.speed;
            this.directionFace = Direction.LEFT;
        } else if (this.game.right && this.x +  this.width/2 < 2000) {
            this.x += this.speed;
            this.directionFace = Direction.RIGHT;
        } else if (this.game.up) {
            this.y -= this.speed;
            this.directionFace = Direction.UP;
        }else if (this.game.down) {
            this.y += this.speed;
            this.directionFace = Direction.DOWN;
        }
        for (var i = 0; i < this.game.entities.length; i++){
            var entity = this.game.entities[i];
            
            if (entity.BB && this.BB.collide(entity.BB)) {
                // if (entity instanceof Slime) {
                //     if(this.state === 1){
                //         if (this.elapsedTime > 0.2) {
                //             var damage = 7 + randomInt(4);
                //             if(entity.hitpoints - damage < 0) entity.removeFromWorld = true;
                //             entity.hitpoints -= damage;

                //             this.game.addEntityFirst(new Score(this.game, entity.x, entity.y, damage));
                //             this.elapsedTime = 0;
                            
                //         }
                       
                //     }
                //    console.log("collided with Smile");
                // }else 
                if(entity instanceof FarmLandBigTree || entity instanceof LakeAndOtherSide ||entity instanceof InvisibleLakeBlocker ){
                    const collisionDirection = this.BB.checkCollisionSides(entity.BB);
                    if(collisionDirection.left){
                        this.x -= this.speed;
                    }else if(collisionDirection.right) {
                        this.x += this.speed;
                    }else if(collisionDirection.top) {
                        this.y -= this.speed;
                    }else if(collisionDirection.bottom) {
                        this.y += this.speed;
                    }
                
                    
                } 

 
            }
 
            if ((entity instanceof Slime || entity instanceof Boar) && collide(this,  entity)) {
                        if(this.state === 1){
                        if (this.elapsedTime > 0.2) {
                            var damage = 7 + randomInt(4);
                            if(entity.hitpoints - damage < 0) entity.removeFromWorld = true;
                            entity.hitpoints -= damage;

                            this.game.addEntityFirst(new Score(this.game, entity.x - this.game.camera.x, entity.y- this.game.camera.y, damage));
                            this.elapsedTime = 0;
                            
                        }
                       
                    }
            }
        }
        
       // this.updateLastBB();
        this.updateBB();
    }

    draw(ctx) {

        this.state = 0;

 

        if (this.game.left) {
          
            this.animations[0][Direction.LEFT].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - this.width/2,this.y - this.game.camera.y - this.height/2,PARAMS.SCALE);

        } else if (this.game.right) {
            this.animations[0][Direction.RIGHT].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);
        } else if (this.game.up) {
            this.animations[0][Direction.UP].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);

        } else if (this.game.down) {
            this.animations[0][Direction.DOWN].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x- this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);
        } else if(!this.game.spaceKey){
          //  ctx.drawImage(this.spritesheet,0,this.directionFace*48+1, 48,48, this.x - this.game.camera.x,this.y - this.game.camera.y,48*PARAMS.SCALE,48*PARAMS.SCALE);
            this.animations[2][this.directionFace].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x- this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);
        }
        
        if(this.game.spaceKey){

            this.state = 1;

            switch(this.directionFace){
                case Direction.DOWN:
                    this.animations[0][Direction.DOWN].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);
                    this.animations[1][Direction.DOWN].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 5 - this.width/2,this.y - this.game.camera.y + 30- this.height/2,PARAMS.SCALE);
                
                    break;
                case Direction.LEFT:
                    this.animations[0][Direction.LEFT].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x- this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);
                    this.animations[1][Direction.LEFT].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - 10- this.width/2,this.y - this.game.camera.y + 20- this.height/2,PARAMS.SCALE);

                    break;
                case Direction.RIGHT:
                    this.animations[0][Direction.RIGHT].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x- this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);
                    this.animations[1][Direction.RIGHT].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 25- this.width/2,this.y - this.game.camera.y + 20- this.height/2,PARAMS.SCALE);
    
                break;
                case Direction.UP:
                    this.animations[1][Direction.UP].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 10- this.width/2,this.y - this.game.camera.y - 15- this.height/2,PARAMS.SCALE);
                    this.animations[0][Direction.UP].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x- this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);

                    break;
            }

        }
        if (PARAMS.DEBUG) {
           //w  ctx.strokeStyle = 'red';
            ctx.strokeRect(this.x - this.game.camera.x- this.width/2, this.y - this.game.camera.y- this.height/2, 48*PARAMS.SCALE, 48*PARAMS.SCALE);
            ctx.setLineDash([]);

            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x, this.y - this.game.camera.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();

        }
        this.healthbar.draw(ctx);



 
    };
}