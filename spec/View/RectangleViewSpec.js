describe("RectangleView", function(){
	var view;
	
	beforeEach(function(){
        setFixtures("<div id='fallingObject'></div>");
        view = new RectangleView();
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
				expect(view._fabric.left).toBe(model.Position.x);//this is ok because fixture fabric width is 0
				expect(view._fabric.top).toBe(model.Position.y); //this is ok because fixture fabric height is 0
			});
			
			it("updates dimensions in model", function(){
				expect(view._fabric.width).toBe(model.Dimensions.Width);
				expect(view._fabric.height).toBe(model.Dimensions.Height);
			});
		});
	});
});