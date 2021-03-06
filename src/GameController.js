function GameController(view, gameBoard, player, speed, game, gameStartView, gameEndView){
	var _board = gameBoard;
	var _player = player;
	var _boardView = view;
	var _gameSpeed = speed;
	var _game = game;
    var _gameStartView = gameStartView;
    var _gameEndView = gameEndView;
    var _fabric;
    var _timerEventInterval;

    function InitializeBoardAndBoardView(gameDivId) {
        _board.AddPlayer(_player);
        _fabric = _boardView.CreateFabricInDiv(gameDivId);
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
        Initialize: function(gameDivId) {
            var controller = this;
            _timerEventInterval = setInterval(function() {
                controller.TimerEvent();
            }, _gameSpeed);
            InitializeBoardAndBoardView(gameDivId);
            InitializePlayerView(controller);
            InitializeGameStart(controller);
            InittializeGameEnd(controller);
        },
        MovePlayerLeft: function() {
            _player.MoveLeft();
            _boardView.Update();
        },
        MovePlayerRight: function() {
            _player.MoveRight();
            _boardView.Update();
        },
        StartGame: function() {
            if (_game.GameState != Game.PAUSED)
                return;
            _game.StartGame();
            _gameStartView.Update();
        },
        StopTimerEvent: function(){
            clearInterval(_timerEventInterval);
        }
    }
}