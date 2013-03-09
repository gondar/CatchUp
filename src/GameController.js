function GameController(view, gameBoard, player, speed, game){
	var _board = gameBoard;
	var _player = player;
	var _boardView = view;
	var _gameSpeed = speed;
	var _game = game;
    _game.IsPaused = false;

    return {
        TimerEvent: function() {
            _game.RoundFinished();
            _boardView.Update();
        },
        Initialize: function(gameDivId, playerName) {
            var controller = this;
            setInterval(function() {
                controller.TimerEvent();
            }, _gameSpeed);
            _board.Add(playerName,_player);
            _boardView.CreateFabricInDiv(gameDivId);
            _boardView.AddKeypressListeners(controller);
            _boardView.Update();
        },
        MovePlayerLeft: function() {
            _board.MoveLeft("player");
            _boardView.Update();
        },
        MovePlayerRight: function() {
            _board.MoveRight("player");
            _boardView.Update();
        }
    }
}