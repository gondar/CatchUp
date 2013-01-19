describe("GameBoard", function() {
	it("contains a list of objects", function(){
		var subject = new GameBoard();
		var object = {"name":"ObjectName"};
		
		subject.Add(object.name, object);
		
		expect(subject.Get(object.name)).toEqual(object);
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
});