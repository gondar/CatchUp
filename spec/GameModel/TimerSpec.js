describe("GameTimer", function(){
   describe("When counting time", function(){
       var outcome;
       var subject;

       beforeEach(function(){
           subject = new GameTimer();
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

       it("keeps previous time", function(){
          expect(subject.GetTime()).toBe(300);
       });
   });
});

