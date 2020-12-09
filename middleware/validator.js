'use strict';

function valRequest(req, res, next) {
  console.log('VAL NAME', req.query);
  if (req.query.name) {
    next();

  } else {
    next('500');
  }
}

module.exports = valRequest;