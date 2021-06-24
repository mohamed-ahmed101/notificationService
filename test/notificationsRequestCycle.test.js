// //docker-compose -f docker-compose.yml -f docker-compose.dev.y
// const { expect } = require('chai');
// const requestController = require('../src/controller/requestController');
// const obj = new requestController();

// let requestData = {
//   "usersList": [{
//     "userIdentifier": "01015842240",
//     "preferredLang": "arrLang",
//     "templateData": {
//       "promoCode": "428555"
//     }
//   }],
//   "messageID": "60d24cce9b0fb600230730ca",
//   "channel": "PUSH",
//   "expireAt": 1999314790830,
//   "sendAt": 0,
//   "retry": 2
// }
// // "scripts": {
// //   "test": "mocha --recursive --exit"
// //   }


// describe("Testing requestController ", () => {

//   it("Is returning 4 when adding 2 + 2", function(){
//     expect(2 + 2).to.equal(4);
//   });

//   it("save", async function() {
//     //  this.timeout(3000)
//     console.log("kkk", requestController, obj, obj?.all)
//     try {
//     //  let data = await obj.save(requestData);
//     let data = await obj.all();

//       console.log("data>>>>>>>>", data);
//     } catch (ex) {
//       console.log("dataex", ex);
//     }
//    // done()
//   });

//   it("greeting", async function() {
//     let data = await obj.hi();
//     expect(typeof data).to.equal('object');
//   });

//   it("Are both the sentences matching", function() {
//     expect("This is working").to.equal('This is working');
//   });
// });