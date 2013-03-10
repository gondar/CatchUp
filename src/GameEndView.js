function GameEndView(){
    var _fabricBackground = new fabric.Rect({
        left: 0,
        top: 0,
        fill: '#ffffff',
        width: 1000,
        height: 1000,
        opacity: 0
    });
    var _fabricText = new fabric.Text("Game Over", {
        top: 40,
        fontStyle: 'italic',
        fontFamily: 'Delicious',
        fontSize: 40,
        opacity: 0
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
        },
        Update: function(){
           if (_canvas == null)
            return;
           if (_model.GameState == Game.FINISHED) {
               _fabricText.animate({opacity:1});
               _fabricBackground.opacity = 0.96;
               _canvas.bringToFront(_fabricBackground);
               _canvas.bringToFront(_fabricText);
               _canvas.renderAll();
               return;
           }
            _fabricText.opacity = 0;
            _fabricBackground.opacity = 0;
        },
        SetModel: function(model){
            _model = model;
            this.Update();
        }
    }
}
