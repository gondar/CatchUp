describe("Game", function(){
    describe("While game is paused", function(){
        var board;

        beforeEach(function(){
            var deps = BuildGameObjectAndDependencies();
            board = deps.board;
            var subject = deps.game;

            subject.RoundFinished();
        });

        it("does not progress falling objects", function(){
            expect(board.MoveDownFallingObjects).not.toHaveBeenCalled();
        })
    });

    describe("When game is started", function(){
        var subject;
        var mockGameTimer;
        beforeEach(function(){
            var deps = BuildGameObjectAndDependencies();
            mockGameTimer = deps.gameTimer;
            subject = deps.game;

            subject.StartGame();
        });

        it("Changes it's status", function(){
           expect(subject.GameState).toBe(Game.STARTED);
        });

        it("Starts game timer", function(){
           expect(mockGameTimer.Start).toHaveBeenCalled();
        });
    });

    describe("When player gets 100 points.", function(){
        var subject;
        var board;
        var mockTimer;
        beforeEach(function(){
           var deps = BuildGameObjectAndDependencies({pointsCounter:{Points:100}});
           board = deps.board;
           subject = deps.game;
            mockTimer = deps.gameTimer;
           subject.StartGame();

           subject.RoundFinished();
        });

        it("finishes game", function(){
             expect(subject.GameState).toBe(Game.FINISHED);
        });

        it("does not progress falling objects", function(){
            expect(board.MoveDownFallingObjects.callCount).toBe(1);
            subject.RoundFinished();
            expect(board.MoveDownFallingObjects.callCount).toBe(1);
        })

        it("stops game timer", function(){
           expect(mockTimer.Stop).toHaveBeenCalled();
        });
    });

    describe("when round is finished", function() {
		var factory;
		var board;
		
		beforeEach(function() {
            var deps = BuildGameObjectAndDependencies();
            board = deps.board;
            factory = deps.factory;
            subject = deps.game;
            subject.StartGame();
		
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
		
		it("verifies collisions",function(){
			expect(board.GetPlayerCollisions).toHaveBeenCalled();
		});
	});
	
	describe("When passed more rounds than limit of falling objects", function() {
		var factory;
		var board;

		beforeEach(function() {
            deps = BuildGameObjectAndDependencies({
                fallingObjectLimit: 2
            });
            board = deps.board;
            factory = deps.factory;
            var subject = deps.game;
            subject.StartGame();
		
			subject.RoundFinished();
			subject.RoundFinished();
			subject.RoundFinished();
		});		
				
		it("it creates unique name for each object", function(){
			expect(board.Add.calls[0].args[0]).toBe("FallingObject0");
			expect(board.Add.calls[1].args[0]).toBe("FallingObject1");
		});
		
		it("it limits number of falling objects on board", function(){
			expect(factory.BuildFallingObject.callCount).toBe(2);
		});
	});
	
	describe("When falling object is removed from a board",function(){
		var factory;
		var board;
		
		beforeEach(function() {
			board = buildBoard([{name:"removedObject"}],[]);
            var deps = BuildGameObjectAndDependencies({
                board: board
            });
            factory = deps.factory;
            var subject = deps.game;
            subject.StartGame();
		
			subject.RoundFinished();
		});
		
		it("it adds a new object for a fallen one", function(){
			expect(factory.BuildFallingObject.callCount).toBe(1);
		});
	});	
	
	describe("When found collision with player", function(){
		var subject;
		var player;
		var board;
		var pointsCounter;
		beforeEach(function(){
			player = {Collision:false};
			board = buildBoard([],["collision1object", "collision2"],player);
            var deps = BuildGameObjectAndDependencies({board:board, player:player});
            pointsCounter = deps.pointsCounter;
            subject = deps.game;

            subject.StartGame();
		});
		
		it("changes player state for every collision",function(){
			subject.RoundFinished();			
			expect(player.Collision).toBe(true);
		});
		
		it("adds points for every collision", function(){
			for (var i=0;i<10;i++)
			{
				subject.RoundFinished();			
				expect(pointsCounter.Points).toBe((i+1)*2);//two collisions in each round
			}
		});
		
		it("removes all colliding object from a board", function(){
			subject.RoundFinished();	
			expect(board.Remove).toHaveBeenCalledWith("collision1object");
			expect(board.Remove).toHaveBeenCalledWith("collision2");
		});
		
		it("adds new object for each removed object", function(){
			subject.RoundFinished();
			expect(board.Add.calls.length).toBe(1);
		});
	});
    describe("When game timer is requested", function(){
        var outcome;
        var mockTimer;
        beforeEach(function(){
            var deps = BuildGameObjectAndDependencies();
            mockTimer = deps.gameTimer;
            var subject = deps.game;

            outcome = subject.GetTimer();
        });

        it("Valid timer is returned", function(){
           expect(outcome).toBe(mockTimer);
        });
    });
});

	function buildBoard(result,collisions,player){
		var board = {
			Add:function(){},
			MoveDownFallingObjects:function(){},
            GetPlayerCollisions:function(){},
			Get:function(){},
            GetPlayer:function(){},
			Remove: function(){},
            AddPlayer: function(){}
		};
		spyOn(board, 'MoveDownFallingObjects').andReturn(result);
		spyOn(board, 'Add').andReturn(result);
		spyOn(board, 'GetPlayerCollisions').andReturn(collisions);
		spyOn(board, 'Get');
		spyOn(board, 'Remove');
        spyOn(board, "AddPlayer");
        spyOn(board, "GetPlayer").andReturn(player || {Collision:false});
		return board;
	}

function BuildGameObjectAndDependencies(params){
    params = params || {};
    var board = params.board || buildBoard([],[]);
    var factory = params.factory || jasmine.createSpyObj("GameFactory", ["BuildFallingObject"]);
    var fallingObjectLimit = params.fallingObjectLimit || 10;
    var pointsCounter = params.pointsCounter || {Points:0};
    var gameTimer = params.gmaeTimer || jasmine.createSpyObj("GameTimer",["Start", "Stop"]);
    var game = subject = new Game(board, factory, fallingObjectLimit, 200, 200,"player", pointsCounter, gameTimer);
    return {
        board: board,
        factory: factory,
        fallingObjectLimit: fallingObjectLimit,
        pointsCounter: pointsCounter,
        gameTimer: gameTimer,
        game: game
    }
}
