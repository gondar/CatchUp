describe("Game Factory", function() {
	describe("When creating new user", function() {
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