const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/villager1.png");
ASSET_MANAGER.queueDownload("./sprites/farmAsset.png");
ASSET_MANAGER.queueDownload("./sprites/plants.png");
ASSET_MANAGER.queueDownload("./sprites/inventory.png");
ASSET_MANAGER.queueDownload("./sprites/slime.png");
ASSET_MANAGER.queueDownload("./sprites/farmland.png");
ASSET_MANAGER.queueDownload("./sprites/grassbase.png");
ASSET_MANAGER.queueDownload("./sprites/doghit.png");
ASSET_MANAGER.queueDownload("./sprites/dogwalkk.png");
ASSET_MANAGER.queueDownload("./sprites/dogidle.png");
ASSET_MANAGER.queueDownload("./sprites/forest.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
	gameEngine.init(ctx);
	//gameEngine.addEntity(new SceneManager(gameEngine));
	new SceneManager(gameEngine);

	gameEngine.start();
});
