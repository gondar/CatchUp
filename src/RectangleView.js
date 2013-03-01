function RectangleView(){
	this._fabric = new fabric.Rect({
		left: 100,
		top: 100,
		fill: 'red',
		width: 20,
		height: 20
	});
}

RectangleView.prototype.SetModel = function(model){
		this.model = model;
		this.Update();
}

RectangleView.prototype.Update = function(){
	this._fabric.set({left: this.model.Position.x*10, top: this.model.Position.y});
	this._fabric.set({fill: this.model.Color});
}

RectangleView.prototype.GetFabric = function(){
	return this._fabric;
}