describe("Game Factory", function() {
	describe("When creating a game", function() {
		var game;
		beforeEach(function() {
			var subject = new GameFactory();
			var gameSpy = jasmine.createSpyObj("GameController",["Initialize"]);
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
		
		it("Initializes and returns game controller", function() {
			expect(game.Initialize).toHaveBeenCalled();
		});
	});
	
	describe("When creating a new user", function() {
		var player;
		beforeEach(function() {
			var subject = new GameFactory();
		
			player = subject.BuildPlayer();
		});
		
		it("Creates a new Game Object", function() {		
			expect(player instanceof GameObject).toBe(true);
		});
		
		it("Sets properly it's position", function(){
			expect(player.Position).toBe(15);
		});
		
		it("Makes it as rectangle", function(){
			expect(player.GetView() instanceof RectangleView).toBe(true);
		});
	});
});