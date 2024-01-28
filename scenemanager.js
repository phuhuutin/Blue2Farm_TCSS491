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


        this.spritesheetFarmLand = ASSET_MANAGER.getAsset("./sprites/farmland.png");
        this.dayNightManager = new DayNightCycle(this.game, 0);


        this.character = new MainCharacter(this.game, 800, 525);

        this.nextNextCutScene = false;
    


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

        this.listOfBuildingsBlOCKCharacter = [];
        this.listOfBuildingsNOTBlOCKCharacter = [];


        this.listOfAnimals = [];

        this.listOfSmallPlants = [];

        this.listOfLakeAndOtherSide = new LakeAndOtherSide(this.game);
        this.normalBossesHouse = new NormalBossesHome(this.game);

        this.listOfInvisibleBlocker = [];
        this.listOfBossTowers = [];


        this.normalGrass = new FarmLandNormalGrass(this.game, 0, 0);
        this.dog = new Dog(this.game, 500, 400, [{ x: 500, y: 500 },{ x: 800, y: 800 }, { x: 700, y: 1200 }]);
        this.wiz = new Wizard(this.game, 330, 2050, [{ x: randomInt(3800), y: randomInt(3800) }, { x: randomInt(3800), y: randomInt(3800) }, { x: randomInt(3800), y: randomInt(3800) }, { x: 0, y: 0 }]);
        this.wiz2 = new Wizard2(this.game, 400, 2050, [{ x: randomInt(3800), y: randomInt(3800) }, { x: randomInt(3800), y: randomInt(3800) }, { x: randomInt(3800), y: randomInt(3800) }, { x: 0, y: 0 }]);

        this.bor = new  Boar(this.game, 600, 1200, [ { x: 1720, y: 1322 }]);
        this.gob = new Goblin(this.game, 700, 1400, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
        this.greenG = new GreenGoblin(this.game, 400, 1550, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
        this.worm = new FireWorm(this.game, 100, 1500, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
        this.wizardspawn = new WizardSpawn(this.game, 110, 110);
        this.camp = new Campfire(this.game, 110, 110);

        this.loadMap();
        this.elapsed = 0;


    };
    loadSlime(){
        this.listOfSlime = [];
        this.listOfSlime.push(new Slime(this.game, 850,850, [{ x: 1055, y: 555 }]));
        this.listOfSlime.push(new Slime(this.game, 800,800, [{ x: 1055, y: 555 }]));

        this.listOfSlime.push(new Slime(this.game, 800,800, [ { x: 1055, y: 555 }]));
       this.listOfSlime.push(new Slime(this.game, 666,1100, [{x: 1055, y: 555 }]));

        for (let i = 0; i < this.listOfSlime.length; i++) {
            this.listOfSlime[i].removeFromWorld = false;
            this.game.addEntity(this.listOfSlime[i]);

        }
    };
    loadMap() {
        let houseX = 50;
        let houseY = 460;

        this.game.addEntity(this.normalGrass);


        // this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 50, 800));
        // this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 600, 700));
        // this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 850, 550));
        // this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 200, 500));
        // this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 700, 600));
        // this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 700, 700));
        // this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 500, 400));
        // this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 650, 420));
        // this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 700, 500));
        // this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 900, 320));
        // this.listOfSeedGrass.push(new FarmLandSeedGrass(this.game, 450, 650));

        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 100, 360));
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 200, 450));
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 500, 400));
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 650, 850));
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 650, 750));
        this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 680, 800));

        // this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 790, 850));
        // this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 750, 450));
        // this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 850, 500));
        // this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 800, 800));
        // this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 950, 500));
        // this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 850, 370));
        // this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 80, 420));
        // this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 200, 320));
        // this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 850, 450));
        // this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 300, 350));
        // this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 1000, 400));  
        // this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 750, 550));

        // this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 600, 800));
        // this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 750, 850));
        // this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 900, 700));
        // this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 500, 500));
        // this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 800, 710));



        this.game.addEntity(this.listOfLakeAndOtherSide);
        this.game.addEntity(this.normalBossesHouse);




        this.listOfInvisibleBlocker.push(new InvisibleLakeBlocker(this.game));
        for (let i = 0; i < this.listOfInvisibleBlocker.length; i++) {
            this.listOfInvisibleBlocker[i].removeFromWorld = false;
            this.game.addEntity(this.listOfInvisibleBlocker[i]);
        }








        this.character.removeFromWorld = false;

      //  this.game.addEntity(this.character);
      
        // this.game.addEntity(this.bor);
        // this.game.addEntity(this.wizardspawn)
        // this.game.addEntity(this.camp)
        //  this.game.addEntity(this.wiz);
        //  this.game.addEntity(this.wiz2);
       // this.bor.removeFromWorld = false;
       // this.game.addEntity(this.bor);

        //  this.game.addEntity(this.character);
        // this.game.addEntity(this.dog);
        this.game.addEntity(this.bor);
        this.game.addEntity(this.wizardspawn)
        this.game.addEntity(this.camp)
        this.game.addEntity(this.wiz);
        this.game.addEntity(this.wiz2);
        this.bor.removeFromWorld = false;
        // this.game.addEntity(this.bor);

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



        let offset = 300;

        this.listOfDirtGround.push(new FarmLandDirtGround(this.game, 50, 250 + offset, 5, 5));
        this.listOfDirtGround.push(new FarmLandDirtGround(this.game, 950, 150 + offset, 7, 4));
        //this.listOfDirtGround.push(new FarmLandDirtGround(this.game, 550, 350 + offset, 4,4 ));

        for (let i = 0; i < this.listOfDirtGround.length; i++) {
            this.listOfDirtGround[i].removeFromWorld = false;
            this.game.addEntity(this.listOfDirtGround[i]);

        }

        this.listOfBuildingsBlOCKCharacter.push(new FarmLandBigHouse(this.game, 730, 550));
        this.listOfBuildingsBlOCKCharacter.push(new FarmLandGiantHouse(this.game, 540, 500));
        this.listOfBuildingsBlOCKCharacter.push(new InvisibleFenceBlocker(this.game, 515,570,15,330));
        this.listOfBuildingsBlOCKCharacter.push(new InvisibleFenceBlocker(this.game, 520,890,55,15));
        this.listOfBuildingsBlOCKCharacter.push(new InvisibleFenceBlocker(this.game, 640,890,250,15));
        this.listOfBuildingsBlOCKCharacter.push(new InvisibleFenceBlocker(this.game, 864,570,15,330));
        this.listOfBuildingsBlOCKCharacter.push(new InvisibleFenceBlocker(this.game, 520,565,355,15));
        this.listOfBuildingsBlOCKCharacter.push(new InvisibleFenceBlocker(this.game, 550,565,320,120));
        this.listOfBuildingsBlOCKCharacter.push(new InvisibleMonsterBlocker(this.game, 570,890,80, 20));

        this.listOfBuildingsNOTBlOCKCharacter.push(new FarmLandStatic(this.game, 60, 650, StaticType.ANIMAL_WATER));
        this.listOfBuildingsNOTBlOCKCharacter.push(new FarmLandStatic(this.game, 530, 750, StaticType.ANIMAL_WATER));
        this.listOfBuildingsNOTBlOCKCharacter.push(new FarmLandStatic(this.game, 70, 790, StaticType.ANIMAL_Food));
        this.listOfBuildingsNOTBlOCKCharacter.push(new FarmLandStatic(this.game, 1280, 820, StaticType.WELL));
        this.listOfBuildingsNOTBlOCKCharacter.push(new FarmLandStatic(this.game, 1250, 830, StaticType.BOTTLE));
        this.listOfBuildingsNOTBlOCKCharacter.push(new FarmLandStatic(this.game, 150, 330, StaticType.DEADTREE));
        this.listOfBuildingsNOTBlOCKCharacter.push(new FarmLandStatic(this.game, 950, 330, StaticType.DEADTREE));
        // this.listOfBuildingsNOTBlOCKCharacter.push(new FarmLandStatic(this.game, 1600, 960, StaticType.CAMP));


        for (let i = 0; i < this.listOfBuildingsNOTBlOCKCharacter.length; i++) {
            this.listOfBuildingsNOTBlOCKCharacter[i].removeFromWorld = false;
            this.game.addEntity(this.listOfBuildingsNOTBlOCKCharacter[i]);
        }



        this.listOfAnimals.push(new FarmLandAnimal(this.game, 300, 750, AnimalType.COW));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 250, 700, AnimalType.COW));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 200, 660, AnimalType.COW));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 100, 625, AnimalType.CHICKEN));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 100, 655, AnimalType.CHICKEN));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 100, 685, AnimalType.CHICKEN));

        this.listOfAnimals.push(new FarmLandAnimal(this.game, 645, 700, AnimalType.SHEEP));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 715, 700, AnimalType.SHEEP));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 785, 700, AnimalType.SHEEP));

        this.listOfAnimals.push(new FarmLandAnimal(this.game, 750, 750, AnimalType.SHEEP));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 680, 750, AnimalType.SHEEP));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 710, 800, AnimalType.SHEEP));
        
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 70, 735, AnimalType.EATINGCOW));
        this.listOfAnimals.push(new FarmLandAnimal(this.game, 110, 735, AnimalType.EATINGCOW));
        for (let i = 0; i < this.listOfAnimals.length; i++) {
            this.game.addEntity(this.listOfAnimals[i]);
        }

        //small plants
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 350, 880, PlantType.ROSE));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 382, 880, PlantType.ROSE));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 414, 880, PlantType.ROSE));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 350, 910, PlantType.ROSE));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 382, 910, PlantType.ROSE));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 414, 910, PlantType.ROSE));

        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 0, 410, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 0, 440, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 0, 470, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 0, 500, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 0, 530, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 0, 560, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 204, 540, PlantType.BUSH));


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

        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 456, 310, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 488, 310, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 520, 310, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 456, 342, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 488, 342, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 520, 342, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 1980, 990, PlantType.BUSH));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 1980, 1020, PlantType.BUSH));


        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 162, 880, PlantType.SUNFLOWER));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 194, 880, PlantType.SUNFLOWER));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 226, 880, PlantType.SUNFLOWER));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 258, 880, PlantType.SUNFLOWER));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 1050, 320, PlantType.CUTTREE));
        this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 50, 320, PlantType.CUTTREE));
      //  this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 1670, 930, PlantType.FIRE));
     //   this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 1550, 930, PlantType.PURPLEFLOWER));










        for (let i = 0; i < this.listOfSmallPlants.length; i++) {
            this.game.addEntity(this.listOfSmallPlants[i]);
        }




        let soildOffer = 300;
        for (let i = this.listOfTrippleSoil.length - 1; i >= 0; i--) {
            this.listOfTrippleSoil[i].removeFromWorld = false;
            this.game.addEntity(this.listOfTrippleSoil[i]);

        }
        for(let i = 0; i < 2; i++){
            for(let j = 0; j < 6; j++){
                this.listOfTrippleSoil.push(new HorizontalSoil(this.game, 970 + 140*i, 175 + 70*j + soildOffer));

            }
        }
        for (let i = this.listOfTrippleSoil.length - 1; i >= 0; i--) {
            this.listOfTrippleSoil[i].removeFromWorld = false;
            this.game.addEntity(this.listOfTrippleSoil[i]);

        }


        // // Thick Grass
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 80, 420));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 200, 320));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 850, 450));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 300, 350));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 1000, 400));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 750, 550));

        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 600, 800));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 750, 850));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 900, 700));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 500, 500));
        this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 800, 760));


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
        // this.game.addEntity(this.listOfLakeAndOtherSide);


        this.normalGrass.removeFromWorld = false;
      //  this.game.addEntity(this.normalGrass);
        // this.listOfSlime.push(new Slime(this.game, 200,550, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 110, y: 0 }]));

        // this.listOfSlime.push(new Slime(this.game, 333,333, [{ x: -50, y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 110, y: 0 }]));
        // this.listOfSlime.push(new Slime(this.game, 666,1100, [{ x: 3000, y: 900 }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, {x: 110, y: 0 }]));

        // for (let i = 0; i < this.listOfSlime.length; i++) {
        //     this.listOfSlime[i].removeFromWorld = false;
        //     this.game.addEntity(this.listOfSlime[i]);

        // }
        this.loadSlime();
       // this.game.addEntity(this.bor);

        //DO NOT BLOCK THE CHARACTER
        /////////////////////////////////////
        this.game.addEntity(this.character);
        //////////////////////////////////////
        this.game.addEntity(this.dog);
        this.dog.removeFromWorld = false;
        // BLOCK THE CHARACTER

        //House

        this.listOfBuildingsBlOCKCharacter.push(new FarmLandFencedHouse(this.game, houseX + 180, houseY));
        this.listOfBuildingsBlOCKCharacter.push(new FarmLandHouse(this.game, houseX + 20, houseY));
        this.listOfBuildingsBlOCKCharacter.push(new InvisibleFenceBlocker(this.game, 85,540, 110, 40));
        this.listOfBuildingsBlOCKCharacter.push(new InvisibleFenceBlocker(this.game, 250,540,110, 40));
        // Fence with the house
        this.listOfBuildingsBlOCKCharacter.push(new InvisibleFenceBlocker(this.game, 50,540,10, 320));
        this.listOfBuildingsBlOCKCharacter.push(new InvisibleFenceBlocker(this.game, 50,840,250, 15));
        this.listOfBuildingsBlOCKCharacter.push(new InvisibleFenceBlocker(this.game, 355,840,35, 15));
        this.listOfBuildingsBlOCKCharacter.push(new InvisibleFenceBlocker(this.game, 380,555,15, 300));
        this.listOfBuildingsBlOCKCharacter.push(new InvisibleFenceBlocker(this.game, 40,540,365, 15));
        this.listOfBuildingsBlOCKCharacter.push(new InvisibleMonsterBlocker(this.game, 300,840,55, 20));

        for (let i = 0; i < this.listOfBuildingsBlOCKCharacter.length; i++) {
            this.game.addEntity(this.listOfBuildingsBlOCKCharacter[i]);
        }



        // left trees
        this.listOfTree.push(new FarmLandBigTree(this.game, 0, 300));
        this.listOfTree.push(new FarmLandBigTree(this.game, 0, 350));
        this.listOfTree.push(new ForestRedTree(this.game, 0, 700));
        this.listOfTree.push(new FarmLandBigTree(this.game, 0, 800));
        this.listOfTree.push(new FarmLandBigTree(this.game, 0, 850));
        this.listOfTree.push(new FarmLandBigTree(this.game, 0, 950));
        this.listOfTree.push(new ForestRedTree(this.game, 10, 1050));

        this.listOfTree.push(new FarmLandBigTree(this.game, 0, 1150));
        this.listOfTree.push(new FarmLandBigTree(this.game, 0, 1250));
        this.listOfTree.push(new ForestRedTree(this.game, 10, 1350));
        this.listOfTree.push(new FarmLandBigTree(this.game, 0, 1450));
        this.listOfTree.push(new FarmLandBigTree(this.game, 0, 1550));
        this.listOfTree.push(new ForestRedTree(this.game, 10, 1650));
        this.listOfTree.push(new FarmLandBigTree(this.game, 0, 1750));
        this.listOfTree.push(new FarmLandBigTree(this.game, 0, 1850));
        this.listOfTree.push(new FarmLandBigTree(this.game, 0, 1950));



        // top trees
        this.listOfTree.push(new FarmLandBigTree(this.game, 1180, 325));
        this.listOfTree.push(new FarmLandBigTree(this.game, 1280, 325));
        this.listOfTree.push(new FarmLandBigTree(this.game, 610, 325));
        this.listOfTree.push(new ForestRedTree(this.game, 680, 325));
        this.listOfTree.push(new FarmLandBigTree(this.game, 230, 400));
        this.listOfTree.push(new FarmLandBigTree(this.game, 740, 325));
        this.listOfTree.push(new ForestRedTree(this.game, 900, 400));


        // right trees
        this.listOfTree.push(new FarmLandBigTree(this.game, 1280, 550));
        this.listOfTree.push(new FarmLandBigTree(this.game, 1280, 650));
        this.listOfTree.push(new ForestRedTree(this.game, 1280, 750));
        this.listOfTree.push(new FarmLandBigTree(this.game, 1280, 1050));

        this.listOfTree.push(new FarmLandBigTree(this.game, 1280, 930));


        

        // left bottom trees
        this.listOfTree.push(new ForestRedTree(this.game, 200, 1150));
        this.listOfTree.push(new FarmLandBigTree(this.game, 290, 1150));
        this.listOfTree.push(new FarmLandBigTree(this.game, 380, 1150));
        this.listOfTree.push(new FarmLandBigTree(this.game, 240, 1200));
        this.listOfTree.push(new FarmLandBigTree(this.game, 330, 1200));

        this.listOfTree.push(new FarmLandBigTree(this.game, 500, 1480));
        this.listOfTree.push(new FarmLandBigTree(this.game, 410, 1500));
        this.listOfTree.push(new FarmLandBigTree(this.game, 590, 1500));
        this.listOfTree.push(new ForestRedTree(this.game, 455, 1545));
        this.listOfTree.push(new ForestRedTree(this.game, 545, 1545));
        this.listOfTree.push(new FarmLandBigTree(this.game, 500, 1635));
        this.listOfTree.push(new FarmLandBigTree(this.game, 410, 1590));
        this.listOfTree.push(new FarmLandBigTree(this.game, 590, 1590));





        //forest
        this.listOfTree.push(new FarmLandBigTree(this.game, 840, 1100));
        this.listOfTree.push(new FarmLandBigTree(this.game, 930, 1100));
        this.listOfTree.push(new FarmLandBigTree(this.game, 800, 1150));
        this.listOfTree.push(new FarmLandBigTree(this.game, 890, 1150));
        this.listOfTree.push(new FarmLandBigTree(this.game, 980, 1150));
        this.listOfTree.push(new FarmLandBigTree(this.game, 800, 1220));
        this.listOfTree.push(new FarmLandBigTree(this.game, 890, 1220));
        this.listOfTree.push(new FarmLandBigTree(this.game, 980, 1220));
        this.listOfTree.push(new ForestRedTree(this.game, 850, 1290));
        this.listOfTree.push(new FarmLandBigTree(this.game, 940, 1290));

        this.listOfTree.push(new FarmLandBigTree(this.game, 925, 1560));
        this.listOfTree.push(new ForestRedTree(this.game, 1015, 1560));
        this.listOfTree.push(new FarmLandBigTree(this.game, 880, 1630));
        this.listOfTree.push(new ForestRedTree(this.game, 970, 1630));
        this.listOfTree.push(new FarmLandBigTree(this.game, 1060, 1630));
        this.listOfTree.push(new FarmLandBigTree(this.game, 925, 1700));
        this.listOfTree.push(new FarmLandBigTree(this.game, 1015, 1700));
        this.listOfTree.push(new ForestRedTree(this.game, 1105, 1700));
        this.listOfTree.push(new FarmLandBigTree(this.game, 970, 1770));
        this.listOfTree.push(new FarmLandBigTree(this.game, 1060, 1770));


        this.listOfBossTowers.push(new ObeLisk(this.game,1800, 1520));
        this.listOfBossTowers.push(new ObeLisk(this.game,1350, 1520));
        this.listOfBossTowers.push(new ObeLisk(this.game,1800, 850));
        this.listOfBossTowers.push(new ObeLisk(this.game,1350, 850));
        for (let i = 0; i < this.listOfBossTowers.length; i++) {
            this.game.addEntity(this.listOfBossTowers[i]);
        }











        for (let i = 0; i < this.listOfTree.length; i++) {
            this.listOfTree[i].removeFromWorld = false;
            this.game.addEntity(this.listOfTree[i]);

        }
        this.dayNightManager.time = 15;
        this.game.addEntity(this.dayNightManager );

    }
    draw(ctx) {

        const requiredPlants = this.character.getListOfRequiredForNextLevel();


        //HUB
        ctx.font = '15px "Press Start 2P"';
        // ctx.strokeStyle = "White";
        this.game.ctx.fillStyle = "White";
        this.game.ctx.fillText("Day  " + PARAMS.DAYCOUNTER, 10, 20);
        this.game.ctx.fillText("Level " + this.character.level, 10, 40);
        ctx.font = '15px "Press Start 2P"';
        this.game.ctx.drawImage(this.spritesheetFarmLand, 0, 648, 14, 14, 10, 45, 14 * 1.5, 14 * 1.5);
        this.game.ctx.fillText(":" + this.character.farmInventory[PLANTNAMES.STRAWBERRY] + "/" + requiredPlants[PLANTNAMES.STRAWBERRY], 10 + 25, 65);

        this.game.ctx.drawImage(this.spritesheetFarmLand, 0, 663, 14, 14, 10, 45 + 30, 14 * 1.5, 14 * 1.5);
        this.game.ctx.fillText(":" + this.character.farmInventory[PLANTNAMES.CORN] + "/" + requiredPlants[PLANTNAMES.CORN], 10 + 25, 65 + 30);


        this.game.ctx.drawImage(this.spritesheetFarmLand,0 ,679, 14 ,14, 10,45+60,14*1.5 ,14*1.5);
        this.game.ctx.fillText(":"+ this.character.farmInventory[PLANTNAMES.RICE] +"/"+requiredPlants[PLANTNAMES.RICE], 10 + 25, 65 + 30 +30);
        
        this.game.ctx.fillText("DMG :" + this.character.baseDamage, 10,45 + 120);
        this.game.ctx.fillText("HP  :"+ this.character.hitpoints  +"/" + this.character.maxhitpoints, 10,45 + 140);






        if (this.character.elapsedTime2 >= 8) this.game.ctx.drawImage(this.spritesheetFarmLand, 0, 989, 32, 32, 250, 5, 32, 32);
        else this.game.ctx.drawImage(this.spritesheetFarmLand, 0, 1027, 32, 32, 250, 5, 32, 32);


    }
    update(){
       if(this.startCounting) this.elapsed += this.game.clockTick;;
        let midpointX = PARAMS.CANVAS_WIDTH/2 ;
        let midpointY = PARAMS.CANVAS_HEIGHT/2 ;
        if(this.game.testSleepCutScene) {
            this.game.addEntity(new NextDayCutScene(this.game));
            this.startCounting = true;
            this.elapsed = 0;

        }
        if(this.elapsed > 3.5){
            this.dayNightManager.time = 6;
            this.loadSlime();
            this.elapsed = 0;
            this.startCounting = false;

            console.log("loaded slime");
        }

        if (0 < this.character.x - midpointX && this.character.x + midpointX < 2000) {

            this.x = this.character.x - midpointX;

        }
        if (0 < this.character.y - midpointY) {

            this.y = this.character.y - midpointY;

        }
        const newDay = PARAMS.DAYCOUNTER;
        PARAMS.DEBUG = document.getElementById("debug").checked;

    }


}
