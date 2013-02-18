describe("GameBoard", function() {
	describe("refactored tests", function(){
		var board;
		beforeEach(function(){
			board = new GameBoard();
		});
		describe("When requested to progress falling objects", function(){
			var object1;
			var object2;
			
			beforeEach(function(){
				object1 = {name:"FallingTestObject", Position:{x:10,y:10}};
				object2 = {name:"TestObject", Position:{x:10,y:10}};
				board.Add(object1.name,object1);
				board.Add(object2.name,object2);
				
				board.MoveDownFallingObjects("Falling");
			});
			
			it("moves falling object down", function(){
				expect(object1.Position.y).toBeGreaterThan(10);
				expect(object1.Position.x).toBe(10);
			});
			
			it("leaves not falling objects on the same position", function(){
				expect(object2.Position.x).toBe(10);
				expect(object2.Position.y).toBe(10);
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