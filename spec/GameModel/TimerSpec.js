describe("GameTimer", function(){
   describe("When counting time", function(){
       var outcome;
       var subject;

       beforeEach(function(){
           jasmine.Clock.useMock();
           subject = new GameTimer();
           subject.Start();
           jasmine.Clock.tick(300);
//           var date = new Date();
//           while(new Date().getTime() - date.getTime() < 300)
//           {
//
//           }
           outcome = subject.Stop();
       });

       afterEach(function(){

       });

       it("returns valid time when stopped",function(){
           expect(outcome).toBe(300);
       });

       it("keeps previous time", function(){
          expect(subject.GetTime()).toBe(300);
       });
   });
});

