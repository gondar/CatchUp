function PlayerView(){
    var _fabric = 	new fabric.Rect({
        fill: '#110022',
        originX: 'left',
        originY: 'top'
    });
    var _color = 0;
    var _model;
    var _canvas = null;
    function _addToCanvas(){
        if (_fabric != null) {
            _canvas.add(_fabric);
        }
    }

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
            _fabric.set({left: _model.Position.x+_fabric.width/2, top: _model.Position.y-_fabric.height/2});
            _fabric.set({width: _model.Dimensions.Width, height: _model.Dimensions.Height});
            if (_model.Collision) {
                _fabric.animate({color:'#ff0000'});
            }
        },
        SetModel: function(model){
            _model = model;
            this.Update();
        }
    }
}
