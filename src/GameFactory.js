function GameFactory() {
}

GameFactory.prototype.BuildGame = function(gameDiv, gameSpeed = 1000, width = 400, height=400) {
	var board = new GameBoard();
	var view = new GameView(board, width, height);
	var player = this.BuildPlayer();
	var game = new Game(board, this, 2, width/10, height);
	var controller = new GameController(view, board, player, gameSpeed, game);
	controller.Initialize(gameDiv);
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
	console&&console.log("New Rectangle: "+JSON.stringify(gameObject.Position));
	return gameObject;
}

GameFactory.prototype._GetRandom = function(max) {
	return Math.floor((Math.random()*max)); 
}