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
		controller.MovePlayerRight();
		var subject = new GameView(board, controller);
		
		subject.AddKeypressListeners()
		var key = jQuery.Event("keydown");
		key.which = GameView.prototype.KEYBOARD_RIGHT;
		$(document).trigger(key);
		
		expect(controller.MovePlayerRight).toHaveBeenCalled();
		 
		//cleanup
		$(document).off("keydown");
	});
});