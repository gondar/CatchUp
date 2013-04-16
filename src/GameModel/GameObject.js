function GameObject(view){
    var _speedVector = {x:0, y:0};
    var _position = {x:0, y:0};
    var _dimensions = {Width:20,Height:20};

    var self = {
        Collision: false,
        Dimensions: _dimensions,
        Position: _position,
        GetView: function() {
            return view;
        },
        GetSpeedVector: function(){
            return _speedVector;
        }
    }
    view.SetModel(self);
    return self;
}