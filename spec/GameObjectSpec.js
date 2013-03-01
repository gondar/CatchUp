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
	
	describe("When setting object color",function(){
		beforeEach(function(){
			subject.Color ='#00f0f0';
		});
		
		it("it changed color", function(){
			expect(subject.Color).toBe('#00f0f0');
		});
	});
	
	describe("When setting object dimension", function(){
		beforeEach(function(){
			subject.Dimensions = {Width:10,Height:20};
		});
		
		it("it changes Width",function(){
			expect(subject.Dimensions.Width).toBe(10);
		});
		
		it("it changes Height",function(){
			expect(subject.Dimensions.Height).toBe(20);
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