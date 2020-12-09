'use strict';

////////////libraries//////////////
const express = require('express');
const app = express();


////////////local files////////////
const notFoundHandler = require('./error-handler/404');
const errorHandler = require('./error-handler/500');
const valRequest = require('./middleware/validator');
// log a request
const logRequest = require('./middleware/logger');
// body parser that accepts JSON
app.use(express.json());

//////////callback functions/////////////
app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});




app.get('/person', valRequest, (req, res) => {
  console.log('WHATS GOING ON', req.query);
  let output = {

    name: req.query.name
  }
  res.status(200).json(output);
});


// apply to all routes
app.use(logRequest);

//adds browser to the request object
function getBrowser(req, res, next) {
  req.browser = req.header['user-agent'];
  next();
}

// sent request object w/ browser key to the front end
app.get('/browser', getBrowser, (req, res) => {
  let output = {
    browser: req.browser
  }
  res.status(200).json(output);
})

function square(n) {
  return (req, res, next) => {
    if (typeof n !== 'number') {
      next('not a number'); // make it skip the rest of middleware and just throw error
    } else {
      req.number = n * n;
      next();
    }
  }
}
app.get('/mw', square(10), getBrowser, (req, res, next) => {
  let output = {
    browser: req.browser,
    number: req.number
  }
  res.status(200).json(output);
})



//////////turning on server//////////
app.use(errorHandler);
app.use('*', notFoundHandler);


function start(PORT) {
  app.listen(PORT, () => {
    console.log(`Server up on ${PORT}`);
  })
}

module.exports = {
  server: app,
  start: start
}