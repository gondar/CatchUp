describe("Calculator", function() {
	it("should be able to add two numbers", function(){
		var subject = new Calculator();
		
		var outcome = subject.Add(10,20);
		
		expect(outcome).toEqual(30);
	});
});