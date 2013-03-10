function PlayerView(){
    var _fabric = new fabric.Rect({
        left: 100,
        top: 100,
        fill: '#000000',
        width: 30,
        height: 10
    });
    var _color = 0;
    var _model;
    var _canvas = null;

    return {
        AddToFabric: function(canvas) {
            _canvas = canvas;
            _canvas.add(_fabric);
        },
        AddKeypressListeners: function(controller) {
        },
        Update: function(){
            _fabric.set({left: _model.Position.x, top: _model.Position.y});
            _fabric.set({width: _model.Dimensions.Width, height: _model.Dimensions.Height});
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
