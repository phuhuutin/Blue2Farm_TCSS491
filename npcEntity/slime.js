
class Slime{
    constructor(game, x, y,path) {
        Object.assign(this, { game, x, y, path});

        this.x = x;
        this.y = y;


        //walking to the target information
        this.radius = 48/2;
        this.visualRadius = 200;

    
        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];
        var dist = distance(this, this.target);

        this.maxSpeed = 100; // pixels per second
        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
        
        //healthbar information
        this.healthbar= new HealthBar(this, this.game);
        this.hitpoints = 100;
        this.maxhitpoints = 100;
       // this.game.slime = this;
        this.speed = 0.5;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/slime.png");

        // MainCharacter's state variables
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 2 = idle, 0 = walking, 1 = attack
        this.directionFace  = Direction.DOWN;

        this.dead = false;



        this.fallAcc = 562.5;

        this.updateBB();

        
        this.animations = [];
        this.loadAnimations();
        this.elapsedTime = 0;

    };
    

    loadAnimations() {
        for (var i = 0; i < 3; i++) { // 0 = idle, 1 = walking, 2 = attack
            this.animations.push([]);
            for (var j = 0; j < 4; j++) {  // 4 directions
                this.animations[i].push([]);
            }
        }
        //IDLING
        this.animations[2][Direction.DOWN]= new Animator(this.spritesheet, 192, 0, 48, 46, 3, 0.15, 0, false, true);
        this.animations[2][Direction.LEFT]= new Animator(this.spritesheet, 192, 48, 48, 46, 3, 0.15, 0, false, true);
        this.animations[2][Direction.RIGHT]= new Animator(this.spritesheet, 192, 48*2, 48, 46, 3, 0.15, 0, false, true);
        this.animations[2][Direction.UP]= new Animator(this.spritesheet, 192, 48*3, 48, 46, 3, 0.15, 0, false, true);
        //walking
        this.animations[0][Direction.DOWN]= new Animator(this.spritesheet, 0, 0, 48, 46, 3, 0.15, 0, false, true);
        this.animations[0][Direction.LEFT]= new Animator(this.spritesheet, 0, 48, 48, 46, 3, 0.15, 0, false, true);
        this.animations[0][Direction.RIGHT]= new Animator(this.spritesheet, 0, 48*2, 48, 46, 3, 0.15, 0, false, true);
        this.animations[0][Direction.UP]= new Animator(this.spritesheet, 0, 48*3, 48, 46, 3, 0.15, 0, false, true);
        //attacking
        this.animations[1][Direction.DOWN]= new Animator(this.spritesheet, 192*2, 0, 48, 46, 3, 0.15, 0, false, true);
        this.animations[1][Direction.LEFT]= new Animator(this.spritesheet, 192*2, 48, 48, 46, 3, 0.15, 0, false, true);
        this.animations[1][Direction.RIGHT]= new Animator(this.spritesheet, 192*2, 48*2, 48, 46, 3, 0.15, 0, false, true);
        this.animations[1][Direction.UP]= new Animator(this.spritesheet, 192*2, 48*3, 48, 46, 3, 0.15, 0, false, true);




        
    };
    updateBB() {
        
        this.BB = new BoundingBox(this.x - this.game.camera.x - (48/2), this.y - this.game.camera.y - (46/2), 55, 55);
    
    };
    update(){
        this.updateBB();
        this.elapsedTime += this.game.clockTick;
        
        // if (this.game.left) {
        //     this.x -= this.speed;
        //     this.directionFace = Direction.LEFT;
        // } else if (this.game.right) {
        //     this.x += this.speed;
        //     this.directionFace = Direction.RIGHT;
        // } else if (this.game.up) {
        //     this.y -= this.speed;
        //     this.directionFace = Direction.UP;
        // }else if (this.game.down) {
        //     this.y += this.speed;
        //     this.directionFace = Direction.DOWN;
        // }

        




         var dist = distance(this, this.target);
        if (dist < 5) {
            if (this.targetID < this.path.length - 1 && this.target === this.path[this.targetID]) {
                this.targetID++;
            }
            this.target = this.path[this.targetID];
        }
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent instanceof FarmLandBigTree && canSee(this, ent)) {
                this.target = ent;

            }
            //size of FarmLandBigTree: 99,127
            if (ent instanceof FarmLandBigTree && collide(this,  ent)) {
                if (this.state === 0) {
                    this.state = 1;
                    this.elapsedTime = 0;
                 //   console.log("Fighting");

                 } 
                //else if (this.elapsedTime > 0.8) {
                //     var damage = 7 + randomInt(4);
                //     ent.hitpoints -= damage;
                //     this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
                //     this.elapsedTime = 0;
                // }
            }
            if (ent instanceof Dog && canSee(this, ent)) {
                this.target = ent;

            }
            //size of FarmLandBigTree: 99,127
            if (ent instanceof Dog && collide(this,  ent)) {
                if (this.state === 0) {
                    this.state = 1;
                    this.elapsedTime = 0;
                 //   console.log("Fighting");

                 } 
               if (this.elapsedTime > 0.8) {
                   var damage = 7 + randomInt(4);
                   ent.hitpoints -= damage;
                     this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
                     this.elapsedTime = 0;
                     if( ent.hitpoints<=0){
                        ent.removeFromWorld = true
                     }
                 }
            }
        }
        if (this.state !== 1) {
            dist = distance(this, this.target);
            this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
            this.x += this.velocity.x * this.game.clockTick;
            this.y += this.velocity.y * this.game.clockTick;
        }
        this.facing = getFacing(this.velocity);

        

    }

    draw(ctx) {
        //These are for testing loading assets via keybroad like the main character



        // ctx.strokeStyle = 'blue';
        // ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, 48*PARAMS.SCALE, 48*PARAMS.SCALE);
        
           // ctx.drawImage(this.spritesheet,192,0*46, 48,46, this.x - this.game.camera.x,this.y - this.game.camera.y,48*PARAMS.SCALE,46*PARAMS.SCALE);
        //    if (this.game.left) {
          
        //     this.animations[Direction.LEFT][0].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x,this.y - this.game.camera.y,PARAMS.SCALE);

        // } else if (this.game.right) {
        //     this.animations[Direction.RIGHT][0].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x,this.y - this.game.camera.y,PARAMS.SCALE);
        // } else if (this.game.up) {
        //     this.animations[Direction.UP][0].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x,this.y - this.game.camera.y,PARAMS.SCALE);

        // } else if (this.game.down) {
        //     this.animations[Direction.DOWN][0].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x,this.y - this.game.camera.y,PARAMS.SCALE);
        // } else if(!this.game.spaceKey){
        //     ctx.drawImage(this.spritesheet,0,this.directionFace*46, 48,46, this.x - this.game.camera.x,this.y - this.game.camera.y,48*PARAMS.SCALE,46*PARAMS.SCALE);
        // }

        // if (this.game.left) {
          
        //     this.animations[Direction.LEFT][0].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x,this.y - this.game.camera.y,PARAMS.SCALE);

        // } else if (this.game.right) {
        //     this.animations[Direction.RIGHT][0].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x,this.y - this.game.camera.y,PARAMS.SCALE);
        // } else if (this.game.up) {
        //     this.animations[Direction.UP][0].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x,this.y - this.game.camera.y,PARAMS.SCALE);

        // } else if (this.game.down) {
        //     this.animations[Direction.DOWN][0].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x,this.y - this.game.camera.y,PARAMS.SCALE);
        // } else if(!this.game.spaceKey){
        //     ctx.drawImage(this.spritesheet,0,this.directionFace*48+1, 48,48, this.x - this.game.camera.x,this.y - this.game.camera.y,48*PARAMS.SCALE,48*PARAMS.SCALE);
        // }
         //      this.animations[Direction.DOWN][2].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x,this.y - this.game.camera.y,PARAMS.SCALE);

        // if(this.game.spaceKey){

        //     switch(this.directionFace){
        //         case Direction.DOWN:
        //            // this.animations[Direction.DOWN][0].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x,this.y - this.game.camera.y,PARAMS.SCALE);
        //             this.animations[Direction.DOWN][1].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x ,this.y - this.game.camera.y ,PARAMS.SCALE);
                
        //             break;
        //         case Direction.LEFT:
        //            // this.animations[Direction.LEFT][0].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x,this.y - this.game.camera.y,PARAMS.SCALE);
        //             this.animations[Direction.LEFT][1].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x ,this.y - this.game.camera.y ,PARAMS.SCALE);

        //             break;
        //         case Direction.RIGHT:
        //           //  this.animations[Direction.RIGHT][0].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x,this.y - this.game.camera.y,PARAMS.SCALE);
        //             this.animations[Direction.RIGHT][1].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x ,this.y - this.game.camera.y ,PARAMS.SCALE);
    
        //         break;
        //         case Direction.UP:
        //             this.animations[Direction.UP][1].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x ,this.y - this.game.camera.y ,PARAMS.SCALE);
        //            // this.animations[Direction.UP][0].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x,this.y - this.game.camera.y,PARAMS.SCALE);

        //             break;
        //     }

        // }
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - (48/2),this.y - this.game.camera.y - (46/2) ,PARAMS.SCALE);
        if (PARAMS.DEBUG) {
            ctx.stroke();

            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.x - this.game.camera.x - (48/2), this.y - this.game.camera.y - (46/2), 48*PARAMS.SCALE, 46*PARAMS.SCALE);

            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x , this.y - this.game.camera.y , this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();


            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x , this.y - this.game.camera.y , this.visualRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.setLineDash([]);

        }
        this.healthbar.draw(ctx);

        
    //    this.animations[this.directionFace][0].drawFrame(this.game.clockTick,ctx,this.x,this.y,3);
    //     ctx.fillStyle = "White";
    //     ctx.strokeStyle="Red";
    //     ctx.fill();
    //     ctx.strokeRect(this.x,this.y,100,100);
    //     this.animations[this.direction][0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
    //     this.animations[this.direction][1].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
    //     this.animations[this.direction][2].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
 
    };

}