function Game(board, factory, limit, width, height, playerObjectName){
	this._board = board;
	this._factory = factory;
	this._fallingObjectIndex = 0;
	this._fallingObjectCount = 0;
	this._limit = limit;
	this._width = width;
	this._height = height;
	this._playerObjectName = playerObjectName;
	this._previousColor = '';
}

Game.prototype.RoundFinished = function(){
	var fallingObjectString = "FallingObject";
	var removedObjects = this._board.MoveDownFallingObjects(fallingObjectString);
	this._fallingObjectCount = this._fallingObjectCount - removedObjects.length;
	if (this._fallingObjectCount < this._limit)
		this._addFallingObject(fallingObjectString);
	var collisions = this._board.GetCollisions(this._playerObjectName);
	if (collisions.length != 0)
	{	
		this._board.Get(this._playerObjectName).Color = this._generateColor();
	};
	console.log(collisions);
	for (var element in collisions) {
		this._board.Remove(collisions[element]);
		this._addFallingObject(fallingObjectString);
	}
}

Game.prototype._generateColor = function(){
	var colorA = "#2D970D";
	var colorB = "#110D97";
	if (this._previousColor == colorA) {
		this._previousColor = colorB;
		return colorB;
	}
	this._previousColor = colorA;
	return colorA;
}

Game.prototype._addFallingObject = function(fallingObjectString){	
	this._fallingObjectCount++;
	var name = fallingObjectString+this._fallingObjectIndex++;
	var fallingObject = this._factory.BuildFallingObject(this._width);
	this._board.Add(name,fallingObject);
}