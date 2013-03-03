function PointsCounterView(){
	this._fabric = new fabric.Rect({
		left: 0,
		top: 0,
		fill: 'red',
		width: 80,
		height: 80
	});
	this._points = 0;
}

PointsCounterView.prototype.SetModel = function(model){
		this.model = model;
		this.Update();
}

PointsCounterView.prototype.Update = function(){
	this._points = this.model.Points*10; 
	var color = "rgb("+this._points.toString()+",100,100)";
	this._fabric.set({fill: color});
	console.log(color);
}

PointsCounterView.prototype.GetFabric = function(){
	return this._fabric;
}