describe("GameBoard", function() {
	it("adds elements to a board", function(){
		var subject = new GameBoard();
		var object = {"name":"ObjectName"};
		
		subject.Add(object.name, object);
		
		expect(subject.Get(object.name)).toEqual(object);
	});
	
	it("exposes all elements on a board", function() {
		var subject = new GameBoard();
		var object = {"name":"ObjectName"};
		subject.Add(object.name, object);
		
		var objects = subject.GetObjectsOnBoard();
		
		expect(objects["name"]).toEqual(object);
	});
	
	it("allows to move object right", function(){
		var subject = new GameBoard();
		var object = {"Name": "name", "Position": 0};
		subject.Add(object.Name, object);
		
		subject.MoveRight(object.Name);
		
		expect(object.Position).toEqual(1);
	});
	
	it("allows to move object left", function(){
		var subject = new GameBoard();
		var object = {"Name": "name", "Position": 1};
		subject.Add(object.Name, object);
		
		subject.MoveLeft(object.Name);
		
		expect(object.Position).toEqual(0);
	});
	
	it("creates new falling object", function(){
		var subject = new GameBoard();
		
		var name = subject.CreateNewFallingObject();
		
		expect(subject.GetObjectsOnBoard()[name]).not.toBe(undefined);
		expect(subject.GetObjectsOnBoard()[name]._view).not.toBe(undefined);
	});
	
	it("creates new falling object with different location each", function(){
		var subject = new GameBoard();
		
		var obj1Id = subject.CreateNewFallingObject();
		var obj2Id = subject.CreateNewFallingObject();
		
		expect(obj1Id).not.toBe(obj2Id);
		var obj1Position = subject.GetObjectsOnBoard()[obj1Id].Position
		var obj2Position = subject.GetObjectsOnBoard()[obj2Id].Position
		expect(obj1Position).not.toBe(obj2Position);
	});
});