describe("Game Factory", function() {
	describe("When creating a game", function() {
		var game;
		beforeEach(function() {
			var subject = new GameFactory();
			var  gameSpy = jasmine.createSpyObj("GameController",["Initialize"]);
			spyOn(window,"GameController").andReturn(gameSpy);
			
			game = subject.BuildGame();
		});
		
		it("creates game controller with a new view", function() {
			 expect(GameController.mostRecentCall.args[0] instanceof GameView).toEqual(true);
		});
		
		it("creates game controller with a new board", function() {
			 expect(GameController.mostRecentCall.args[1] instanceof GameBoard).toEqual(true);
		});
		
		it("creates game controller with a new player", function() {
			expect(GameController.mostRecentCall.args[2] instanceof GameObject).toEqual(true);
		});
		
		it("creates game controller with a new game", function() {
			expect(GameController.mostRecentCall.args[4] instanceof Game).toEqual(true);
		});
		
		it("Initializes and returns game controller", function() {
			expect(game.Initialize).toHaveBeenCalled();
		});
	});
	
	describe("When creating a new falling object", function() {
		var fallingObject;
		
		beforeEach(function() {
			var subject = new GameFactory();
			
			fallingObject = subject.BuildFallingObject(100);
		});
				
		it("Creates a new Game Object", function() {		
			expect(fallingObject instanceof GameObject).toBe(true);
		});
		
		it("Sets properly it's position", function(){
			expect(fallingObject.Position).not.toBe(undefined);
		});
		
		it("Makes it as rectangle", function(){
			expect(fallingObject.GetView() instanceof RectangleView).toBe(true);
		});
	});
	
	describe("When creating a new player", function() {
		var player;
		beforeEach(function() {
			var subject = new GameFactory();
		
			player = subject.BuildPlayer();
		});
		
		it("Creates a new Game Object", function() {		
			expect(player instanceof GameObject).toBe(true);
		});
		
		it("Sets properly it's position", function(){
			expect(player.Position.x).toBe(15);
			expect(player.Position.y).not.toBe(undefined);
		});
		
		it("Makes it as rectangle", function(){
			expect(player.GetView() instanceof RectangleView).toBe(true);
		});
	});
	
	describe("When creating many falling objects", function() {
		var fallingObject;
		var secondFallingObject;
		var boardWidth;
		
		beforeEach(function() {
			var subject = new GameFactory();
			boardWidth = 100;
			
			fallingObject = subject.BuildFallingObject(boardWidth);
			secondFallingObject = subject.BuildFallingObject(boardWidth);
		});
		
		it("Each has different position", function(){
			expect(fallingObject.Position).not.toBe(secondFallingObject.Position);
		});
		
		it("The x position is never outside of board", function(){
			expect(fallingObject.Position.x).not.toBeGreaterThan(boardWidth);
			expect(secondFallingObject.Position.x).not.toBeGreaterThan(boardWidth);
		});
	});
});