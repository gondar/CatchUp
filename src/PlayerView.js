function PlayerView(){
//    var _fabric = new fabric.Rect({
//        left: 100,
//        top: 100,
//        fill: '#000000',
//        width: 30,
//        height: 10
//    });
    var _fabric = null;
    var _color = 0;
    var _model;
    var _canvas = null;
    function _addToCanvas(){
        if (_fabric != null)
            _canvas.add(_fabric);
    }
    fabric.Image.fromURL("./img/1.png", function(img){
        _fabric = img;
        if (_canvas != null)
            _addToCanvas();
    });

    return {
        AddToFabric: function(canvas) {
            _canvas = canvas;
            _addToCanvas();
        },
        AddKeypressListeners: function(controller) {
        },
        Update: function(){
            if (_fabric == null)
                return;
            _fabric.set({left: _model.Position.x, top: _model.Position.y});
            _fabric.scaleToWidth(_model.Dimensions.Width);
            _model.Dimensions.Height = _fabric.height;
            //_fabric.set({width: _model.Dimensions.Width, height: _model.Dimensions.Height});
            if (_color > 1){
                _color -=1;
                _fabric.set({fill: "#"+_color+"c1c1c"});
            }
            if (_model.Collision) {
                _color = 9;
            }
        },
        SetModel: function(model){
            _model = model;
            this.Update();
        }
    }
}
