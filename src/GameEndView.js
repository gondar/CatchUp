function GameEndView(){
    var _fabricBackground = new fabric.Rect({
        left: 0,
        top: 0,
        fill: '#ffffff',
        width: 1000,
        height: 1000,
        selectable:false,
        opacity: 0
    });
    var _fabricText = new fabric.Text("Game Over", {
        top: 40,
        fontStyle: 'italic',
        fontFamily: 'Delicious',
        fontSize: 40,
        selectable:false,
        opacity: 0
    });
    var _timeText = new fabric.Text("0", {
        top: 90,
        fontStyle: 'italic',
        fontFamily: 'Delicious',
        fontSize: 40,
        selectable:false,
        opacity: 0
    });
    var _model;
    var _canvas = null;
    var _updated = false;

    function _bringToFront() {
        _canvas.bringToFront(_fabricBackground);
        _canvas.bringToFront(_fabricText);
        _canvas.bringToFront(_timeText);
    }

    function _showObjects() {
        _timeText.animate({opacity: 1});
        _fabricText.animate({opacity: 1});
        _fabricBackground.opacity = 0.96;
    }

    return {
        AddToFabric: function(canvas) {
            _canvas = canvas;
            _canvas.add(_fabricBackground);
            _canvas.add(_fabricText);
            _canvas.centerObjectH(_fabricText);
            _canvas.add(_timeText);
            _canvas.centerObjectH(_timeText);
        },
        AddKeypressListeners: function(controller) {
        },
        Update: function(){
           if (_canvas == null)
            return;
           if (_model.GameState == Game.FINISHED) {
               _timeText.text = "Time: "+ (_model.GetTimer().GetTime()/1000).toString()+"s";
               _showObjects();
               _bringToFront();
               _canvas.renderAll();
               return;
           }
            _updated = false;
            _fabricText.opacity = 0;
            _fabricBackground.opacity = 0;
        },
        SetModel: function(model){
            _model = model;
            this.Update();
        }
    }
}
