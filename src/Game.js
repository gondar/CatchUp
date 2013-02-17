function Game(board, factory, limit, width, height){
	this._board = board;
	this._factory = factory;
	this._fallingObjectIndex = 0;
	this._fallingObjectCount = 0;
	this._limit = limit;
	this._width = width;
	this._height = height;
}

Game.prototype.RoundFinished = function(){
	this._board.MoveDownFallingObjects("FallingObject");
	if (this._fallingObjectCount == this._limit)
		return;
		
	this._fallingObjectCount++;
	var name = "FallingObject"+this._fallingObjectIndex++;
	var fallingObject = this._factory.BuildFallingObject(this._width);
	this._board.Add(name,fallingObject);
}