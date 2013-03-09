describe("GameController", function(){
	describe("During Initialize", function() {
		var gameView;
        var gameStartView;
		var board;
		var player;
		var subject;
		
		beforeEach(function() {
			jasmine.Clock.useMock();
			gameView = jasmine.createSpyObj("GameView",["CreateFabricInDiv", "AddKeypressListeners", "Update"]);
			board = jasmine.createSpyObj("GameBoard",["Add","TestDuringInitialize"]);
            gameStartView = jasmine.createSpyObj("GameStartView",["AddToFabric","AddKeypressListeners","Update","SetModel"]);
            var mockGame = jasmine.createSpyObj("Game",["IsPaused"]);
			player = {Id:12};
			subject = new GameController(gameView, board, player, 100, mockGame,gameStartView);
			divId = "#id";
		
			subject.Initialize(divId,"player");
		});
		
		it("adds player on board", function(){	
			expect(board.Add).toHaveBeenCalledWith("player", player);
		});
		
		it("creates fabric in div", function(){
			expect(gameView.CreateFabricInDiv).toHaveBeenCalledWith("#id");
		});
		
		it("initializes keyboard listeners", function() {
			expect(gameView.AddKeypressListeners).toHaveBeenCalledWith(subject);
		});
		
		it("updates board view", function() {
			expect(gameView.Update).toHaveBeenCalled();
		});

        it("initializes game start view", function() {
          expect(gameStartView.AddToFabric).toHaveBeenCalled();
          expect(gameStartView.AddKeypressListeners).toHaveBeenCalled();
          expect(gameStartView.Update).toHaveBeenCalled();
        });
	});
	
	describe("When Player Move Left Event Received", function(){
		var view;
		var board;
		var subject;
	
		beforeEach(function() {
			view = jasmine.createSpyObj("GameView",["Update"]);
			board = jasmine.createSpyObj("GameBoard",["MoveLeft"]);
            var mockGame = jasmine.createSpyObj("Game",["IsPaused"]);
			subject = new GameController(view, board, null,100, mockGame);
			
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
            var mockGame = jasmine.createSpyObj("MockGame",["IsPaused"]);
			subject = new GameController(view, board, null, 100, mockGame);
			
			subject.MovePlayerRight();
		});
		
		it("passes event to game board", function() {
			expect(board.MoveRight).toHaveBeenCalledWith("player");
		});
		
		it("updates board view", function() {
			expect(view.Update).toHaveBeenCalled();
		});
	});
	
	describe("When receives timer event every 100 miliseconds", function() {
		var view;
		var board;
		var player;
		var subject;
		var game;
		
		beforeEach(function() {
			jasmine.Clock.useMock();
			view = jasmine.createSpyObj("GameView",["CreateFabricInDiv", "AddKeypressListeners", "Update"]);
			board = jasmine.createSpyObj("GameBoard",["Add"]);
			game = jasmine.createSpyObj("Game",["RoundFinished"]);
            var gameStartView = jasmine.createSpyObj("GameStartView",["AddToFabric","AddKeypressListeners","Update", "SetModel"]);
			player = {Id:12};
			var gameSpeed = 100;
			subject = new GameController(view, board, player, gameSpeed, game, gameStartView);
			divId = "#id";
		
			subject.Initialize(divId);
			jasmine.Clock.tick(gameSpeed*2+1);
		});
		
		it("it informs game that round has elapsed", function() {
			expect(game.RoundFinished.callCount).toEqual(2);
		});
		
		it("it updates board view", function() {
			expect(view.Update.callCount).toEqual(3);//Once in initialize then every 100 miliseconds
		});
	});

    describe("When receiving StartGame event", function(){
       var mockGame;
       var mockStartGameView;
       beforeEach(function(){
           mockGame = {IsPaused:true};
           mockStartGameView = jasmine.createSpyObj("StartGameView",["Update"]);
           var subject = new GameController(null,null,null,100,mockGame,mockStartGameView);

           subject.StartGame();
       });

        it("sets game pause to false", function(){
            expect(mockGame.IsPaused).toBe(false);
        });

        it("updates gameStartView", function(){
            expect(mockStartGameView.Update).toHaveBeenCalled();
        });
    });
});