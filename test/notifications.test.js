const chai = require('chai');
const expect = chai.expect;
const app = require('../src/server');
process.env.PORT = "4001";
var chai = require('chai'),
chaiHttp = require('chai-http');
chai.use(chaiHttp);

chai.use(chaiHttp);
let requestData = {
    "usersList": [{
        "userIdentifier": "01015842240",
        "preferredLang": "arrLang",
        "templateData": {
            "promoCode": "428555"
        }
    }],
    "messageID": "60d24cce9b0fb600230730ca",
    "channel": "PUSH",
    "expireAt": 1999314790830,
    "sendAt": 0,
    "retry": 2
}

describe('POST /addRequest', () => {
    it('should return the added /addRequest', done => {
        chai
            .request(app)
            .POST('/addRequest')
            .body(requestData)
            .end((err, res) => {
                res.should.have.status(200);
                console.log(res.body)
                //   expect(res.body).to.;
                done();
            });
    });
});