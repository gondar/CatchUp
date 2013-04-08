function GameTimer(){
    var _timerStarted;
    var _timerEnd;
    function _getTime(){
        return _timerEnd.getTime() - _timerStarted.getTime();
    }
    return {
        Start: function(){
            _timerStarted = new Date();
        },
        Stop: function(){
            _timerEnd = new Date();
            return _getTime();
        },
        GetTime: function(){
            return _getTime();
        }
    }
}
