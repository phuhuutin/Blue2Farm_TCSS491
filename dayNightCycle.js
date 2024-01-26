class DayNightCycle {
    constructor(game, time) {
        Object.assign(this, { game, time });
        this.game = game;
        this.time = time; // Time of day (0 to 24, where 0 is midnight and 12 is noon)
        this.brightRadius = 100; // Radius of the bright circle
        this.glowRadius = 50; // Radius of the glow effect
    }

    update() {
        const lastHour = Math.floor(this.time);
        console.log(this.time);
        this.time = (this.time + this.game.clockTick * 24 / (3 * 60)) % 24; // Increment time based on clockTick
        const currentHour = Math.floor(this.time);
        if(lastHour == 23 && currentHour == 0) PARAMS.DAYCOUNTER += 1;
        if(lastHour == 22 && currentHour == 23 ) this.game.addEntity(new GoToSleepMessage(this.game, PARAMS.CANVAS_WIDTH/2 - 200 , PARAMS.CANVAS_HEIGHT/3));
    }

    draw(ctx) {
         // Adjust visuals based on time of day
         let nightAlpha = 0;

         // Make it darker at night
         if (this.time >= 18 || this.time < 6) {
             nightAlpha = Math.abs(this.time - 12) / 6; // Fade in/out based on time
               // Light-up effect around the main character
         }

         if(this.time >= 20 || this.time < 4){
            const characterX = this.game.character.x - this.game.camera.x;
            const characterY = this.game.character.y - this.game.camera.y;
            const gradient = ctx.createRadialGradient(
                characterX,
                characterY,
                0,
                characterX,
                characterY,
                200 // Increased radius for a stronger glow
            );



            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)'); // Adjust color and opacity
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)'); // Adjust color and opacity
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Adjust color and opacity

            ctx.globalCompositeOperation = 'lighter'; // Use 'lighter' composite mode for additive blending
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(characterX, characterY, 200, 0, 2 * Math.PI); // Increased radius for a stronger glow
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over'; // Reset composite mode
         }

        // Draw dark overlay during the night
        if (nightAlpha > 0.5) {
          
             // Draw the overlay as a single large circle
             ctx.globalAlpha = nightAlpha - 0.5; // Adjust the starting alpha for a smoother transition
             ctx.fillStyle = 'rgba(0, 0, 0, 0.9)'; // Adjust the color and opacity of the overlay
 
 
    
             ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT + this.game.character.y + this.game.camera.y);
        
                            
           

            }
 
        ctx.globalAlpha = 1; // Reset global alpha
        ctx.fillStyle = 'white';
        ctx.fillText(this.formatTime(), PARAMS.CANVAS_WIDTH - 100, 20);
    }
    formatTime() {
        // Format time in 12-hour AM/PM format
        let hours = Math.floor(this.time);
        let minutes = Math.floor((this.time % 1) * 60);
        let period = hours >= 12 ? 'PM' : 'AM';

        if (hours > 12) {
            hours -= 12;
        }
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;

    }

}
