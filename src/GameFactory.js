function GameFactory() {
}

GameFactory.prototype.BuildGame = function(gameDiv, gameSpeed, limit, width, height) {
    gameSpeed = gameSpeed || 100;
    limit = limit || 2;
    width = width || 400;
    height = height || 180;

	var pointsCouner = new PointsCounter(new PointsCounterView());
	var board = new GameBoard(width, height, new CollisionDetector(), pointsCouner);
	var view = new GameView(board, width, height);
	var player = this.BuildPlayer(width,height);
	var playerObjectName = "player";
	var game = new Game(board, this, limit, width, height, playerObjectName, pointsCouner, new GameTimer());
	var controller = new GameController(view, board, player, gameSpeed, game, new GameStartView(), new GameEndView());
	controller.Initialize(gameDiv);
	return controller;
}

GameFactory.prototype.BuildPlayer = function(boardWidth,boardHeight) {
    var gameObject = new Player(new PlayerView());
    gameObject.Position = {x:boardWidth/2, y:boardHeight-gameObject.Dimensions.Height   };
    return gameObject;
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