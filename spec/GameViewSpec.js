describe("GameView", function(){
	it("creates fabric", function(){
		setFixtures("<div id='myid'></div>");
		var subject = new GameView();
		
		subject.CreateFabricInDiv("#myid");
		
		expect($("#myid")).not.toBeEmpty();
		expect(subject._canvas).not.toBe(undefined);
	});
	
	it("listens for the left keyboard press", function(){	
		var board = null;
		var controller = jasmine.createSpyObj('BoardController',['MovePlayerLeft']);
		var subject = new GameView(board, controller);
		
		subject.AddKeypressListeners()
		var key = jQuery.Event("keydown");
		key.which = GameView.prototype.KEYBOARD_LEFT;
		$(document).trigger(key);
		
		expect(controller.MovePlayerLeft).toHaveBeenCalled();
	
		//cleanup
		$(document).off("keydown");
	});
	
	it("listens for the right keyboard press", function(){	
		var board = null;
		var controller = jasmine.createSpyObj('BoardController',['MovePlayerRight']);
		var subject = new GameView(board, controller);
		
		subject.AddKeypressListeners()
		var key = jQuery.Event("keydown");
		key.which = GameView.prototype.KEYBOARD_RIGHT;
		$(document).trigger(key);
		
		expect(controller.MovePlayerRight).toHaveBeenCalled();
		 
		//cleanup
		$(document).off("keydown");
	});
	
	it("adds elements to canvas", function(){
		var board = mockGameBoardWithPlayerOnly();
		var controller = null;
		var subject = new GameView(board, controller);
		setFixtures("<div id='myid'></div>");		
		subject.CreateFabricInDiv("#myid");
		
		subject.Update();
		
		expect(subject._canvas.getObjects().length).toBe(1);
	});
	
	it("adds elements to canvas only once", function(){
		var board = mockGameBoardWithPlayerOnly();
		var controller = null;
		var subject = new GameView(board, controller);
		setFixtures("<div id='myid'></div>");		
		subject.CreateFabricInDiv("#myid");
		
		subject.Update();
		subject.Update();
		
		expect(subject._canvas.getObjects().length).toBe(1);
	});
	
	it("updates each element on board view", function(){
		var board = mockGameBoardWithPlayerOnly();
		var controller = null;
		var subject = new GameView(board, controller);
		setFixtures("<div id='myid'></div>");		
		subject.CreateFabricInDiv("#myid");
		
		subject.Update();
		
		expect(board.GetObjectsOnBoard()["player"].GetView().UpdateCalledNumber).toBe(1);
	});
});

function mockGameBoardWithPlayerOnly() {
	var view = mockPlayerView();
	var board = {
			GetObjectsOnBoard: function() {
				return {
					"player": {
						GetView: function() {
							return view; 
							}
						}
					}
				}
			};
	return board;
}

function mockPlayerView() {
	var view = {
		GetFabric: function() {
			return new fabric.Rect({});
		},
		UpdateCalledNumber:0,
		Update: function() {
			this.UpdateCalledNumber = 1;
		}
	};
	return view;
}