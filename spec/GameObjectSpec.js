describe("GameObject", function(){
	var subject;
	var view;

	beforeEach(function(){
		view = jasmine.createSpyObj("View",["SetModel"]);
		subject = new GameObject(view);
	});

	describe("When setting object position",function(){
		beforeEach(function(){
			subject.Position = 5;
		});
		
		it("it is changed",function(){
			expect(subject.Position).toBe(5);
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