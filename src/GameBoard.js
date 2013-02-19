function GameBoard(width, height){
	this.elements = {};
	this._width = width;
	this._height = height;
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

GameBoard.prototype.Remove = function(name) {
	delete this.elements[name];
}

GameBoard.prototype.MoveRight = function(name) {
	this._Move(name, 1);
}

GameBoard.prototype.MoveLeft = function(name) {
	this._Move(name, -1);
}

GameBoard.prototype._Move = function(name, direction){
	var currentPosition = this.elements[name].Position.x;
	var newPosition = currentPosition + direction;
	console&&console.log("Move to: "+newPosition);
	this.elements[name].Position.x = newPosition;
}