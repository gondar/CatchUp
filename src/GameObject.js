function GameObject(view){
	this.Position = 0;
	this._view = view;
	view.SetModel(this);
}

GameObject.prototype.GetView = function() {
	return this._view;
}