function GameStartView(){
    var _fabricBackground = new fabric.Rect({
        left: 0,
        top: 0,
        fill: '#ffffff',
        width: 4048,
        height: 2048,
        opacity: 0.96
    });
    var _fabricText = new fabric.Text("Press right or left arrow key to start a game...", {
        top: 40,
        fontStyle: 'italic',
        fontFamily: 'Delicious',
        fontSize: 20
    });
    var _model;
    var _canvas = null;

    return {
        AddToFabric: function(canvas) {
            _canvas = canvas;
            _canvas.add(_fabricBackground);
            _canvas.add(_fabricText);
            _canvas.centerObjectH(_fabricText);
        },
        AddKeypressListeners: function(controller) {
            $(document).keydown({controller: controller}, function(event){
                var controller = event.data.controller;
                if (event.which == GameView.KEYBOARD_LEFT ||
                    event.which == GameView.KEYBOARD_RIGHT)
                {
                    controller.StartGame();
                }
            })
        },
        Update: function(){
           if (_canvas != null && _model.GameState != Game.PAUSED) {
               _fabricText.opacity = 0;
               _fabricBackground.animate('opacity',0,
                   {
                       duration:520,
                       easing: fabric.util.ease.easeInOutSine
                   });
           }
        },
        SetModel: function(model){
            _model = model;
            this.Update();
        }
    }
}
