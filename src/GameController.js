function GameController(view, gameBoard, player, speed, game, startGameView){
	var _board = gameBoard;
	var _player = player;
	var _boardView = view;
	var _gameSpeed = speed;
	var _game = game;
    var _startGameView = startGameView;
    var _fabric;

    function InitializeBoardAndBoardView(playerName, gameDivId, controller) {
        _board.Add(playerName, _player);
        _fabric = _boardView.CreateFabricInDiv(gameDivId);
        _boardView.AddKeypressListeners(controller);
        _boardView.Update();
    }

    function InitializeGameStart(controller) {
        _startGameView.SetModel(_game);
        _startGameView.AddToFabric(_fabric);
        _startGameView.AddKeypressListeners(controller);
        _startGameView.Update();
    }

    return {
        TimerEvent: function() {
            _game.RoundFinished();
            _boardView.Update();
            _startGameView.Update();
        },
        Initialize: function(gameDivId, playerName) {
            var controller = this;
            setInterval(function() {
                controller.TimerEvent();
            }, _gameSpeed);
            InitializeBoardAndBoardView(playerName, gameDivId, controller);
            InitializeGameStart(controller);
            //_game.IsPaused = false;
        },
        MovePlayerLeft: function() {
            _board.MoveLeft("player");
            _boardView.Update();
        },
        MovePlayerRight: function() {
            _board.MoveRight("player");
            _boardView.Update();
        },
        StartGame: function() {
            _game.IsPaused = false;
            _startGameView.Update();
        }
    }
}