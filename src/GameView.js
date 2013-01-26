function GameView(gameBoard, boardController){
	this.gameBoard = gameBoard;
	this.canvasId = "GameCanvas";
	this.controller = boardController;
}

GameView.prototype.KEYBOARD_LEFT = 37;
GameView.prototype.KEYBOARD_RIGHT = 39;

GameView.prototype.update = function() {
}

GameView.prototype.CreateFabricInDiv = function(id){
	$("<canvas id='"+this.canvasId+"'></canvas>").appendTo(id)
	this._canvas = new fabric.Canvas(this.canvasId);
}

GameView.prototype.AddKeypressListeners = function() {
	$(document).keydown({controller: this.controller}, function(event){
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