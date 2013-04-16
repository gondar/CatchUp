describe("GameTimer", function(){
   describe("When counting time", function(){
       var outcome;
       var subject;
       var clock;

       afterEach(function () { clock.restore(); });

       beforeEach(function(){
           clock = sinon.useFakeTimers();
           subject = new GameTimer();
           subject.Start();
           clock.tick(300);
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

