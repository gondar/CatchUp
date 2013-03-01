function CollisionDetector(){
	var IsInRange = function(value, Range){
		return value >= Range[0] && value <= Range[1];
	};
	
	var IsXColliding = function(object1,object2) {
		var x1_0 = object1.Position.x;
		var x1_1 = x1_0+object1.Dimensions.Width;
		var x2_0 = object2.Position.x;
		var x2_1 = x2_0+object2.Dimensions.Width;
				
		if (IsInRange(x1_0,[x2_0,x2_1]) || IsInRange(x1_1,[x2_0,x2_1]))
			return true;
		return false;
	}
	
	var IsYColliding = function(object1,object2){
		var y1 = object1.Position.y;
		var y2 = y1+object1.Dimensions.Height;
		var range = [object2.Position.y, object2.Position.y+object2.Dimensions.Height] 
		console.log({y1:y1,y2:y2,range:range});
		if (IsInRange(y1,range) || IsInRange(y2,range))
			return true;		
		return false;
	}

	return {
			IsCollision: function(object1,object2){				
				var x = IsXColliding(object1,object2);
				var y = IsYColliding(object1,object2);
				console.log({X:x,Y:y});
				return x&& y;
			}
	}
}

//GameBoard.prototype.AreColliding = function(object1, object2){
//	var xCollides = false;
//	var yCollides = false;
//	if (object1.Position.x + object1.Dimensions.Width >= object2.Position.x) {
//		xCollides = true;
//	}
//	if (object1.Position.y + object1.Dimensions.Height >= object2.Position.y) {
//		yCollides = true;
//	}
//	return xCollides && yCollides;
//}
//