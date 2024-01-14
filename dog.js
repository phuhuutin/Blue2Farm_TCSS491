class Dog {
  constructor(game, x, y, path) {
      Object.assign(this, { game, x, y, path });
 
      this.radius = 10;
      this.faceleft = false;
      this.healthbar= new HealthBar(this);
      this.hitpoints = 100;
      this.maxhitpoints = 100;
      this.condition = false;

      this.visualRadius = 250;

      this.initialPoint = { x, y };
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/dogwalkk.png");
      this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/doghit.png");
      this.spritesheet3 = ASSET_MANAGER.getAsset("./sprites/dogidle.png");

      this.targetID = 0;
      if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

      var dist = distance(this, this.target);
      this.maxSpeed = 70; // pixels per second
      //speed invovle in x, y this case since there are different direciton
      this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
      this.state = 0; // 0 walking, 1 attacking, 2 dead

      this.facing = 0; // 0 = up, clockwise

      this.elapsedTime = 0;
      this.animations = [];
      this.animations.push([]);

      this.animations[0].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
      0,
      0,
      47.9,
      48,
      6,
      0.2,
      0,
      false,
      true));
      this.animations.push([]);

      this.animations[1].push(new Animator( this.spritesheet2, // Assuming spritesheet is a property of the Wizard class
      0,
      0,
      47.9,
      48,
      4,
      0.2,
      0,
      false,
      true));
      this.animations.push([]);

      this.animations[2].push(new Animator( this.spritesheet3, // Assuming spritesheet is a property of the Wizard class
      0,
      0,
      47.9,
      48,
      4,
      0.2,
      0,
      false,
      true));

  };



  // };
  update() {

      this.elapsedTime += this.game.clockTick;
      var dist = distance(this, this.target);
      var old = this;
  
      for (var i = 0; i < this.game.entities.length; i++) {
          var ent = this.game.entities[i];
          if (this.x > 750 && this.condition == false && ent instanceof MainCharacter && !canSee(this, ent) ) {
               
              this.condition = true;

          }
          if (this.x > 400 && this.condition == true && ent instanceof MainCharacter && !canSee(this, ent) ) {
            this.state =3;
            console.log("STATE")
          this.x-=1;
          if(this.x <=400){
            this.state =0;
            this.condition = false;
          }
        }
          if (ent instanceof Slime && canSee(this, ent) ) {

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
          if (ent instanceof Slime && collide(this, ent)) {
           console.log("facelft " + this.faceleft)
            
        


                    
                  this.state = 1;
                  if (this.elapsedTime > 0.8) {
                      var damage = 7 + randomInt(4);
                      ent.hitpoints -= 5+ damage;
                      if(ent.hitpoints - damage < 0) {ent.removeFromWorld = true};
                      // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
                      this.elapsedTime = 0;
                  }
           
             if(this.state ===3){
              this.state = 1;
              this.elapsedTime = 0;
        
            }
              
      
          }
          else if (ent instanceof MainCharacter && canSee(this, ent)){
            this.target = ent;
            //character

            if(this.x > this.target.x + 5){
               this.state =3;
               this.faceleft = true;
            }
            else if(this.x <this.target.x){
                    this.state =0;
                    this.faceleft = false;
            }
          }

          if (ent instanceof MainCharacter && collide(this, ent)) {
              this.state = 4;
          }
          
      }
  
      if (this.state !== 1) {
          dist = distance(this, this.target);
          this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
          //this help me move
          this.x += this.velocity.x * this.game.clockTick;
      
           this.y += this.velocity.y * this.game.clockTick;
       }

      this.facing = getFacing(this.velocity);
  
  };

  draw(ctx) {
     
      var xOffset = 25;
      var yOffset = 30;
      var width = this.state ? 64 : 48;
      //  ctx.save();
      //   ctx.scale(-1,1)
  //    this.animator.drawFrame(this.game.clockTick, ctx, this.x-330-this.game.camera.x , this.y-190-this.game.camera.y, 1); // Scale set to 1 for no scaling



if(this.state==0 ){

  this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 60 - this.game.camera.x, this.y - 20 - this.game.camera.y, 1.5);
  

 }
else if( this.state==1 && this.faceleft ==true){
  ctx.save();
ctx.scale(-1, 1);
this.animations[1][0].drawFrame(this.game.clockTick, ctx, -this.x-70 + this.game.camera.x, this.y - 20 - this.game.camera.y, 1.5);
ctx.restore();

}
else if( this.state==1 && this.faceleft ==false){
  this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x -60 - this.game.camera.x, this.y - 20 - this.game.camera.y,1.5);

}
  else if (this.state === 3) { // Example: checking for state 3
      ctx.save();
      ctx.scale(-1, 1);
      this.animations[0][0].drawFrame(this.game.clockTick, ctx, -this.x -70 + this.game.camera.x, this.y - 20 - this.game.camera.y, 1.5);
      ctx.restore();
  }
  else if (this.state === 4) { // Example: checking for state 3
    ctx.save();
    ctx.scale(-1, 1);
    this.animations[2][0].drawFrame(this.game.clockTick, ctx, -this.x -70 + this.game.camera.x, this.y - 20 - this.game.camera.y, 1.5);
    ctx.restore();
}

      // Select the animation based on the current state
//     this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 120 - this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
  
   //for carmera view, change this.game.camera.x
//     ctx.save();
//     ctx.scale(-1,1)
//  this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, -this.x+50+this.game.camera.x , this.y-190-this.game.camera.y, 1);
//      ctx.restore();



      if (PARAMS.DEBUG) {
          ctx.strokeStyle = "Black";
          ctx.beginPath();
          ctx.moveTo(this.initialPoint.x, this.initialPoint.y);
          // for (var i = 0; i < this.path.length; i++) {
          //     ctx.lineTo(this.path[i].x, this.path[i].y);
          // };
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
