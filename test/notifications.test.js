const app = require('../src/server');
var chai = require('chai'), chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
let requestData =
{
    "usersList": [{
        "userIdentifier": "01015842240",
        "preferredLang": "arrLang",
        "templateData": {
            "name": "mohamed"
        }
    },
    {
        "userIdentifier": "01015842240",
        "preferredLang": "engLang",
        "templateData": {
            "name": "ahmed"
        }
    }],
    "messageID": "60d49fd758172b23fe386a30",
    "channel": "PUSH",
    "expireAt": 1999314790830,
    "sendAt": 0,
    "retry": 2
}

describe('POST /addRequest test', () => {
    it('should return the added /addRequest', done => {
        chai
            .request('http://localhost:3000')
            .post('/user/me')
            .send({ password: '123', confirmPassword: '123' })
            .end((err, res) => {
                console.log(err, res.body)
                console.log(res.statusCode)
                expect(res.statusCode).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('Error');
                done();
            });
    });

    it('should return the added /addRequest', done => {
        chai
            .request('http://localhost:3000')
            .post('/addRequest')
            .send(requestData)
            .end((err, res) => {
                console.log(err, res.body)
                console.log(res.statusCode)
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).not.to.have.property('Error');

                done();
            });
    });
});