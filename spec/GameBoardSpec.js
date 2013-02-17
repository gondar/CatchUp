describe("GameBoard", function() {
	it("adds elements to a board", function(){
		var subject = new GameBoard();
		var object = {"name":"ObjectName"};
		
		subject.Add(object.name, object);
		
		expect(subject.Get(object.name)).toEqual(object);
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