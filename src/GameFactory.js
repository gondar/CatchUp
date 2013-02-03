function GameFactory() {
}

GameFactory.prototype.BuildGame = function(gameDiv, gameSpeed = 1000) {
	var board = new GameBoard();
	var view = new GameView(board);
	var player = this.BuildPlayer();
	var game = new GameController(view, board, player, gameSpeed);
	game.Initialize(gameDiv);
	return game;
}

GameFactory.prototype.BuildPlayer = function() {
	var player = new GameObject(new RectangleView());
	player.Position = 15;
	return player;
}