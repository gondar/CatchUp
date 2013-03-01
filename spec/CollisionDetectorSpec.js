describe("Collision detector",function(){
	var subject;
	var outcome;
	var object1;
	var object2;
	beforeEach(function(){
		subject = new CollisionDetector();
		object1 = {Position:{x:0,y:0},Dimensions:{Width:10,Height:10}};
		object2 = {Position:{x:0,y:0},Dimensions:{Width:10,Height:10}};
	});
	describe("When there is no collision",function(){		
		it("because object is on the right",function(){
			object1.Position.x = 100;
			outcome = subject.IsCollision(object1,object2);
			expect(outcome).toBe(false);
		});
		it("because object is on the left",function(){
			object1.Position.x = -100;
			outcome = subject.IsCollision(object1,object2);
			expect(outcome).toBe(false);
		});
		it("because object is below",function(){
			object1.Position.y = 100;
			outcome = subject.IsCollision(object1,object2);
			expect(outcome).toBe(false);
		});
		it("because object is above",function(){
			object1.Position.y = -100;
			outcome = subject.IsCollision(object1,object2);
			expect(outcome).toBe(false);
		});
	});
	
	describe("When there is a collision",function(){	
		it("objects are exactly on each other",function(){
			expect(subject.IsCollision(object1,object2)).toBe(true);
			expect(subject.IsCollision(object2,object1)).toBe(true);
		});
		it("objects are partialy on each other (move on x)",function(){
			object1.Position.x = 5;
			expect(subject.IsCollision(object1,object2)).toBe(true);
			expect(subject.IsCollision(object2,object1)).toBe(true);
		});
		it("objects are partialy on each other (move on y)",function(){
			object1.Position.y = 5;
			expect(subject.IsCollision(object1,object2)).toBe(true);
			expect(subject.IsCollision(object2,object1)).toBe(true);
		});
	});
});