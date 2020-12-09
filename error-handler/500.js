'use strict';

function errorHandler(error, req, res, next) {
  res.status(500);
  res.statusMessage = 'Server Error';
  res.json({ error: error });
}

module.exports = errorHandler;