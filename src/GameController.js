function GameController(gameBoard, player){
	this._board = gameBoard;
	this._player = player;
	this._board.Add("player",player);
}

GameController.prototype.Initialize = function(gameDivId) {
	this._boardView = new GameView(this._board, this);
	this._boardView.CreateFabricInDiv(gameDivId);
	this._boardView.AddKeypressListeners();
	this._boardView.Update();
}

GameController.prototype.MovePlayerLeft = function() {
	this._board.MoveLeft("player");
	this._boardView.Update();
}

GameController.prototype.MovePlayerRight = function() {
	this._board.MoveRight("player");
	this._boardView.Update();
}