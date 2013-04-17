describe("GameBoard", function() {
	describe("refactored tests", function(){
		var board;
		describe("When requested to progress falling objects", function(){
			var object1;
			var object2;
			var object3;
			var outcome;
			
			beforeEach(function(){
				board = new GameBoard(100, 20);
				object1 = {name:"FallingTestObject", Position:{x:10,y:10}};
				object2 = {name:"TestObject", Position:{x:10,y:10}};
				object3 = {name:"FallingObjectNearLowerBorder", Position:{x:10,y:20}};
				board.Add(object1.name,object1);
				board.Add(object2.name,object2);
				board.Add(object3.name,object3);
				
				outcome = board.MoveDownFallingObjects("Falling");
			});
			
			it("moves falling object down", function(){
				expect(object1.Position.y).toBeGreaterThan(10);
				expect(object1.Position.x).toBe(10);
			});
			
			it("leaves not falling objects on the same position", function(){
				expect(object2.Position.x).toBe(10);
				expect(object2.Position.y).toBe(10);
			});
			
			it("returns a list of removed objects",function(){
				expect(outcome[0]).toBe(object3);
			});
			
			it("removes objects under border from board",function(){
				expect(board.Get(object3.name)).toBe(undefined);
			});
		});
		
		describe("When added element to a board", function(){
			var object;
			
			beforeEach(function(){
				board = new GameBoard(100, 20);
				object = {name:"ObjectName"};
		
				board.Add(object.name, object);				
			});
			
			it("allows to obtain it back",function(){
				expect(board.Get(object.name)).toEqual(object);
			});
		});

        describe("When added player to a board", function(){
            var player;

            beforeEach(function(){
                board = new GameBoard(100, 20);
                player = {name:"ObjectName"};

                board.AddPlayer(player) ;
            });

            it("allows to obtain it back",function(){
                expect(board.GetPlayer()).toEqual(player);
            });
        });

		describe("When requested for points counter",function(){
			var pointsCounter;
			beforeEach(function(){
				pointsCounter = {}
				board = new GameBoard(100,100,null,pointsCounter);
			});
			
			it("returns valid points counter model", function(){
				expect(board.GetPointsCounter()).toBe(pointsCounter);
			});
		});
		
		describe("Finding collisions",function(){
			describe("When requested list of all collisions for a player", function(){
				var outcome;
				
				beforeEach(function(){
					var collisionDetector = {IsCollision:function(){return true;}}
					board = new GameBoard(100, 20, collisionDetector);
                    var player = {name:"Player", Position:{x:10, y:10}, Dimensions: {Width:10,Height:10}};
					var object2 = {name:"Object", Position:{x:15, y:10}, Dimensions: {Width:10,Height:10}};
					board.AddPlayer(player);
					board.Add(object2.name, object2);
				
					outcome = board.GetPlayerCollisions()
				});
				
				it("has only one collision",function(){
					expect(outcome.length).toBe(1);
				});
			
				it("finds all collisions",function(){
					expect(outcome[0]).toBe("Object");
				});
			});
			
		describe("When there are no collisions for a given object", function(){
				var outcome;
				
				beforeEach(function(){
					var collisionDetector = {IsCollision:function(){return false;}}
					board = new GameBoard(100, 20, collisionDetector);
                    var player = {name:"Player", Position:{x:10, y:10}, Dimensions: {Width:10,Height:10}};
                    var object2 = {name:"Object", Position:{x:15, y:10}, Dimensions: {Width:10,Height:10}};
                    board.AddPlayer(player);
                    board.Add(object2.name, object2);
				
					outcome = board.GetPlayerCollisions()
				});
				
				it("returns empty collisions list",function(){
					expect(outcome.length).toBe(0);
				});
			});
		});
	});	
	
	it("exposes all elements on a board", function() {
		var subject = new GameBoard();
		var object1 = {"name":"Object1"};
		var object2 = {"name":"Object2"};
		subject.Add(object1.name, object1);
		subject.Add(object2.name, object2);
		
		var objects = subject.GetObjectsOnBoard();
		
		expect(objects["Object1"]).toEqual(object1);
		expect(objects["Object2"]).toEqual(object2);
	});
});