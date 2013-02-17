function GameObject(view){
	this.Position = {x:0,y:0};
	this._view = view;
	view.SetModel(this);
}

GameObject.prototype.GetView = function() {
	return this._view;
}