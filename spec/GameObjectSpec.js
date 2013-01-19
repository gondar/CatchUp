describe("GameObject", function(){
	it("contains current position", function(){
		var subject = new GameObject();
		
		subject.Position = 5;
		
		expect(subject.Position).toBe(5);
	});
});