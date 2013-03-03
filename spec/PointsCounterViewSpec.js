describe("Points Counter View", function(){
	var view;
	
	beforeEach(function(){
		view = new PointsCounterView();
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
				Color: '#000000',
				Dimensions: {Width:100,Height:200}
			};
	
			view.SetModel(model);
			view.Update();
		});
		
		it("updates fabric position", function(){
			expect(view.GetFabric().left).toBe(model.Position.x);
			expect(view.GetFabric().top).toBe(model.Position.y);
		});
			
		it("updates color",function(){
			expect(view.GetFabric().fill).toBe(model.Color);
		});
			
		it("updates dimensions", function(){
			expect(view.GetFabric().width).toBe(model.Dimensions.Width);
			expect(view.GetFabric().height).toBe(model.Dimensions.Height);
		});
	});
});