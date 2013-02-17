function Game(board, factory, limit){
	this._board = board;
	this._factory = factory;
	this._fallingObjectIndex = 0;
	this._fallingObjectCount = 0;
	this._limit = limit;
}

Game.prototype.RoundFinished = function(){
	if (this._fallingObjectCount == this._limit)
		return;
		
	this._fallingObjectCount++;
	var name = "FallingObject"+this._fallingObjectIndex++;
	var fallingObject = this._factory.BuildFallingObject();
	this._board.Add(name,fallingObject);
}