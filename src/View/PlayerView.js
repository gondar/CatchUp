function PlayerView(){
    var imgElement = document.getElementById('player');
    var _fabric = new fabric.Image(imgElement,{});
    var _model;
    var _canvas = null;
    function _addToCanvas(canvas){
        _canvas = canvas;
        _canvas.add(_fabric);
    }

    return {
        AddToFabric: _addToCanvas,
        AddKeypressListeners: function(controller) {
            $(document).keydown({controller: controller}, function(event){
                var controller = event.data.controller;
                if (event.which == GameView.KEYBOARD_LEFT){
                    controller.MovePlayerLeft();
                }
                if (event.which == GameView.KEYBOARD_RIGHT){
                    controller.MovePlayerRight();
                }
            })
        },
        Update: function(){
            if (_fabric == null)
                return;
            _fabric.set({left: _model.Position.x+_fabric.width/2, top: _model.Position.y+_fabric.height/2});
            _model.Dimensions = {Width: _fabric.width, Height: _fabric.height};
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
