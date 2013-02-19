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
	var fallingObjectString = "FallingObject";
	this._board.MoveDownFallingObjects(fallingObjectString);
	this._addFallingObject(fallingObjectString);
}

Game.prototype._addFallingObject = function(fallingObjectString){
	if (this._fallingObjectCount == this._limit)
		return;
		
	this._fallingObjectCount++;
	var name = fallingObjectString+this._fallingObjectIndex++;
	var fallingObject = this._factory.BuildFallingObject(this._width);
	this._board.Add(name,fallingObject);
}