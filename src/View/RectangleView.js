function RectangleView(){
    var imgElement = document.getElementById('fallingObject');
    this._fabric = new fabric.Image(imgElement,{});
    this._canvas = null;
}

RectangleView.prototype.SetModel = function(model){
		this.model = model;
		this.Update();
}

RectangleView.prototype.AddToCanvas = function(canvas){
    this._canvas = canvas;
    this._canvas.add(this._fabric);
}

RectangleView.prototype.RemoveFromCanvas = function(){
    this._fabric.setElement(document.getElementById('fallingObjectEnd'));
    this._fabric.animate('opacity', 0, {
        onChange: this._canvas.renderAll.bind(this._canvas),
        onComplete: this._canvas.remove.bind(this._fabric),
        duration: 500
    });
}

RectangleView.prototype.Update = function(){
    if (this._fabric == null)
        return;
    this._fabric.set({left: this.model.Position.x+this._fabric.width/2, top: this.model.Position.y+this._fabric.height/2});
	//this._fabric.set({width: this.model.Dimensions.Width, height: this.model.Dimensions.Height});
    this.model.Dimensions = {Width: this._fabric.width, Height: this._fabric.height};
}