function Player(view){
    var _object = new GameObject(view);
    _object.MoveLeft = function(){
        _move(-10);
    };

    _object.MoveRight = function(){
        _move(10);
    }

    function _move(direction){
        var currentPosition = _object.Position.x;
        var newPosition = currentPosition + direction;
        _object.Position.x = newPosition;
    }

    return _object;
}
