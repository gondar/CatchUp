function GameController(view, gameBoard, player, speed, game, gameStartView, gameEndView){
	var _board = gameBoard;
	var _player = player;
	var _boardView = view;
	var _gameSpeed = speed;
	var _game = game;
    var _gameStartView = gameStartView;
    var _gameEndView = gameEndView;
    var _fabric;

    function InitializeBoardAndBoardView(playerName, gameDivId, controller) {
        _board.AddPlayer(_player);
        _fabric = _boardView.CreateFabricInDiv(gameDivId);
        _boardView.AddKeypressListeners(controller);
        _boardView.Update();
    }

    function InitializeGameStart(controller) {
        _gameStartView.SetModel(_game);
        _gameStartView.AddToFabric(_fabric);
        _gameStartView.AddKeypressListeners(controller);
        _gameStartView.Update();
    }

    function InittializeGameEnd(controller) {
        _gameEndView.SetModel(_game);
        _gameEndView.AddToFabric(_fabric);
        _gameEndView.AddKeypressListeners(controller);
        _gameEndView.Update();
    }

    function InitializePlayerView(controller) {
        var playerView = _player.GetView();
        playerView.SetModel(_player);
        playerView.AddToFabric(_fabric);
        playerView.AddKeypressListeners(controller);
        playerView.Update();
    }

    return {
        TimerEvent: function() {
            _game.RoundFinished();
            _boardView.Update();
            _gameStartView.Update();
            _gameEndView.Update();
            _player.GetView().Update();
            _fabric.renderAll();
        },
        Initialize: function(gameDivId, playerName) {
            var controller = this;
            setInterval(function() {
                controller.TimerEvent();
            }, _gameSpeed);
            InitializeBoardAndBoardView(playerName, gameDivId, controller);
            InitializePlayerView(controller);
            InitializeGameStart(controller);
            InittializeGameEnd(controller);
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
            if (_game.GameState != Game.PAUSED)
                return;
            _game.StartGame();
            _gameStartView.Update();
        }
    }
}