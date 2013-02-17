function GameFactory() {
}

GameFactory.prototype.BuildGame = function(gameDiv, gameSpeed = 1000) {
	var board = new GameBoard();
	var view = new GameView(board);
	var player = this.BuildPlayer();
	var game = new Game(board, this, 2);
	var controller = new GameController(view, board, player, gameSpeed, game);
	controller.Initialize(gameDiv);
	return controller;
}

GameFactory.prototype.BuildPlayer = function() {
	return this._BuildGameObjectWithRectangleView(15);
}

GameFactory.prototype.BuildFallingObject = function() {
	return this._BuildGameObjectWithRectangleView(this._GetRandom(20));
}

GameFactory.prototype._BuildGameObjectWithRectangleView = function(position) {
	var gameObject = new GameObject(new RectangleView());
	gameObject.Position = position
	return gameObject;
}

GameFactory.prototype._GetRandom = function(max) {
	return Math.floor((Math.random()*max)); 
}