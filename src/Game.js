function Game(board, factory, limit, width, height, playerObjectName, pointsCounter, gameTimer){
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
    var _gameTimer = gameTimer;

    function _addFallingObject(fallingObjectString){
        _fallingObjectCount++;
        var name = fallingObjectString+_fallingObjectIndex++;
        var fallingObject = _factory.BuildFallingObject(_width);
        _board.Add(name,fallingObject);
    }

    function _handleCollisions(fallingObjectString) {
        var collisions = _board.GetPlayerCollisions();
        if (collisions.length != 0) {
            _board.GetPlayer().Collision = true;
        };
        for (var element in collisions) {
            _fallingObjectCount--;
            _board.Remove(collisions[element]);
            _pointsCounter.Points++;
        }
    }

    function _moveAndAddFallingObjects(fallingObjectString) {
        var removedObjects = _board.MoveDownFallingObjects(fallingObjectString);
        _fallingObjectCount = _fallingObjectCount - removedObjects.length;
    }

    return {
        RoundFinished: function(){
            if (this.GameState != Game.STARTED)
                return;
            _board.GetPlayer().Collision = false;
            var fallingObjectString = "FallingObject";
            _handleCollisions(fallingObjectString);
            _moveAndAddFallingObjects(fallingObjectString);
            if (_fallingObjectCount < _limit)
                _addFallingObject(fallingObjectString);
            if (_pointsCounter.Points >= 100) {
                this.GameState = Game.FINISHED;
                _gameTimer.Stop();
            }
        },
        StartGame: function() {
           this.GameState = Game.STARTED;
           _gameTimer.Start();
        },
        GetTimer: function() {
            return _gameTimer;
        },
        GameState: Game.PAUSED
    }
}

Game.PAUSED = "paused";
Game.STARTED = "started";
Game.FINISHED = "finished";
