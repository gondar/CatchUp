function GameView(gameBoard){
	this.gameBoard = gameBoard;
	this.canvasId = "GameCanvas";
	this._elementsOnBoard = {};
}

GameView.prototype.KEYBOARD_LEFT = 37;
GameView.prototype.KEYBOARD_RIGHT = 39;

GameView.prototype._add = function(name, element) {
	if (this._elementsOnBoard[name] != true) {
		this._elementsOnBoard[name] = true;
		this._canvas.add(element.GetFabric());
	}
}

GameView.prototype.CreateFabricInDiv = function(id){
	$("<canvas id='"+this.canvasId+"'></canvas>").appendTo(id)
	this._canvas = new fabric.Canvas(this.canvasId);
}

GameView.prototype.AddKeypressListeners = function(controller) {
	$(document).keydown({controller: controller}, function(event){
		console&&console.log(event);
		var controller = event.data.controller;
		if (event.which == GameView.prototype.KEYBOARD_LEFT){
			controller.MovePlayerLeft();
		}		
		if (event.which == GameView.prototype.KEYBOARD_RIGHT){
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
	this._canvas.renderAll();
}

GameView.prototype.MockCreateRectangle = function(){
// create a rectangle object
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20
});

// "add" rectangle onto canvas
this._canvas.add(rect);

}