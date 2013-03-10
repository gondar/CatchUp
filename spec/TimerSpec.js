describe("GameTimer", function(){
   describe("When counting time", function(){
       var outcome;
       beforeEach(function(){
           var subject = new GameTimer();
           subject.Start();
           var date = new Date();
           while(new Date().getTime() - date.getTime() < 300)
           {

           }
           outcome = subject.Stop();
       });

       it("returns valid time when stopped",function(){
           expect(outcome).toBe(300);
       });
   });
});

