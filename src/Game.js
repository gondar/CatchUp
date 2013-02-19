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
	var removedObjects = this._board.MoveDownFallingObjects(fallingObjectString);
	//console&&console.log("Removed: "+JSON.stringify(removedObjects));
	this._fallingObjectCount = this._fallingObjectCount - removedObjects.length;
	if (this._fallingObjectCount < this._limit)
		this._addFallingObject(fallingObjectString);
}

Game.prototype._addFallingObject = function(fallingObjectString){	
	this._fallingObjectCount++;
	var name = fallingObjectString+this._fallingObjectIndex++;
	var fallingObject = this._factory.BuildFallingObject(this._width);
	this._board.Add(name,fallingObject);
}