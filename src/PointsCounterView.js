function PointsCounterView(){
	this._fabric = new fabric.Rect({
		left: 0,
		top: 0,
		fill: 'red',
		width: 40,
		height: 40
	});
}

PointsCounterView.prototype.SetModel = function(model){
		this.model = model;
		this.Update();
}

PointsCounterView.prototype.Update = function(){
	this._fabric.set({left: this.model.Position.x, top: this.model.Position.y});
	this._fabric.set({fill: this.model.Color});
	this._fabric.set({width: this.model.Dimensions.Width, height: this.model.Dimensions.Height});
}

PointsCounterView.prototype.GetFabric = function(){
	return this._fabric;
}