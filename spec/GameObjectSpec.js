describe("GameObject", function(){
	it("contains current position", function(){
		var view = {SetModel: function(model){}};
		var subject = new GameObject(view);
		
		subject.Position = 5;
		
		expect(subject.Position).toBe(5);
	});
	
	it("contains its own view", function(){
		var view = {SetModel: function(model){}};
		var subject = new GameObject(view);
		
		var result = subject.GetView();
		
		expect(result).toBe(view)
	});
});