function GameBoard(){
	this.elements = {};
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
	for (var key in this.elements) {
		if(key.indexOf(name)!=-1) {
			this.elements[key].Position.y = this.elements[key].Position.y+5;
		}
	}
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