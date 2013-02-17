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
				Position: 1,
				GetPosition: function() {
					return Position;
				}
			};
	
			view.SetModel(model);
		});
	
		describe("when first setting model", function(){
			it("it updates current position according to model position",function(){
				expect(view.GetFabric().left).toBe(10*model.Position);
			});
		});
		
		describe("when update is requested",function(){
			beforeEach(function(){
				model.Position = 100;
		
				view.Update();
			});
			
			it("updates fabric position", function(){
				expect(view.GetFabric().left).toBe(10*model.Position);
			});
		});
	});
});