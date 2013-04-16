function PlayerView(){
    fabric.Image.fromURL("file:///C:/Documents%20and%20Settings/gondar/Pulpit/src/javascript/CatchUp/img_workspace/gimp/cloud.png", function(img){
        _fabric = img;
        if (_canvas != null)
            _addToCanvas();
    });
    var _fabric;//= new fabric.Rect({width:100,height:50});
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
            //_fabric.set({width: _model.Dimensions.Width, height: _model.Dimensions.Height});
            _model.Dimensions = {Width: _fabric.width, Height: _fabric.height};
            if (_model.Collision) {
                _fabric.animate({color:'#ff0000'});
            }
        },
        SetModel: function(model){
            _model = model;
            this.Update();
        },
    }
}
