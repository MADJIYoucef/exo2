const request = require('supertest');
const { app, server } = require('../app');

describe('Express App Tests', () => {
  beforeAll((done) => {
    server.on('listening', () => {
      done();
    });
  });

  afterAll((done) => {
    server.close(() => {
      done();
    });
  });

  it('should respond with a JSON message containing "Hello, World!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello, World!');
  });
});
