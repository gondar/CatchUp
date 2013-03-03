function GameBoard(width, height,collisionDetector, pointsCounter){
	this.elements = {};
	this._width = width;
	this._height = height;
	this._collisionDetector = collisionDetector;
	this._pointsCounter = pointsCounter;
}

GameBoard.prototype.Add = function(name, object){
	this.elements[name]= object;
}

GameBoard.prototype.Get = function(name) {
	return this.elements[name];
}

GameBoard.prototype.GetObjectsOnBoard = function() {
	return this.elements;
}

GameBoard.prototype.GetPointsCounter = function() {
	return this._pointsCounter;	
}

GameBoard.prototype.MoveDownFallingObjects = function(name) {
	var removed = [];
	for (var key in this.elements) {
		if(key.indexOf(name)!=-1) {
			var element = this.elements[key];
			element.Position.y = element.Position.y+5;
			if(element.Position.y >= this._height){
				this.Remove(key);
				removed.push(element);
			}
		}
	}
	return removed;
}

GameBoard.prototype.GetCollisions = function(name) {
	var object = this.elements[name];
	var colliding = []
	for (var key in this.elements) {
		if (key == name)
			continue;
		var element = this.elements[key];
		if (this._collisionDetector.IsCollision(object,element)) {
			colliding.push(key);
		}
	}
	return colliding;
}

GameBoard.prototype.Remove = function(name) {
	delete this.elements[name];
}

GameBoard.prototype.MoveRight = function(name) {
	this._Move(name, 10);
}

GameBoard.prototype.MoveLeft = function(name) {
	this._Move(name, -10);
}

GameBoard.prototype._Move = function(name, direction){
	var currentPosition = this.elements[name].Position.x;
	var newPosition = currentPosition + direction;
	this.elements[name].Position.x = newPosition;
}