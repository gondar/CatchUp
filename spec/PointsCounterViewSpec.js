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
				Points: 10
			};
	
			view.SetModel(model);
			view.Update();
		});
		
		it("Reads points value", function(){
			expect(view._points).toBe(100);
		});
	});
});