function GameBoard(){
	this.elements = {};
}

GameBoard.prototype.Add = function(name, object){
	this.elements.name = object;
}

GameBoard.prototype.Get = function(name) {
	return this.elements.name;
}

GameBoard.prototype.GetObjectsOnBoard = function() {
	return this.elements;
}

GameBoard.prototype.MoveRight = function(name) {
	this._Move(name, 1);
}

GameBoard.prototype.MoveLeft = function(name) {
	this._Move(name, -1);
}

GameBoard.prototype._Move = function(name, direction){
	var currentPosition = this.elements.name.Position;
	var newPosition = currentPosition + direction;
	this.elements.name.Position = newPosition;
}

GameBoard.prototype.CreateNewFallingObject = function(){
	var name = "one"+this._GetRandom(100);
	var object = new GameObject(new RectangleView());
	object.Position = this._GetRandom(20);
	console&&console.log(object.Position);
	this.elements[name] = object;
	return name;
}

GameBoard.prototype._GetRandom = function(max) {
	return Math.floor((Math.random()*max)); 
}