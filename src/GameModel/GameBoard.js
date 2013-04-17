function GameBoard(width, height, collisionDetector, pointsCounter){
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

GameBoard.prototype.GetPlayer = function(){
    return this._player;
}

GameBoard.prototype.AddPlayer = function(player) {
    this._player = player;
}

GameBoard.prototype.GetPlayerCollisions = function(){
    var colliding = []
    for (var key in this.elements) {
        var element = this.elements[key];
        if (this._collisionDetector.IsCollision(this._player, element)) {
            colliding.push(key);
        }
    }
    return colliding;
}

GameBoard.prototype.Remove = function(name) {
	delete this.elements[name];
}