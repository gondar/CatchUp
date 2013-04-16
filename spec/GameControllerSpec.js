describe("GameController", function(){
	describe("During Initialize", function() {
		var gameView;
        var gameStartView;
        var gameEndView;
		var board;
		var player;
		var subject;
		
		beforeEach(function() {
			jasmine.Clock.useMock();
            var deps = BuildGameControllerAndMockDependencies();
            board = deps.board;
            gameView = deps.gameView;
            gameStartView = deps.gameStartView;
            gameEndView = deps.gameEndView;
            player = deps.player;
            subject = deps.controller;
			divId = "#id";
		
			subject.Initialize(divId);
		});
		
		it("adds player on board", function(){	
			expect(board.AddPlayer).toHaveBeenCalledWith(player);
		});

        it("initializes player view", function() {
            expect(player.GetView().AddToFabric).toHaveBeenCalled();
            expect(player.GetView().AddKeypressListeners).toHaveBeenCalled();
            expect(player.GetView().Update).toHaveBeenCalled();
        });
		
		it("Initializes game view", function(){
			expect(gameView.CreateFabricInDiv).toHaveBeenCalledWith("#id");
			expect(gameView.Update).toHaveBeenCalled();
		});

        it("initializes game start view", function() {
          expect(gameStartView.AddToFabric).toHaveBeenCalled();
          expect(gameStartView.AddKeypressListeners).toHaveBeenCalled();
          expect(gameStartView.Update).toHaveBeenCalled();
        });

        it("initializes game end view", function() {
           expect(gameEndView.AddToFabric).toHaveBeenCalled();
           expect(gameEndView.AddKeypressListeners).toHaveBeenCalled();
           expect(gameEndView.Update).toHaveBeenCalled();
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
		var game;
        var gameStartView;
        var gameEndView;
        var playerView;
        var subject;
		
		beforeEach(function() {
			jasmine.Clock.useMock();
            var dependencies = BuildGameControllerAndMockDependencies();
            game = dependencies.game;
            gameStartView = dependencies.gameStartView;
            gameEndView = dependencies.gameEndView;
            view = dependencies.gameView;
            playerView = dependencies.player.GetView();
            subject = dependencies.controller;

			divId = "#id";
			subject.Initialize(divId);
			jasmine.Clock.tick(dependencies.gameSpeed*2+10);
		});

        afterEach(function(){
            subject.StopTimerEvent();
        });
		
		it("it informs game that round has elapsed", function() {
			expect(game.RoundFinished.callCount).toEqual(2);
		});
		
		it("it updates board view", function() {
			expect(view.Update.callCount).toEqual(3);//Once in initialize then every 100 miliseconds
		});

        it("updates game start view", function(){
            expect(gameStartView.Update.callCount).toEqual(3);
        });

        it("updates game end view", function(){
           expect(gameEndView.Update.callCount).toEqual(3);
        });

        it("updates player view", function(){
           expect(playerView.Update.callCount).toEqual(3);
        });
	});

    describe("When receiving StartGame event", function(){
       var gameStartSpy;
       var mockStartGameView;
       beforeEach(function(){
           var mockGame = {StartGame:function(){},
               GameState: Game.PAUSED};
           gameStartSpy = spyOn(mockGame,'StartGame');
           mockStartGameView = jasmine.createSpyObj("StartGameView",["Update"]);
           var subject = new GameController(null,null,null,100,mockGame,mockStartGameView);

           subject.StartGame();
       });

        it("sets game pause to false", function(){
            expect(gameStartSpy).toHaveBeenCalled();
        });

        it("updates gameStartView", function(){
            expect(mockStartGameView.Update).toHaveBeenCalled();
        });
    });

    describe("When receiving StartGame event but game is not paused", function(){
        var gameStartSpy;
        var mockStartGameView;
        beforeEach(function(){
            var mockGame = {StartGame:function(){},
                        GameState: Game.FINISHED};
            gameStartSpy = spyOn(mockGame,'StartGame');
            mockStartGameView = jasmine.createSpyObj("StartGameView",["Update"]);
            var subject = new GameController(null,null,null,100,mockGame,mockStartGameView);

            subject.StartGame();
        });

        it("does nothing", function(){
            expect(gameStartSpy).not.toHaveBeenCalled();
            expect(mockStartGameView.Update).not.toHaveBeenCalled();
        });
    });
});

function BuildGameControllerAndMockDependencies(){
    var gameView = jasmine.createSpyObj("GameView",["CreateFabricInDiv", "AddKeypressListeners", "Update"]);
    gameView.CreateFabricInDiv.andReturn(jasmine.createSpyObj("farbic",["renderAll"]));
    var mockBoard = jasmine.createSpyObj("GameBoard",["Add","TestDuringInitialize","AddPlayer","GetPlayer"]);
    var gameStartView = jasmine.createSpyObj("GameStartView",["AddToFabric","AddKeypressListeners","Update","SetModel"]);
    var gameEndView = jasmine.createSpyObj("GameStartView",["AddToFabric","AddKeypressListeners","Update","SetModel"]);
    var mockGame = jasmine.createSpyObj("Game",["IsPaused","RoundFinished"]);
    var playerView = jasmine.createSpyObj("PlayerView",["AddToFabric","AddKeypressListeners","Update","SetModel"]);
    var player = {Id:12, GetView: function(){return playerView}};
    var gameSpeed = 100;
    var controller = new GameController(gameView, mockBoard, player, gameSpeed, mockGame,gameStartView, gameEndView);
    return {
        board: mockBoard,
        gameView: gameView,
        gameStartView: gameStartView,
        gameEndView: gameEndView,
        game: mockGame,
        player: player,
        gameSpeed: gameSpeed,
        controller: controller
    };
}