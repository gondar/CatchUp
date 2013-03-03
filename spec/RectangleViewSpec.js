describe("RectangleView", function(){
	var view;
	
	beforeEach(function(){
		view = new RectangleView();
	});
	
	describe("when rendering element is requested", function(){
		var fabric;
		
		beforeEach(function(){			
			fabric = view.GetFabric()
		});
		
		it("it returns base fabric object", function(){
			expect(fabric).not.toBe(undefined);
		});
	});
	
	describe("model-view consistency",function(){
		var model;	

		beforeEach(function(){
			model = {
				Position: {x:1,y:10},
				State: false,
				Dimensions: {Width:100,Height:200}
			};
	
			view.SetModel(model);
		});
		
		describe("when update is requested",function(){
			beforeEach(function(){
				model.Position = {x:10,y:20};
				model.Dimensions = {Width:100,Height:200};
		
				view.Update();
			});
			
			it("updates fabric position", function(){
				expect(view.GetFabric().left).toBe(model.Position.x);
				expect(view.GetFabric().top).toBe(model.Position.y);
			});
			
			it("updates dimensions", function(){
				expect(view.GetFabric().width).toBe(model.Dimensions.Width);
				expect(view.GetFabric().height).toBe(model.Dimensions.Height);
			});
		});
	});
});