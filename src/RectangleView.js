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
	this._fabric.left = this.model.Position*10;
}

RectangleView.prototype.GetFabric = function(){
	return this._fabric;
}