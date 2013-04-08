describe("GameEndView", function(){
   describe("When adds itself to fabric", function(){
       var mockFabric;
        beforeEach(function(){
            mockFabric = jasmine.createSpyObj("Fabric",["add","centerObjectH"]);
            var subject = new GameStartView();

            subject.AddToFabric(mockFabric);
        });

       it("Adds it's representation to fabric", function() {
           expect(mockFabric.add).toHaveBeenCalled();
       });
   });
});
