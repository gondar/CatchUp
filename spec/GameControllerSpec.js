describe("GameController", function(){
	it("During Initialize adds player on board", function(){
		var view = jasmine.createSpyObj("GameView",["CreateFabricInDiv", "AddKeypressListeners", "Update"]);
		var board = jasmine.createSpyObj("GameBoard",["Add"]);
		var player = {Id:12};
		var subject = new GameController(view, board, player);
		var divId = "#id";
		
		subject.Initialize(divId);
		
		expect(board.Add).toHaveBeenCalledWith("player", player);
	});
});