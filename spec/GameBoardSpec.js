describe("GameBoard", function() {
	describe("refactored tests", function(){
		var board;
		beforeEach(function(){
			board = new GameBoard(100, 20);
		});
		describe("When requested to progress falling objects", function(){
			var object1;
			var object2;
			var object3;
			var outcome;
			
			beforeEach(function(){
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
				object = {name:"ObjectName"};
		
				board.Add(object.name, object);				
			});
			
			it("allows to obtain it back",function(){
				expect(board.Get(object.name)).toEqual(object);
			});
		})
		
		describe("Finding collisions",function(){
			describe("When requested list of all collisions for a given object", function(){
				var outcome;
				
				beforeEach(function(){
					var object1 = {name:"Object1", Position:{x:10, y:10}, Dimensions: {Width:10,Height:10}};
					var object2 = {name:"Object2", Position:{x:15, y:10}, Dimensions: {Width:10,Height:10}};
					board.Add(object1.name, object1);
					board.Add(object2.name, object2);
				
					outcome = board.GetCollisions("Object1")
				});
				
				it("has only one collision",function(){
					expect(outcome.length).toBe(1);
				});
			
				it("finds all collisions",function(){
					expect(outcome[0]).toBe("Object2");
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
	
	it("allows to move object right", function(){
		var subject = new GameBoard();
		var object = {"Name": "test", "Position": {x:0,y:0}};
		subject.Add(object.Name, object);
		
		subject.MoveRight(object.Name);
		
		expect(object.Position).toEqual({x:1,y:0});
	});
	
	it("allows to move object left", function(){
		var subject = new GameBoard();
		var object = {"Name": "test", "Position": {x:1,y:0}};
		subject.Add(object.Name, object);
		
		subject.MoveLeft(object.Name);
		
		expect(object.Position).toEqual({x:0,y:0});
	});
});