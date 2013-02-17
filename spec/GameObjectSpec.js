describe("GameObject", function(){
	var subject;
	var view;

	beforeEach(function(){
		view = jasmine.createSpyObj("View",["SetModel"]);
		subject = new GameObject(view);
	});

	describe("When setting object position",function(){
		beforeEach(function(){
			subject.Position = {x: 10, y: 25};
		});
		
		it("it changed x value",function(){
			expect(subject.Position.x).toBe(10);
		});
		
		it("it changed y value",function(){
			expect(subject.Position.y).toBe(25);
		});
	});
	
	describe("when getting accessing object view",function(){
		beforeEach(function(){	 
			result = subject.GetView();
		});
		
		it("returns view",function(){
			expect(result).toBe(view)
		});
	});
});