function Game(board, factory){
	this._board = board;
	this._factory = factory;
	this._fallingObjectIndex = 0;
}

Game.prototype.RoundFinished = function(){
	var name = "FallingObject"+this._fallingObjectIndex++;
	var fallingObject = this._factory.BuildFallingObject();
	this._board.Add(name,fallingObject);
}