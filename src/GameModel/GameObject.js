function GameObject(view){
	this.Position = {x:0,y:0};
	this.Dimensions = {Width:20,Height:20};
	this.Color = '#000000';
	this.Collision = false;
	this._view = view;
	view.SetModel(this);
}

GameObject.prototype.GetView = function() {
	return this._view;
}

GameObject.prototype.GetSpeedVector = function(){
    return {x:0, y:0};
}