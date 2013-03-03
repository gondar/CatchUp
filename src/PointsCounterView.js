function PointsCounterView(){
	this._fabric = new fabric.Text("0", {
		left: 20,
		top: 30,
		fontStyle: 'italic',
		fontFamily: 'Delicious',
		fontSize: 40
	});
	this._points = 0;
}

PointsCounterView.prototype.SetModel = function(model){
		this.model = model;
		this.Update();
}

PointsCounterView.prototype.Update = function(){
	this._points = this.model.Points; 
	this._fabric.setText(this._points.toString());
	var color = "rgb("+(this._points*10).toString()+",100,100)";
	this._fabric.set({fill: color});
	console.log(color);
}

PointsCounterView.prototype.GetFabric = function(){
	return this._fabric;
}