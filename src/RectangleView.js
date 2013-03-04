function RectangleView(){
	this._fabric = new fabric.Rect({
		left: 100,
		top: 100,
		fill: '#2020a0',
		width: 20,
		height: 20
	});
	this._color = 0;
}

RectangleView.prototype.SetModel = function(model){
		this.model = model;
		this.Update();
}

RectangleView.prototype.Update = function(){
	this._fabric.set({left: this.model.Position.x, top: this.model.Position.y});
	this._fabric.set({width: this.model.Dimensions.Width, height: this.model.Dimensions.Height});
	if (this._color > 1){
		this._color -=1;
		this._fabric.set({fill: "#"+this._color+"c1c1c"});
	}
	if (this.model.Collision) {
		this._color = 9;
	}
}

RectangleView.prototype.GetFabric = function(){
	return this._fabric;
}