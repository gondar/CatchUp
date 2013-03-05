function Game(board, factory, limit, width, height, playerObjectName, pointsCounter){
	var _board = board;
    var _factory = factory;
    var _fallingObjectIndex = 0;
    var _fallingObjectCount = 0;
    var _limit = limit;
    var _width = width;
    var _height = height;
    var _playerObjectName = playerObjectName;
    var _previousColor = '';
    var _pointsCounter = pointsCounter;

    var _addFallingObject = function(fallingObjectString){
        _fallingObjectCount++;
        var name = fallingObjectString+_fallingObjectIndex++;
        var fallingObject = _factory.BuildFallingObject(_width);
        _board.Add(name,fallingObject);
    }

    return {
        RoundFinished: function(){
            _board.Get(_playerObjectName).Collision = false;
            var fallingObjectString = "FallingObject";
            var removedObjects = _board.MoveDownFallingObjects(fallingObjectString);
            _fallingObjectCount = _fallingObjectCount - removedObjects.length;
            if (_fallingObjectCount < _limit)
                _addFallingObject(fallingObjectString);
            var collisions = _board.GetCollisions(_playerObjectName);
            if (collisions.length != 0)
            {
                _board.Get(_playerObjectName).Collision = true;
            };
            for (var element in collisions) {
                _fallingObjectCount--;
                _board.Remove(collisions[element]);
                _addFallingObject(fallingObjectString);
                _pointsCounter.Points++;
            }
        }
    }
}

