describe("GameStartView", function(){
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

    describe("Any key is pressed", function(){
        var mockController;

       beforeEach(function(){
           mockController = jasmine.createSpyObj("Controller",["StartGame"]);
           var subject = new GameStartView();

           subject.AddKeypressListeners(mockController);
           var key = jQuery.Event("keydown");
           key.which = GameView.KEYBOARD_LEFT;
           $(document).trigger(key);
       });

        afterEach(function(){
            $(document).off();
        });

        it("sends event to registered controller", function(){
            expect(mockController.StartGame).toHaveBeenCalled();
        });
    });
});
