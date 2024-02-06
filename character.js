const PLANTNAMESHERE = {
    CORN: 0,
    STRAWBERRY: 1,
    RICE: 2
};
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
        this.spawnX = x;
        this.spawnY = y;
        this.height = 48;
        this.width = 48;
        this.game.character = this;
        this.radius = 30; //attack range
        this.speed = 0.5;
                // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/villager1.png");

        //healthbar information
        this.healthbar= new HealthBar(this);
        this.hitpoints = 100;
        this.level = 1;
        this.maxhitpoints = 100 ;
        this.baseDamage = 10 ;
        this.farmInventory = [];
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
        this.elapsedTime = 0;
        this.elapsedTime2= 8;
        this.counter =0;

        //Character Stats

        

        this.loadAnimations();

    };
    
    isDead(){
        this.x = this.spawnX;
        this.y = this.spawnY;
        this.hitpoints = this.maxhitpoints;

    }

    //initially load().
    loadAnimations() {

        this.farmInventory[PLANTNAMESHERE.CORN] = 0;
        this.farmInventory[PLANTNAMESHERE.STRAWBERRY] = 0;
        this.farmInventory[PLANTNAMESHERE.RICE] = 0;




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
    updateBBforDashingHorizontal(){
        this.BBDASHHorizonTal = new BoundingBox(this.x- this.game.camera.x- this.width/2 - 130, this.y- this.game.camera.y- this.height/2, this.width +130*2, this.height);

    }
    updateBBforDashingVertical(){
        this.BBDASHVertical = new BoundingBox(this.x- this.game.camera.x- this.width/2 , this.y- this.game.camera.y- this.height/2 - 130, this.width , this.height +130*2);

    }
    // updateLastBB() {
    //     this.lastBB = this.BB;
    // };
    update(){
        let canDash = true;

       // console.log(this.elapsedTime2);
        if(this.elapsedTime <= 10)this.elapsedTime += this.game.clockTick;
        if(this.elapsedTime2 <= 10) this.elapsedTime2 += this.game.clockTick;
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

        if(this.game.keyF ){
                canDash = true;
            //  console.log(canDash);
                    for (var i = 0; i < this.game.entities.length; i++){
                        var entity = this.game.entities[i];
                        if(entity instanceof LakeAndOtherSide ||entity instanceof InvisibleLakeBlocker ){
                            const collisionDirection1 = this.BBDASHHorizonTal.checkCollisionSides(entity.BB);                       
                            if(this.directionFace == Direction.RIGHT && collisionDirection1.left) {
                                console.log("Collision on right with " + entity.constructor.name);

                                canDash = false;
                            }else if(this.directionFace == Direction.LEFT && collisionDirection1.right){
                                console.log("Collision on Left with " + entity.constructor.name);
                                canDash = false;
                            } else if(this.directionFace == Direction.UP && collisionDirection1.bottom ){
                                console.log("Collision on UP with " + entity.constructor.name);
                                canDash = false;
                            } else if(this.directionFace == Direction.DOWN && collisionDirection1.top ){
                                console.log("Collision on DOWN with " + entity.constructor.name);
                                canDash = false;
                            }
                        }
                    }
                
            //  console.log(canDash);
            if(canDash){
                if(this.elapsedTime >0 && this.counter<15){
                    if(this.directionFace == Direction.RIGHT){
                        this.x+=10;
                        this.counter++;
                        this.game.addEntity(new Smoke(this.game, this.x-50, this.y-0  , this, true, true));
                    }else if(this.directionFace == Direction.LEFT){
                        this.x-=10;
                        this.counter++;
                        this.game.addEntity(new Smoke(this.game, this.x-10, this.y-0, this, true, true));
                    }else if(this.directionFace == Direction.UP){
                        this.y-=10;
                        this.counter++;
                        this.game.addEntity(new Smoke(this.game, this.x-30, this.y, this, true, true));
                    } else if(this.directionFace == Direction.DOWN){
                        this.y+=10;
                        this.counter++;
                    }
                    for (var i = 0; i < this.game.entities.length; i++){
                        var entity = this.game.entities[i];
                        if ((entity instanceof Slime || entity instanceof Boar) && collide(this,  entity)) {
                                if (this.elapsedTime > 0.001) {
                                var damage = this.baseDamage/2 + randomInt(4);
                                if(entity.hitpoints - damage < 0) {
                                    const dropX = entity.x;
                                    const dropY = entity.y;
                                //   this.game.addEntity(new HPBottle(this.game, dropX , dropY));
                                    this.game.addEntity(new DMGBottle(this.game, dropX , dropY));
                                    entity.removeFromWorld = true;
                                }
                                entity.hitpoints -= damage;
                                this.game.addEntity(new Score(this.game, entity.x - this.game.camera.x +  Math.floor(Math.random() * (31 - 20) + 20), entity.y - Math.floor(Math.random() * (31 - 20) + 20)- this.game.camera.y, damage));
                                this.elapsedTime = 0.00;
                            }

                            }
                    }
                    this.elapsedTime = 0;
                  
                    this.elapsedTime2=0;
         
            }
            if(this.elapsedTime2>8){
                this.counter =0;
              }

            }
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
                if(entity instanceof FarmLandBigTree || entity instanceof LakeAndOtherSide ||entity instanceof InvisibleLakeBlocker
                    || entity instanceof InvisibleFenceBlocker){

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
                if(entity instanceof WizardSpawn){
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

                if((entity instanceof HPBottle)){
                    this.maxhitpoints += 5;
                    if(this.hitpoints + 30 > this.maxhitpoints ) this.hitpoints = this.maxhitpoints;
                    else this.hitpoints += 30
                    entity.removeFromWorld = true;
                    this.game.addEntity(new PlusHP(this.game, this.x - this.game.camera.x, this.y- this.game.camera.y))
                }
                if((entity instanceof DMGBottle)){
                    this.baseDamage += 1;
                    entity.removeFromWorld = true;
                    this.game.addEntity(new PlusDMG(this.game, this.x - this.game.camera.x, this.y- this.game.camera.y))
                }
 
            }

            

 
            if ((entity instanceof Slime || entity instanceof Boar) && collide(this,  entity)) {
                        if(this.state === 1){
                        if (this.elapsedTime > 0.2) {
                            var damage = this.baseDamage + randomInt(4);
                            if(entity.hitpoints - damage < 0) {
                                const dropX = entity.x;
                                const dropY = entity.y;
                             //   this.game.addEntity(new HPBottle(this.game, dropX , dropY));
                                if(Math.random() < 0.5) this.game.addEntity(new DMGBottle(this.game, dropX , dropY))
                                else this.game.addEntity(new HPBottle(this.game, dropX , dropY))
                                entity.removeFromWorld = true;
                            }
                            entity.hitpoints -= damage;

                            this.game.addEntity(new Score(this.game, entity.x - this.game.camera.x, entity.y- this.game.camera.y, damage));
                            this.elapsedTime = 0;
                            
                        }
                       
                    }
            }
        }
        
       // this.updateLastBB();
        this.updateBB();
        this.updateBBforDashingHorizontal();
        this.updateBBforDashingVertical();
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
            ctx.strokeStyle = "Black";
            ctx.strokeRect(this.x- this.game.camera.x- this.width/2 - 130, this.y- this.game.camera.y- this.height/2, this.width +130*2, this.height );
            ctx.strokeRect(this.x- this.game.camera.x- this.width/2 , this.y- this.game.camera.y- this.height/2 - 130, this.width , this.height +130*2 );

        }   
        this.healthbar.draw(ctx);
        ctx.font = '12px "Press Start 2P"';
        this.game.ctx.fillStyle = "White";

 
    };


    getListOfRequiredForNextLevel() {
         // Adjust the base threshold as needed
        const baseCornThreshold = 1; 
        const baseStrawberryThreshold = 1;  
        const baseRiceThreshold = 2;  

        const cornThreshold = baseCornThreshold + (this.level * 5);
        const strawberryThreshold = baseStrawberryThreshold + (this.level * 5);
        const riceThreshold = baseRiceThreshold + (this.level * 5);
        
        return [cornThreshold,strawberryThreshold,riceThreshold];
    }

    levelUp() {
        const requiredPlants = this.getListOfRequiredForNextLevel(this.level);
    
        if (
            this.farmInventory[PLANTNAMESHERE.CORN] >= requiredPlants[PLANTNAMESHERE.CORN] &&
            this.farmInventory[PLANTNAMESHERE.STRAWBERRY] >= requiredPlants[PLANTNAMESHERE.STRAWBERRY] &&
            this.farmInventory[PLANTNAMESHERE.RICE] >= requiredPlants[PLANTNAMESHERE.RICE]
        ) {

            this.level++;
            this.maxhitpoints += 20 + 5*this.level;
            this.hitpoints = this.maxhitpoints;
            this.baseDamage +=5 + 2*this.level;
            this.farmInventory[PLANTNAMESHERE.CORN] = this.farmInventory[PLANTNAMESHERE.CORN] - requiredPlants[PLANTNAMESHERE.CORN];
            this.farmInventory[PLANTNAMESHERE.STRAWBERRY] = this.farmInventory[PLANTNAMESHERE.STRAWBERRY] - requiredPlants[PLANTNAMESHERE.STRAWBERRY];
            this.farmInventory[PLANTNAMESHERE.RICE] =  this.farmInventory[PLANTNAMESHERE.RICE] - requiredPlants[PLANTNAMESHERE.RICE];
            this.game.addEntity(new LevelUp(this.game, this.x - this.game.camera.x, this.y- this.game.camera.y));
            console.log("Congratulations! You've leveled up to level " + this.level + "!");
        }
    }

}