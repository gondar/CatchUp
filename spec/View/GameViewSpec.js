describe("GameView", function(){
	it("creates fabric", function(){
		setFixtures("<div id='myid'></div>");
		var subject = new GameView(null,100,200);
		
		subject.CreateFabricInDiv("#myid");
		
		expect($("#myid").text).not.toBe("");
		expect(subject._canvas).not.toBe(undefined);
		expect(subject._canvas.getWidth()).toBe(100);
		expect(subject._canvas.getHeight()).toBe(200);
	});
	
	it("listens for the left keyboard press", function(){	
		var board = null;
		var controller = jasmine.createSpyObj('BoardController',['MovePlayerLeft']);
		var subject = new GameView(board);
		
		subject.AddKeypressListeners(controller)
		var key = jQuery.Event("keydown");
		key.which = GameView.KEYBOARD_LEFT;
		$(document).trigger(key);
		
		expect(controller.MovePlayerLeft).toHaveBeenCalled();
	
		//cleanup
		$(document).off();
	});
	
	it("listens for the right keyboard press", function(){	
		var board = null;
		var controller = jasmine.createSpyObj('BoardController',['MovePlayerRight']);
		var subject = new GameView(board);
		
		subject.AddKeypressListeners(controller)
		var key = jQuery.Event("keydown");
		key.which = GameView.KEYBOARD_RIGHT;
		$(document).trigger(key);
		
		expect(controller.MovePlayerRight).toHaveBeenCalled();
		 
		//cleanup
		$(document).off();
	});
	
	it("adds elements to canvas only once", function(){
		var board = mockGameBoardWithPlayerOnly();
		var controller = null;
		var subject = new GameView(board, controller);
		setFixtures("<div id='myid'></div>");		
		subject.CreateFabricInDiv("#myid");
		
		subject.Update();
		subject.Update();
		
		expect(subject._canvas.getObjects().length).toBe(2); //One for player one for points
	});
	
	it("removes elements which are removed from model",function(){
		var board = mockGameBoardWithRemoveElementsFeature();
		var controller = null;
		var subject = new GameView(board, controller);
		setFixtures("<div id='myid'></div>");		
		subject.CreateFabricInDiv("#myid");
		
		subject.Update();
		board.MockRemoveAll = true;
		subject.Update();
		
		expect(subject._canvas.getObjects().length).toBe(1); //points object remains intact
	});
	
	it("updates each element on board view", function(){
		var board = mockGameBoardWithPlayerOnly();
		var controller = null;
		var subject = new GameView(board, controller);
		setFixtures("<div id='myid'></div>");		
		subject.CreateFabricInDiv("#myid");
		
		subject.Update();
		
		expect(board.GetObjectsOnBoard()["player"].GetView().UpdateCalledNumber).toBe(1);
	});
	describe("when updating board (points behaviour)", function(){
		var mockPointsModel;
		var subject;
		beforeEach(function(){
			mockPointsModel = {GetView:function(){}};
			spyOn(mockPointsModel, 'GetView').andReturn(mockView());
			var board = mockGameBoardWithPointsOnly(mockPointsModel);
			var controller = null;
			subject = new GameView(board, controller);
			setFixtures("<div id='myid'></div>");		
			subject.CreateFabricInDiv("#myid");
		
			subject.Update();			
			subject.Update();			
		});
		
		it("updates points on the board", function(){
			expect(mockPointsModel.GetView().UpdateCalledNumber).toBe(2);
		});
		
		it("adds points view to canvas only once", function(){
			expect(subject._canvas.getObjects().length).toBe(1);
		});
	});
});

function mockGameBoardWithPointsOnly(mockPointsModel) {
	var board = {
					GetObjectsOnBoard:function(){return [];},
					GetPointsCounter:function(){return mockPointsModel;}
				};
	return board;
};

function mockGameBoardWithRemoveElementsFeature(){
	var player = mockPlayerObject();
	return {
				MockRemoveAll: false,
				GetObjectsOnBoard: function() {
					if (this.MockRemoveAll)
						return {};
					return {"player": player};
				},
				GetPointsCounter: mockPointsObject()
			};
}

function mockGameBoardWithPlayerOnly(player) {
	var player = player || mockPlayerObject();
	var board = {
			GetObjectsOnBoard: function() { return {"player": player}; },
			GetPointsCounter: mockPointsObject()
	};
	return board;
}

function mockPlayerObject(){
	var view = mockView();
	return {
				view: null,
				GetView: function(){
					return view;
				}
	};
}

function mockPointsObject(){
	var view = mockView();
	return function(){
				return {
					view: null,
					GetView: function(){
						return view;
						}
					}
			}
}

function mockView() {
	var view = {
		GetFabric: function() {
			return new fabric.Rect({});
		},
		UpdateCalledNumber:0,
		Update: function() {
			this.UpdateCalledNumber += 1;
		}
	};
	return view;
}