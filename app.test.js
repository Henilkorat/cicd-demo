const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  it('should return Hello From CI/CD Demo App', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe('Hello From CI/CD Demo App');
  });
});