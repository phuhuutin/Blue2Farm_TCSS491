class SceneManager {
    constructor(game) {
        //Add the current gameEngine as its property.
        this.game = game;
        //Injecting This SceneManager object with its properites back to GameEngine.
        this.game.camera = this;
        //these values are for camera track.
        //go to line 61, they are set to focus on the main charater.
        this.x = 0;
        this.y = 0;

        this.character = new MainCharacter(this.game, 400, 400);


        this.listOfSlime = [];

        this.listOfTree = [];

        this.listOfCutTree = [];

        this.listOfDeadTree = [];

        this.listOfSproutTree = [];

        this.listOfSeedGrass = [];

        this.listOfMediumGrass = [];


        this.listOfThickGrass = [];

        this.listOfTrippleSoil = [];

        this.listOfDirtGround = [];

        this.listOfBuildings = [];

        this.listOfAnimals = [];

        this.listOfSmallPlants = [];

        this.listOfLakeAndOtherSide = new LakeAndOtherSide(this.game);

        this.listOfInvisibleBlocker = [];



        this.normalGrass = new FarmLandNormalGrass(this.game, 0, 0);
        this.dog = new Dog(this.game, 600, 1400, [{ x: randomInt(3800), y: randomInt(0) }, { x: randomInt(3800), y: randomInt(0) }, { x: randomInt(3800), y: randomInt(0) }, { x: 0, y: 0 }]);
        this.wiz = new Wizard(this.game, 200, 1400, [{ x: randomInt(3800), y: randomInt(3800) }, { x: randomInt(3800), y: randomInt(3800) }, { x: randomInt(3800), y: randomInt(3800) }, { x: 0, y: 0 }]);
        this.bor = new Boar(this.game, 200, 400, [{ x: 500, y: 500 }, { x: 600, y: 500 }, { x: 700, y: 1200 }]);
        this.gob = new Goblin(this.game, 700, 1400, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
        this.greenG = new GreenGoblin(this.game, 400, 1550, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
        this.worm = new FireWorm(this.game, 100, 1500, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);

        this.loadMap();


    };

    loadMap() {







        this.listOfInvisibleBlocker.push(new InvisibleLakeBlocker(this.game));
        for(let i = 0; i < this.listOfInvisibleBlocker.length; i++){
            this.listOfInvisibleBlocker[i].removeFromWorld = false;
            this.game.addEntity(this.listOfInvisibleBlocker[i]);
        }


//trees
        this.listOfTree.push(new FarmLandBigTree(this.game, 0, 350));
        this.listOfTree.push(new FarmLandBigTree(this.game, 0, 300));

        this.listOfTree.push(new FarmLandBigTree(this.game, 1280, 325));
        this.listOfTree.push(new FarmLandBigTree(this.game, 1180, 325));
        this.listOfTree.push(new ForestRedTree(this.game, 680, 325));
        this.listOfTree.push(new FarmLandBigTree(this.game, 610, 325));
        this.listOfTree.push(new FarmLandBigTree(this.game, 740, 325));
        this.listOfTree.push(new FarmLandBigTree(this.game, 430, 500));
        this.listOfTree.push(new ForestRedTree(this.game, 510, 500));





        this.listOfTree.push(new FarmLandBigTree(this.game, 0, 850));
        this.listOfTree.push(new FarmLandBigTree(this.game, 0, 800));
        this.listOfTree.push(new ForestRedTree(this.game, 0, 700));
        this.listOfTree.push(new ForestRedTree(this.game, 200, 1050));
        this.listOfTree.push(new FarmLandBigTree(this.game, 300, 1050));
        this.listOfTree.push(new FarmLandBigTree(this.game, 400, 1050));



        this.listOfTree.push(new FarmLandBigTree(this.game, 1280, 1050));
        this.listOfTree.push(new FarmLandBigTree(this.game, 1280, 950));
        this.listOfTree.push(new FarmLandBigTree(this.game, 1280, 850));
        this.listOfTree.push(new ForestRedTree(this.game, 1280, 750));
        this.listOfTree.push(new FarmLandBigTree(this.game, 1280, 650));
        this.listOfTree.push(new FarmLandBigTree(this.game, 1280, 550));

        



        for (let i = 0; i < this.listOfTree.length; i++) {
            this.listOfTree[i].removeFromWorld = false;
            this.game.addEntity(this.listOfTree[i]);

        // }





        this.character.removeFromWorld = false;
        this.game.addEntity(this.character);
        // this.game.addEntity(this.dog);
        // this.game.addEntity(this.wiz);
        this.bor.removeFromWorld = false;
        this.game.addEntity(this.bor);
        // this.game.addEntity(this.gob);
        // this.game.addEntity(this.greenG);
        // this.game.addEntity(this.worm);


        //////////////////////////////////DO NOT BLOCK THE MAIN CHARACTER

        // this.listOfCutTree.push(new FarmLandCutTree(this.game, 300,200))
        // for(let i = 0; i < this.listOfCutTree.length; i++){
        //     this.listOfCutTree[i].removeFromWorld = false;
        //     this.game.addEntity(this.listOfCutTree[i]);

        // }



        // this.listOfDeadTree.push(new FarmLandDeadTree(this.game,400,200))
        // for(let i = 0; i < this.listOfDeadTree.length; i++){
        //     this.listOfDeadTree[i].removeFromWorld = false;
        //     this.game.addEntity(this.listOfDeadTree[i]);

        // }


        // this.listOfSproutTree.push(new FarmLandSproutTree(this.game, 900, 800));
        // for(let i = 0; i < this.listOfSproutTree.length; i++){
        //     this.listOfSproutTree[i].removeFromWorld = false;
        //     this.game.addEntity(this.listOfSproutTree[i]);

        // }


        let houseX = 50;
        let houseY = 460;
        this.listOfBuildings.push(new FarmLandHouse(this.game, houseX, houseY));
        this.listOfBuildings.push(new FarmLandHouse(this.game, houseX + 200, houseY));

        this.listOfBuildings.push(new FarmLandBigHouse(this.game, 730, 550));
        this.listOfBuildings.push(new FarmLandGiantHouse(this.game, 540, 500));
        this.listOfBuildings.push(new FarmLandStatic(this.game, 60, 650, StaticType.ANIMAL_WATER));
        this.listOfBuildings.push(new FarmLandStatic(this.game, 70, 800, StaticType.ANIMAL_Food));

        for (let i = 0; i < this.listOfBuildings.length; i++) {
            this.game.addEntity(this.listOfBuildings[i]);
        }

        this.listOfAnimals.push(new FarmLandAnimal(this.game, 400, 400, AnimalType.COW));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 360, 390, AnimalType.COW));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 220, 660, AnimalType.COW));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 100, 625, AnimalType.CHICKEN));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 100, 655, AnimalType.CHICKEN));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 100, 685, AnimalType.CHICKEN));

        this.listOfAnimals.push(new FarmLandAnimal(this.game, 710, 800, AnimalType.SHEEP));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 750, 750, AnimalType.SHEEP));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 680, 750, AnimalType.SHEEP));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 70, 735, AnimalType.EATINGCOW));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 110, 735, AnimalType.EATINGCOW));
        for (let i = 0; i < this.listOfAnimals.length; i++) {
            this.game.addEntity(this.listOfAnimals[i]);
        }

        //small plants
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 290, 880, PlantType.ROSE));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 322, 880, PlantType.ROSE));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 355, 880, PlantType.ROSE));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 290, 910, PlantType.ROSE));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 322, 910, PlantType.ROSE));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 355, 910, PlantType.ROSE));

        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 0, 410, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 0, 440, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 0, 470, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 0, 500, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 0, 530, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 0, 560, PlantType.BUSH));

        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 0, 580, PlantType.CACTUS));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 0, 900, PlantType.CACTUS));



        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 40, 880, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 70, 880, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 100, 880, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 130, 880, PlantType.BUSH));

        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 40, 910, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 70, 910, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 100, 910, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 130, 910, PlantType.BUSH));

        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 1300, 390, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 1300, 420, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 1300, 450, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 1300, 480, PlantType.BUSH));

        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 1270, 390, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 1270, 420, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 1270, 450, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 1270, 480, PlantType.BUSH));

        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 910, 600, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 910, 570, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 910, 540, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 910, 510, PlantType.BUSH));

        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 880, 600, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 880, 570, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 880, 540, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 880, 510, PlantType.BUSH));

        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 162, 880, PlantType.SUNFLOWER));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 194, 880, PlantType.SUNFLOWER));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 226, 880, PlantType.SUNFLOWER));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 258, 880, PlantType.SUNFLOWER));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 1050, 320, PlantType.CUTTREE));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 50, 320, PlantType.CUTTREE));








        for (let i = 0; i < this.listOfSmallPlants.length; i++) {
            this.game.addEntity(this.listOfSmallPlants[i]);
        }



        // this.listOfSlime.push(new Slime(this.game, 0,0));
        this.listOfSlime.push(new Slime(this.game, 200,550, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 110, y: 0 }]));

        this.listOfSlime.push(new Slime(this.game, 333,333, [{ x: -50, y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 110, y: 0 }]));
        this.listOfSlime.push(new Slime(this.game, 666,1100, [{ x: 3000, y: 900 }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, {x: 110, y: 0 }]));


        for (let i = 0; i < this.listOfSlime.length; i++) {
            this.listOfSlime[i].removeFromWorld = false;
            this.game.addEntity(this.listOfSlime[i]);

        }


        let soildOffer = 300;
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970, 175 + soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970, 225 + soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970, 275 + soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970, 325 + soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970, 375 + soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970, 425 + soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970, 475 + soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970, 525 + soildOffer));

        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970 + 140, 175 + soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970 + 140, 225 + soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970 + 140, 275 + soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970 + 140, 325 + soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970 + 140, 375 + soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970 + 140, 425 + soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970 + 140, 475 + soildOffer));
        this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970 + 140, 525 + soildOffer));

        for (let i = this.listOfTrippleSoil.length - 1; i >= 0; i--) {
            this.listOfTrippleSoil[i].removeFromWorld = false;
            this.game.addEntity(this.listOfTrippleSoil[i]);

        }








        let offset = 300;
        this.listOfDirtGround.push(new FarmLandDirtGround(this.game, 50, 250 + offset, 5, 5));
        this.listOfDirtGround.push(new FarmLandDirtGround(this.game, 950, 150 + offset, 7, 4));
        //this.listOfDirtGround.push(new FarmLandDirtGround(this.game, 550, 350 + offset, 4,4 ));

        for (let i = 0; i < this.listOfDirtGround.length; i++) {
            this.listOfDirtGround[i].removeFromWorld = false;
            this.game.addEntity(this.listOfDirtGround[i]);

        }

        this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 50, 800));
        this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 600, 700));
        this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 850, 550));
        this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 200, 500));
        this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 700, 600));
        this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 700, 700));



        // Medium Grass
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 850, 350));
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 500, 400));
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 200, 450));
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 950, 500));

        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 680, 800));
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 650, 850));
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 650, 750));
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 800, 800));
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 790, 850));
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 850, 500));


        // Thick Grass
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 850, 450));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 300, 350));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 1000, 400));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 200, 350));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 750, 550));

        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 600, 800));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 750, 850));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 900, 700));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 500, 500));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 800, 710));


        for (let i = 0; i < this.listOfSeedGrass.length; i++) {
            this.listOfSeedGrass[i].removeFromWorld = false;
            this.game.addEntity(this.listOfSeedGrass[i]);

        }

        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 400, 600));
        for (let i = 0; i < this.listOfMediumGrass.length; i++) {
            this.listOfMediumGrass[i].removeFromWorld = false;
            this.game.addEntity(this.listOfMediumGrass[i]);

        }
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 300, 350));
        for (let i = 0; i < this.listOfThickGrass.length; i++) {
            this.listOfThickGrass[i].removeFromWorld = false;
            this.game.addEntity(this.listOfThickGrass[i]);

        }


        this.listOfLakeAndOtherSide.removeFromWorld = false;
        this.game.addEntity(this.listOfLakeAndOtherSide);


        this.normalGrass.removeFromWorld = false;
        this.game.addEntity(this.normalGrass);
       
        

    }
    draw(ctx) {
        //HUB
        ctx.font = '12px "Press Start 2P"';
        // ctx.strokeStyle = "White";
        this.game.ctx.fillStyle = "White";
        this.game.ctx.fillText("Days  " + PARAMS.DAYCOUNTER, 10, 20);
        this.game.ctx.fillText("Level " + this.character.level, 10, 35);

    }
    update(){
        let midpointX = PARAMS.CANVAS_WIDTH/2 ;
        let midpointY = PARAMS.CANVAS_HEIGHT/2 ;
        if (0 < this.character.x - midpointX && this.character.x + midpointX < 2000 ) {
            
            this.x = this.character.x - midpointX;

        }
        if (0 < this.character.y - midpointY) {

            this.y = this.character.y - midpointY;

        }

        PARAMS.DEBUG = document.getElementById("debug").checked;

    }


}