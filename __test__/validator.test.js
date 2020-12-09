'use strict';

const { server } = require('../server');
const supertest = require('supertest');
const mockRequest = supertest(server);


describe('is no name in the query string', () => {
  it('should respond with a 500', () => {
    return mockRequest
      .get('/person')
      .then(results => {
        expect(results.status).toBe(500);
      }).catch(console.error);
  });
});

describe('is there a name in the query string', () => {
  it('should respond with a 200', () => {
    return mockRequest
      .get('/person?name=fred')
      .then(results => {
        expect(results.status).toBe(200);
      }).catch(console.error);
  });
});

describe('if there is a name in the query string, it will output the correct name', () => {
  it('should respond with {name: fred }', () => {
    return mockRequest
      .get('/person?name=fred')
      .then(results => {
        expect(results.body).toEqual({ name: 'fred' });
      }).catch(console.error);
  });
});