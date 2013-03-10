function GameTimer(){
    var _timerStarted;
    var _timerEnd;
    return {
        Start: function(){
            _timerStarted = new Date();
        },
        Stop: function(){
            _timerEnd = new Date();
            return _timerEnd.getTime() - _timerStarted.getTime();
        }
    }
}
