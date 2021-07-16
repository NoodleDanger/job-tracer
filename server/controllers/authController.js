
const google = require('googleapis').google;
const jwt = require('jsonwebtoken');
const OAuth2 = google.auth.OAuth2;
const CONFIG = require('../../config/config.js')


module.exports = {setUserId : (req,res,next) => {
    if (!req.cookies.jwt) {
        // We haven't logged in
        return res.redirect('/');
      }
      // Create an OAuth2 client object from the credentials in our config file
      const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
      // Add this specific user's credentials to our OAuth2 client
      oauth2Client.credentials = jwt.verify(req.cookies.jwt, CONFIG.JWTsecret);
      // Get the youtube service
      oauth2Client.credentials.id_token = jwt.decode(oauth2Client.credentials.id_token)
      console.log("jwt: id_token",oauth2Client.credentials)
      res.locals.userId=oauth2Client.credentials.id_token.sub;
      console.log("res.locals.userId",res.locals.userId);
      return next();
}}