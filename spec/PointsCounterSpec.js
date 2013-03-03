describe("Points Counter",function(){
	describe("when points are added", function(){
		var subject;
		beforeEach(function(){
			var view = jasmine.createSpyObj("view",["SetModel"]);
			subject = new PointsCounter(view);
			
			subject.Points += 1
		});
		it("allows changing of points property", function(){
			expect(subject.Points).toBe(1);
		});		
	});
});