class Wizard {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path });
        //   this.x = -700;
        this.radius = 10;
        this.faceleft = false;

        this.healthbar= new HealthBar(this);
        this.hitpoints = 100;
        this.maxhitpoints = 100;

        this.visualRadius = 100;

        this.initialPoint = { x, y };

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemy/wizardRun.png");
        this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/enemy/wizardAttack1.png");
        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

        var dist = distance(this, this.target);
       

        this.maxSpeed = 90; // pixels per second
        //speed invovle in x, y this case since there are different direciton
        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
        this.state = 0; 

        this.facing = 0;

        this.elapsedTime = 0;
   
        this.animations = [];
        this.animations.push([]);
                                                                   
        this.animations[0].push(new Animator( this.spritesheet, 
        0,
        0,
        251,
        169,
        8,
        0.2,
        0,
        false,
        true)); 

        this.animations.push([]);
        this.animations[1].push(new Animator( this.spritesheet2, 
        0,
        0,
        248,
        169,
        8,
        0.1,
        0,
        false,
        true));
;
    };



    // };
    update() {
        //    this.x+=1;
        this.elapsedTime += this.game.clockTick;
        var dist = distance(this, this.target);
        
      
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent instanceof MainCharacter && canSee(this, ent)) {
                this.target = ent;
                //character

                if(this.x > this.target.x){
                   this.state =3;
                   this.faceleft = true;
                }
                else if(this.x <this.target.x){
                        this.state =0;
                        this.faceleft = false;
                }
             
              
            }
            if (ent instanceof MainCharacter && collide(this, ent)) {
             console.log("facelft " + this.faceleft)
              
          


                      
                    this.state = 1;
                    if (this.elapsedTime > 0.8) {
                        var damage = 7 + randomInt(4);
                        ent.hitpoints -= damage;
                       
                  
                        this.elapsedTime = 0;
                    }
             
               if(this.state ===3){
                this.state = 1;
                this.elapsedTime = 0;
          
              }
                
        
            }

 if (ent instanceof Boar && canSee(this, ent)) {
                this.target = ent;
                

                if(this.x > this.target.x){
                   this.state =3;
                   this.faceleft = true;
                }
                else if(this.x <this.target.x){
                        this.state =0;
                        this.faceleft = false;
                }
             
              
            }
            if (ent instanceof Boar && collide(this, ent)) {
             console.log("facelft " + this.faceleft)
              
          


                      
                    this.state = 1;
                    if (this.elapsedTime > 0.8) {
                        var damage = 7 + randomInt(4);
                        ent.hitpoints -= damage;
                      
                        this.elapsedTime = 0;
                    }
             
               if(this.state ===3){
                this.state = 1;
                this.elapsedTime = 0;
          
              }
                
        
            }


        }
    
        if (this.state !== 1) {
            dist = distance(this, this.target);
            this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
            //this help me move
            // this.x += this.velocity.x * this.game.clockTick;
        
            // this.y += this.velocity.y * this.game.clockTick;
         }

        this.facing = getFacing(this.velocity);
     
    };

    draw(ctx) {

        var xOffset = 25;
        var yOffset = 30;
        var width = this.state ? 64 : 48;
       
  
  if(this.state==0 ){
  
    if (this.velocity.x < 0) { 
       
        ctx.save();
        ctx.scale(-1, 1);
        this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, -this.x - 120 + this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
        ctx.restore();
    }
    else{
    this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 120 - this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
    }
  }
  else if( this.state==1 && this.faceleft ==true){
    ctx.save();
ctx.scale(-1, 1);
this.animations[1][0].drawFrame(this.game.clockTick, ctx, -this.x - 120 + this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
ctx.restore();

  }
  else if( this.state==1 && this.faceleft ==false){
    this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 120 - this.game.camera.x, this.y - 140 - this.game.camera.y, 1);

  }
    else if (this.state === 3) { 
        ctx.save();
        ctx.scale(-1, 1);
        this.animations[0][0].drawFrame(this.game.clockTick, ctx, -this.x - 120 + this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
        ctx.restore();
    }





        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Black";
            ctx.beginPath();
            ctx.moveTo(this.initialPoint.x, this.initialPoint.y);
       
            ctx.stroke();

            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.arc(this.x-this.game.camera.x, this.y-this.game.camera.y, this.radius , 0, 2 * Math.PI);
            
            ctx.closePath();
            ctx.stroke();

            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x-this.game.camera.x, this.y-this.game.camera.y, this.visualRadius, 0, 2 * Math.PI);
             ctx.closePath();
            ctx.stroke();
             ctx.setLineDash([]);
        }

        this.healthbar.draw(ctx);
    };
};
