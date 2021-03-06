function CollisionDetector(){
	var IsInRange = function(value, Range){
		return value > Range[0] && value < Range[1];
	};
	
	var IsInInclusiveRange = function(value,Range){
		return value >= Range[0] && value <= Range[1];
	}
	
	var IsXColliding = function(object1,object2) {
		var x1 = object1.Position.x;
		var x2 = x1+object1.Dimensions.Width;
		var o2_x1 = object2.Position.x;
		var range = [o2_x1,o2_x1+object2.Dimensions.Width];
        //console.log("x1: "+x1+" x2: "+  x2+" o2_x1: "+o2_x1 + " o2_x2: "+range[1]);
		if (IsInRange(x1,range) || IsInRange(x2,range) || IsInInclusiveRange(o2_x1,[x1,x2]))
			return true;
		return false;
	}
	
	var IsYColliding = function(object1,object2){
		var y1 = object1.Position.y;
		var y2 = y1+object1.Dimensions.Height;
		var o2_y1 = object2.Position.y
		var range = [o2_y1, o2_y1+object2.Dimensions.Height] 
		if (IsInRange(y1,range) || IsInRange(y2,range)|| IsInInclusiveRange(o2_y1,[y1,y2]))
			return true;		
		return false;
	}

	return {
			IsCollision: function(object1,object2){
				return IsYColliding(object1,object2) && IsXColliding(object1,object2);
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