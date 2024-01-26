const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/villager1.png");
ASSET_MANAGER.queueDownload("./sprites/farmAsset.png");
ASSET_MANAGER.queueDownload("./sprites/slime.png");
ASSET_MANAGER.queueDownload("./sprites/farmland.png");
ASSET_MANAGER.queueDownload("./sprites/farmAsset.png");
ASSET_MANAGER.queueDownload("./sprites/forest.png");
ASSET_MANAGER.queueDownload("./sprites/farmHouses.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/wizardRun.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/wizardAttack1.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/wizardattack2.png");

ASSET_MANAGER.queueDownload("./sprites/enemy/boarWalk.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/boarThrust.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/boarIdle.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/goblinattack.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/goblinrun.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/greengoblin.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/greengoblin_attack.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/wormattack.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/wormwalk.png");
ASSET_MANAGER.queueDownload("./sprites/watereffect.png");
ASSET_MANAGER.queueDownload("./sprites/fireball (2).png");
ASSET_MANAGER.queueDownload("./sprites/wizardspawn.png");
ASSET_MANAGER.queueDownload("./sprites/house.png");
ASSET_MANAGER.queueDownload("./sprites/enemyhouse.png");
 
ASSET_MANAGER.queueDownload("./sprites/wolfsheet1.png");
ASSET_MANAGER.queueDownload("./sprites/towers.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth*.98;
	canvas.height = window.innerHeight*0.9;	
	window.addEventListener("resize", () => {
		canvas.width = window.innerWidth*.98;
		canvas.height = window.innerHeight*0.9;	
		PARAMS.CANVAS_WIDTH = canvas.width;
		PARAMS.CANVAS_HEIGHT = canvas.height;
		// Additional logic to handle resizing if needed
	});
	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
	
	gameEngine.init(ctx);
	//gameEngine.addEntity(new SceneManager(gameEngine));
	new SceneManager(gameEngine);

	gameEngine.start();
});
