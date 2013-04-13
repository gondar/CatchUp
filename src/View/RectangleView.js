function RectangleView(){
	this._fabric = new fabric.Rect({
		fill: '#2020a0'
	});
	this._color = 0;
}

RectangleView.prototype.SetModel = function(model){
		this.model = model;
		this.Update();
}

RectangleView.prototype.Update = function(){
    if (this._fabric == null)
        return;
	//this._fabric.set({left: this.model.Position.x, top: this.model.Position.y});
    this._fabric.set({left: this.model.Position.x+this._fabric.width/2, top: this.model.Position.y+this._fabric.height/2});
	this._fabric.set({width: this.model.Dimensions.Width, height: this.model.Dimensions.Height});
}

RectangleView.prototype.GetFabric = function(){
	return this._fabric;
}