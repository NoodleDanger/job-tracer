/* eslint-disable no-console */
const express = require('express');
const google = require('googleapis').google;
const jwt = require('jsonwebtoken');
const path = require('path');
const OAuth2 = google.auth.OAuth2;
const CONFIG = require('../config/config.js')
const cookieParser = require('cookie-parser');

const app = express();
const apiRouter = require('./routes/api');
const oauthRouter = require('./routes/oauth');

const PORT = CONFIG.port;
const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
console.log(oauth2Client);
const loginLink = oauth2Client.generateAuthUrl({
  access_type: 'offline', // Indicates that we need to be able to access data continously without the user constantly giving us consent
  scope: CONFIG.oauth2Credentials.scopes // Using the access scopes from our config file
});
console.log(loginLink);

//  handle parsing request body
app.use(cookieParser());
app.use(express.json());

// define route handlers

app.use('/api', apiRouter);
app.get('/loginUrl', (req,res)=>
res.status(200).send(loginLink));
app.get('/',(req,res)=>
res.redirect(loginLink));

// serve up static assets
app.use('/assets', express.static(path.join(__dirname, './../', 'client/assets/')));

// catch-all for unknown route requests
app.get('/auth_callback', function (req, res) {
  // Create an OAuth2 client object from the credentials in our config file
  const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
  if (req.query.error) {
    // The user did not give us permission.
    return res.redirect('/');
  } else {
    oauth2Client.getToken(req.query.code, function(err, token) {
      if (err)
        return res.redirect('/');

      // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'
      res.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret));
      return res.redirect('http://localhost:8080');
    });
  }
});

app.use('/auth', oauthRouter);

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

// global error handler

app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


module.exports = app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
