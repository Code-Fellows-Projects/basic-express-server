const loggerMiddleware = require('../middleware/logger');

describe('logger middleware', () => {
  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn();

  beforeEach(() => {

    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {

    consoleSpy.mockRestore();
  });

  it('properly logs output', () => {
    loggerMiddleware(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  })
})