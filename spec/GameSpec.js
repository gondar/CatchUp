describe("Game", function(){
	describe("when round is finished", function() {
		var factory;
		var board;
		
		beforeEach(function() {
			board = jasmine.createSpyObj("GameBoard",["Add","MoveDownFallingObjects"]);
			factory = jasmine.createSpyObj("GameFactory", ["BuildFallingObject"]);
			var subject = new Game(board, factory,10);
		
			subject.RoundFinished();
		});
		
		it("creates a new falling object", function(){
			expect(factory.BuildFallingObject).toHaveBeenCalled();
		});
		
		it("adds a new falling object on board", function(){	
			expect(board.Add).toHaveBeenCalled();
		});
		
		it("progresses fall of the objects", function(){
			expect(board.MoveDownFallingObjects).toHaveBeenCalled();
		});
	});
	
	describe("When many rounds has passed", function() {
		var factory;
		var board;
		var fallingObjectsLimit;
		
		beforeEach(function() {
			board = jasmine.createSpyObj("GameBoard",["Add","MoveDownFallingObjects"]);
			factory = jasmine.createSpyObj("GameFactory", ["BuildFallingObject"]);
			fallingObjectsLimit = 2;
			var subject = new Game(board, factory, fallingObjectsLimit);
		
			subject.RoundFinished();
			subject.RoundFinished();
			subject.RoundFinished();
		});		
				
		it("creates unique name for each object", function(){
			expect(board.Add.calls[0].args[0]).toBe("FallingObject0");
			expect(board.Add.calls[1].args[0]).toBe("FallingObject1");
		});
		
		it("limits number of falling objects on board", function(){
			expect(factory.BuildFallingObject.callCount).toBe(2);
		});
	});
});