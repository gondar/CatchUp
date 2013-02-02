describe("GameController", function(){
	describe("During Initialize", function() {
		var view;
		var board;
		var player;
		var subject;
		
		beforeEach(function() {
			jasmine.Clock.useMock();
			view = jasmine.createSpyObj("GameView",["CreateFabricInDiv", "AddKeypressListeners", "Update"]);
			board = jasmine.createSpyObj("GameBoard",["Add","TestDuringInitialize"]);
			player = {Id:12};
			subject = new GameController(view, board, player);
			divId = "#id";
		
			subject.Initialize(divId);
		});
		
		it("adds player on board", function(){	
			expect(board.Add).toHaveBeenCalledWith("player", player);
		});
		
		it("creates fabric in div", function(){
			expect(view.CreateFabricInDiv).toHaveBeenCalledWith("#id");
		});
		
		it("initializes keyboard listeners", function() {
			expect(view.AddKeypressListeners).toHaveBeenCalledWith(subject);
		});
		
		it("updates board view", function() {
			expect(view.Update).toHaveBeenCalled();
		});		
	});
	
	describe("When Player Move Left Event Received", function(){
		var view;
		var board;
		var subject;
	
		beforeEach(function() {
			view = jasmine.createSpyObj("GameView",["Update"]);
			board = jasmine.createSpyObj("GameBoard",["MoveLeft"]);
			subject = new GameController(view, board, null);
			
			subject.MovePlayerLeft();
		});
		
		it("passes event to game board", function() {
			expect(board.MoveLeft).toHaveBeenCalledWith("player");
		});
		
		it("updates board view", function() {
			expect(view.Update).toHaveBeenCalled();
		});
	});
		
	describe("When Player Move Right Event Received", function(){
		var view;
		var board;
		var subject;
	
		beforeEach(function() {
			view = jasmine.createSpyObj("GameView",["Update"]);
			board = jasmine.createSpyObj("GameBoard",["MoveRight"]);
			subject = new GameController(view, board, null);
			
			subject.MovePlayerRight();
		});
		
		it("passes event to game board", function() {
			expect(board.MoveRight).toHaveBeenCalledWith("player");
		});
		
		it("updates board view", function() {
			expect(view.Update).toHaveBeenCalled();
		});
	});
	
	describe("It receives timer event every 100 miliseconds", function() {
		var view;
		var board;
		var player;
		var subject;
		
		beforeEach(function() {
			jasmine.Clock.useMock();
			view = jasmine.createSpyObj("GameView",["CreateFabricInDiv", "AddKeypressListeners", "Update"]);
			board = jasmine.createSpyObj("GameBoard",["Add", "CreateNewFallingObject"]);
			player = {Id:12};
			var gameSpeed = 100;
			subject = new GameController(view, board, player, gameSpeed);
			divId = "#id";
		
			subject.Initialize(divId);
			jasmine.Clock.tick(gameSpeed*2+1);
		});
		
		it("instructs board to create new falling object", function() {
			expect(board.CreateNewFallingObject.callCount).toEqual(2);
		});
		
		it("updates board view", function() {
			expect(view.Update.callCount).toEqual(3);//Once in initialize then every 100 miliseconds
		});
	});
});