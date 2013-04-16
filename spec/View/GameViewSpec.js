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
	
	it("adds game objects to canvas only once", function(){
		var board = mockGameBoard();
		var controller = null;
		var subject = new GameView(board, controller);
		setFixtures("<div id='myid'></div>");		
		subject.CreateFabricInDiv("#myid");
		
		subject.Update();
		subject.Update();

        expect(board.GetObjectsOnBoard()["object1"].GetView().AddedToCanvas).toBe(1);
	});
	
	it("removes elements which are removed from model",function(){
		var board = mockGameBoardWithRemoveElementsFeature();
		var controller = null;
		var subject = new GameView(board, controller);
		setFixtures("<div id='myid'></div>");		
		subject.CreateFabricInDiv("#myid");
		subject.Update(); //Add elements to a board

		board.MockRemoveAll = true;
		subject.Update(); //Board does not show elements any more

        board.MockRemoveAll = false;
        expect(board.GetObjectsOnBoard()["object1"].GetView().RemovedFromCanvas).toBe(1);
	});
	
	it("updates each element on board view", function(){
		var board = mockGameBoardWithRemoveElementsFeature();
		var controller = null;
		var subject = new GameView(board, controller);
		setFixtures("<div id='myid'></div>");		
		subject.CreateFabricInDiv("#myid");
		
		subject.Update();
		
		expect(board.GetObjectsOnBoard()["object1"].GetView().UpdateCalledNumber).toBe(1);
	});
	describe("when updating board (points behaviour)", function(){
        var mockedView;
		beforeEach(function(){
            mockedView = mockView();
            var mockPointsModel = {GetView:function(){}};
			spyOn(mockPointsModel, 'GetView').andReturn(mockedView);
			var board = mockGameBoardWithPointsOnly(mockPointsModel);
			var controller = null;
			var subject = new GameView(board, controller);
			setFixtures("<div id='myid'></div>");		
			subject.CreateFabricInDiv("#myid");
		
			subject.Update();			
			subject.Update();			
		});
		
		it("updates points on the board", function(){
			expect(mockedView.UpdateCalledNumber).toBe(2);
		});
		
		it("adds points view to canvas only once", function(){
            expect(mockedView.AddedToCanvas).toBe(1);
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

function mockGameBoard(){
    var gameObject = mockGameObject();
    var pointsCounter = mockGameObject();
    return {
        GetObjectsOnBoard: function() {
            return {"object1": gameObject};
        },
        GetPointsCounter: function() {return pointsCounter;}
    };
}

function mockGameBoardWithRemoveElementsFeature(){
    var gameObject = mockGameObject();
    var pointsCounter = mockGameObject();
	return {
				MockRemoveAll: false,
				GetObjectsOnBoard: function() {
					if (this.MockRemoveAll)
						return {};
					return {"object1": gameObject};
				},
                GetPointsCounter: function() {return pointsCounter;}
			};
}

function mockGameBoardWithPointsOnly(pointsCounterParam) {
    var pointsCounter = pointsCounterParam || mockGameObject();
	var board = {
			GetObjectsOnBoard: function() { return {}; },
			GetPointsCounter: function() {return pointsCounter;}
	};
	return board;
}

function mockGameObject(){
	var view = mockView();
    return {
        view: null,
        GetView: function(){
            return view;
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
		},
        AddedToCanvas:0,
        AddToCanvas: function(){
            this.AddedToCanvas += 1;
        },
        RemovedFromCanvas: 0,
        RemoveFromCanvas: function(){
            this.RemovedFromCanvas +=1;
        }
	};
	return view;
}