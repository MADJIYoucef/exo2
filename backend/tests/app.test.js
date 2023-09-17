const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Import your Express app (adjust the path)

const expect = chai.expect;

chai.use(chaiHttp);

describe('Express Server Tests', () => {
  it('should respond with a JSON message containing "Hello, Backend!"', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Hello, Backend!');
        done();
      });
  });

  // Add more unit tests for different routes and functionality
});