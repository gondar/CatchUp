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
				GetPosition: function() {
					return Position;
				}
			};
	
			view.SetModel(model);
		});
	
		describe("when first setting model", function(){
			it("it updates current position according to model position",function(){
				expect(view.GetFabric().left).toBe(10*model.Position.x);
				expect(view.GetFabric().top).toBe(model.Position.y);
			});
		});
		
		describe("when update is requested",function(){
			beforeEach(function(){
				model.Position = {x:10,y:20};
		
				view.Update();
			});
			
			it("updates fabric position", function(){
				expect(view.GetFabric().left).toBe(10*model.Position.x);
				expect(view.GetFabric().top).toBe(model.Position.y);
			});
		});
	});
});