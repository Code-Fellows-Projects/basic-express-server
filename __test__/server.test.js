'use strict';

const { server } = require('../server');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('bad route', () => {
  it('should respond with a 404', () => {
    return mockRequest
      .get('/potatoes')
      .then(results => {
        expect(results.status).toBe(404);
      }).catch(console.error);
  });
});

describe('bad method', () => {
  it('should respond with a 404', () => {
    return mockRequest
      .post('/potatoes')
      .then(results => {
        expect(results.status).toBe(404);
      }).catch(console.error);
  });
});
