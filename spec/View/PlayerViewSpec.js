describe("PlayerView", function(){
    var view;

    beforeEach(function(){
        //setFixtures("<div id='fallingObject'></div>");
        view = new PlayerView();
    });
    describe("when initialized key press listening", function(){
        var _controller;
        beforeEach(function(){
            _controller = jasmine.createSpyObj('BoardController',['MovePlayerLeft', 'MovePlayerRight']);
            view.AddKeypressListeners(_controller);
        });

        afterEach(function(){
            $(document).off();
        });

        it("passes move player left to controller", function(){
            var key = jQuery.Event("keydown");
            key.which = GameView.KEYBOARD_LEFT;
            $(document).trigger(key);

            expect(_controller.MovePlayerLeft).toHaveBeenCalled();
        });

        it("passes move player left to controller", function(){
            var key = jQuery.Event("keydown");
            key.which = GameView.KEYBOARD_RIGHT;
            $(document).trigger(key);

            expect(_controller.MovePlayerRight).toHaveBeenCalled();
        });
    });
});
