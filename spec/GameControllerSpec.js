describe("GameController", function(){
	describe("During Initialize", function() {
		var view;
		var board;
		var player;
		var subject;
		
		beforeEach(function() {
			view = jasmine.createSpyObj("GameView",["CreateFabricInDiv", "AddKeypressListeners", "Update"]);
			board = jasmine.createSpyObj("GameBoard",["Add"]);
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
});