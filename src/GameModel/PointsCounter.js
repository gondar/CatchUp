function PointsCounter(view){
	var _points = 0;
	
	var self = {	
			GetView: function() {
				return view;
			},
			Points: _points
	}
	view.SetModel(self);
	
	return self;
}