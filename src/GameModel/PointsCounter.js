function PointsCounter(view){
	var _points = 0;
	var _view = view;
	
	var self = {	
			GetView: function() {
				return _view;
			},
			Points: _points
	}
	view.SetModel(self);
	
	return self;
}