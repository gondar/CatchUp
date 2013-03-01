function GameFactory() {
}

GameFactory.prototype.BuildGame = function(gameDiv, gameSpeed = 100, width = 400, height=180) {
	var board = new GameBoard(width/10, height, new CollisionDetector());
	var view = new GameView(board, width, height);
	var player = this.BuildPlayer();
	var playerObjectName = "player";
	var game = new Game(board, this, 1, width/10, height, playerObjectName);
	var controller = new GameController(view, board, player, gameSpeed, game);
	controller.Initialize(gameDiv, playerObjectName);
	return controller;
}

GameFactory.prototype.BuildPlayer = function() {
	return this._BuildGameObjectWithRectangleView(15,100);
}

GameFactory.prototype.BuildFallingObject = function(boardWidth) {
	return this._BuildGameObjectWithRectangleView(this._GetRandom(boardWidth),20);
}

GameFactory.prototype._BuildGameObjectWithRectangleView = function(x,y) {
	var gameObject = new GameObject(new RectangleView());
	gameObject.Position = {x:x,y:y};
	return gameObject;
}

GameFactory.prototype._GetRandom = function(max) {
	return Math.floor((Math.random()*max)); 
}