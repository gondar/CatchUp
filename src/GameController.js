function GameController(view, gameBoard, player, speed, game){
	this._board = gameBoard;
	this._player = player;
	this._boardView = view;
	this._gameSpeed = speed;
	this._game = game;
}

GameController.prototype.TimerEvent = function() {
	this._game.RoundFinished();
	this._boardView.Update();
}

GameController.prototype.Initialize = function(gameDivId) {
	var controller = this;
	setInterval(function() {
      controller.TimerEvent();
    }, this._gameSpeed);
	this._board.Add("player",this._player);
	this._boardView.CreateFabricInDiv(gameDivId);
	this._boardView.AddKeypressListeners(this);
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