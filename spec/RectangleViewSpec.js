describe("RectangleView", function(){
	it("creates fabric object", function(){
		var subject = new RectangleView();
		
		var fabric = subject.GetFabric()
		
		expect(fabric).not.toBe(undefined);
	});
	
	it("Sets default value to current model state", function(){
		var model = {
			Position: 1,
			GetPosition: function() {
				return Position;
			}
		};		
		var subject = new RectangleView();
		
		subject.SetModel(model);
		
		expect(subject.GetFabric().left).toBe(10*model.Position);
	});
	
	it("Updates its position according to model position",function(){
		var model = {
			Position: 1,
			GetPosition: function() {
				return Position;
			}
		};
		var subject = new RectangleView();
		subject.SetModel(model);
		model.Position = 100;
		
		subject.Update();
		
		expect(subject.GetFabric().left).toBe(10*model.Position);
	});
});