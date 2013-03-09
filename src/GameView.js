function GameView(gameBoard,width,height){
	this.gameBoard = gameBoard;
	this.canvasId = "GameCanvas";
	this._elementsOnBoard = {};
	this._width = width || 200;
	this._height = height || 200;
}

GameView.KEYBOARD_LEFT = 37;
GameView.KEYBOARD_RIGHT = 39;

GameView.prototype._add = function(name, element) {
	if (name in this._elementsOnBoard)
		return;
	var fabric = element.GetFabric();
	this._elementsOnBoard[name] = fabric;
	this._canvas.add(fabric);
}

GameView.prototype.CreateFabricInDiv = function(id){
	$("<canvas id='"+this.canvasId+"'></canvas>").appendTo(id)
	this._canvas = new fabric.Canvas(this.canvasId);
	this._canvas.setWidth(this._width);
	this._canvas.setHeight(this._height);
    return this._canvas;
}

GameView.prototype.AddKeypressListeners = function(controller) {
	$(document).keydown({controller: controller}, function(event){
		var controller = event.data.controller;
		if (event.which == GameView.KEYBOARD_LEFT){
			controller.MovePlayerLeft();
		}		
		if (event.which == GameView.KEYBOARD_RIGHT){
			controller.MovePlayerRight();
		}
	})
}

GameView.prototype.Update = function() {
	var elements = this.gameBoard.GetObjectsOnBoard();
	for (var key in elements) {
		var view = elements[key].GetView();
		this._add(key, view);
		view.Update();
	}
	for (var key in this._elementsOnBoard) {
		if (key in elements) 
			continue;
		if (key == "Points")
			continue;
		this._canvas.remove(this._elementsOnBoard[key]);
		delete this._elementsOnBoard[key];		
	}
	var pointsView = this.gameBoard.GetPointsCounter().GetView();
	this._add("Points", pointsView);
	pointsView.Update();
	this._canvas.renderAll();
}